import pyautogui
import time

# Number of clicks
clicks = 100000

# Interval between clicks
interval = 120

# Start the autoclicking
for i in range(clicks):
    pyautogui.press('enter')
    time.sleep(interval)
