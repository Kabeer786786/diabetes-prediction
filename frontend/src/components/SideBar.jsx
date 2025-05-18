import React, { useState } from 'react'
import axios from 'axios';

function SideBar({ modelName, setModelName }) {
    const [loading, setLoading] = useState(false);
    const handleClick = async (item) => {
        setModelName(item);
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/patients/load-model/", {
                "modelName": item
            });
            console.log(response);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("Invalid Model : ", error);
        }
    };

    return (
        <>
            {loading && (
                <div className="absolute w-screen h-screen inset-0 z-1000 flex items-center justify-center backdrop-blur bg-white/20 rounded-2xl">
                    <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className='h-screen  flex flex-col items-center justify-center  bg-purple-500 w-86'>
                <div className="flex m-auto font-semibold text-white flex-col gap-4 w-full">
                    {/* <h1 className='text-center font-bold text-3xl mb-4 text-purple-100'>Our Services</h1> */}
                    <div className=" w-full flex flex-col items-center w-80">
                        <button className='rounded-lg text-2xl bg-purple-800 cursor-pointer w-80 py-4 mx-3 shadow-md shadow-purple-500 z-10'>
                            Diabetes Prediction
                        </button>
                        <div className="flex flex-col gap-3 items-center justify-center w-73 pt-6 pb-4 -mt-2 rounded-b-xl bg-purple-300">
                            <button onClick={() => handleClick("RFC")} className={`rounded-lg text-lg w-66 hover:bg-purple-700 cursor-pointer py-3 px-3 mx-3 ${modelName === 'RFC' ? 'bg-purple-700' : 'bg-purple-400'}`}>
                                Random Forest Classifier
                            </button>
                            <button onClick={() => handleClick("RFR")} className={`rounded-lg text-lg w-66 hover:bg-purple-700 cursor-pointer py-3 px-3 mx-3 ${modelName === 'RFR' ? 'bg-purple-700' : 'bg-purple-400'}`}>
                                Random Forest Regressor
                            </button>
                            <button onClick={() => handleClick("LRC")} className={`rounded-lg text-lg w-66 hover:bg-purple-700 cursor-pointer py-3 px-3 mx-3 ${modelName === 'LRC' ? 'bg-purple-700' : 'bg-purple-400'}`}>
                                Logistic Regression Classifier
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SideBar
