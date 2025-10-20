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
import { setLoading } from "../../Redux/authSlice.js";
import { Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        import.meta.env.VITE_USER_API_ENDPOINT + "/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
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
          className="bg-white/80 backdrop-blur-md w-full max-w-lg rounded-2xl shadow-xl border border-pink-100 p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-pink-800 flex items-center justify-center gap-2">
              <UserPlus size={24} /> Create Your Account
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Join us and start your journey today.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="mt-1 bg-gray-100 focus:ring-2 focus:ring-pink-400 border-none"
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="john@example.com"
                className="mt-1 bg-gray-100 focus:ring-2 focus:ring-pink-400 border-none"
                required
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="9876543210"
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
          </div>

          <div className="mt-6">
            <Label className="mb-2 block">Register as</Label>
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

          <div className="mt-5">
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="mt-2 bg-gray-100 border-none cursor-pointer focus:ring-2 focus:ring-pink-400"
            />
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
              Sign Up
            </Button>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-700 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
