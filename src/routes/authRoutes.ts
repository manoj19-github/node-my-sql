import express from "express"
import controllers from "../app/http/controllers"
const Router=express.Router()
import validators from "../app/validators"
Router.post("/auth/signup",validators.authValidator.validateSignup,controllers.authController.signUpRequest)
Router.post("/auth/signin",validators.authValidator.validateSignin,controllers.authController.signInRequest)
export default Router