import {Router} from "express"
import {
     createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbacks
} from "../controllers/feedback.controller.js"

const router = Router();

router.route("/").post(createFeedback);
router.get("/", getFeedbacks);
router.route("/:id")
.patch(updateFeedback)
.delete(deleteFeedback)

export default router;