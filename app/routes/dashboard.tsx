import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import {
  FcAddressBook,
  FcInTransit,
  FcMoneyTransfer,
  FcStatistics,
} from "react-icons/fc";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import "../components/css/dashboard.css";

import { Button } from "~/components/ui/button";
import Cookies from "js-cookie";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  SettingsIcon,
  DownIcon,
  LogoutIcon,
  HomeIcon,
} from "../customComponents/icons";
import { FaSchool } from "react-icons/fa";
import { checkCookie } from "~/server/authentication";
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
    to: "/dashboard/classes",
    icon: <FaSchool className="w-4 h-4" />,
    label: "Classes",
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

export const loader: LoaderFunction = async ({ request }) => {
  return checkCookie({ request });
};

export default function Dashboard() {
  const loader = useLoaderData();
  const activePath = useLocation().pathname;
  const navigate = useNavigate();

  const confirmLogout = () => {
    Cookies.remove("token");
    navigate("/", { replace: true });
  };

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
              src="https://i.ibb.co/vh22hY4/education.png"
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
          <div className="flex mt-auto items-center justify-between ">
            <p>Logout</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <LogoutIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">
                      Confirm Logout
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to logout?
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={confirmLogout} variant="destructive">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </aside>

        <div className="ml-52 w-full h-fit min-h-screen p-4 staff-dashboard bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
