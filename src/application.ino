#include "Particle.h"
#include "BeaconScanner.h"

int led = D7;

int publishValue = 0;
int secondPublishValue = 0;

void blinkLed(int times) {
	for (int i = 0; i < times; i++) {
		digitalWrite(led, HIGH);
		delay(100);
		digitalWrite(led, LOW);
		delay(100);
	}
}

void controlEventHandler(const char *event, const char *data) {
	Serial.printlnf("[ARGON] Received event: '%s'. Data: '%s'", event, (data ? data : "NULL"));

	// Flash once once a new connection is received
	digitalWrite(led, HIGH);
	delay(100);
	digitalWrite(led, LOW);

}

void archiveEventHandler(const char *event, const char *data) {
	Serial.printlnf("[ARGON] Received event: '%s'. Data: '%s'", event, (data ? data : "NULL"));

	// Blink three times for archive success
	blinkLed(3);

	// Add another blink if archive failed
	if(strcmp(data, "fail") == 0){
		blinkLed(1);
	}

}

// setup() runs once, when the device is first turned on.
void setup() {
  // Listen to events
  Particle.subscribe("controlEvent", controlEventHandler);
  Particle.subscribe("archiveEvent", archiveEventHandler);

  // Setup LED
  pinMode(led, OUTPUT);

  // Bluetooth section
  BLE.on();

  Serial.println("[ARGON] Started");
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {

  // Scan every iBeacon
  Scanner.scan(1, SCAN_IBEACON);
  for (auto b: Scanner.getiBeacons()){
    // Check beacon is under a certain range (close to argon)
    if(b.getRssi() >= -60){
      Serial.printlnf("[ARGON] Beacon in range: %s", b.getUuid());
      Particle.publish("beaconEvent", b.getUuid());
    }
  }
  
}