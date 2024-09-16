import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface IClass {
  id: number;
  className: string;
  sectionName: string;
}

export function AllClasses() {
  const [classes, setClasses] = useState<IClass[]>([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/api/get-all-classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classes.map((each) => (
          <div
            key={each.id}
            className="w-full rounded overflow-hidden border shadow-lg  p-4"
          >
            <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2">
              {each.className}
            </div>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              Section: {each.sectionName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
