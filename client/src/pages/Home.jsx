import Navbar from "@/components/Navbar";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from '../Redux/jobSlice';
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "@/components/CategoryCarousel";
import Latestjobs from "@/components/Latestjobs";
import Footer from "@/components/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const HeroSection = () => {
  const [query, setQuery] = useState("");
   const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useGetAllJobs();

    useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  const dispatch = useDispatch();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  //////onClick={searchJobHandler}     ye button me add krna hai.............................

  return (
    <>
      <Navbar />
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10 mt-0">
          <span className="  px-4 py-2  bg-indigo-100 text-[#2f34c4] font-medium">
            <marquee behavior="scroll" direction="left">
               Welcome to our webiste 🔥 New job openings available ! Apply now !
            </marquee>
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get Your{" "}
            <span className="bg-gradient-to-l from-blue-500 to-pink-500 via-purple-600 text-transparent bg-clip-text">
              Dream Jobs
            </span>
          </h1>
          <p className="text-sm text-gray-400 font-semibold">
            A smarter way to hire and get hired. Discover jobs that fit your
            skills and goals.
          </p>
          <div className="flex w-[50%] h-[10vh] shadow-lg  border border-gray-400 pl-7 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none text-gray-500 border-none w-full"
            />
            <Button onClick={searchJobHandler}   className="rounded-r-full bg-indigo-100  cursor-pointer h-[99%] w-[8%]">
              <Search className="h-5 w-5 " />
            </Button>
          </div>
        </div>


        <CategoryCarousel/>
        <Latestjobs/>
        <Footer/>
      </div>
    </>
  );
};

export default HeroSection;
