# Seesaw Simulation

A visual seesaw simulation built with pure HTML, CSS, and JavaScript. No libraries, no frameworks.

## Live Demo

[View on GitHub Pages](https://beyzaokten.github.io/seesaw-simulation-beyza-okten/)

## How It Works

Click anywhere on the seesaw plank to drop an object with a random weight (1–10 kg).
The seesaw tilts based on the torque difference between left and right sides.

**Torque formula:** `torque = weight × distance from pivot`  
**Tilt angle:** `angle = clamp((rightTorque - leftTorque) / 10, -30°, 30°)`

Positive torque difference means the right side is heavier, negative means the left side is heavier.

## Thought Process & Design Decisions

The main goal was to create a simple but accurate physical simulation using only DOM and CSS transforms.

- I chose to represent torque using a simplified linear formula to keep calculations readable and performant.
- The pivot is fixed at the center to maintain symmetry and reduce complexity.
- I used `transform: rotate()` instead of complex physics engines to stay within the "pure JavaScript" constraint.
- Click position is calculated using `offsetX` to ensure correct placement even when the plank is rotated.
- Object positions are stored as ratios instead of absolute pixels, making the layout responsive.

---

## Trade-offs & Limitations

- The physics model is simplified and does not include real-world dynamics such as momentum or friction.
- The tilt speed is controlled via CSS transitions.
- Objects do not collide or interact with each other.
- Sound effects are basic and not dynamically adjusted.

These decisions were made to keep the implementation simple, readable, and aligned with the "no libraries" requirement.

---

## Features

- Click-to-drop objects with random weights (1–10 kg)
- Smooth tilt animation
- Torque-based balancing system
- Left/right total weight display
- Persistent state using localStorage
- Reset functionality
- Responsive design

---

## AI Usage

AI tools were used for:

- Debugging JavaScript logic 
- Improving code structure and readability
- Getting suggestions for UI improvements and animations
---
