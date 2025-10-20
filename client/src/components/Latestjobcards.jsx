import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-md cursor-pointer text-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* Company Info */}
        <div className="mb-3">
          <h1 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>

        {/* Job Title & Description */}
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-1">
            {job?.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {job?.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge
            className="bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors duration-200"
            variant="ghost"
          >
            {job?.position} Positions
          </Badge>
          <Badge
            className="bg-red-50 text-[#F83002] font-semibold hover:bg-red-100 transition-colors duration-200"
            variant="ghost"
          >
            {job?.jobType}
          </Badge>
          <Badge
            className="bg-purple-50 text-[#7209b7] font-semibold hover:bg-purple-100 transition-colors duration-200"
            variant="ghost"
          >
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
