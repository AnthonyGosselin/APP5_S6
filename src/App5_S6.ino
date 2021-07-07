#include "Particle.h"

int cloudValue = 0;

int publishValue = 0;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Particle.variable("cloudValue", cloudValue);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  cloudValue++;
  Serial.printlnf("New value: %d", cloudValue);
  Particle.publish("publishValue", String(cloudValue));
  delay(500);
}