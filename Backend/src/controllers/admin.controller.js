import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/Admin.model.js";
import { Student } from "../models/Student.model.js";
import jwt from "jsonwebtoken";

const generateAccessandRefreshTokens = async (userId) => {
  try {
    const admin = await Admin.findById(userId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access tokens"
    );
  }
};

const addAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((item) => item?.trim() === "")) {
    return new ApiError(400, "All fields are required");
  }
  const existedUser = await Admin.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User Already Exist");
  }
  const admin = await Admin.create({
    name,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );
  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong with admin creation");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "created Admin successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, "User Not found");
  }
  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true, // things only modifiable by server not frontend
    secure: true,
  };
  console.log("login successfully");
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { Admin: loggedInAdmin, accessToken, refreshToken },
        "Admin Logged in Successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log("logoutSuccessfully");
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user looged out"));
});

const addStudent = asyncHandler(async (req, res) => {
  const { fname, lname, phone, email, hostel, room } = req.body;
  if ([fname, lname, phone, email].some((item) => item?.trim() === "")) {
    return new ApiError(400, "All fields are required");
  }
  const existedAdmin = await Student.findOne({ email });
  if (existedAdmin) {
    throw new ApiError(409, "Student Already Exist");
  }
  const admin = req.admin._id;
  const student = await Student.create({
    fname,
    lname,
    phone,
    email,
    hostel,
    room,
    admin,
  });

  const createdStudent = await Student.findById(student._id).select(
    "-password -refreshToken -admin"
  );
  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong with admin creation");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "created Student successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(new ApiResponse(400, "Student ID is required"));
  }

  try {
    // Find the student by ID
    const student = await Student.findById(id);

    // If student does not exist
    if (!student) {
      return res.status(404).json(new ApiResponse(404, "Student not found"));
    }

    // Delete the student
    await Student.deleteOne({ _id: id });

    // Respond with success message
    return res
      .status(200)
      .json(new ApiResponse(200, "Student deleted successfully"));
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

const getDetails = asyncHandler(async (req, res) => {
  try {
    const adminId = req.admin._id;
    const students = await Student.find({ admin: adminId });

    return res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});

export { addAdmin, loginAdmin, logoutAdmin, addStudent, deleteStudent, getDetails };
