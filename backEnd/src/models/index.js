'use strict'
const User = require('./user')
const Post = require('./post')
const Following = require('./following')

async function init() {
    await User.sync()
    await Post.sync();
    await Following.sync();
};

init();

module.exports = {
User,
Post,
Following
};