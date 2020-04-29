const fs = require('fs');

const userJson = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: userJson.length,
    data: {
      users: userJson,
    },
  });
};

// to get a single user details by ID
exports.getSingleUser = (req, res) => {
  // console.log(req.params);
  const userId = req.params.id * 1;
  const user = userJson.find((element) => element.id === userId);

  if (!user) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      users: user,
    },
  });
};

// to add new user
exports.createUser = (req, res) => {
  // console.log(req.body)

  const newUserId = userJson[userJson.length - 1].id + 1;
  const newUser = { id: newUserId, ...req.body };

  userJson.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(userJson),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

// to update a user
exports.updateUser = (req, res) => {
  if (req.params.id * 1 > userJson.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    message: 'success',
    data: {
      user: '<User Updated..>',
    },
  });
};

// to delete an user
exports.deleteUser = (req, res) => {
  if (req.params.id * 1 > userJson.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    message: 'success',
    data: null,
  });
};
