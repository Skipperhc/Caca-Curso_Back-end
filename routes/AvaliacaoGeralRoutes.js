const express = require('express');
const AvalicaoGeralController = require('../controllers/AvalicaoGeralController');

const router = express.Router();

router.get('/', AvalicaoGeralController.get);
router.get('/:id', AvalicaoGeralController.get);
router.post('/', AvalicaoGeralController.create);
router.put('/', AvalicaoGeralController.update);
router.delete('/:id', AvalicaoGeralController.remove);

module.exports = router;
