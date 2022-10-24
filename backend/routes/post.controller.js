const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const { uploadErrors } = require('../utils/errors.utils')
const ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) res.send(data)
    else console.log('Error to get data : ' + err)
  }).sort({ createdAt: -1 }) //Permet de lire les posts du plus récent au plus ancien
}

module.exports.createPost = async (req, res) => {
  let fileName;
  if (req.file != null) {
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      )
        throw Error("Invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    fs.writeFile(
      `${__dirname}/../../frontend/public/uploads/posts/${fileName}`,
      req.file.buffer,
      () => {
        ''
      },
    );
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file != null ? "./uploads/posts/" + fileName : "",
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || UserModel.admin === false)
    return res.status(400).send('ID unknown : ' + req.params.id)

  const updatedRecord = {
    message: req.body.message,
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, data) => {
      if (!err) res.send(data)
      else console.log('Update error : ' + err)
    },
  )
}

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || UserModel.admin === false )
    return res.status(400).send('ID unknown : ' + req.params.id)

  PostModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send(data)
    else console.log('Delete error : ' + err)
  })
}

module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unkown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unkown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || UserModel.admin === false)
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    return PostModel.findById(req.params.id, (err, data) => {
      const theComment = data.comments.find((comment) =>
        comment._id.equals(req.body.commentId),
      )

      if (!theComment) return res.status(404).send('Comment not found')
      theComment.text = req.body.text

      return data.save((err) => {
        if (!err) return res.status(200).send(data)
        return res.status(500).send(err)
      })
    })
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || UserModel.admin === false)
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(400).send(err)
  }
}
