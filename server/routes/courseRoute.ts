import express from "express";
import { uploadCourse } from "../controllers/courses/uploadCourse";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { updateCourse } from "../controllers/courses/updateCourse";
import { validate } from "../middlewares/validate";
import { CourseSchema, CourseUpdateSchema } from "../schemas/courseSchema";
import { getCourseWithoutPurchase } from "../controllers/courses/getCourseWithoutPurchase";
import { getAllCoursesWithoutPurchase } from "../controllers/courses/getAllCoursesWithoutPurchase";
import { getCourseContentForPurchasedUser } from "../controllers/courses/getCourseContentForPurchasedUser";
import { addQuestion } from "../controllers/courses/addQuestion";
import { addAnswer } from "../controllers/courses/addAnswer";
import { addReview } from "../controllers/courses/addReview";
import { addReplyToReview } from "../controllers/courses/addReplyToReview";
import { getAllCourses } from "../controllers/courses/getAllCourses";
import { deleteCourse } from "../controllers/courses/deleteCourse";

const courseRouter = express.Router();

courseRouter.get("/all-courses", isAuthenticated, authorizeRoles("admin"), getAllCourses);
courseRouter.get("/get-courses", getAllCoursesWithoutPurchase);
courseRouter.get("/get-course/:id", getCourseWithoutPurchase);
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseContentForPurchasedUser);
courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.put("/update-course/:id", isAuthenticated, authorizeRoles("admin"), updateCourse);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put("/add-reply", isAuthenticated, authorizeRoles("admin"), addReplyToReview);
courseRouter.delete("/delete-course/:id", isAuthenticated, authorizeRoles("admin"), deleteCourse);

export default courseRouter;
