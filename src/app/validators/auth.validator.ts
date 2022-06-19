import {body} from "express-validator"
import middlewares from "../http/middlewares"
const validateSignup=[
    body("email").exists().withMessage("email is required")
    .isEmail().withMessage("email is invalid").normalizeEmail(),
    body("name").exists().withMessage("name is required").isLength({min:4}).withMessage("name must be at least 4 words"),
    body("password").exists().withMessage("password is required").isLength({min:5}).
    withMessage("password must have at least 5 character"),
    middlewares.checkValidator,
    middlewares.isEmailDuplicate
]
const validateSignin=[
    body("email").exists().withMessage("email is required")
    .isEmail().withMessage("email is invalid").normalizeEmail(),
    body("password").exists().withMessage("password is required")

]
const authValidator={
    validateSignup,
    validateSignin
}
export default authValidator