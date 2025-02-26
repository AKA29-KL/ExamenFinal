const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

//  Fonction pour charger les contacts
const getContacts = () => JSON.parse(fs.readFileSync('contacts.json', 'utf8'));

//  Fonction pour sauvegarder les contacts
const saveContacts = (contacts) => fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));

//  Obtenir tous les contacts
app.get('/api/contacts', (req, res) => {
    res.json(getContacts());
});

//  Ajouter un contact
app.post('/api/contacts', (req, res) => {
    let contacts = getContacts();
    const newContact = { id: Date.now().toString(), ...req.body };
    contacts.push(newContact);
    saveContacts(contacts);
    res.json({ status: 'Contact ajouté', contact: newContact });
});

//  Modifier un contact par ID
app.put('/api/contacts/:id', (req, res) => {
    let contacts = getContacts();
    const index = contacts.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Contact non trouvé' });
    }

    contacts[index] = { ...contacts[index], ...req.body, id: req.params.id }; //  Conserver l'ID
    saveContacts(contacts);
    res.json({ status: 'Modifié avec succès', contact: contacts[index] });
});

//  Supprimer un contact par ID
app.delete('/api/contacts/:id', (req, res) => {
  let contacts = getContacts();
  const contactId = req.params.id;
  console.log("Requête DELETE reçue pour ID:", contactId);

  const newContacts = contacts.filter(c => c.id !== contactId);

  if (newContacts.length === contacts.length) {
      console.error("Contact non trouvé !");
      return res.status(404).json({ error: 'Contact non trouvé' });
  }

  saveContacts(newContacts);
  console.log("Contact supprimé avec succès !");
  res.json({ status: 'Supprimé avec succès' });
});


app.listen(PORT, () => console.log(` Serveur démarré sur http://localhost:${PORT}`));
