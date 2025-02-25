const {
  verifyContact,
  verifyUpdateContact,
  verifyDeleteContact,
  verifyDeleteContactExist,
  verifyUpdateContactExist,
  verifyEmail
} = require('../../Backend/contact');

  
  describe("Tests des fonctions contact.js", () => {
  
    test("Vérifie que l'ajout d'un contact est correct", () => {
      expect(verifyContact({ nom: "test", prenom: "test", email: "test@test.com", telephone: "0123456789" })).toBe(true);
      expect(verifyContact({ nom: "", prenom: "", email: "", telephone: "" })).toBe(false);
    });
  
    test("Vérifie que la mise à jour d'un contact est correcte", () => {
      expect(verifyUpdateContact({ nom: "test" })).toBe(true);
      expect(verifyUpdateContact({ nom: "", prenom: "", email: "", telephone: "" })).toBe(false);
    });
  
    test("Vérifie que la suppression d'un contact est correcte", () => {
      expect(verifyDeleteContact({ id: 1 })).toBe(true);
      expect(verifyDeleteContact({})).toBe(false);
    });
  
    test("Vérifie que la suppression d'un contact existant est correcte", () => {
      expect(verifyDeleteContactExist({ id: 1 })).toBe(true);
      expect(verifyDeleteContactExist({ id: 0 })).toBe(false);
      expect(verifyDeleteContactExist({ id: -1 })).toBe(false);
    });
  
    test("Vérifie que la mise à jour d'un contact existant est correcte", () => {
      expect(verifyUpdateContactExist({ id: 1 })).toBe(true);
      expect(verifyUpdateContactExist({ id: 0 })).toBe(false);
      expect(verifyUpdateContactExist({})).toBe(false);
    });
  
    test("Vérifie que l'email est valide (format correct)", () => {
      expect(verifyEmail("test@test.com")).toBe(true);
      expect(verifyEmail("test@test")).toBe(false);
      expect(verifyEmail("test@")).toBe(false);
      expect(verifyEmail("@test.com")).toBe(false);
      expect(verifyEmail("test.com")).toBe(false);
    });
  });
  