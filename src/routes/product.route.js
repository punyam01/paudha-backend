import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductMedia,
  toggleProductStatus,
  deleteProduct,
} from "../controllers/product.controller.js";

import { restrictTo } from "../middlewares/restrict.miidleware.js";
import { verifyLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 All routes require login
router.use(verifyLogin);

// 🔥 Create Product (Admin only)
router
  .route("/createProduct")
  .post(restrictTo("admin", "superAdmin"), createProduct);

// 🔥 Get All Products (Admin + Salesman)
router
  .route("/getProducts")
  .get(restrictTo("admin", "superAdmin", "salesman"), getProducts);

// 🔥 Get Single Product
router
  .route("/getProduct/:id")
  .get(restrictTo("admin", "superAdmin", "salesman"), getProductById);

// 🔥 Update Product (basic info)
router
  .route("/updateProduct/:id")
  .patch(restrictTo("admin", "superAdmin"), updateProduct);

// 🔥 Update Product Media (images/videos)
router
  .route("/updateProductMedia/:id")
  .patch(restrictTo("admin", "superAdmin"), updateProductMedia);

// 🔥 Toggle Product Status (active/inactive)
router
  .route("/toggleProductStatus/:id")
  .patch(restrictTo("admin", "superAdmin"), toggleProductStatus);

// 🔥 Delete Product (use carefully)
router
  .route("/deleteProduct/:id")
  .delete(restrictTo("superAdmin"), deleteProduct);

export default router;
