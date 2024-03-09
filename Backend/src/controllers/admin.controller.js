import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Admin} from "../models/Admin.model.js"
import jwt from "jsonwebtoken"

const generateAccessandRefreshTokens = async(userId)=>{
    try {
        const admin = await Admin.findById(userId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
        admin.refreshToken = refreshToken
        await admin.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access tokens")
    }
}

const addAdmin = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(
        [name, email, password].some((item)=>
        item?.trim()==="")
    ){
        return new ApiError(400, "All fields are required")
    }
    const existedUser = await Admin.findOne({email})
    if(existedUser){
        throw new ApiError(409, "User Already Exist")
    }
    const admin = await Admin.create({
        name,
        email,
        password
    })

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )
    if(!createdAdmin){
        throw new ApiError(500, "Something went wrong with admin creation")
    }
    return res.status(201).json(
        new ApiResponse(200, "created Admin successfully")
    )

})

const loginAdmin = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if(!email){
        throw new ApiError(400, "Email is required")
    }
    const admin = await Admin.findOne({email})
    if(!admin){
        throw new ApiError(404, "User Not found")
    }
    const isPasswordValid = await admin.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials");
    }
    const {accessToken, refreshToken} =
    await generateAccessandRefreshTokens(admin._id)

    const loggedInAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true, // things only modifiable by server not frontend
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {Admin: loggedInAdmin, accessToken, refreshToken},
            "Admin Logged in Successfully"
        )
    )
})

const logoutAdmin = asyncHandler(async(req,res)=>{
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user looged out"))

})

export {
    addAdmin,
    loginAdmin,
    logoutAdmin
}