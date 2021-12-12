module.exports = (req, res, next) => {
  // 捕获到login的请求
  if (req.method === "POST" && req.path === "/login") {
    // 验证用户名和密码
    console.log(req.body.username,req.body.password);
    if (req.body.username === "halo" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        message: "用户名或密码错误",
      });
    }
  }
  next();
};
