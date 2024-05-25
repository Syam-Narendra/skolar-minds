import type { MetaFunction } from "@remix-run/node";
import { MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import {
  FcAddressBook,
  FcInTransit,
  FcMoneyTransfer,
  FcStatistics,
} from "react-icons/fc";
import { Link, Outlet, useLocation } from "@remix-run/react";
import "../components/css/dashboard.css";
import {
  SettingsIcon,
  DownIcon,
  LogoutIcon,
  HomeIcon,
} from "../customComponents/icons";
export const meta: MetaFunction = () => {
  return [
    { title: "Skolar Minds" },
    { name: "description", content: "Skolar Minds" },
  ];
};

const DashboardNavItems = [
  {
    to: "/dashboard",
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    to: "/dashboard/students",
    icon: <MdPeople className="w-4 h-4" />,
    label: "Students",
  },
  {
    to: "/dashboard/staff",
    icon: <GiTeacher className="w-4 h-4" />,
    label: "Staff",
  },
  {
    to: "/dashboard/stats",
    icon: <FcStatistics className="w-4 h-4" />,
    label: "Statistics",
  },
  {
    to: "/dashboard/fee-structure",
    icon: <FcMoneyTransfer className="w-4 h-4" />,
    label: "Fee Structure",
  },
  {
    to: "/dashboard/transport",
    icon: <FcInTransit className="w-4 h-4" />,
    label: "Transport",
  },
  {
    to: "/dashboard/timetable",
    icon: <FcAddressBook className="w-4 h-4" />,
    label: "Timetable",
  },
];

export default function Dashboard() {
  const activePath = useLocation().pathname;
  return (
    <div className="min-h-screen ">
      <div className="flex justify-end w-full items-center bg-stone-950">
        <SettingsIcon />
        <img
          src="https://i.ibb.co/YcqQrJQ/Png-Item-4042710.png"
          alt="Profile"
          className="rounded-full w-8 h-8 m-2"
        />
        <DownIcon />
      </div>
      <div className="flex flex-row relative max-h-screen">
        <aside className="flex flex-col left-0 top-0 h-screen w-56 bg-black border-r border-gray-500 text-white p-4 fixed">
          <div className="flex mb-4 space-x-1">
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
            {DashboardNavItems.map((item, index) => {
              const activeBg =
                activePath === item.to ? "bg-[#272727]" : "bg-black";
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`${activeBg} hover:underline w-full flex items-center space-x-2 nav-item py-2 px-2 rounded-[0.5rem] text-white`}
                >
                  {item.icon}
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex mt-auto justify-between ">
            <p>Logout</p>
            <LogoutIcon />
          </div>
        </aside>

        <div className="ml-52 w-full h-fit min-h-screen p-4 staff-dashboard bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
