import { test, expect } from '@playwright/test'

test.describe('Players Lesson - Invalid Solution', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login and authenticate
    await page.goto('/login')
    // Add login if needed
  })

  test('should fail validation when player name is missing', async ({ page }) => {
    // Navigate to the Players lesson
    await page.goto('/course/roblox-scripting-essentials/lesson/players')
    
    // Wait for the code editor to load
    await page.waitForSelector('.monaco-editor', { timeout: 10000 })

    // Clear the editor and type incorrect solution (missing player.Name)
    await page.click('.monaco-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.type(`local Players = game:GetService("Players")

-- Listen for when a player joins
Players.PlayerAdded:Connect(function(player)
    -- Print welcome message but missing player name
    print("Welcome!")
end)`)

    // Click the Test button
    const testButton = page.locator('button:has-text("Test")').first()
    await testButton.click()

    // Wait for console output
    await page.waitForTimeout(1000)

    // Check that error message appears
    const errorMessage = page.locator('text=/✗|❌|fail/i').first()
    await expect(errorMessage).toBeVisible({ timeout: 5000 })

    // Verify helpful message about missing player.Name
    const helpfulMessage = page.locator('text=/player.Name|player name/i')
    await expect(helpfulMessage).toBeVisible({ timeout: 5000 })
  })
})

