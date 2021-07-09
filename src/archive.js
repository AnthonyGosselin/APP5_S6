const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')


client.on('connect', () => {
    client.subscribe('app5s6/someMqttEvent')
})

client.on('message', (eventName, data) => {

    switch (eventName) {
        case 'app5s6/someMqttEvent':
            console.log("Data received: ", data.toString('utf8'))
            // TODO: save to file (BD)

            // Send event that archive was done
            client.publish('app5s6/archiveDone', 'true')
            return
    }
    console.log('No handler for topic %s', eventName)
})