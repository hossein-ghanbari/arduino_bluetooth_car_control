//Declare the arduino pins
int rm = 5;
int lm = 10;
int horn = 11;
int light = 12;

int tempSensorPin = A0; 
int heartSensorPin = A1; 

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
  pinMode(lm, OUTPUT);
  pinMode(rm, OUTPUT);
  pinMode(horn, OUTPUT);
  pinMode(light, OUTPUT);

  pinMode(heartSensorPin, INPUT);
  pinMode(tempSensorPin, INPUT);

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
    digitalWrite(lm, HIGH);
    digitalWrite(rm, HIGH);
  }

  //Backward
  if (val == 'BACKWARD')
  {
    Serial.println("{status:'BACKWARD'}");
    digitalWrite(lm, LOW);
    digitalWrite(rm, LOW);
  }

  //Right
  if (val == 'RIGHT')
  {
    Serial.println("{status:'RIGHT'}");
    digitalWrite(lm, HIGH);
    digitalWrite(rm, LOW);
  }

  //Left
  if (val == 'LEFT')
  {
    Serial.println("{status:'LEFT'}");
    digitalWrite(rm, HIGH);
    digitalWrite(lm, LOW);
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
    digitalWrite(lm, LOW);
    digitalWrite(rm, LOW);
    digitalWrite(horn, LOW);
    digitalWrite(light, LOW);
  }

  // temperature
  int readVal=analogRead(tempSensorPin);
  double temp =  Thermistor(readVal);
  Serial.println('{temp:' + temp + '}');

  // heart beat
  int beat=analogRead(heartSensorPin); 
  Serial.println('{heart:' + beat/10 + '}');
}
