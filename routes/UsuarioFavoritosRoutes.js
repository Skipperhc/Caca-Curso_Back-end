const express = require('express');
const usuarioFavoritosController = require('../controllers/UsuarioFavoritosController');

const router = express.Router();

router.get('/', usuarioFavoritosController.get);
router.get('/:id', usuarioFavoritosController.get);
router.post('/', usuarioFavoritosController.create);
router.put('/', usuarioFavoritosController.update);
router.delete('/:id', usuarioFavoritosController.remove);

module.exports = router;
