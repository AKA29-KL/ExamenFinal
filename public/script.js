const formContact = document.getElementById('formContact');
const contactId = document.createElement('input');
contactId.type = 'hidden';
formContact.prepend(contactId);

const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const telephone = document.getElementById('telephone');
const listeContacts = document.querySelector('tbody');

async function chargerContacts() {
  const res = await fetch('/api/contacts');
  const contacts = await res.json();
  listeContacts.innerHTML = contacts.map((c, i) => `
    <tr>
      <td>${c.nom}</td>
      <td>${c.prenom}</td>
      <td>${c.email}</td>
      <td>${c.telephone}</td>
      <td>
        <button onclick="modifierContact(${i})">Modifier</button>
        <button onclick="supprimerContact(${i})">Supprimer</button>
      </td>
    </tr>
  `).join('');
}

formContact.addEventListener('submit', async (e) => {
  e.preventDefault();

  const contact = { nom: nom.value, email: email.value, telephone: telephone.value };
  let method = contactId.value === "" ? 'POST' : 'PUT';
  let url = '/api/contacts' + (contactId.value !== "" ? `/${contactId.value}` : '');

  await fetch(url, {
    method: contactId.value === "" ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });

  formContact.reset();
  contactId.value = "";
  chargerContacts();
});

window.modifierContact = (id) => {
  fetch('/api/contacts').then(res => res.json()).then(data => {
    const contact = data[id];
    contactId.value = id;
    nom.value = contact.nom;
    prenom.value = contact.prenom;
    email.value = contact.email;
    telephone.value = contact.telephone;
  });
}

window.supprimerContact = async (id) => {
  if(confirm('Voulez-vous vraiment supprimer ce contact ?')) {
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    chargerContacts();
  }
};

chargerContacts();
