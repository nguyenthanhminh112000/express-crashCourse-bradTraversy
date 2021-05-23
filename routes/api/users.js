const express = require('express');
const users = require('./../../Users.js');
const moment = require('moment');
const uuid = require('uuid');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    } ${moment().format()}`
  );
  res.json(users);
});
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };
  console.log(req.body);
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include name and email' });
  }
  users.push(newMember);
  res.json(users);
});

router.get('/:id', (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(
      users.filter((user) => {
        return user.id === parseInt(req.params.id);
      })
    );
  } else {
    res.status(400).json({ msg: `No user with id:${req.params.id}` });
  }
});

router.put('/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(400).json({ msg: `Can't find anyone` });
  }
  req.body.name ? (users[index].name = req.body.name) : '';
  req.body.email ? (users[index].email = req.body.email) : '';
  return res.json({ msg: 'users updated', users });
});

router.delete('/:id', (req, res) => {
  const index = users.findIndex(
    (element) => element.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(400).json({ msg: `Can't find anyone` });
  }
  users.splice(index, 1);
  res.json({ msg: `User deleted`, users });
});

module.exports = router;
