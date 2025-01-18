const express = require('express');
const router = express.Router();
const ContactosController = require('./ContactosController');
const controller = new ContactosController();
require('dotenv').config()
const AuthProtect = require('./Auth');

router.get('/', async function(req, res, next) {
  res.render('index', { 
    key: process.env.GOOGLEKEYPUBLIC,
    alert: false,
  });
});

router.post('/save',(req,res) => controller.add(req,res));

router.get('https://github.com/', passport.authenticate('github'));
router.get('https://p2-31924911-2.onrender.com', passport.authenticate('github', { failureRedirect: '' }),
  function (req, res) {
    const id = process.env.ID;
    const token = jwt.sign({ id: id }, process.env.JWTSECRET);
    res.cookie("jwt", token);
    res.redirect('/contactos')
  });

router.post('/send', async (req, res) => controller.add(req, res));
router.get('/logout', async (req, res) => AuthProtect.logout(req, res));
router.get('/contactos', AuthProtect.protectRoute, async (req, res) => {
  const contactos = await controller.model.getContacts();
  res.render('contactos', {
    get: contactos
  });
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    KEYPUBLIC: 'G-1GVLQ7X3ML'
  });
});

module.exports = router;