import { Company } from "../models/companyModel.js";
import getDataUri from '../config/datauri.js'
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";

//register company controller function

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required!",
        sucess: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "you cannot register duplicate company name!",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "company registered successfully!",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//getcompany which is registered by any one recruiter -  controller function

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Company not found!",
        sucess: false,
      });
    }

    return res.status(200).json({
      message: "company found successfully!",
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get company  by id - controller function

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        company,
        success: true,
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//updateCompany controller function

export const updateCompany = async (req, res) => {
  const { name, description, website, location } = req.body;
  const file = req.file;

  //cloudnary code work....
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  const logo= cloudResponse.secure_url;
  console.log('logo is ',logo);
  try {
    const updateData = { name, description, website, location,logo };
    // console.log( name, description, website, location,logo );

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "company information updated!",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
