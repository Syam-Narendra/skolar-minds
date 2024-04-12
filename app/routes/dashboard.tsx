import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FcStatistics } from "react-icons/fc";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Skolar Minds" },
    { name: "description", content: "Skolar Minds" },
  ];
};

export default function Dashboard() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="flex">
        <aside className="sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4">
          <div className="flex items-center mb-4 space-x-1">
            <img
              alt="Company Logo"
              height="30"
              src="../../education.png"
              style={{
                aspectRatio: "30/30",
                objectFit: "cover",
              }}
              width="30"
            />
            <h1 className="text-lg font-medium">School Name</h1>
          </div>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <HomeIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link
              to="/dashboard/students"
              className="w-full flex items-center space-x-2 bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-800"
            >
              <MdPeople className="w-4 h-4" />
              <span className="text-sm font-medium">Students</span>
            </Link>
            <Link
              to="/dashboard/staff"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <GiTeacher className="w-4 h-4" />
              <span className="text-sm font-medium">Staff</span>
            </Link>
            <Link
              to="/dashboard/stats"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FcStatistics className="w-4 h-4" />
              <span className="text-sm font-medium">Statistics</span>
            </Link>
          </nav>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
