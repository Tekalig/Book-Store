const User = require("../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
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
    return res.status(200).send("Logged out successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const verify = async (req, res) => {
    try {
        return res.status(200).send("User is verified");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const profile = async (req, res) => {
    try {
        return res.status(200).send("User profile");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const verify2fa = async (req, res) => {
    try {
        return res.status(200).send("2FA verified");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const verifyAccount = async (req, res) => {
    try {
        return res.status(200).send("Account verified");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const sendMeVerificationEmail = async (req, res) => {
    try {
        return res.status(200).send("Verification email sent");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const changePassword = async (req, res) => {
    try {
        return res.status(200).send("Password changed");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const forgotPassword = async (req, res) => {
    try {
        return res.status(200).send("Password reset email sent");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const resetPassword = async (req, res) => {
    try {
        return res.status(200).send("Password reset");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const toggle2fa = async (req, res) => {
    try {
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
