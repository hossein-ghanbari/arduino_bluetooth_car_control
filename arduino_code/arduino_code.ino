//Declare the arduino pins
int rm1 = 5;
int rm2 = 6;
int lm1 = 9;
int lm2 = 10;
int horn = 11;
int light = 12;

int tempSensorPin = A0; 
int heartSensorPin = A1; 
int lightSensorPin = A2;

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
  pinMode(rm1, OUTPUT);
  pinMode(lm2, OUTPUT);
  pinMode(rm2, OUTPUT);
  pinMode(horn, OUTPUT);
  pinMode(light, OUTPUT);

  pinMode(tempSensorPin, INPUT);
  pinMode(heartSensorPin, INPUT);

  //set the serial communication rate
  Serial.begin(9600);
}

void loop()
{
  //check whether arduino is reciving signal or not

  if(Serial.available() == 0){}else{
    char val = Serial.read(); //reads the signal
//  Serial.print(val);

  //Forward
  if (val == 'f')
  {
    digitalWrite(lm1, HIGH);
    digitalWrite(rm1, HIGH);
    digitalWrite(lm2, LOW);
    digitalWrite(rm2, LOW);
  }

  //Backward
  if (val == 'b')
  {
    digitalWrite(lm1, LOW);
    digitalWrite(rm1, LOW);
    digitalWrite(lm2, HIGH);
    digitalWrite(rm2, HIGH);
  }

  //Right
  if (val == 'r')
  {
    digitalWrite(lm1, HIGH);
    digitalWrite(rm1, LOW);
    digitalWrite(lm2, LOW);
    digitalWrite(rm2, HIGH);
  }

  //Left
  if (val == 'l')
  {
    digitalWrite(lm1, LOW);
    digitalWrite(rm1, HIGH);
    digitalWrite(lm2, HIGH);
    digitalWrite(rm2, LOW);
  }

  //Horn
  if (val == 'h')
  {
    digitalWrite(horn, HIGH);
  }

  //Light
  if (val == 'n')
  {
    digitalWrite(light, HIGH);
  }

  //STOP
  if (val == 'c')
  {
    digitalWrite(lm1, LOW);
    digitalWrite(rm1, LOW);
    digitalWrite(lm2, LOW);
    digitalWrite(rm2, LOW);
    digitalWrite(horn, LOW);
    digitalWrite(light, LOW);
  }

    }
  
  // temperature
  int tempVal=analogRead(tempSensorPin);
  double temp =  Thermistor(tempVal);
  String tempLabel = "temp:";
  String tempExport = tempLabel + temp ;
  Serial.println(tempExport);

  // heart beat
  int beatVal=analogRead(heartSensorPin); 
  String heartBeatLabel = "heartBeat:";
  String heartBeatExport = heartBeatLabel + beatVal/10 ;
  Serial.println(heartBeatExport);

  //light sensore
  int lightVal=analogRead(lightSensorPin); 
  String lightSensorLabel = "lightSensor:";
  String lightSensorExport = lightSensorLabel + lightVal ;
  Serial.println(lightSensorExport);
  delay(100);
}
