import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary , deleteFromCloudinary } from "../utils/cloudinary.js";

// 1.create doctor 
// 2. get all doctors
// 3. get doctor by id
// 4. update doctor
// 5.delete doctor
// 6.search doctor by specalization
// 7.get doctors availability

const createDoctorProfile = asyncHandler(async (req, res) => {
    try {
        const { specalization, date ,timeslot, fees, availability, hospital } = req.body;

        if (!specalization || !fees || !hospital) {
            throw new ApiError(403, "Credentials are required");
        }

        const avatarPathLocal = req.files?.avatar?.[0]?.path;
        const avatar = avatarPathLocal ? await uploadOnCloudinary(avatarPathLocal) : null;

        let parsedTimeslot = null;
        if (timeslot) {
            try {
                parsedTimeslot = JSON.parse(timeslot); // Expecting: {"start":"10:00 AM","end":"12:00 AM"}
            } catch (err) {
                throw new ApiError(400, "Invalid timeslot format. Expected JSON with start and end.");
            }
        }

        const doctor = await Doctor.create({
            owner: req.user?._id,
            specalization,
            timeslot: parsedTimeslot,
            date,
            fees,
            availability,
            hospital,
           avatar: avatar?.url || null 
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                doctor.toObject(),
                "Doctor created successfully"
            )
        );

    } catch (error) {
        console.error(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
});


const getAllDoctors = asyncHandler(async(req , res)=>{
    const doctors = await Doctor.find().populate("owner" , "fullname email username")
    if(!doctors){
        throw new ApiError(404 , "Error to fetched doctors");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            doctors,
            "Doctors fetched sucessfully"
        )
    )
})

const getAllDoctorsById = asyncHandler(async(req , res)=>{
   const {id} = req.params;

   const doctors = await Doctor.findById(id).populate("owner" , "username email fullname");

   if(!doctors){
    throw new ApiError(403 , "Unsucessfull to fetched doctors by id");
   }

   return res
   .status(200)
   .json(
    new ApiResponse(
        200,
        doctors,
        "Doctors fetched sucessfully by Id"
    )
   )

})

const updateDoctor = asyncHandler(async (req, res) => {
    const { specalization, date , timeslot, fees, availability, hospital } = req.body;

    if (!specalization && !date && !timeslot && !fees && !availability && !hospital) {
        throw new ApiError(403, "Fields are required");
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,  
        { $set: { specalization, date , timeslot, fees, availability, hospital } },
        { new: true }
    );

    if (!updatedDoctor) {
        throw new ApiError(404, "Doctor not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedDoctor, "Doctor updated successfully")
    );
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarPathLocal = req.file?.path;
  if (!avatarPathLocal) {
    throw new ApiError(403, "Avatar upload path failed");
  }
  const existingDoctor = await Doctor.findById(req.params.id);
  if (!existingDoctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  const uploadedAvatar = await uploadOnCloudinary(avatarPathLocal);
  if (!uploadedAvatar?.url) {  
    throw new ApiError(403, "Avatar upload failed");
  }

  if (existingDoctor.avatarPublic_Id) {
    await deleteFromCloudinary(existingDoctor.avatarPublic_Id);
  }

  existingDoctor.avatar = uploadedAvatar.url; 
  existingDoctor.avatarPublic_Id = uploadedAvatar.public_id;
  await existingDoctor.save();

  return res
    .status(200)
    .json(new ApiResponse(200, existingDoctor, "Doctor avatar updated successfully"));
});


const getDoctorBySpecalization = asyncHandler(async(req , res)=>{
    const {specalization} = req.body;
    if(!specalization){
        throw new ApiError(403 , "specalization not found")
    }

    const doctors = await Doctor.find({
        specalization : {$regex : specalization , $options : "i"}
    }).populate("owner" , "fullname , email , username")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200 ,
            doctors,
            "Doctors fetched by specality successfully !"
        )
    )
})

const getDoctorByAvailability = asyncHandler(async(req , res)=> {
    const {id} = req.params;

    const doctor = await Doctor.findById(id);
    if(!doctor){
        throw new ApiError(403 , "Doctor cannot found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200 ,
            doctor.availability,
            "Doctors fetched by Availability"
        )
    )
})

const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findById(id);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  await Doctor.deleteOne({ _id: id });

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Doctor profile deleted successfully"
    )
  );
});


export {
    createDoctorProfile,
    getAllDoctors,
    getAllDoctorsById,
    updateDoctor,
    updateAvatar,
    getDoctorBySpecalization,
    getDoctorByAvailability,
    deleteDoctor
}