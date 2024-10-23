Todo App with Feature Flag

Overview

This project is a Todo App that uses LaunchDarkly feature flags to toggle dark mode. The app switches between light and dark modes based on a feature flag, demonstrating individual and rule-based targeting.

Current Progress
- Feature Flag (dark-mode): Controls light and dark mode.
- LaunchDarkly SDK: Integrated to evaluate the feature flag based on user context.

Accompanying slides: https://docs.google.com/presentation/d/1ahEbRqmGRHFz-GzJjZwHL9woTQQ4cqNqrQXW7dtZ64A/edit#slide=id.g30e116459e0_2_1

Installation
- Clone the repo:
`git clone git@github.com:JesseHouldsworth/LD.git`
- Add your LaunchDarkly client-side ID in `app.js`
- Open `index.html` in your browser of choice

Toggling dark mode on/off
- Option 1 - Use LaunchDarkly to toggle dark mode on/off via the web UI
- Option 2 - via webhooks
    - Enable dark mode: `curl -X POST https://app.launchdarkly.com/webhook/triggers/67117951ae7a7807ea0fd8e2/3bebc26b-8fe5-4a1e-a428-2d6bf5d54fe0`
    - Disable dark mode: `curl -X POST https://app.launchdarkly.com/webhook/triggers/671179073ee450085d7b7477/7abf7a6f-c87f-4db5-92d5-69442da13d8d`

Files
- `index.html`: Basic structure and dark mode toggle button.
- `style.css`: Basic styles for the app.
- `app.js`: Handles Todo functionality and LaunchDarkly integration.
