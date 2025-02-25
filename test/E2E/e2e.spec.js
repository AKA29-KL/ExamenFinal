const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:3000';

// Test navigation vers la page d'accueil
test('should navigate to index.html', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle('Gestion Contacts'); // Correction du titre
});

// Test ajout d'un nouveau contact
test('should add a contact', async ({ page }) => {
    await page.goto(URL);
    
    await page.fill('#nom', 'Jean');
    await page.fill('#prenom', 'Dupont');
    await page.fill('#email', 'jean@dupont.com');
    await page.fill('#telephone', '0123456789');
    await page.click('button[type="submit"]');

    // Vérifier que le contact a été ajouté avec un sélecteur plus précis
    await expect(page.locator('tr:has-text("Jean Dupont")')).toBeVisible();
});

// Test suppression d'un contact existant
test('should delete a contact', async ({ page }) => {
    await page.goto(URL);

    // Localiser la ligne contenant "Jean Dupont" et cliquer sur le bouton "Supprimer"
    const contactRow = page.locator('tr:has-text("Jean Dupont")');
    await contactRow.locator('button:has-text("Supprimer")').click();

    // Vérifier que le contact n'existe plus
    await expect(page.locator('tr:has-text("Jean Dupont")')).not.toBeVisible();
});

// Test modification d'un contact existant
test('should modify a contact', async ({ page }) => {
    await page.goto(URL);

    // Sélectionner la ligne contenant "Jean Dupont"
    const contactRow = page.locator('tr:has-text("Jean Dupont")');
    await contactRow.locator('button:has-text("Modifier")').click();

    // Modifier le prénom et soumettre
    await page.fill('#prenom', 'DupontModifié');
    await page.click('button[type="submit"]');

    // Vérifier que la modification a bien eu lieu
    await expect(page.locator('tr:has-text("Jean DupontModifié")')).toBeVisible();
});
