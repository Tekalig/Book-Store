const User = require("../models");

const register = async (req, res) => {
  const {
    email,
    password,
    fname,
    lname,
    phone,
    city,
    country,
    role,
    bio,
    image,
  } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      fname,
      lname,
      phone,
      city,
      country,
      role,
      bio,
      image,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with that email does not exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send("Logged out successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const verify = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Authorization token is required");
  }

  try {
    // Assuming you have a function to verify the token
    const user = await verifyToken(authorization);
    if (user) {
      return res.status(200).send("User is verified");
    }
    return res.status(401).send("Invalid authorization token");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const profile = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Authorization token is required");
  }

  try {
    const user = await verifyToken(authorization);
    if (user) {
      const userProfile = await User.findOne({ where: { id: user.id } });
      if (userProfile) {
        return res.status(200).json({ userProfile });
      }
      return res.status(404).send("User not found");
    }
    return res.status(401).send("Invalid authorization token");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const verify2fa = async (req, res) => {
  const { verificationCode, user_id } = req.body;

  if (!verificationCode || !user_id) {
    return res.status(400).send("Verification code and user ID are required");
  }

  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Assuming you have a function to verify the 2FA code
    const isCodeValid = await verify2FACode(user, verificationCode);
    if (isCodeValid) {
      return res.status(200).send("2FA verified");
    }
    return res.status(401).send("Invalid 2FA code");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send("Verification token is required");
  }

  try {
    // Assuming you have a function to verify the account token
    const user = await verifyAccountToken(token);
    if (user) {
      user.isVerified = true;
      await user.save();
      return res.status(200).send("Account verified successfully");
    }
    return res.status(400).send("Invalid verification token");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const sendMeVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Assuming you have a function to send the verification email
    await sendVerificationEmail(user);
    return res.status(200).send("Verification email sent");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Authorization token is required");
  }

  if (!oldPassword || !newPassword) {
    return res.status(400).send("Old password and new password are required");
  }

  try {
    const user = await verifyToken(authorization);
    if (!user) {
      return res.status(401).send("Invalid authorization token");
    }

    const userRecord = await User.findOne({ where: { id: user.id } });
    if (!userRecord) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await userRecord.validatePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).send("Old password is incorrect");
    }

    userRecord.password = newPassword;
    await userRecord.save();

    return res.status(200).send("Password changed");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Assuming you have a function to send the password recovery email
    await sendPasswordRecoveryEmail(user);
    return res.status(200).send("Password reset email sent");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    return res.status(400).send("Reset token is required");
  }

  if (!password) {
    return res.status(400).send("New password is required");
  }

  try {
    // Assuming you have a function to verify the reset token
    const user = await verifyResetToken(token);
    if (!user) {
      return res.status(400).send("Invalid reset token");
    }

    user.password = password;
    await user.save();

    return res.status(200).send("Password reset successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const toggle2fa = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Authorization token is required");
  }

  try {
    const user = await verifyToken(authorization);
    if (!user) {
      return res.status(401).send("Invalid authorization token");
    }

    user.is2FAEnabled = !user.is2FAEnabled;
    await user.save();

    return res.status(200).send("2FA toggled");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  verify,
  profile,
  verify2fa,
  verifyAccount,
  sendMeVerificationEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  toggle2fa,
};
