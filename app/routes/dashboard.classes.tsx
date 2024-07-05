import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";

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
export default function Staff() {
  return (
    <div className="flex flex-wrap justify-around items-center">
      {employeeCategoryList.map((category, index) => (
        <Link
          to={category.path}
          key={index}
          className="hover:bg-[#f3ff47] hover:text-black items-center content-center w-52 h-32 bg-[#272727] text-white rounded-2xl p-4 m-2"
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
