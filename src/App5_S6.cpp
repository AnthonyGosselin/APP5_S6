/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#line 1 "c:/_Projects/APP5_S6/src/App5_S6.ino"
#include "Particle.h"


void setup();
void loop();
#line 4 "c:/_Projects/APP5_S6/src/App5_S6.ino"
int cloudValue = 0;

int publishValue = 0;
int secondPublishValue = 0;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Particle.variable("cloudValue", cloudValue);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {

  Vector<BleScanResult> scanResults = BLE.scan();

  if (scanResults.size()) {
      Serial.printlnf("%d devices found", scanResults.size());

      for (int ii = 0; ii < scanResults.size(); ii++) {
          Serial.printlnf("MAC: %02X:%02X:%02X:%02X:%02X:%02X | RSSI: %dBm",
                  scanResults[ii].address()[0], scanResults[ii].address()[1], scanResults[ii].address()[2],
                  scanResults[ii].address()[3], scanResults[ii].address()[4], scanResults[ii].address()[5], scanResults[ii].rssi());

          String name = scanResults[ii].advertisingData().deviceName();
          if (name.length() > 0) {
              Serial.printlnf("Advertising name: %s", name.c_str());
          }
      }
  }

  Serial.println("Loop");
  delay(3000);


  // The core of your code will likely live here.
  // cloudValue++;
  // secondPublishValue += 2;
  // Serial.printlnf("New value: %d", cloudValue);
  // Particle.publish("publishValue", String(cloudValue));
  // // Particle.publish("secondPublishValue", String(secondPublishValue));
  // delay(500);
}