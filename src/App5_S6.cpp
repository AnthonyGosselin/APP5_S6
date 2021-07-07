/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#line 1 "c:/_Projects/APP5_S6/src/App5_S6.ino"
#include "Particle.h"

void setup();
void loop();
#line 3 "c:/_Projects/APP5_S6/src/App5_S6.ino"
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