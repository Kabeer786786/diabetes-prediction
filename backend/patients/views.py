from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Patients
from .serializers import PatientSerializer
import os
import mlflow
import mlflow.pyfunc
import pandas as pd
from django.core.cache import cache

mlflow.set_tracking_uri("http://localhost:5000")

RFC_model = mlflow.pyfunc.load_model("models:/Diabetes-Prediction-Classifier@challenger")
RFR_model = mlflow.pyfunc.load_model("models:/Diabetes-Prediction-Regressor@challenger")
LRC_model = mlflow.pyfunc.load_model("models:/Diabetes-Prediction-Logistic@challenger")

MODEL_MAP = {
    "RFC": RFC_model,
    "RFR": RFR_model,
    "LRC": LRC_model,
}
model = RFC_model
model_code = "RFC"


@api_view(["POST"])
def load_model(request):
    global model_code
    model_code = request.data.get("modelName")

    if model_code not in MODEL_MAP:
        return Response(
            {"error": "Invalid model name. Choose one of: RFC, RFR, LRC"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        global model
        model = MODEL_MAP[model_code]
        print(model_code)
    except Exception as e:
        return Response(
            {"error": f"Failed to load model: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return Response(
        {"message": f"Model set to {model_code} successfully."},
        status=status.HTTP_200_OK,
    )


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
        sample_df = pd.DataFrame(
            features,
            columns=[
                "Pregnancies",
                "Glucose",
                "BloodPressure",
                "SkinThickness",
                "Insulin",
                "BMI",
                "DiabetesPedigreeFunction",
                "Age",
            ],
        )
        global model
        prediction = model.predict(sample_df)[0]
        global model_code
        if model_code == "RFR":
            prediction = round(prediction)

        serializer.save(result=prediction)
        return Response({"prediction": prediction}, status=status.HTTP_201_CREATED)

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


def home(request):
    return HttpResponse("Hello, World!")
