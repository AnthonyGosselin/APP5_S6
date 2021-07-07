var Particle = require("particle-api-js")
var particle = new Particle()

var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"

//Get events filtered by name
// particle.getEventStream({ name: 'publishValue', auth: token}).then(function(stream) {
//     stream.on('event', function(data) {
//         //console.log("Event: ", data);
//         console.log("Value: ", data.data)
//     });
// });
  
  //Get your devices events
  particle.getEventStream({ deviceId: 'e00fce68c58943ceb0e9b2d8', auth: token }).then(function(stream) {
    stream.on('event', function(data) {
      console.log("Event: ", data);

      // TODO: LOGIC ...

      var publishEventPr = particle.publishEvent({ name: 'controlEvent', data: data.data.toString(), auth: token });

      publishEventPr.then(
        function(data) {
          if (data.body.ok) { console.log("Event published successfully") }
        },
        function(err) {
          console.log("Failed to publish event: " + err)
        }
      );
    });
  });
  
//   //Get test event for specific device
//   particle.getEventStream({ deviceId: 'DEVICE_ID', name: 'test', auth: token }).then(function(stream) {
//     stream.on('event', function(data) {
//       console.log("Event: ", data);
//     });
//   });