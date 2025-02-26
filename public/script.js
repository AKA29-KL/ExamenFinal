const formContact = document.getElementById('formContact');
const contactId = document.createElement('input');
contactId.type = 'hidden';
contactId.id = 'contactId';
formContact.prepend(contactId); //  Ajouter l'ID au formulaire

const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const telephone = document.getElementById('telephone');
const listeContacts = document.querySelector('tbody');

//  Charger les contacts depuis l'API
async function chargerContacts() {
    const res = await fetch('/api/contacts');
    const contacts = await res.json();

    listeContacts.innerHTML = ""; //  Vider la liste avant de la recharger

    contacts.forEach((contact) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', contact.id);

        row.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.prenom}</td>
            <td>${contact.email}</td>
            <td>${contact.telephone}</td>
            <td>
                <button onclick="modifierContact('${contact.id}')">Modifier</button>
                <button onclick="supprimerContact('${contact.id}')">Supprimer</button>
            </td>
        `;
        listeContacts.appendChild(row);
    });
}

//  Charger les contacts au démarrage
document.addEventListener("DOMContentLoaded", chargerContacts);

//  Ajouter ou Modifier un contact
formContact.addEventListener('submit', async (e) => {
    e.preventDefault();

    const contact = {
        id: contactId.value || Date.now().toString(), //  Assurer que l'ID est une string
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        telephone: telephone.value
    };

    const method = contactId.value ? 'PUT' : 'POST';
    const url = contactId.value ? `/api/contacts/${contactId.value}` : '/api/contacts';

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });

    formContact.reset();
    contactId.value = "";

    await chargerContacts(); //  Mise à jour immédiate
});

//  Modifier un contact (Remplit le formulaire)
window.modifierContact = async (id) => {
    const res = await fetch('/api/contacts');
    const contacts = await res.json();
    
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        contactId.value = contact.id;
        nom.value = contact.nom;
        prenom.value = contact.prenom;
        email.value = contact.email;
        telephone.value = contact.telephone;
    }
};

// Supprimer un contact avec vérification
window.supprimerContact = async (id) => {
  console.log("Tentative de suppression du contact ID:", id);

  if (confirm('Voulez-vous vraiment supprimer ce contact ?')) {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });

      if (res.ok) {
          console.log("Contact supprimé avec succès !");
      } else {
          console.error("Erreur lors de la suppression !");
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); //  Pause pour éviter un bug d'affichage
      await chargerContacts(); //  Mise à jour après suppression

      //  Vérification après suppression
      setTimeout(async () => {
          const contacts = await fetch('/api/contacts').then(res => res.json());
          console.log("Liste des contacts après suppression:", contacts);
      }, 1500);
  }
};
