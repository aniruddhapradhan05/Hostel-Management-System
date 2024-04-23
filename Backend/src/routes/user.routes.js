import { Router } from "express";
import {addAdmin, loginAdmin, logoutAdmin, addStudent, deleteStudent} from "../controllers/admin.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"





const router = Router()

router.route("/add-admin").post(addAdmin)
router.route("/login-admin").post(loginAdmin)
router.route("/logout-admin").post(verifyJWT, logoutAdmin)
router.route("/add-student").post(verifyJWT, addStudent)
router.route("/delete-student/:id").delete(verifyJWT, deleteStudent)


export default router