const UserModel = require('../models/user.model')
const fs = require('fs')
const { uploadErrors } = require('../utils/errors.utils')

module.exports.uploadProfil = (req, res) => {
  try {
    if (
      req.file.mimetype != 'image/jpg' &&
      req.file.mimetype != 'image/png' &&
      req.file.mimetype != 'image/jpeg'
    )
      throw Error('INVALID file')
    if (req.file.size > 500000) throw Error('max size')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(400).json({ errors })
  }
  const fileName = req.body.name + '.jpg'
  // save l'image
  fs.writeFile(
    `${__dirname}/../../frontend/public/uploads/profil/${fileName}`,
    req.file.buffer,
    () => {
      ''
    },
  )
  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(500).send(err)
      },
    )
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
