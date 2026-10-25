# VELORA \| More Than Fashion --- It's Your Style.

VELORA is a fashion e-commerce frontend project designed around a
modern, luxury-inspired shopping experience. It combines an editorial
interface, curated fashion imagery, interactive shopping pages, and a
personalized **Style Studio Quiz** to help users explore their fashion
preferences.

> **Tagline:** More Than Fashion --- It's Your Style.

## ✨ Features

### 🛍️ Fashion Homepage

-   Luxury-inspired design with a beige, brown, and neutral colour
    palette.
-   Editorial hero section and visual storytelling.
-   Category cards and curated fashion collections.
-   Fashion imagery featuring dresses, skirts, denim, and footwear.
-   Brand story and campaign sections.
-   Responsive navigation and footer.
-   Newsletter interface and other homepage interactions, where
    implemented.

### 🎨 Style Studio Quiz

-   Dedicated quiz page separate from the homepage.
-   Interactive, multi-step quiz with 10 questions.
-   Explore aesthetics such as Soft Girl, Old Money, Minimal Chic,
    Coquette, Streetwear, Romantic, and Edgy.
-   Discover colour palettes, outfit silhouettes, accessories, and style
    moods.
-   Choose a preferred shopping budget and occasion.
-   Personalized style profile and outfit recommendations.
-   Progress indicator, answer selection, and back/next navigation.
-   Answer validation and retake functionality.
-   Responsive layout for desktop and mobile.

### 🛒 Shopping and Account Pages

-   **Shopping bag:** view and manage selected items.
-   **Checkout:** continue through the frontend checkout flow.
-   **Wishlist:** save favourite items through the available interface.
-   **Search:** access the product-search interface.
-   **Login:** dedicated login page.
-   **Order history:** view saved order information where supported by
    the frontend logic.

### ⚡ Interactive Elements

-   Mobile navigation menu.
-   Product interactions and bag counter.
-   Wishlist interactions.
-   Toast notifications and feedback messages.
-   Smooth scrolling and back-to-top functionality.
-   Theme toggle, where implemented.
-   Browser `localStorage` for supported frontend state, where
    implemented.

## 🛠️ Tech Stack

-   **HTML5** --- page structure and semantic markup.
-   **CSS3** --- layouts, styling, animations, and responsive design.
-   **JavaScript** --- interactive components, quiz logic, and dynamic
    recommendations.
-   **Google Fonts** --- typography.
-   **Visual Studio Code** --- development environment.
-   **Browser `localStorage`** --- persistence of supported demo data.

The project uses a vanilla HTML, CSS, and JavaScript frontend. The Style
Studio Quiz does not require a frontend framework or an additional
JavaScript library.

> **Project scope:** This is a frontend project. Unless connected to
> real services, authentication, checkout, newsletter submission, and
> order handling are demonstrations rather than production backend
> services. No live payment processing is provided by the frontend
> alone.

## 📁 Project Structure

``` text
VELORA/
├── images/
│   ├── campaign.jpg
│   ├── dress.jpg
│   ├── editorial.jpg
│   ├── heels.jpg
│   ├── hero.jpg
│   ├── jeans.jpg
│   ├── skirt.jpg
│   └── story.jpg
├── videos/
│   └── main.mp4
├── index.html
├── style.css
├── script.js
├── cart.html
├── cart.css
├── cart.js
├── checkout.html
├── checkout.css
├── checkout.js
├── login.html
├── login.css
├── login.js
├── order-history.html
├── order-history.css
├── order-history.js
├── quiz.html
├── quiz.css
├── quiz.js
├── search.css
├── search.js
├── wishlist.html
├── wishlist.css
├── wishlist.js
└── README.md
```

Keep the `images/` and `videos/` folders in the project root so that
relative media paths continue to work. This tree reflects the file list
shared for the project; update it if the repository changes.

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/navyanarang51/Velora
```

Replace `<your-repository-url>` with the URL of your GitHub repository.

### 2. Open the project

Open the `VELORA` folder in Visual Studio Code.

### 3. Run the website

Recommended: use the **Live Server** extension in VS Code and open
`index.html`.

Alternatively, open `index.html` directly in a browser. Live Server is
preferable during development because it serves the files from a local
web server.

### 4. Explore the Style Studio

Use the **Quiz** link in the website navigation to open `quiz.html`.
Answer the 10 questions to view the generated style profile and
recommendations.

## 🎯 Quiz Recommendation Logic

The Style Studio uses JavaScript to evaluate the user's selected answers
and generate a style profile.

-   **Aesthetic:** identifies a dominant fashion style from the selected
    preferences.
-   **Colour palette:** presents a coordinated colour scheme.
-   **Mood:** reflects the selected fashion mood.
-   **Budget:** uses the selected price range when evaluating sample
    products, where implemented.
-   **Occasion:** influences recommendation scoring.
-   **Style edit:** displays products that match the generated profile
    from the available sample collection.

The quiz uses predefined questions, style profiles, product data, and
local image paths. It does **not** use AI, a backend, or a live product
database.

## 📱 Responsive Design

The interface is designed to adapt to smaller screens through features
such as: - Flexible navigation. - Mobile-friendly quiz questions and
controls. - Responsive result and product grids. - Adjusted typography,
spacing, and layout for mobile devices.

## 🔮 Future Improvements

-   Connect all pages to a shared product catalogue.
-   Add individual product detail pages.
-   Expand product search, filtering, and category browsing.
-   Improve cart and checkout validation.
-   Store quiz results and user preferences more consistently.
-   Integrate secure authentication and backend services.
-   Add real order management and a trusted payment provider.
-   Expand the recommendation catalogue and scoring logic.
-   Connect newsletter submissions to an email service.
-   Add automated testing and accessibility checks.

## 👩‍💻 Project Information

-   **Project:** VELORA --- Fashion E-commerce Frontend
-   **Category:** Web Development / Frontend Development
-   **Technologies:** HTML, CSS, JavaScript
-   **Development environment:** Visual Studio Code

------------------------------------------------------------------------

*VELORA is a frontend project created to explore fashion-focused UI
design, responsive web development, and interactive shopping
experiences.*
