const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const { verifyContact, verifyUpdateContact, verifyDeleteContact } = require('../../../Backend/contact');


let contacts = [];

Before(function () {
    contacts = [];
});

Given("je n'ai aucun contact nommé {string}", function (name) {
    contacts = contacts.filter(contact => contact.nom !== name);
});

Given("j'ai un contact nommé {string}", function (name) {
    const contact = { id: contacts.length + 1, nom: name, prenom: "Test", email: "test@test.com", telephone: "0123456789" };
    contacts.push(contact);
    assert.ok(contacts.some(c => c.nom === name), "Le contact n'a pas été ajouté correctement.");
});

When("j'ajoute un contact nommé {string}", function (name) {
    const nouveauContact = { nom: name, prenom: "Test", email: "test@test.com", telephone: "0123456789" };
    const isValid = verifyContact(nouveauContact);

    if (isValid) {
        nouveauContact.id = contacts.length + 1;
        contacts.push(nouveauContact);
    }

    assert.ok(isValid, "Le contact n'est pas valide pour être ajouté.");
});

When("je supprime le contact nommé {string}", function (name) {
    const contact = contacts.find(c => c.nom === name);
    const isValid = contact && verifyDeleteContact({ id: contact.id });

    if (isValid) {
        contacts = contacts.filter(c => c.nom !== name);
    }

    assert.ok(isValid, "Le contact à supprimer n'est pas valide ou n'existe pas.");
});

When("je modifie le contact nommé {string}", function (name) {
    const contact = contacts.find(c => c.nom === name);
    const isValid = contact && verifyUpdateContact({ id: contact.id, nom: name });

    if (isValid) {
        contact.prenom = "Modifié";
    }

    assert.ok(isValid, "Le contact à modifier n'est pas valide ou n'existe pas.");
});

Then("le contact nommé {string} existe", function (name) {
    const existe = contacts.some(c => c.nom === name);
    assert.ok(existe, `Le contact nommé ${name} devrait exister.`);
});

Then("le contact nommé {string} n'existe plus", function (name) {
    const existe = contacts.some(c => c.nom === name);
    assert.ok(!existe, `Le contact nommé ${name} ne devrait plus exister.`);
});
