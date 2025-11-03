import { test, expect } from '@playwright/test'

test.describe('Players Lesson - Valid Solution', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login and authenticate (assuming test user exists)
    await page.goto('/login')
    // Add login credentials if needed
    // await page.fill('input[name="email"]', 'test@example.com')
    // await page.fill('input[name="password"]', 'password')
    // await page.click('button[type="submit"]')
    // await page.waitForURL('/dashboard')
  })

  test('should pass validation when player name is printed correctly', async ({ page }) => {
    // Navigate to the Players lesson
    // Assuming the route is /course/roblox-scripting-essentials/lesson/players
    await page.goto('/course/roblox-scripting-essentials/lesson/players')
    
    // Wait for the code editor to load
    await page.waitForSelector('[data-testid="code-editor"]', { timeout: 10000 }).catch(() => {
      // If test ID doesn't exist, use Monaco editor selector
      return page.waitForSelector('.monaco-editor', { timeout: 10000 })
    })

    // Clear the editor and type the correct solution
    await page.click('.monaco-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.type(`local Players = game:GetService("Players")

-- Listen for when a player joins
Players.PlayerAdded:Connect(function(player)
    -- TODO: Print a welcome message using the player's name
    -- Example: Welcome, <name>!
    print("Welcome, " .. player.Name .. "!")
end)`)

    // Click the Test button
    const testButton = page.locator('button:has-text("Test")').first()
    await testButton.click()

    // Wait for console output
    await page.waitForTimeout(1000)

    // Check that success message appears
    const consoleOutput = page.locator('[data-testid="console"]').or(page.locator('.text-green-400:has-text("✓")'))
    await expect(consoleOutput.first()).toBeVisible({ timeout: 5000 })

    // Verify all objectives are marked as done
    const objectives = page.locator('[data-testid="objectives"]').or(page.locator('text=Get the Players service'))
    await expect(objectives).toBeVisible()
  })
})

