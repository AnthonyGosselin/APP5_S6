const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var Particle = require("particle-api-js")
var particle = new Particle()

var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"
var eventName = "controlEvent"

// Get events filtered by name
particle.getEventStream({ name: eventName, auth: token}).then(function(stream) {
    stream.on('event', function(data) {
        console.log("Received event: ", data);

        client.publish('app5s6/someMqttEvent', data.data.toString())
    });
});


// Send on start
// client.on('connect', () => {
//   // Inform controllers that garage is connected
//   console.log("Sending event")
//   client.publish('app5s6/someMqttEvent', 'myValue')
// })