#include "TinyGPS.h"
TinyGPS gps;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  delay(500);
  
}
void loop()
{
  long lat, lon;
  unsigned long fix_age, time, date;



  while (Serial1.available())
  {
    int c = Serial1.read();
    if (gps.encode(c))
    {
     gps.get_position(&lat, &lon, &fix_age);
     gps.get_datetime(&date, &time, &fix_age);

       // Convertir en degrés décimaux
      float latitude = lat ;// / 1000000.0;  passer en float 
      float longitude = lon; // /1000000.0;   passer en float
      Serial.println("Test get_position");
      delay(700);
      Serial.print("Longitude : ");
      Serial.println(longitude); // 6 décimales   (longitude, 6);
      Serial.print("Latitude : ");
      Serial.println(latitude); // 6 décimales   (latitude, 6);
      if(longitude&&latitude!=0){
        Serial.println("Test passed");
      }else{
        Serial.println("Test failed");
      }
      delay(2000);
    }
  }
}
