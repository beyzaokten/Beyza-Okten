# Seesaw Simulation

A visual seesaw simulation built with pure HTML, CSS, and JavaScript. No libraries, no frameworks.

## Live Demo

[View on GitHub Pages](https://beyzaokten.github.io/Beyza-Okten)

## How It Works

Click anywhere on the seesaw plank to drop an object with a random weight (1–10 kg).
The seesaw tilts based on the torque difference between left and right sides.

**Torque formula:** `torque = weight × distance from pivot`  
**Tilt angle:** `angle = clamp((rightTorque - leftTorque) / 10, -30°, 30°)`

Positive torque difference means the right side is heavier, negative means the left side is heavier.

## Features

- Click-to-drop objects with random weights (1–10 kg)
- Objects are color-coded by weight — light blue for low, dark orange for high
- Smooth, slow tilt animation using CSS transitions
- Left / right total weight display
- Live torque difference indicator with +/- sign
- Object positions stored as ratios — resize the window and objects stay in place
- State saved in localStorage — progress survives page refresh
- Reset button clears all objects and resets the board
- Drop sound effect on each placement
- Responsive layout

## Design Decisions

- Pivot is fixed at the exact center of the plank
- Tilt angle is capped at ±30° to keep the simulation readable
- `e.offsetX` is used for click position this gives the correct local coordinate even when the plank is rotated
- Object positions are saved as a ratio (0–1) relative to plank width, so they reposition correctly on window resize

  ## AI Usage

- AI tools were used occasionally for syntax reference and debugging.
