const express = require('express');
const cursoController = require('../controllers/CursoController');

const router = express.Router();

router.get('/', cursoController.getAll);
router.get('/:id', cursoController.getById);
router.post('/', cursoController.create);
router.put('/', cursoController.update);
router.delete('/:id', cursoController.remove);

module.exports = router;
