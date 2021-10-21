const express = require('express');
const avalicaoController = require('../controllers/AvaliacaoController');

const router = express.Router();

router.get('/', avalicaoController.getAll);
router.get('/:id', avalicaoController.getById);
router.post('/', avalicaoController.create);
router.put('/', avalicaoController.update);
router.delete('/:id', avalicaoController.remove);

module.exports = router;
