import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionTable = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/patients/")
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const recordsPerPage = 10;

    // Pagination logic
    const totalPages = Math.ceil(patients.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = patients.slice(indexOfFirstRecord, indexOfLastRecord);

    const handlePageChange = (page) => {
        if (page === currentPage) return;

        setLoading(true);
        setTimeout(() => {
            setCurrentPage(page);
            setLoading(false);
        }, 250);
    };

    return (
        <div className="relative p-6 pt-4 w-fit">
            {/* Blur and loader overlay */}
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur bg-white/30 rounded-2xl">
                    <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className={`w-fit overflow-hidden rounded-2xl shadow-lg bg-white transition duration-300 ${loading ? 'blur-sm' : ''}`}>
                <table className="text-sm text-left text-gray-700">
                    <thead className="bg-purple-600 text-white rounded-t-xl">
                        <tr>
                            <th className="px-3 w-16 py-3">S No.</th>
                            <th className="px-3 w-40 py-3">Patient Name</th>
                            <th className="px-3 w-28 py-3">Pregnancies</th>
                            <th className="px-3 w-26 py-3">Glucose</th>
                            <th className="px-3 w-36 py-3">Blood Pressure</th>
                            <th className="px-3 w-36 py-3">Skin Thickness</th>
                            <th className="px-3 w-24 py-3">Insulin</th>
                            <th className="px-3 w-22 py-3">BMI</th>
                            <th className="px-3 w-22 py-3">DPF</th>
                            <th className="px-3 w-20 py-3">Age</th>
                            <th className="px-3 w-28 py-3">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item, idx) => (
                            <tr
                                key={idx}
                                className="border-t font-medium border-gray-300 hover:bg-gray-50 transition duration-200"
                            >
                                <td className="px-4 py-3">{indexOfFirstRecord + idx + 1}</td>
                                <td className="px-4 py-3">{item.patientName}</td>
                                <td className="px-4 py-3">{item.pregnancies}</td>
                                <td className="px-4 py-3">{item.glucose}</td>
                                <td className="px-4 py-3">{item.bloodPressure}</td>
                                <td className="px-4 py-3">{item.skinThickness}</td>
                                <td className="px-4 py-3">{item.insulin}</td>
                                <td className="px-4 py-3">{item.bmi}</td>
                                <td className="px-4 py-3">{item.dpf}</td>
                                <td className="px-4 py-3">{item.age}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${item.result
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-green-100 text-green-600'
                                            }`}
                                    >
                                        {item.result ? 'Positive' : 'Negative'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex mt-6 justify-end">
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            disabled={loading}
                            className={`px-3 py-1 cursor-pointer rounded-lg border transition duration-150 ${currentPage === i + 1
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-purple-600 border-purple-600 hover:bg-purple-500 hover:text-white'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PredictionTable;
