const { registerSchema, loginSchema } = require("../validators/authValidation");

const { registerUser, loginUser, getUserById } = require("../services/authService");

async function register(req, res) {
    try {
        const validatedData = registerSchema.parse(req.body);

        const user = await registerUser(validatedData);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
} 

async function login(req, res) {
    try {
        const validatedData = loginSchema.parse(req.body);

        const result = await loginUser(validatedData);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProfile(req, res) {
    try {

        const user = await getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { register, login, getProfile };