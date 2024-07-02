import express from "express";
import { uploadCourse } from "../controllers/courses/uploadCourse";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { updateCourse } from "../controllers/courses/updateCourse";
import { validate } from "../middlewares/validate";
import { CourseSchema, CourseUpdateSchema } from "../schemas/courseSchema";
import { getCourse } from "../controllers/courses/getCourse";
import { addQuestion } from "../controllers/courses/addQuestion";
import { addAnswer } from "../controllers/courses/addAnswer";
import { addReview } from "../controllers/courses/addReview";
import { addReplyToReview } from "../controllers/courses/addReplyToReview";
import { getAllCourses } from "../controllers/courses/getAllCourses";
import { deleteCourse } from "../controllers/courses/deleteCourse";

const courseRouter = express.Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourse);
courseRouter.post("/create", isAuthenticated, uploadCourse);
courseRouter.put("/update/:id", isAuthenticated, updateCourse);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put("/add-reply", isAuthenticated, authorizeRoles("admin"), addReplyToReview);
courseRouter.delete("/delete/:id", isAuthenticated, deleteCourse);

export default courseRouter;
