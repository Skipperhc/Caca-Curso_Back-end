const express = require('express');
const AvalicaoGeralController = require('../controllers/AvalicaoGeralController');

const router = express.Router();

router.get('/', AvalicaoGeralController.getAll);
router.get('/:id', AvalicaoGeralController.getById);
router.post('/', AvalicaoGeralController.create);
router.put('/', AvalicaoGeralController.update);
router.delete('/:id', AvalicaoGeralController.remove);

module.exports = router;
