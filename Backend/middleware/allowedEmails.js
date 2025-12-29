const allowedEmails = process.env.ALLOWED_EMAILS
  .split(",")
  .map(email => email.trim());

module.exports = (req, res, next) => {
  const userEmail = req.user.email;

  if (!allowedEmails.includes(userEmail)) {
    return res.status(403).json({
      message: "You are not allowed to access the dashboard"
    });
  }

  next();
};
