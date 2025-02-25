//  verifie que le contact est bien rempli
function isNotEmpty(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

//verifie l'ajout d'un contact
function verifyContact(contact) {
  return isNotEmpty(contact.nom) && isNotEmpty(contact.prenom) &&
         isNotEmpty(contact.email) && isNotEmpty(contact.telephone);
}

// verifie la mise à jour d'un contact
function verifyUpdateContact(contact) {
  return isNotEmpty(contact.nom) || isNotEmpty(contact.prenom) ||
         isNotEmpty(contact.email) || isNotEmpty(contact.telephone);
}

// verifie la suppression d'un contact
function verifyDeleteContact(contact) {
  return isNotEmpty(contact.id) && Number.isInteger(contact.id) && contact.id >= 0;
}

// verifie la suppression d'un contact existant
function verifyDeleteContactExist(contact) {
  return isNotEmpty(contact.id) && Number.isInteger(contact.id) && contact.id > 0;
}

function verifyUpdateContactExist(contact) {
  return isNotEmpty(contact.id) && Number.isInteger(contact.id) && contact.id > 0;
}

// verifie que l'email est valide
function verifyEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  verifyContact,
  verifyUpdateContact,
  verifyDeleteContact,
  verifyDeleteContactExist,
  verifyUpdateContactExist,
  verifyEmail
};
