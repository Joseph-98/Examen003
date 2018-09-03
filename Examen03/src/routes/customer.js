const router = require('express').Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/add', customerController.save);
router.get('/update/:CODIGO', customerController.edit);
router.post('/update/:CODIGO', customerController.update);
router.get('/delete/:CODIGO', customerController.delete);

module.exports = router;
