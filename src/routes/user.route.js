import express from 'express';
import {  createUser ,deleteUser} from '../controllers/user.controller.js';
import { restrictTo } from '../middlewares/restrict.miidleware.js';
import { verifyLogin } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.use(verifyLogin);


// Route to register a new user
router.route('/createUser').post(restrictTo("superAdmin"),createUser);

//Route to dlete user
router.route('/deleteUser').post(restrictTo("superAdmin"),deleteUser)
export default router;

