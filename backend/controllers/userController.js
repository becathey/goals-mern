// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
    res.json({message: 'Register user'})
}

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.json({message: 'Login user'})
}

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = (req, res) => {
    res.json({message: 'User data'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}