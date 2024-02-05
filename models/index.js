const User = require('./User');
const Post = require('./Post');
const Comment = require(`./Comment`);

// Define User-Post relationship: A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Define User-Comment relationship: A user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// Define Post-User relationship: A post belongs to a user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Define Post-Comment relationship: A post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Define Comment-Post relationship: A comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Define Comment-User relationship: A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = { User, Post, Comment};

