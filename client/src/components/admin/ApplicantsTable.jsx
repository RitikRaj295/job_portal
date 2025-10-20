import React from 'react'
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
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(
        import.meta.env.VITE_APPLICATION_API_ENDPOINT + `/status/${id}/update`,
        { status }
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <Table>
        <TableCaption className="text-gray-600 text-sm mt-3">
          A list of users who recently applied
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="font-semibold">Full Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Contact</TableHead>
            <TableHead className="font-semibold">Resume</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.map(item => (
            <TableRow
              key={item._id}
              className="hover:bg-blue-50 transition-all duration-200 ease-in-out"
            >
              <TableCell className="font-medium text-gray-800">
                {item?.applicant?.fullname}
              </TableCell>

              <TableCell className="text-gray-700">
                {item?.applicant?.email}
              </TableCell>

              <TableCell className="text-gray-700">
                {item?.applicant?.phoneNumber}
              </TableCell>

              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 font-medium hover:underline transition"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </TableCell>

              <TableCell className="text-gray-500">
                {item?.applicant.createdAt.split('T')[0]}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition">
                    <MoreHorizontal className="text-gray-600" />
                  </PopoverTrigger>

                  <PopoverContent className="w-40 bg-white border border-gray-200 shadow-lg rounded-xl p-2">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition ${
                          status === 'Accepted'
                            ? 'hover:bg-green-50 text-green-600'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <span className="font-medium text-sm">{status}</span>
                      </div>
                    ))}
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

export default ApplicantsTable
