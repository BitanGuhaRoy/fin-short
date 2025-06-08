1. Overview
fin-short is a mobile application designed to simplify financial literacy and deliver personalized financial news. It allows users to sign in using their Google account, choose topics of interest in the finance domain, and then receive curated, bite-sized (200-word) articles related to those topics. The goal is to make finance approachable for both beginners and experienced users.

2. Objective
To build a lightweight, intuitive, and personalized content consumption app focused on financial topics, with:

Minimal onboarding

Easy-to-understand content

Personalization based on user interests

Support for beginners with tailored content

3. Key Features (Frontend)
a. Google Login
Users must log in via Google.

Upon successful login, their basic profile information (name, email, profile picture) is saved.

This creates a smooth, password-less entry point and allows personalized experience.

b. Interest Selection
After login, users are asked to select their interests from a predefined list:

Mutual Fund

Stock

Insurance

Latest Frauds

RD & FD (Recurring Deposit & Fixed Deposit)

Crypto

Tax

For each selected topic, the user can also specify if they are a beginner.

This selection determines what kind of articles (basic or latest) they will see.

c. Personalized Feed
Based on selected interests, the user is shown a feed of cards.

Each card includes:

A short title

A summary of the article (1–2 lines)

A “Read More” button

Articles are grouped by topic and user level (beginner/regular).

Data for articles will be hardcoded during MVP phase.

d. Article Detail View
On tapping a card, a new screen opens displaying the full article (~200 words).

The view includes:

Title

Full article content

(Optional) Source attribution or link

e. Beginner Section
For topics where the user marked themselves as a beginner:

The first few articles shown will be educational, helping them understand fundamentals (e.g., "What is a Mutual Fund?")

If not a beginner:

The section shows the latest news or updates.

4. User Journey
Splash Screen: App launch animation or logo screen.

Google Login: User logs in with Google account.

Interest Selection: User selects topics and beginner level.

Feed Screen: Personalized news feed is generated.

Article Detail: User can tap a card to read the full article.

5. Design Considerations
Minimalist Design: Clean, card-based UI for easy readability.

Responsive Layout: Works on both Android and iOS screens.

Smooth Navigation: Use of intuitive gestures and back functionality.

Offline Cache (Optional for future): Recently viewed articles may be stored locally.

