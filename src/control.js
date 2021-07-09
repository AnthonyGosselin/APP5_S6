var Particle = require("particle-api-js")
var particle = new Particle()

var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"
var deviceId = "e00fce68c58943ceb0e9b2d8"

var presentAddresses = [];

//Get events filtered by name
// particle.getEventStream({ name: 'publishValue', auth: token}).then(function(stream) {
//     stream.on('event', function(data) {
//         //console.log("Event: ", data);
//         console.log("Value: ", data.data)
//     });
// });
  
// Get events filtered by device
particle.getEventStream({ deviceId: deviceId, auth: token }).then(function(stream) {
	stream.on('event', function(data) {
	
		switch (data.eventName) {
			case "beaconEvent":

				console.log("[CONTROL] Received event: ", data);

				// Create string message for logs
				var today = new Date();
				var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var controlEventMessage = date + ' ' + time + data.data.toString()
				
				// Find if item is in list and add correct suffix
				var indexAdress = presentAddresses.indexOf(controlEventMessage) // ????????
				if(indexAdress == -1) {
					presentAddresses.push(data.data.toString())
					controlEventMessage = controlEventMessage + " arrived"
				}
				else {
					presentAddresses.splice(indexAdress, 1);
					controlEventMessage = controlEventMessage + " left"
				}

				var publishEventPr = particle.publishEvent({ name: 'controlEvent', data: controlEventMessage, auth: token });

				publishEventPr.then(
				function(data) {
					if (data.body.ok) { console.log("[CONTROL] Event published successfully") }
				},
				function(err) {
					console.log("[CONTROL] Failed to publish event: " + err)
				}
				);
				break
		}

	});
});
