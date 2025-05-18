import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import SideBar from './components/SideBar';
import { Link } from "react-router-dom";


function FormPage({ modelName, setModelName }) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">

                <div className="absolute fixed z-10">
                    <Header />
                </div>
                <div className="absolute fixed">
                    <SideBar modelName={modelName} setModelName={setModelName} />
                </div>
                <div className="ml-86 p-6 pb-0">
                    <div className="flex items-center pl-6 pr-6 mt-16 justify-between">
                        <Link to="/" className='text-xl text-white hover:bg-purple-500 hover:shadow-md cursor-pointer shadow-gray-200 font-semibold bg-purple-600 rounded-full px-6 py-1.5'>Back</Link>
                        {/* <h1 className="text-2xl font-bold text-center text-purple-700">Diabetes Predictions</h1> */}
                    </div>
                    <PredictionForm modelName={modelName} setModelName={setModelName} />
                </div>
            </div>
        </>
    );
}

export default FormPage;
