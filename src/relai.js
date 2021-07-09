const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var Particle = require("particle-api-js")
var particle = new Particle()

var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"
var eventName = "controlEvent"

// Archive command event
// Get events filtered by name
particle.getEventStream({ name: eventName, auth: token}).then(function(stream) {
    stream.on('event', function(data) {
        console.log("Received event: ", data);
        
        // Publish to MQQT broker
        client.publish('app5s6/someMqttEvent', data.data.toString())
    });
});

// Send on start
// client.on('connect', () => {
//   console.log("Sending event")
//   client.publish('app5s6/someMqttEvent', 'myValue')
// })


// Archive result event
// MQQT event subscribe
client.on('connect', () => {
    client.subscribe('app5s6/archiveDone')
})

// MQQT event receive
client.on('message', (eventName, data) => {

    switch (eventName) {
        case 'app5s6/archiveDone':
            //console.log("Data received: ", data.toString('utf8'))
            
            // Publish archive success to argon
            var publishEventPr = particle.publishEvent({ name: 'archiveEvent', data: data.data.toString(), auth: token });
            return
    }
    console.log('No handler for topic %s', eventName)
})
