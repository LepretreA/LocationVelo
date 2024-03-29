#include <SoftwareSerial.h>

SoftwareSerial gpsSerial(10, 11); // RX, TX
const long interval = 10000; // intervalle de 10 secondes
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
    sendSimulatedDataToSigfox(); // envoyer les données simulées à Sigfox
  }

  if (gpsSerial.available()) {
    String gpsData = gpsSerial.readStringUntil('\n');
    if (gpsData.startsWith("$GPRMC")) { // Si les données sont des données de position
      float latitude = parseLatitude(gpsData); // Analyse la latitude
      float longitude = parseLongitude(gpsData); // Analyse la longitude
      
      Serial.println("--------------------------");
      Serial.println("Latitude: " + String(latitude, 6)); // Affiche la latitude avec 6 décimales
      Serial.println("Longitude: " + String(longitude, 6)); // Affiche la longitude avec 6 décimales
      Serial.println("--------------------------");
    }
  }
}

float parseLatitude(String data) {
  // Exemple de traitement basique des données GPS
  int index = data.indexOf(","); // Trouve l'indice de la première virgule
  String latStr = data.substring(index + 1, data.indexOf(",", index + 1)); // Extrait la latitude
  return latStr.toFloat(); // Convertit la latitude en flottant
}

float parseLongitude(String data) {
  // Exemple de traitement basique des données GPS
  int index = data.indexOf(","); // Trouve l'indice de la première virgule
  for (int i = 0; i < 3; i++) {
    index = data.indexOf(",", index + 1); // Trouve l'indice de la troisième virgule
  }
  String lonStr = data.substring(index + 1, data.indexOf(",", index + 1)); // Extrait la longitude
  return lonStr.toFloat(); // Convertit la longitude en flottant
}

void sendSimulatedDataToSigfox() {
  // Simule les données GPS en ajoutant des données aléatoires dans la plage raisonnable
  float latitude = random(490000, 500000) / 10000.0; // Latitude entre 49.0 et 50.0 (en degrés décimaux)
  float longitude = random(200000, 300000) / 10000.0; // Longitude entre 20.0 et 30.0 (en degrés décimaux)

  // Envoie les données simulées à Sigfox (remplacer cette partie par le code d'envoi à Sigfox)
  Serial.println("----------------------------------------Envoi des coordonnées simulées à Sigfox :----------------------------------------");
  Serial.println("Latitude : " + String(latitude, 6));
  Serial.println("Longitude : " + String(longitude, 6));
  Serial.println("-------------------------------------------------------------------------------------------------------------------------");
}
