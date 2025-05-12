from django.db import models

# Create your models here.

class Patients(models.Model):
    config_id = models.CharField(max_length=15, default="")
    patientName = models.CharField(max_length=255, default="")
    pregnancies = models.IntegerField(default=0.0)
    glucose = models.IntegerField(default=0)
    bloodPressure = models.IntegerField(default=0)
    skinThickness = models.IntegerField(default=0)
    insulin = models.IntegerField(default=0)
    bmi = models.FloatField(default=0.0)
    dpf = models.FloatField(default=0.0)
    age = models.IntegerField(default=0)
    result = models.BooleanField(default=False)
