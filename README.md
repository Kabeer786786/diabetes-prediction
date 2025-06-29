# 🩺 Diabetes Prediction App – Setup Guide

This project is a full-stack Diabetes Prediction System consisting of:

* 🧠 Machine Learning Model served via MLflow
* 💥️ Frontend built with React
* 🖙 Backend built with Django (REST API) that fetches the model from MLflow and makes predictions

---

## 🗂️ Project Structure

```
diabetes-prediction-app/
├── frontend/              # React App (User Interface)
├── backend/               # Django Backend API
└── README.md              # Setup and Installation Instructions
```

---

## 🔧 Requirements

### 1. General Tools

* Python 3.8+
* Node.js 18+ & npm or yarn
* pip / pipenv / poetry (your choice)
* MLflow installed
* Git

---

## ✅ Step-by-Step Setup Instructions

### 1⃣ Clone the Repository

```bash
git clone https://github.com/Kabeer786786/diabetes-prediction.git
cd diabetes-prediction
```

---

### 2⃣ Setup MLflow

#### 📦 Install MLflow

```bash
pip install mlflow
```

#### 🚀 Start MLflow UI

```bash
mlflow ui
```

MLflow UI will be available at: `http://127.0.0.1:5000`

Ensure your model is already logged in MLflow with URI:

```text
models:/Diabetes-Prediction-Classifier@challenger
```

---

### 3⃣ Backend Setup (Django)

```bash
cd backend
```

#### 📦 Install Python dependencies

```bash
pip install -r requirements.txt
```

#### ▶️ Run Django Backend

```bash
python manage.py runserver
```

Default: `http://127.0.0.1:8000`

---

### 4⃣ Frontend Setup (React)

```bash
cd ../frontend
```

#### 📦 Install Dependencies

```bash
npm install
```

#### ▶️ Run React App

```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## 📄 Input & Prediction Flow

1. User fills the form in React app
2. React sends a POST request to the Django backend
3. Django loads model from MLflow and returns the prediction
4. React displays the prediction to the user

---

## ✅ Example cURL Request

```bash
curl -X POST http://127.0.0.1:8000/patients/create/ \
  -H "Content-Type: application/json" \
  -d '{
        "config_id": "12345",
        "patientName": "John Doe",
        "pregnancies": 2,
        "glucose": 140,
        "bloodPressure": 82,
        "skinThickness": 35,
        "insulin": 130,
        "bmi": 33.6,
        "dpf": 0.627,
        "age": 45
      }'
```

---

## 🛠 Troubleshooting

* **MLflow not found:** Make sure MLflow UI is running at the specified port
* **CORS Errors:** Ensure Django has `django-cors-headers` installed and configured
* **Model not loading:** Check MLflow URI

---
