#include "Particle.h"
#include "BeaconScanner.h"

int led = D7;

int publishValue = 0;
int secondPublishValue = 0;


void controlEventHandler(const char *event, const char *data) {
	Serial.printlnf("[ARGON] Received event: '%s'. Data: '%s'", event, (data ? data : "NULL"));

	// Flash once once a new connection is received
  digitalWrite(led, HIGH);
  delay(100);
  digitalWrite(led, LOW);

}

void archiveEventHandler(const char *event, const char *data) {
	Serial.printlnf("[ARGON] Received event: '%s'. Data: '%s'", event, (data ? data : "NULL"));

	// Blink twice for archive success
  digitalWrite(led, HIGH);
  delay(100);
  digitalWrite(led, LOW);
  delay(100);
  digitalWrite(led, HIGH);
  delay(100);
  digitalWrite(led, LOW);

  // Add another blink if archive failed
  if(strcmp(data, "fail") == 0){
    delay(100);
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
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

}

// loop() runs over and over again, as quickly as it can execute.
void loop() {

  // Serial.println("Loop");
  // delay(1000);

  // Scan every iBeacon
  Scanner.scan(1, SCAN_IBEACON);
  for (auto b: Scanner.getiBeacons()){
    // Check beacon is under a certain range (close to argon)
    if(b.getRssi() >= -60){
      Serial.printlnf("[ARGON] Beacon in range: %s", b.getUuid());
      Particle.publish("beaconEvent", b.getUuid());
    }
  }

  // cloudValue++;
  // secondPublishValue += 2;
  // Serial.printlnf("New value: %d", cloudValue);
  // Particle.publish("publishValue", String(cloudValue));
  // // Particle.publish("secondPublishValue", String(secondPublishValue));
  // delay(500);
}