
const jwt = require('jsonwebtoken');


const jwtValidate = (req, res, next) => {

  try {

    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
      });
    }


    const { uid } = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.uid = uid;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

  next();
}


module.exports = {
  jwtValidate
}