#include "Particle.h"

//#include "../BeaconScanner/BeaconScanner.h"


int cloudValue = 0;

int publishValue = 0;
int secondPublishValue = 0;

String acceptedAdresses[2];
unsigned long scannedTime = 0;

// void bleCallback(Beacon& beacon, callback_type type) {

//   for (int i=0; i<sizeof(acceptedAdresses); i++){
//     if (strcmp(beacon.getAddress().toString(), acceptedAdresses[i]) == 0){
//       if (type == NEW){
//         Particle.publish("publishValue", beacon.getAddress().toString());
//       }
//     }
//   }

//   //Log.trace("Address: %s. Type: %s", beacon.getAddress().toString().c_str(), (type == NEW) ? "Entered" : "Left");
// }

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Particle.variable("cloudValue", cloudValue);

  // // Bluetooth section
  // BLE.on();
  // Scanner.setCallback(bleCallback);
  // Scanner.startContinuous();
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {

  // Vector<BleScanResult> scanResults = BLE.scan();

  // if (scanResults.size()) {
  //     Serial.printlnf("%d devices found", scanResults.size());

  //     for (int ii = 0; ii < scanResults.size(); ii++) {
  //         Serial.printlnf("MAC: %02X:%02X:%02X:%02X:%02X:%02X | RSSI: %dBm",
  //                 scanResults[ii].address()[0], scanResults[ii].address()[1], scanResults[ii].address()[2],
  //                 scanResults[ii].address()[3], scanResults[ii].address()[4], scanResults[ii].address()[5], scanResults[ii].rssi());

  //         String name = scanResults[ii].advertisingData().deviceName();
  //         if (name.length() > 0) {
  //             Serial.printlnf("Advertising name: %s", name.c_str());
  //         }
  //     }
  // }

  // Serial.println("Loop");
  // delay(1000);

  // Scanner.loop();
  // if (Particle.connected() && (millis() - scannedTime) > 1000) {
  //   scannedTime = millis();
  //   Scanner.scanAndPublish(1, SCAN_KONTAKT | SCAN_IBEACON | SCAN_EDDYSTONE, "bleEvent", PRIVATE);
  // }


  // The core of your code will likely live here.
  // cloudValue++;
  // secondPublishValue += 2;
  // Serial.printlnf("New value: %d", cloudValue);
  // Particle.publish("publishValue", String(cloudValue));
  // // Particle.publish("secondPublishValue", String(secondPublishValue));
  // delay(500);
}