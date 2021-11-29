const express = require('express');
const usuarioFavoritosController = require('../controllers/UsuarioFavoritosController');

const router = express.Router();

router.get('/', usuarioFavoritosController.getAll);
router.get('/id/:id', usuarioFavoritosController.getById);
router.get('/cursousuario', usuarioFavoritosController.getByIdCursoUsuario);
router.post('/', usuarioFavoritosController.create);
router.put('/', usuarioFavoritosController.update);
router.delete('/id/:id', usuarioFavoritosController.remove);

module.exports = router;
