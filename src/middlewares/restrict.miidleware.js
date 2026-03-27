import { errorResponse } from "../utils/errorResponse.js";

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user is logged in and their role is permitted
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new errorResponse(
          "You do not have permission to perform this action",
          403,
        ),
      );
    }
    next();
  };
};
