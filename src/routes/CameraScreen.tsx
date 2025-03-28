import { Link } from "react-router-dom";

const CameraScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Camera Screen</h1>
      <Link to="/home" className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        Back to Home
      </Link>
    </div>
  );
};

export default CameraScreen;
