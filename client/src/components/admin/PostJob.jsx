import React, { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_JOB_API_ENDPOINT + `/post`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-5xl border border-gray-100"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            💼 Post a New Job
          </h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Fill in all the job details carefully before posting
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Frontend Developer"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full-time, Internship"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-gray-700">Job Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Write a detailed job description..."
                rows="5"
                className="mt-1 border-2 w-full resize-none border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 p-2"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-gray-700">Requirements</Label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Mention required skills or technologies..."
                rows="4"
                className="mt-1 w-full border-2 resize-none border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 p-2"
              ></textarea>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Remote, Delhi, Bangalore"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Salary (₹)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 4/lakh"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300 w-1/2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 1-2 years"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300 w-1/2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g. 3"
                className="mt-1 focus:ring-2 focus:ring-pink-300 border-gray-300 w-1/3"
              />
            </div>

            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-pink-300 bg-white text-gray-700 hover:bg-pink-50 transition-all">
                    <SelectValue placeholder="Choose a registered company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-800 shadow-md border border-gray-200 rounded-md">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                          className="hover:bg-pink-100 cursor-pointer"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full mt-8 py-2 bg-pink-800 hover:bg-pink-700 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 py-2 bg-pink-900 hover:bg-pink-800 text-white transition-all duration-200"
            >
              🚀 Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center mt-4">
              *Please register a company first before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
