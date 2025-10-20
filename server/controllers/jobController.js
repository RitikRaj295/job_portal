import Job from "../models/jobModel.js";

//post a job (for recruiter) - contoller function

export const postJob = async (req, res) => {
  const userId = req.id;

  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "New Job created successfully!",
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all jobs (for candidate) - controller function also here populated method used which is used in refernece concept instead of getting the objectid you get full deatils of that document
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate("company").sort({creadtedAt:-1});
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get Job by id - controller function

export const getJobById = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job found successfully!",job,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// getAdminJob - controller function to know a recruiter create how many jobs (documents)

export const getAdminJobs = async (req, res) => {
  const adminId = req.id;

  try {
    const jobs = await Job.find({
      createdBy: adminId,
    }).populate({path:"company"});

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
