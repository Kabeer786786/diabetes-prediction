import React from 'react'

function SideBar() {
    return (
        <div className='h-screen  flex flex-col items-center justify-center  bg-purple-500 w-80'>
            <div className="flex m-auto font-semibold text-white flex-col gap-4 w-full">
                <h1 className='text-center font-bold text-3xl mb-4 text-purple-100'>Our Services</h1>
                <button className='rounded-lg text-xl bg-purple-400 cursor-pointer py-4 mx-3'>
                    Diabetes Prediction
                </button>
                <button className='rounded-lg text-xl bg-purple-600 hover:bg-purple-400 cursor-pointer py-4 mx-3'>
                    Heart Disease Classification
                </button>
                <button className='rounded-lg text-xl bg-purple-600 hover:bg-purple-400 cursor-pointer py-4 mx-3'>
                    Breast Cancer Diagnosis
                </button>
                <button className='rounded-lg text-xl bg-purple-600 hover:bg-purple-400 cursor-pointer py-4 mx-3'>
                    Liver Disease Prediction
                </button>
                <button className='rounded-lg text-xl bg-purple-600 hover:bg-purple-400 cursor-pointer py-4 mx-3'>
                    Drug Effectiveness Prediction
                </button>
            </div>
        </div>
    )
}

export default SideBar
