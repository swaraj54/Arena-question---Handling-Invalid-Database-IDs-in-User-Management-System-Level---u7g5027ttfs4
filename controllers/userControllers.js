const User = require("../models/User");
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const AppError = require("../utils/AppError");


const getAllUsers = handleAsyncErrors(async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(users);
});

/*
Make the necessary changes to the controller to return error 400 using the AppError error handling function, when an invalid Id is requested.

Status Code: 400
{
  error: "Invalid user ID"
}
*/
const getUserByID = handleAsyncErrors(async (req, res) => {
  const { id } = req.params;

  if (!isValidID(id)) {
    return AppError(res, 400, "Invalid user ID")
  }
  // if (id?.length != 24) return AppError(res, 400, "Invalid user ID")
  // Add Error Handling Here, check if the id is valid
  const user = await User.findById(id);
  if (!user) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(user);
});

function isValidID(id) {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(id);
}

module.exports = {
  getAllUsers,
  getUserByID,
};
