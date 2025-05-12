from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Patients
from .serializers import PatientSerializer
import os
import joblib

model = joblib.load("diabetes_prediction.pkl")


def home(request):
    return HttpResponse("Hello, World!")


# ➤ CREATE
@api_view(["POST"])
def create_patient(request):
    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        features = [
            [
                data["pregnancies"],
                data["glucose"],
                data["bloodPressure"],
                data["skinThickness"],
                data["insulin"],
                data["bmi"],
                data["dpf"],
                data["age"],
            ]
        ]
        prediction = model.predict(features)[0]
        patient = serializer.save(result=prediction)
        PatientSerializer(patient).data
        return Response(prediction, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_patients(request):
    patients = Patients.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)


# ➤ READ One
@api_view(["GET"])
def get_patient(request, pk):
    try:
        patient = Patients.objects.get(pk=pk)
    except Patients.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PatientSerializer(patient)
    print(serializer.data)
    return Response(serializer.data)


# ➤ UPDATE
@api_view(["PUT"])
def update_patient(request, pk):
    try:
        patient = Patients.objects.get(pk=pk)
    except Patients.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PatientSerializer(patient, data=request.data)
    if serializer.is_valid():
        updated = serializer.save()
        return Response(PatientSerializer(updated).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ➤ DELETE
@api_view(["DELETE"])
def delete_patient(request, pk):
    try:
        patient = Patients.objects.get(pk=pk)
    except Patients.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    patient.delete()
    return Response({"message": "Patient deleted"}, status=status.HTTP_204_NO_CONTENT)
