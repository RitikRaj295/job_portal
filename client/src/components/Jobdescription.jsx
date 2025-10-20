import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { setSingleJob } from '../Redux/jobSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, Users, Clock, Coins } from 'lucide-react'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)

  const isInitiallyApplied =
    singleJob?.applications?.some(app => app.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_APPLICATION_API_ENDPOINT + `/apply/${jobId}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_JOB_API_ENDPOINT + `/get/${jobId}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(
              app => app.applicant === user?._id
            )
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-10 px-4">
      <motion.div
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <motion.h1
              className="font-bold text-3xl text-gray-800"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {singleJob?.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Badge
                className="text-blue-700 font-bold bg-blue-100 shadow-sm"
                variant="ghost"
              >
                {singleJob?.postion} Positions
              </Badge>
              <Badge
                className="text-[#F83002] font-bold bg-red-100 shadow-sm"
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="text-[#7209b7] font-bold bg-purple-100 shadow-sm"
                variant="ghost"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`mt-6 sm:mt-0 text-white px-6 py-2 text-lg rounded-xl transition-all ${
                isApplied
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
              }`}
            >
              {isApplied ? '✅ Already Applied' : '🚀 Apply Now'}
            </Button>
          </motion.div>
        </div>

        <h2 className="border-b border-gray-300 font-semibold text-lg text-gray-700 mt-8 pb-2">
          Job Details
        </h2>

        <div className="mt-6 grid sm:grid-cols-2 gap-6 text-gray-800">
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              <p>
                <span className="font-semibold">Role:</span>{' '}
                {singleJob?.title}
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" />
              <p>
                <span className="font-semibold">Location:</span>{' '}
                {singleJob?.location}
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" />
              <p>
                <span className="font-semibold">Experience:</span>{' '}
                {singleJob?.experience} yrs
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <Coins className="text-green-600" />
              <p>
                <span className="font-semibold">Salary:</span>{' '}
                {singleJob?.salary} LPA
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" />
              <p>
                <span className="font-semibold">Total Applicants:</span>{' '}
                {singleJob?.applications?.length}
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" />
              <p>
                <span className="font-semibold">Posted Date:</span>{' '}
                {singleJob?.createdAt?.split('T')[0]}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-100">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">
            📝 Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {singleJob?.description ||
              'No description provided by the employer.'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default JobDescription
