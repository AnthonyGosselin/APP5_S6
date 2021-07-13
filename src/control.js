var Particle = require("particle-api-js")
var particle = new Particle()

// argonDiTony
var argonId = "e00fce68c58943ceb0e9b2d8"
var token = "3bfa0a0963a19c588b187e479f86c3d7928723c0"

// argonEDS
// var argonId = "e00fce68154d43882c30e4d3"
// var token = "978846f8f59f8e110c9c272e2b1b42cd8e5e145c"

var presentAddresses = []
var acceptedAdresses = [
	"093F5195-59F9-45F5-92D4-F287C0C9E31A",
	"594650A2-8621-401F-B5DE-6EB3EE398170"]

var lastScannedUUID = " ";
var lastScannedTime = Math.floor(Date.now()/1000);
  
// Get events filtered by device
particle.getEventStream({ deviceId: argonId, auth: token }).then(function(stream) {
	stream.on('event', function(data) {

		switch (data.name) {
			case "beaconEvent":

				console.log("[CONTROL] Received value: ", data.data)
				// console.log("[CONTROL] Last value: ", lastScannedUUID)

				// console.log("[CONTROL] Time Diff: ", Math.floor(Date.now()/1000) - lastScannedTime)
				if (lastScannedUUID == data.data && (Math.floor(Date.now()/1000) - lastScannedTime <= 5)){
					console.log("[CONTROL] Not publishing event -> Uuid multiple scans: ", data.data)
					return
				}
				else if (acceptedAdresses.indexOf(data.data) == -1){
					console.log("[CONTROL] Not publishing event -> Uuid not authorized: ", data.data)
					return
				}

				// Assign last UUID and time
				lastScannedUUID = data.data;
				lastScannedTime = Math.floor(Date.now()/1000);

				// Create string message for logs
				var today = new Date();
				var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
				var controlEventMessage = date + ' ' + time + ' ' + data.data.toString()
				
				// Find if item is in list and add correct suffix
				var indexAdress = presentAddresses.indexOf(data.data.toString())
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
	}).catch(function(stream){
		console.log("Promise Rejected");
});

console.log("[CONTROL] Started")
