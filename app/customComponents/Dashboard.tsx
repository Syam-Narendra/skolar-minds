import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import {
  FcAddressBook,
  FcInTransit,
  FcMoneyTransfer,
  FcStatistics,
} from "react-icons/fc";
import { Link, useLocation } from "@remix-run/react";
import "../components/css/dashboard.css";

import { Button } from "~/components/ui/button";
import Cookies from "js-cookie";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { SettingsIcon, LogoutIcon, HomeIcon } from "../customComponents/icons";
import { FaSchool } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Theme, useTheme } from "~/components/theme-provider";

export const meta: MetaFunction = () => {
  return [
    { title: "Skolar Minds" },
    { name: "description", content: "Skolar Minds" },
  ];
};

const DashboardNavItems = [
  {
    to: "/",
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    to: "/students",
    icon: <MdPeople className="w-4 h-4" />,
    label: "Students",
  },
  {
    to: "/staff",
    icon: <GiTeacher className="w-4 h-4" />,
    label: "Employees",
  },
  {
    to: "/classes",
    icon: <FaSchool className="w-4 h-4" />,
    label: "Classes",
  },
  {
    to: "/subjects",
    icon: <FcAddressBook className="w-4 h-4" />,
    label: "Subjects",
  },
  {
    to: "/statistcs",
    icon: <FcStatistics className="w-4 h-4" />,
    label: "Statistics",
  },
  {
    to: "/fee-structure",
    icon: <FcMoneyTransfer className="w-4 h-4" />,
    label: "Fee Structure",
  },
  {
    to: "/transport",
    icon: <FcInTransit className="w-4 h-4" />,
    label: "Transport",
  },
  {
    to: "/timetable",
    icon: <FcAddressBook className="w-4 h-4" />,
    label: "Timetable",
  },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [homeData, setHomeData] = useState({
    name: "",
    schoolName: "",
    email: "",
  });
  const confirmLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  const { setTheme, theme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const getHomeData = async () => {
    const userToken = Cookies.get("token");
    console.log("userToken", userToken);
    const cookieRes = await fetch(
      `${process.env.API_URL}/api/get-home-data`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const data = await cookieRes.json();
    console.log("data", data);
    setHomeData(data);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  const activeTab = useLocation().pathname;

  return (
    <div className="min-h-screen flex">
      <aside
        className={`fixed left-0 top-0 h-screen w-56 p-4 bg-[#F5F5F5] dark:bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
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
          <h1 className="text-lg font-medium">{homeData.schoolName}</h1>
        </div>
        <nav className="space-y-2">
          {DashboardNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:underline w-full flex ${
                activeTab === item.to && "text-blue-500"
              } items-center space-x-2 nav-item py-2 px-2 rounded-[0.5rem]`}
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between"
              >
                <span>Logout</span>
                <LogoutIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Confirm Logout</h4>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to logout?
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={confirmLogout}
                    variant="destructive"
                    className="dark:bg-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </aside>
      <div className="flex-1 flex flex-col lg:ml-56">
        <div className="fixed top-0 w-full right-0 h-14 bg-white dark:bg-black z-40 flex items-center justify-end p-4 shadow-md">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="lg:hidden self-start"
          >
            Menu
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center pr-4">
              <SettingsIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>

              <Dialog>
                <DialogTrigger asChild>
                  <Label>Settings</Label>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-between content-center align-middle">
                    <Label>Theme</Label>
                    <Select onValueChange={(value: Theme) => setTheme(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={theme} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem disabled={theme === "light"} value="light">
                          Light
                        </SelectItem>
                        <SelectItem disabled={theme === "dark"} value="dark">
                          Dark
                        </SelectItem>
                        <SelectItem
                          disabled={theme === "system"}
                          value="system"
                        >
                          System
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <img
            src="https://i.ibb.co/YcqQrJQ/Png-Item-4042710.png"
            alt="Profile"
            className="rounded-full w-8 h-8 m-2"
          />
        </div>

        <div
          className="mt-16 p-4 overflow-y-auto h-fit"
          onClick={() => {
            console.log("clicked");
            setSidebarOpen(false);
          }}
          // onTouchStart={()=>setSidebarOpen(false)}
          // onClickCapture={() => {
          //   setSidebarOpen(false);
          // }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
