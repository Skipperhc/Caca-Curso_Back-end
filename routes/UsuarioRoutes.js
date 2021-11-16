const express = require('express');
const usuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.get('/carregar/:email', usuarioController.getByEmail);
router.post('/', usuarioController.create);
router.put('/', usuarioController.update);
router.delete('/:id', usuarioController.remove);

module.exports = router;
