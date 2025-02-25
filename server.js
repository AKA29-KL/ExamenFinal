const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/contacts', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  contacts.push(req.body);
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.json({ status: 'Contact ajouté' });
});

app.put('/api/contacts/:id', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  contacts[req.params.id] = req.body;
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.json({status: 'Modifié avec succès'});
});

app.delete('/api/contacts/:id', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  contacts.splice(req.params.id, 1);
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.json({status: 'Supprimé avec succès'});
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
