const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err)
    console.log(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (updatedPost[0] > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Cannot update post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect("/login");
  } else {
      try {
          const postData = await Post.findByPk(req.params.id, {
              include: [
                  {
                      model: User,
                      attributes: ["user_name"]
                  },
                  {
                      model: Comment,
                      include: {
                          model: User,
                          attributes: ["comment_body"]
                      }
                  },
              ],
          });
          if (postData) {
            console.log('hello!', postData)
              const post = postData.get({plain: true});
              res.render("post", {
                post,
                loggedIn: req.session.loggedIn
              });
          } else {
              res.status(404)
          }
      } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
      }
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;