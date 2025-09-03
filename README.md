
# Smart Repeat Cart - An AI-Powered Grocery Refill Prototype

Inspired by the efficiency of services like **Blinkit**, this project is a functional prototype of an AI-powered "Smart Repeat Cart." It demonstrates how to leverage a Large Language Model (LLM) like the Google Gemini API to solve a common user friction point in e-commerce: the tedious task of rebuilding a weekly grocery cart.

---

## The Vision: A GPM Perspective

### The Problem: The Chore of the Repeat Purchase

In the fast-paced world of online grocery, speed is everything. While delivery can be in minutes, the user experience of *placing an order* remains a significant point of friction. For high-frequency "power users"—our most valuable customer segment—rebuilding a cart with the same 10-15 weekly staples is a repetitive, low-value task. This cognitive load leads to user drop-off, smaller basket sizes, and a diminished overall experience.

### The Opportunity: From Chore to Delight

What if we could eliminate this friction entirely? By leveraging the rich data of a user's purchase history, we can transform cart-building from a manual chore into an intelligent, one-tap "refill" experience.

The **Smart Repeat Cart** is our strategic initiative to deepen user engagement and build a powerful, personalized moat around our service.

### Business Goals:
*   **Increase 7-Day Retention:** Make re-ordering so effortless that it becomes a weekly habit.
*   **Boost Order Frequency & LTV:** By removing the primary barrier to placing an order, we encourage more frequent, smaller top-up shops in addition to the main weekly one.
*   **Enhance Personalization:** Move from a generic storefront to a service that truly understands and anticipates a user's needs.

---

## The User Flow: A Step-by-Step Journey

This prototype simulates the complete end-to-end experience for the user.

### Step 1: AI-Powered Prediction & Data Simulation

1.  **App Launch & Prediction:** On loading, the application makes a single, efficient call to the Gemini API. The prompt is engineered to perform two tasks in one operation: first, it internally simulates a realistic purchase history for a typical user, and then, using that context, it immediately analyzes the history to predict the user's *next* logical shopping cart.
2.  **Intelligent Analysis:** The prompt instructs the AI to analyze the purchase history for frequency, recency, and common quantities.
3.  **Dynamic Scenarios:** To ensure the UI is robust, the AI is also instructed to inject real-world complexities into its prediction:
    *   It will mark one item as **'OUT_OF_STOCK'**.
    *   It will alter the price of another item and provide its **'previousPrice'** to simulate a price change.

### Step 2: The Direct & Actionable Smart Cart

The user is immediately presented with a fully populated, editable cart. **There are no intermediate summary screens or extra clicks.** This "Speed First" principle is core to the experience.

The UI clearly communicates key information:
*   **Out-of-Stock Items:** Are visually distinct (greyed out) and non-interactive, with a clear "Temporarily Unavailable" badge and a "Substitute" button.
*   **Price Changes:** Items with a new price feature a small red (increase) or green (decrease) arrow, showing the previous price for full transparency.
*   **Effortless Editing:** Users can instantly adjust quantities or remove items with a single tap.

### Step 3: Training the Model (User Feedback)

User interaction is the most valuable data source for refining the AI model.
*   **"Do Not Repeat":** A toggle on each item allows the user to tell the AI, "Don't suggest this to me again," providing powerful negative feedback.
*   **Overall Accuracy:** A simple **👍/👎** prompt at the bottom asks if the prediction was helpful.
*   **Granular Feedback:** If a user selects 👎, a modal appears asking for a quick, one-tap reason (e.g., "Already have this," "Wrong item"). This qualitative data is invaluable for improving the prediction logic.

### Step 4: Seamless Additions & Checkout

*   **"Add from Regulars":** Below the main cart, a horizontally scrolling list shows other frequently purchased items that weren't included in this prediction, allowing for quick, discovery-free additions.
*   **Sticky Checkout:** A persistent footer always displays the live-updating total and a prominent "Place Order" button, ensuring the path to conversion is always visible.

---

## Technical Stack

*   **Frontend:** React with TypeScript for robust, type-safe components.
*   **Styling:** TailwindCSS for rapid, utility-first UI development.
*   **AI Engine:** The [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash` model) is used for both data simulation and predictive logic.
*   **Module Loading:** The app uses modern `importmap` for browser-native ES module imports without a build step.

---

## Running The Project

This project is designed to run in an environment where the Google Gemini API key is securely managed and made available to the application.

### Prerequisites
*   A modern web browser that supports `importmap` (e.g., Chrome, Edge, Firefox, Safari).
*   A valid Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Setup & Running Locally

This project can be run without any build tools or complex setup.

1.  **Clone or download the project files.**

2.  **Add Your API Key:**
    Open the `index.html` file. At the bottom, you will find a script block. Replace the placeholder `"YOUR_GEMINI_API_KEY_HERE"` with your actual Google Gemini API key.

    ```html
    <!-- Located at the bottom of index.html -->
    <script type="module">
      // ...
      process.env.API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // <-- EDIT THIS LINE
    </script>
    <script type="module" src="/index.tsx"></script>
    ```
    **Note:** This method is for local development convenience. In a production environment, you should never expose API keys directly in client-side code. The key would be injected securely by your hosting provider or accessed via a backend proxy.

3.  **Serve the Application:**
    Because the app uses modern JavaScript modules (`import`), you need to serve it from a local web server. You cannot simply open `index.html` from your file system.

    If you have Node.js installed, you can use the `http-server` package:
    ```bash
    # Install http-server globally if you don't have it
    npm install -g http-server

    # From the project's root directory, run the server:
    http-server .
    ```
    Now, open your browser and navigate to the local address provided (e.g., `http://localhost:8080`). The app should load and function correctly.
