const fs = require('fs') // Write to file

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var listenEvent = "app5s6/relaiMqttEvent"
var outFileLocation = require('path').resolve(__dirname, '../logfile.txt')

function saveToFile(stringValue) {
    console.log(`[ARCHIVE] Writing to logfile: '${stringValue}'`)
    fs.appendFile(outFileLocation, stringValue + '\n', err => {
        if (err) {
            console.error(err)
            // Send event indicating that archive failed
            client.publish('app5s6/archiveDone', 'fail')
        }
        else{
            // Send event indicating that archive was completed successfully
            console.log(`[ARCHIVE] Archive success`)
            client.publish('app5s6/archiveDone', 'success')
        }
        
    })
}


client.on('connect', () => {
    // Listen to incoming mqtt events of desired name
    client.subscribe(listenEvent)
})

client.on('message', (eventName, data) => {

    switch (eventName) {
        case listenEvent:
            console.log("[ARCHIVE] Data received: ", data.toString('utf8'))

            // Write incoming data to logfile (DB)
            saveToFile(data)
            return
    }
    console.log('No handler for topic %s', eventName)
})

console.log("[ARCHIVE] Started")
console.log("Logfile location: ", outFileLocation)