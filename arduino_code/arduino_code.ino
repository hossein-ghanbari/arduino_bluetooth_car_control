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

  pinMode(tempSensorPin, INPUT);
  pinMode(heartSensorPin, INPUT);

  //set the serial communication rate
  Serial.begin(9600);
}

void loop()
{
  //check whether arduino is reciving signal or not
//  while (Serial.available() == 0);
  if(Serial.available() == 0){}else{
    char val = Serial.read(); //reads the signal
//  Serial.print(val);

  //Forward
  if (val == 'f')
  {
//    Serial.println("{status:'FORWARD'}");
    digitalWrite(lm, HIGH);
    digitalWrite(rm, HIGH);
  }

  //Backward
  if (val == 'b')
  {
//    Serial.println("{status:'BACKWARD'}");
    digitalWrite(lm, LOW);
    digitalWrite(rm, LOW);
  }

  //Right
  if (val == 'r')
  {
//    Serial.println("{status:'RIGHT'}");
    digitalWrite(lm, HIGH);
    digitalWrite(rm, LOW);
  }

  //Left
  if (val == 'l')
  {
//    Serial.println("{status:'LEFT'}");
    digitalWrite(rm, HIGH);
    digitalWrite(lm, LOW);
  }

  //Horn
  if (val == 'h')
  {
//    Serial.println("{status:'HORN'}");
    digitalWrite(horn, HIGH);
  }

  //Light
  if (val == 'n')
  {
//    Serial.println("{status:'LIGHT'}");
    digitalWrite(light, HIGH);
  }

  //STOP
  if (val == 'c')
  {
//    Serial.println("{status:'CLEAR'}");
    digitalWrite(lm, LOW);
    digitalWrite(rm, LOW);
    digitalWrite(horn, LOW);
    digitalWrite(light, LOW);
  }

    }
  
  // temperature
  int readVal=analogRead(tempSensorPin);
  double temp =  Thermistor(readVal);
  String tempLabel = "temp:";
  String tempExport = tempLabel + temp ;
  Serial.println(tempExport);

  // heart beat
  int beat=analogRead(heartSensorPin); 
  
  String heartBeatLabel = "heartBeat:";
  String heartBeatExport = heartBeatLabel + beat/10 ;
  Serial.println(heartBeatExport);

//  delay(300);
}
