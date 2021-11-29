const express = require('express');
const avalicaoController = require('../controllers/AvaliacaoController');

const router = express.Router();

router.get('/', avalicaoController.getAll);
router.get('/id/:id', avalicaoController.getById);
router.get('/cursousuario', avalicaoController.getByIdCursoUsuario);
router.post('/', avalicaoController.create);
router.put('/', avalicaoController.update);
router.delete('/id/:id', avalicaoController.remove);

module.exports = router;
