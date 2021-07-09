const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var Particle = require("particle-api-js")
var particle = new Particle()

// tony
// var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"

// etienne
var token = "978846f8f59f8e110c9c272e2b1b42cd8e5e145c"

// ---------------------
// Particle cloud reception
// ---------------------

function sendMqttEvent(stringValue) {
    client.publish('app5s6/relaiMqttEvent', stringValue)
}

// Archive command event
// Get events filtered by name
particle.getEventStream({ name: 'controlEvent', auth: token}).then(function(stream) {
    stream.on('event', function(data) {
        console.log("[RELAI] Received event: ", data);

        // Publish to MQQT broker
        sendMqttEvent(data.data.toString())
    });
});

// Send on start
// client.on('connect', () => {
//     console.log("[RELAI] Sending event on start")
//     sendMqttEvent('myValue')
// })


// -----------------------
// MQTT reception
// -----------------------


// Archive result event
// MQQT event subscribe
client.on('connect', () => {
    client.subscribe('app5s6/archiveDone')
})

// MQQT event receive
client.on('message', (eventName, data) => {

    switch (eventName) {
        case 'app5s6/archiveDone':
            console.log("[RELAI] MQTT data received: ", data.toString('utf8'))
            
            // Publish archive success to argon
            var publishEventPr = particle.publishEvent({ name: 'archiveEvent', data: data.toString('utf8'), auth: token });
            return
    }
    console.log('[RELAI] No handler for topic %s', eventName)
})
