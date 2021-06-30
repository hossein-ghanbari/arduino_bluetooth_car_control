//Declare the arduino pins
int rm1 = 5;
int rm2 = 6;
int lm1 = 10;
int lm2 = 9;
int horn = 11;
int light = 12;

int tempSensorPin = A0; 

double Thermistor(int RawADC) {
  double Temp;
  Temp = log(10000.0*((1024.0/RawADC-1))); 
  Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
  Temp = Temp - 273.15; // Convert Kelvin to Celcius
  return Temp;
}

void setup()
{
  //initlize the mode of the pins
  pinMode(lm1, OUTPUT);
  pinMode(lm2, OUTPUT);
  pinMode(rm1, OUTPUT);
  pinMode(rm2, OUTPUT);
  pinMode(horn, OUTPUT);
  pinMode(light, OUTPUT);

  //set the serial communication rate
  Serial.begin(9600);
}

void loop()
{
  //check whether arduino is reciving signal or not
  while (Serial.available() == 0);
  char val = Serial.read(); //reads the signal
  Serial.print(val);

  //Forward
  if (val == 'FORWARD')
  {
    Serial.println("{status:'FORWARD'}");
    digitalWrite(lm1, HIGH);
    digitalWrite(rm1, HIGH);
    digitalWrite(lm2, LOW);
    digitalWrite(rm2, LOW);
  }

  //Backward
  if (val == 'BACKWARD')
  {
    Serial.println("{status:'BACKWARD'}");
    digitalWrite(lm2, HIGH);
    digitalWrite(rm2, HIGH);
    digitalWrite(lm1, LOW);
    digitalWrite(rm1, LOW);
  }

  //Right
  if (val == 'RIGHT')
  {
    Serial.println("{status:'RIGHT'}");
    digitalWrite(lm1, HIGH);
    digitalWrite(rm2, HIGH);
    digitalWrite(lm2, LOW);
    digitalWrite(rm1, LOW);
  }

  //Left
  if (val == 'LEFT')
  {
    Serial.println("{status:'LEFT'}");
    digitalWrite(lm2, HIGH);
    digitalWrite(rm1, HIGH);
    digitalWrite(lm1, LOW);
    digitalWrite(rm2, LOW);
  }

  //Horn
  if (val == 'HORN')
  {
    Serial.println("{status:'HORN'}");
    digitalWrite(horn, HIGH);
  }

  //Light
  if (val == 'LIGHT')
  {
    Serial.println("{status:'LIGHT'}");
    digitalWrite(LIGHT, HIGH);
  }

  //STOP
  if (val == 'CLEAR')
  {
    Serial.println("{status:'CLEAR'}");
    digitalWrite(lm1, LOW);
    digitalWrite(rm1, LOW);
    digitalWrite(lm2, LOW);
    digitalWrite(rm2, LOW);
    digitalWrite(horn, LOW);
    digitalWrite(light, LOW);
  }

  // temperature
  int readVal=analogRead(sensorPin);
  double temp =  Thermistor(readVal);
  Serial.println('{temp:' + temp + '}');
}