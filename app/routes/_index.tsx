export default function Index() {
  return (
    <div className="bg-[url('https://i.ibb.co/kcqXz0F/dl-beatsnoop-com-3000-Uqp-Qg-Xw9-KM.jpg')] bg-cover bg-center flex flex-col items-center justify-center min-h-screen py-2">
      <button
        onClick={() =>
          (window.location.href = "http://localhost:3002/auth/google")
        }
        className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition duration-200"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          className="h-6 w-6"
        />

        <span className="text-gray-700 w-48 font-medium p-2">
          Sign in with Google
        </span>
      </button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:3002/auth/google")
        }
        className="flex items-center justify-center m-3 bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition duration-200"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          className="h-6 w-6"
        />
        <span className="text-gray-700 w-48 font-medium p-2">
          Sign in with Microsoft
        </span>
      </button>
    </div>
  );
}
