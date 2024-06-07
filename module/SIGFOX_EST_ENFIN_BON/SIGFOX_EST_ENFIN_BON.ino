#include <arm.h>
#include "TinyGPS.h"

#define LED 13

Arm myArm;
TinyGPS gps;

// Buffer to hold the message to send to Sigfox
uint8_t msg[12];

// ---------------------------------------------------------------------
// Implemented functions
// ---------------------------------------------------------------------

void setup()
{
  // Init LED for show error
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  Serial.begin(9600);
  Serial1.begin(9600);
  
  // Init Arm and set LED to on if error
  if (myArm.Init(&Serial) != ARM_ERR_NONE)
    digitalWrite(LED, HIGH);
  
  // Set Sigfox mode in uplink
  myArm.SetMode(ARM_MODE_SFX);
  myArm.SfxEnableDownlink(false);
  myArm.UpdateConfig();
}

void loop()
{
  long lat, lon;

  while (Serial1.available())
  {
    int c = Serial1.read();
    if (gps.encode(c))
    {
      gps.get_position(&lat, &lon);
      delay(700);
      // Pack latitude and longitude into the message buffer
      msg[0] = (lat >> 24) & 0xFF;
      msg[1] = (lat >> 16) & 0xFF;
      msg[2] = (lat >> 8) & 0xFF;
      msg[3] = lat & 0xFF;

      msg[4] = (lon >> 24) & 0xFF;
      msg[5] = (lon >> 16) & 0xFF;
      msg[6] = (lon >> 8) & 0xFF;
      msg[7] = lon & 0xFF;
      
      // Send the message to Sigfox
      myArm.Send(msg, 8);
      for (unsigned int i = 0; i < 2; i++)
        delay(60000);
    }
  }
}
