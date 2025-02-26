const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:3000';

//  Vérifier que la page s'ouvre correctement
test('should navigate to index.html', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle('Gestion Contacts');
});

//  Ajouter un contact
test('should add a contact', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#nom', 'Jean');
    await page.fill('#prenom', 'Dupont');
    await page.fill('#email', 'jean@dupont.com');
    await page.fill('#telephone', '0123456789');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000); 
    await expect(page.locator('tr:has-text("Jean Dupont")')).toBeVisible();
});

//  Modifier un contact
test('should modify a contact', async ({ page }) => {
    await page.goto(URL);

    const contactRow = page.locator('tr:has-text("Jean Dupont")').first();
    await contactRow.locator('button:has-text("Modifier")').click();

    await page.fill('#prenom', 'DupontModifié');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000); //  Pause pour éviter un problème de DOM non mis à jour
    await expect(page.locator('tr:has-text("Jean DupontModifié")')).toBeVisible();
});

//  Supprimer un contact
test('should delete a contact', async ({ page }) => {
    await page.goto(URL);

    const contactRow = page.locator('tr:has-text("Jean DupontModifié")').first();
    await contactRow.locator('button:has-text("Supprimer")').click();

    await page.waitForTimeout(1000); // Pause pour attendre la suppression
    await expect(page.locator('tr:has-text("Jean DupontModifié")')).toHaveCount(0);
});
