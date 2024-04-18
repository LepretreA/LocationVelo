#include <SoftwareSerial.h>

SoftwareSerial gpsSerial(10, 11); // RX, TX
const long interval = 5000; // intervalle de 5 secondes
unsigned long previousMillis = 0; // variable pour stocker le dernier temps d'émission

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
}

void loop() {
  unsigned long currentMillis = millis(); // obtenir le temps actuel
  
  // Vérifier si le délai est écoulé et si des données GPS sont disponibles
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis; // enregistrer le temps actuel comme dernier temps d'émission
   sendData();
  }

}

void sendData() {
  // Simuler les données GPS
  float latitude = random(490000, 500000) / 10000.0; // Latitude entre 49.0 et 50.0 (en degrés décimaux)
  float longitude = random(200000, 300000) / 10000.0; // Longitude entre 20.0 et 30.0 (en degrés décimaux)

  // Envoyer la latitude et la longitude sur le port série
  Serial.print("Latitude:");
  Serial.print(latitude, 6); // Afficher la latitude avec 6 décimales
  Serial.print(":Longitude:");
  Serial.println(longitude, 6); // Afficher la longitude avec 6 décimales
}
