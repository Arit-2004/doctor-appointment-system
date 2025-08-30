import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feedback } from "../models/feedback.model.js";

const createFeedback = asyncHandler(async(req , res)=>{
    const {name , content} = req.body;
    if(!content){
        throw new ApiError(403 , "Enter the name and content");
    }

    const feedback = await Feedback.create({
        name : name || "Anonymous",
        content
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            feedback,
            "Feedback created successfully"
        )
    )
})

const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newContent } = req.body;

  if (!newContent) {
    throw new ApiError(400, "Please provide new feedback content");
  }

  const feedback = await Feedback.findByIdAndUpdate(
    id,
    { 
        content: newContent
    },
    { new: true, runValidators: true }
  );

  if (!feedback) {
    throw new ApiError(404, "Feedback not found");
  }

  return res.status(200).json(
    new ApiResponse(
        200, 
        feedback, 
        "Feedback updated successfully"
    )
  );
});

const deleteFeedback = asyncHandler(async(req , res)=>{
    const {id} = req.params;

    const feedback = await Feedback.findByIdAndDelete(id)
    if (!feedback) {
        throw new ApiError(404 , "No feedback found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Deleted Successfully"
        )
    )
})

export{
    createFeedback,
    updateFeedback,
    deleteFeedback
}