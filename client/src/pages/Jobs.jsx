import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FilterCard from '../components/FilterCard'
import Job from '../components/Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      if (searchedQuery) {
        const filtered = allJobs.filter(job =>
          [job.title, job.description, job.location].some(field =>
            field?.toLowerCase().includes(searchedQuery.toLowerCase())
          )
        )
        setFilterJobs(filtered)
      } else {
        setFilterJobs(allJobs)
      }
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            className="w-full md:w-1/4 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md p-5 h-fit"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Briefcase className="text-indigo-600" /> Filters
            </h2>
            <FilterCard />
          </motion.div>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/60 border border-gray-100 rounded-2xl h-48 animate-pulse shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                ))}
              </div>
            ) : filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486748.png"
                  alt="No jobs"
                  className="w-32 mb-4 opacity-80"
                />
                <p className="text-gray-600 font-medium text-lg">
                  No matching jobs found
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5"
              >
                {filterJobs.map(job => (
                  <motion.div
                    key={job?._id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
