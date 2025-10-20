import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../Redux/authSlice.js";
import { Loader2, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        import.meta.env.VITE_USER_API_ENDPOINT + "/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md w-full max-w-md rounded-2xl shadow-xl border border-pink-100 p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-pink-800 flex items-center justify-center gap-2">
              <LogIn size={24} /> Login to Your Account
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="example@email.com"
                className="mt-1 bg-gray-100 focus:ring-2 focus:ring-pink-400 border-none"
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1 bg-gray-100 focus:ring-2 focus:ring-pink-400 border-none"
                required
              />
            </div>

            <div>
              <Label className="mb-2 block">Login as</Label>
              <RadioGroup className="flex justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="candidate"
                    checked={input.role === "candidate"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label>Candidate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label>Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full mt-6 bg-pink-700 text-white hover:bg-pink-600"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-pink-700 text-white hover:bg-pink-600 shadow-md transition-transform duration-200 active:scale-95"
            >
              Login
            </Button>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
