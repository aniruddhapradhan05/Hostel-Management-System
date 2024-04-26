import { Router } from "express";
import {addAdmin, loginAdmin, logoutAdmin, addStudent, deleteStudent, getDetails} from "../controllers/admin.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"





const router = Router()

router.route("/add-admin").post(addAdmin)
router.route("/login-admin").post(loginAdmin)
router.route("/logout-admin").post(verifyJWT, logoutAdmin)
router.route("/add-student").post(verifyJWT, addStudent)
router.route("/delete-student/:id").delete(verifyJWT, deleteStudent)
router.route("/get-student").get(verifyJWT, getDetails)


export default router