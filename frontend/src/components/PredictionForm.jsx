/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        config_id: "",
        patientName: "",
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        bmi: "",
        dpf: "",
        age: ""
    });

    const [errors, setErrors] = useState({});
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/patients/create/", formData);
            setPrediction(response.data);
        } catch (error) {
            console.error("Prediction error:", error);
        }
    };

    const inputFields = [
        { name: "config_id", label: "Enter the Patient Id", placeholder: "e.g. PA-0XX" },
        { name: "patientName", label: "Enter the Patient Name", placeholder: "e.g. Shaik Kabeer" },
        { name: "pregnancies", label: "Number of Pregnancies", placeholder: "Range: 0 - 20" },
        { name: "glucose", label: "Glucose Level (mg/dL)", placeholder: "Range: 70 - 200" },
        { name: "bloodPressure", label: "Blood Pressure - Diastolic (mm Hg)", placeholder: "Range: 60 - 140" },
        { name: "skinThickness", label: "Skin Thickness (mm)", placeholder: "Range: 0 - 100" },
        { name: "insulin", label: "Insulin Level (μU/mL)", placeholder: "Range: 0 - 850" },
        { name: "bmi", label: "BMI (kg/m²)", placeholder: "Range: 15.0 - 50.0" },
        { name: "dpf", label: "Diabetes Pedigree Function (Inherited)", placeholder: "Range: 0.0 - 2.5" },
        { name: "age", label: "Age (years)", placeholder: "Range: 10 - 100" }
    ];
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (prediction !== null) {
            setShowResult(true);
            const timer = setTimeout(() => {
                setShowResult(false);
                setFormData({
                    config_id: "",
                    patientName: "",
                    pregnancies: "",
                    glucose: "",
                    bloodPressure: "",
                    skinThickness: "",
                    insulin: "",
                    bmi: "",
                    dpf: "",
                    age: ""
                })
            }, 5000); // 10 seconds

            return () => clearTimeout(timer); // cleanup
        }
    }, [prediction]);

    return (
        <div className="justify-center flex items-center">
            <motion.div
                className="bg-white p-3 py-5 px-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {showResult && (
                    <motion.div
                        className={`mb-3 p-3 text-white rounded-xl text-center text-2xl font-semibold shadow-md ${prediction === 1 ? "bg-red-500" : "bg-green-500"
                            }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {prediction === 1
                            ? "Positive: High Risk of Diabetes"
                            : "Negative: Low Risk of Diabetes"}
                    </motion.div>
                )}

                <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
                    Diabetes Prediction
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {inputFields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="font-semibold mb-1">{field.label}</label>
                            <input
                                type={(field.name == 'patientName' || field.name == 'config_id') ? 'text' : 'number'}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm font-medium mt-1">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}

                    <motion.button
                        type="submit"
                        className="col-span-2 w-1/3 m-auto  mt-3 bg-purple-600 text-white py-2 rounded-xl font-bold text-xl cursor-pointer hover:bg-purple-500 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                    >
                        Predict
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
