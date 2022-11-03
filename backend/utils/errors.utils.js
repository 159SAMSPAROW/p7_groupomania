module.exports.signUpErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Email incorrect'

  if (err.message.includes('password'))
    errors.password =
      'Votre mot de passe doit contenir une majuscule, entre 8 et 16 caractères et 2 chiffres'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet email est déjà enregistré'

  return errors
}

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Email inconnu'

  if (err.message.includes('password'))
    errors.password =
      'Mot de passe incorrect'

  return errors
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' }

  if (err.message.includes('invalid file'))
    errors.format = 'Format incompatabile'

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500ko'

  return errors
}
