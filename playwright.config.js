import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,  // Augmente le timeout global pour éviter les erreurs
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000, // Timeout pour chaque action Playwright
  },
});
