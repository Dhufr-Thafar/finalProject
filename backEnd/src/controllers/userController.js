"use strict";
const Models = require("../models");

const login = (data, res) => {
  Models.User.findOne({
    where: { username: data.username, password: data.password },
  })
    .then((user) => {
      if (user != null) res.send({ result: 200, data: true });
      else res.send({ result: 200, data: false });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const follow = (data, res) => {
  Models.Following.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};


const unfollow = (req, res) => {  
  Models.Following.destroy({
    where : {
      follower : req.follower,
      followee : req.followee
    }
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const search = (req, res) => {
  Models.User.findAll()
    .then((users) => {
      users = users.map((user) => user.username);

      users = users.filter((user) => user != req.params.username);

      Models.Following.findAll({
        where: { follower: req.params.username },
      })
        .then((followees) => {
          followees = followees.map((followee) => followee.followee);

          users = users.filter((user) => !followees.includes(user));

          res.send({ result: 200, data: users });
        })
        .catch((err) => {
          console.log(err);
          res.send({ result: 500, error: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const followers = (req, res) => {
  Models.Following.findAll({where: { followee: req.params.username }})
    .then((followings) => {
      followings = followings.map((following) => following.follower);

      res.send({ result: 200, data: followings });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};


const followees = (req, res) => {
  Models.Following.findAll({where: { follower: req.params.username }})
    .then((followings) => {
      followings = followings.map((following) => following.followee);

      res.send({ result: 200, data: followings });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  search,
  login,
  follow,
  unfollow,
  followers,
  followees
};
