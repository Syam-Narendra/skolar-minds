import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";

const employeeCategoryList = [
  {
    title: "All Employees",
  },
  {
    title: "Add Employee",
  },
  {
    title: "Employee ID Card",
  },
  {
    title: "Appointment Letter",
  },
];
export default function Staff() {
  return (
    <div className="flex flex-wrap justify-around items-center">
      {employeeCategoryList.map((category, index) => (
        <Link
          to="/"
          key={index}
          className="hover:bg-[#b7dbe1] hover:text-black items-center content-center w-52 h-32 bg-[#272727] text-white rounded-2xl p-4 m-2"
        >
          <h2 className="flex justify-around items-center text-lg text-center font-semibold">
            {category.title}
            <FaArrowRight />
          </h2>
        </Link>
      ))}
    </div>
  );
}
