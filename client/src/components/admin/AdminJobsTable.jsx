import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <Table>
        <TableCaption className="text-gray-600 text-sm mt-3">
          A list of your recently posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className=" text-lg text-pink-900">
            <TableHead className="font-semibold ">Company Name</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map(job => (
            <TableRow
              key={job._id}
              className="hover:bg-blue-50 transition-all duration-200 ease-in-out"
            >
              <TableCell className="font-medium text-gray-800">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-gray-700">{job?.title}</TableCell>
              <TableCell className="text-gray-500">
                {job?.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition">
                    <MoreHorizontal className="text-gray-600" />
                  </PopoverTrigger>

                  <PopoverContent className="w-40 bg-white border border-gray-200 shadow-lg rounded-xl p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Edit2 className="w-4 text-blue-600" />
                      <span className="text-gray-800 font-medium text-sm">
                        Edit
                      </span>
                    </div>

                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-green-50 transition cursor-pointer mt-1"
                    >
                      <Eye className="w-4 text-green-600" />
                      <span className="text-gray-800 font-medium text-sm">
                        Applicants
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
