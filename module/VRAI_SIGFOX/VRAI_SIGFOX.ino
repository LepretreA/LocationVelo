#include <arm.h>

// Crée un objet Arm
Arm myArm;
// Le message à envoyer sur Sigfox
uint8_t msg[] = {0x48, 0x65, 0x6C, 0x6C, 0x6F};

void setup()
{
  
  // Configure le mode Sigfox en mode émission uniquement
  myArm.SetMode(ARM_MODE_SFX);
  myArm.SfxEnableDownlink(false); // Désactive la réception des messages (downlink)
  myArm.UpdateConfig(); // Met à jour la configuration

    // Afficher un message de débogage
  Serial.println("Configuration Sigfox terminée");
}

void loop()
{
  unsigned int i;
  
  // Afficher le message avant de l'envoyer
  Serial.print("Envoi du message : ");
  for (int j = 0; j < sizeof(msg); j++) {
    Serial.print(msg[j], HEX);
  }
  Serial.println();

  // Envoie le message à Sigfox
  myArm.Send(msg, sizeof(msg));
  
  // Afficher un message de débogage
  Serial.println("Message envoyé à Sigfox");
  
  // Attend 10 minutes
  for(i=0; i<10; i++)
    delay(60000); // Attend 1 minute (60000 millisecondes)
}
