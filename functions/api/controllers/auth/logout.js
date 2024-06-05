const logout = async (req, res) => {
    console.log(req.headers)
    req.headers.authorization = ""
    res.status(200).json({
        status: "OK",
        message: "User logged out successfully"
    })
}

module.exports = {
    logout
}