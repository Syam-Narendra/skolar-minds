import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const loader = async () => {
  const userToken = Cookies.get("token");
  console.log(userToken);
  const { data, status } = await axios.get(
    `${process.env.API_URL}/api/get-all-employees`,
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

export interface IEmployee {
  id: number;
  employeeName: string;
  employeeDesignation: string;
  employeeType: string;
  gender: string;
}

export const AllEmployees = () => {
  const [allEmployees, setAllEmployees] = useState<IEmployee[]>([]);
  useEffect(() => {
    loader().then((data) => {
      setAllEmployees(data);
    });
  }, []);
  console.log(allEmployees);
  return (
    <div className="w-full flex flex-col">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {allEmployees.length !==0 && (
          <>
            
            {allEmployees.map((eachEmployee) => (
              <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div
                  className="bg-cover bg-center h-32 p-4"
                  style={{
                    backgroundImage: `url('https://as1.ftcdn.net/v2/jpg/02/65/18/30/1000_F_265183061_NkulfPZgRxbNg3rvYSNGGwi0iD7qbmOp.jpg')`,
                  }}
                ></div>
                <div className="p-4">
                  <h1 className="text-gray-900 font-bold text-2xl mb-2">
                    {eachEmployee.employeeName}
                  </h1>
                  <p className="text-gray-700 text-base mb-4">
                    Designation: {eachEmployee.employeeDesignation}
                  </p>
                  <p className="text-gray-700 text-base mb-4">
                    Type: {eachEmployee.employeeType}
                  </p>
                  <p className="text-gray-700 text-base mb-4">
                    Gender: {eachEmployee.gender}
                  </p>
                  <span className="text-gray-600 text-sm">
                    Employee ID: {eachEmployee.id}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
