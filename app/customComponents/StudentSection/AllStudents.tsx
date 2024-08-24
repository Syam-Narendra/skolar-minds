import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const loader = async () => {
  const userToken = Cookies.get("token");
  console.log(userToken);
  const { data, status } = await axios.get(
    "http://localhost:3000/api/get-all-students",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    }
  );
  console.log(data);
  return data;
};

export interface IStudent {
  id: number;
  studentName: string;
  registrationNo: string;
  class: string;
  gender: string;
  classTeacherID: number;
}

export const AllStudents = () => {
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  useEffect(() => {
    loader().then((data) => {
      setAllStudents(data);
    });
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {allStudents.map((eachStudent) => (
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="bg-cover bg-center h-32 p-4"
              style={{
                backgroundImage: `url('https://imgs.search.brave.com/W5TB5orHbPov1EwvIKFjyclrVxqGO2hVLaKhmYkO3AE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/MDMwNjU0Ni9waG90/by9jb2xsZWdlLXN0/dWRlbnQtb24tY2Ft/cHVzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1sdmlfLTF2/NUk4OExLeXA0ekNh/YmFRTFFaWUFnQVZr/VmxTOUJQYTdNREVB/PQ')`,
              }}
            ></div>
            <div className="p-4">
              <h1 className="text-gray-900 font-bold text-2xl mb-2">
                {eachStudent.studentName}
              </h1>
              <p className="text-gray-700 text-base mb-4">
                Class : {eachStudent.class}
              </p>
              <p className="text-gray-700 text-base mb-4">
                Class Teacher: {eachStudent.classTeacherID}
              </p>
              <p className="text-gray-700 text-base mb-4">
                Gender: {eachStudent.gender}
              </p>
              <span className="text-gray-600 text-sm">
                Roll No : {eachStudent.registrationNo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
