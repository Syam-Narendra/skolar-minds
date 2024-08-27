import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-4">Oops!</h1>
          <p className="text-lg mb-8">Path Not Found.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to the homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
