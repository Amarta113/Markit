export const sendTokens = (user, statusCode, res) => {
    const token = user.getJwtToken()

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production"
    }

    return res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}
