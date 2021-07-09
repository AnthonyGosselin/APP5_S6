const fs = require('fs') // Write to file

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var listenEvent = "app5s6/relaiMqttEvent"

function saveToFile(stringValue) {
    console.log(`[ARCHIVE] Writing to logfile: '${stringValue}'`)
    fs.appendFile("../logfile.txt", stringValue + '\n', err => {
        if (err) {
            console.error(err)
        }
        // Send event that archive was done
        client.publish('app5s6/archiveDone', 'true')
    })
}


client.on('connect', () => {
    client.subscribe(listenEvent)
})

client.on('message', (eventName, data) => {

    switch (eventName) {
        case listenEvent:
            console.log("[ARCHIVE] Data received: ", data.toString('utf8'))

            saveToFile(data)
            return
    }
    console.log('No handler for topic %s', eventName)
})