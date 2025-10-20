import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRound, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../Redux/authSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_USER_API_ENDPOINT + "/logout",
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const activeClass = ({ isActive }) =>
    isActive ? "text-black font-bold" : "text-gray-500";

  return (
    <div className="flex items-center h-[10vh] shadow-[1px_1px_10px_gray]">
      <div className="w-[80%] m-auto flex justify-between items-center h-full">
        <NavLink to="/">
          <h1 className="text-2xl font-bold text-gray-400">
            Pagaar<span className="text-2xl text-pink-800"> India</span>
          </h1>
        </NavLink>

        <nav className="flex gap-10 justify-center  items-center font-semibold">
          {user && user.role === "recruiter" ? (
            <>
              <NavLink className={activeClass} to="/admin/jobs">
                Jobs
              </NavLink>
              <NavLink className={activeClass} to="/admin/companies">
                Companies
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={activeClass} to="/">
                Home
              </NavLink>
              <NavLink className={activeClass} to="/jobs">
                Jobs
              </NavLink>
              <NavLink className={activeClass} to="/browse">
                Browse
              </NavLink>
            </>
          )}

          {!user ? (
            <div className="flex gap-2">
              <NavLink to="/login">
                <Button variant="outline">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button className="bg-pink-900 text-white hover:bg-pink-800">
                  Signup
                </Button>
              </NavLink>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-[55px]  cursor-pointer rounded-full overflow-hidden ">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    {/* <AvatarFallback>U</AvatarFallback> */}
                  </Avatar>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 bg-white shadow-lg rounded-xl border-1">
                <div className="flex gap-4 p-2 border-b pb-3">
                  <Avatar>
                    <AvatarImage
                      className="rounded-full"
                      src={user?.profile?.profilePhoto}
                    />
                    {/* <AvatarFallback>U</AvatarFallback> */}
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-lg text-gray-900">
                      {user?.fullname}
                    </h1>

                    {user && user.role === "recruiter" ? (
                      <></>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">
                          {user?.profile?.bio?.substring(0, 62) + " ..."}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  {user && user.role === "recruiter" ? (
                    <></>
                  ) : (
                    <>
                      <NavLink to="/profile">
                        <Button
                          variant="outline"
                          className=" cursor-pointer w-full justify-start"
                        >
                          <UserRound className="mr-2 " />
                          User Profile
                        </Button>
                      </NavLink>
                    </>
                  )}

                  <Button
                    onClick={logoutHandler}
                    variant="outline"
                    className="w-full cursor-pointer justify-start"
                  >
                    <LogOut className="mr-2" />
                    Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
