"use strict";
const Models = require("../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const tweet = (data, res) => {
  Models.Post.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const tweets = (req, res) => {
  Models.Following.findAll({ where: { follower: req.params.username } })
    .then((followings) => {
      followings = followings.map((following) => following.followee);

      Models.Post.findAll({
        where: { user: { [Op.in]: followings.concat([req.params.username]) } },
      })
        .then((tweets) => {
          res.send({ result: 200, data: tweets });
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

module.exports = {
  tweet,
  tweets,
};
