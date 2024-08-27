import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface ISubject {
  id: string;
  subjectName: string;
  classTeacher: string;
  className: string;
}

const AllSubjects = () => {
  const [allSubjects, setAllSubjects] = useState<ISubject[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("token");
    axios
      .get("https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/get-all-subjects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        setAllSubjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
      });
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allSubjects.map((each) => (
          <div
            key={each.id}
            className="w-full rounded overflow-hidden border shadow-lg  p-4"
          >
            <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2">
              Subject: {each.subjectName}
            </div>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              Faculty Name: {each.classTeacher}
            </p>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              Class: {each.className}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSubjects;
