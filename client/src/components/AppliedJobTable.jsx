import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <Table className="min-w-full">
        <TableCaption className="text-lg font-semibold text-gray-700">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/jobs/${appliedJob.job?._id}`)} // Navigate to job details
              >
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="font-medium">{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
                      ${appliedJob?.status === "rejected" ? "bg-red-200 text-red-800" :
                        appliedJob.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                        "bg-green-200 text-green-800"
                      }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
