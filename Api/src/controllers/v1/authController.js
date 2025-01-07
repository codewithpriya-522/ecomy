const {
  SendBadRequest,
  SendSuccessResponse,
  SendErrorResponse,
} = require("../../helper/responseHelper");
const UserModel = require("../../models/UserSchema");
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, contactNo } = req?.body;
    let user = await UserModel?.findOne({ email });
    if (user) {
      // return res.status(400).json({ message: "User already exists" });
      SendBadRequest(res, "User already exists");
    }
    user = new UserModel({ userName, email, password, contactNo });
    await user.save();
    // res.status(201).json({
    //   message: "User created successfully",
    //   data: {
    //     id: user?._id,
    //     email: user?.email,
    //   },
    // });
    SendSuccessResponse(res, "User created successfully.", {
      id: user?._id,
      email: user?.email,
    });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    return SendErrorResponse(res, "Failed to create user!", error);
  }
};
const login = async (req, res) => {
  try {
    const { userName, password } = req?.body;
    let user = await UserModel?.find({ userName });

    if (user?.length <= 0) {
      return res
        .status(400)
        .json({ message: "User not found with this username" });
    }
    let userIndb = user?.find(
      (item) => item?.password === password && item?.userName === userName
    );

    if (!userIndb) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({
      message: "Login successfully",
      data: {
        id: userIndb?._id,
        email: userIndb?.email,
      },
    });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    return SendErrorResponse(res, "Logging failed!", error);
  }
};
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, userId } = req?.body;
    let user = await UserModel?.findById(userId);
    console.log("user", user)
    if (!user) {
      return SendBadRequest(res, "User not found!");
    }
    if (user.password !== currentPassword) {
      return SendBadRequest(res, "Incorrect password");
    }
    user.password = newPassword;
    await user.save();
    return SendSuccessResponse(res, "Password updated successfully!");
  } catch (error) {
    // res.status(500).json({ message: error.message });
    console.log("error", error.message);
    return SendErrorResponse(res, "Failed to change password!", error);
  }
};
module.exports = {
  registerUser,
  login,
  changePassword,
};
