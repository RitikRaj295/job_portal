import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

//apply job - controller function

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    // console.log("userId is ",userId, "and the jobId is ",jobId);

    if (!jobId) {
      return res.status(400).json({
        message: "Job id required!",
        success: false,
      });
    }

    //checking if the user has already applied for the job or not?
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job!",
        success: false,
      });
    }

    //check if the job exists

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    //create a new application

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id), await job.save();

    return res
      .status(201)
      .json({ message: "Job applied successfully!", success: true });

    //
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//getAppliedJob - controller function  this is for the candidates

// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.id;
//     const application = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate("job", { options: { sort: { createdAt: -1 } } });
//     if (!application) {
//       return res.status(404).json({
//         message: "No applications found!",
//         success: false,
//       });
//     }

//     return res.status(200).json({ application, success: true });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) 
      .populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        }); 

   
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found!",
        success: false,
      });
    }

    
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//getApplicants - controller function through this route the recruiter can check how many applicants gets applied

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(400).json({ message: "Job not found!", sucess: false });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//update status in application - controller function

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "status is required!",
        success: false,
      });
    }

    //finding the application with id
    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res
        .status(404)
        .json({ message: "application not found!", success: false });
    }

    //updating the status

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "status updated successfully!",
      application,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
