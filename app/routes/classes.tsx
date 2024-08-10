import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";
import Dashboard from "~/customComponents/Dashboard";

const employeeCategoryList = [
  {
    title: "All Classes",
    path: "/dashboard/all-employees",
  },
  {
    title: "Create Class",
    path: "/dashboard/add-employee",
  },
];
export default function Classess() {
  return (
    <Dashboard>
      <div className="flex flex-wrap justify-around items-center">
        {employeeCategoryList.map((category, index) => (
          <Link
            to={category.path}
            key={index}
            className="items-center content-center w-52 h-32 rounded-2xl p-4 m-2"
          >
            <h2 className="flex justify-around items-center text-lg text-center font-semibold">
              {category.title}
              <FaArrowRight />
            </h2>
          </Link>
        ))}
      </div>
    </Dashboard>
  );
}
