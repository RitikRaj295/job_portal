import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      <Navbar />
      
      <motion.div
        className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-3xl my-8 p-8 transition-transform hover:scale-[1.01]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Avatar className="h-24 w-24 border-4 border-blue-400 shadow-md">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
            </motion.div>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm mt-1">{user?.profile?.bio || "No bio added yet."}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="border-blue-400 text-blue-600 hover:bg-blue-50"
          >
            <Pen className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        <div className="border-t my-6 border-gray-200" />

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-blue-500" />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge className="bg-blue-100 text-blue-700 px-3 py-1 shadow-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills added</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Resume</Label>
          <div className="mt-2">
            {user?.profile?.resume ? (
              <motion.a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 font-medium hover:underline hover:text-blue-700"
                whileHover={{ x: 5 }}
              >
                {user?.profile?.resumeOriginalName}
              </motion.a>
            ) : (
              <span className="text-gray-500 text-sm">No resume uploaded</span>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </motion.div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
