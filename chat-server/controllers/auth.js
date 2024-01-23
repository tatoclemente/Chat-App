const bcrypt = require('bcryptjs')

const { response } = require("express")
const Usuario = require('../models/user')
const { generateJWT } = require('../helpers/jwt')


const createUser = async (req, res = response) => {

  
  try {
    
    const { email, password } = req.body

    // Verificar si el correo existe
    const existEmail = await Usuario.findOne({ email })
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    
    
    // Guardar usuario en bdd
    const user = new Usuario( req.body )
    
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync( password, salt )

    await user.save()

    // Generar el JWT
    const token = await generateJWT( user.id )  

    res.status(201).json({
      ok: true,
      user,
      token
    })


  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado - hable con el administrador'
    })
  }
}

const login = async (req, res = response) => {

 try {
   const { email, password } = req.body
   const user = await Usuario.findOne({ email })
   if (!user) {
     return res.status(400).json({
       ok: false,
       msg: 'El correo no existe'
     })
   }
  // Verificar password
  const validPassword = bcrypt.compareSync( password, user.password )
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'La contraseña no es válida'
    })
  }
  // Generar el JWT
  const token = await generateJWT( user.id )

  res.json({
    ok: true,
    user,
    token
  })
  
 } catch (error) {
   console.log(error);
   res.status(500).json({
     ok: false,
     msg: 'Error inesperado - hable con el administrador'
   })
 }
}



const renewToken = async (req, res = response) => {

  const uid = req.uid

  // Generar un nuevo JWT
  const token = await generateJWT( uid )

  // Obtener el usuario por UID
  const user = await Usuario.findById( uid )

  res.json({
    ok: true,
    user,
    token
  })
}


module.exports = {
  createUser,
  login,
  renewToken,
}