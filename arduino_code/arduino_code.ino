#include <Wire.h>

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

//gy-521
const int MPU_addr = 0x68;
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;
int16_t temperature;

int minVal = 265;
int maxVal = 402;

double x;
double y;
double z;
//end

double Thermistor(int RawADC) {
  double Temp;
  Temp = log(10000.0 * ((1024.0 / RawADC - 1)));
  Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp )) * Temp );
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

  //gy-521
  Wire.begin();
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
  //end

  //set the serial communication rate
  Serial.begin(9600);
}

void loop()
{
  //check whether arduino is reciving signal or not

  if (Serial.available() == 0) {} else {
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
  int tempVal = analogRead(tempSensorPin);
  double temp =  Thermistor(tempVal);
  String tempExport = String(temp);


  // heart beat
  int beatVal = analogRead(heartSensorPin);
  String heartBeatExport = String(beatVal / 10) ;

  //light sensore
  int lightVal = analogRead(lightSensorPin);
  String lightSensorExport = String(lightVal);

  //angle
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_addr, 14, true);
  AcX = Wire.read() << 8 | Wire.read();
  AcY = Wire.read() << 8 | Wire.read();
  AcZ = Wire.read() << 8 | Wire.read();
  temperature = Wire.read() << 8 | Wire.read();
  int xAng = map(AcX, minVal, maxVal, -90, 90);
  int yAng = map(AcY, minVal, maxVal, -90, 90);
  int zAng = map(AcZ, minVal, maxVal, -90, 90);

  x = RAD_TO_DEG * (atan2(-yAng, -zAng) + PI);
  y = RAD_TO_DEG * (atan2(-xAng, -zAng) + PI);
  z = RAD_TO_DEG * (atan2(-yAng, -xAng) + PI);

  String xExport = String(x);
  String yExport = String(y);
  String zExport = String(z);
  //  String tempExport = String(temperature / 340.00 + 36.53);
  //end


  Serial.println(tempExport + ','  + heartBeatExport + ',' + lightSensorExport + ',' +  xExport + ',' + yExport + ',' + zExport);
  delay(100);
}
