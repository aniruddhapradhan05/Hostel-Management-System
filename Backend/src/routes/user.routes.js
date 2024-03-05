import { Router } from "express";
import {home} from "../controllers/user.controller.js"

const router = Router()

router.route("/home").get(home)


export default router