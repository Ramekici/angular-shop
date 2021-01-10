const express = require('express');
const router = express.Router();
const AdminProduct = require('../../controllers/admin');

const checkAuth = require('../../middleware/check-auth');
const extractFile = require('../../middleware/file');


router.post('/', checkAuth, extractFile, AdminProduct.productCreated);
router.put('/:id', checkAuth, extractFile, AdminProduct.productUpdated);
router.delete('/:id', checkAuth, AdminProduct.productDeleted);


module.exports= router;
