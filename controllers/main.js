const login = async (req, res) => {
  res.send("Welcome bro");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Paul`,
    secret: `Here's Your token and lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
