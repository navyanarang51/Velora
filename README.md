# VELORA | More Than Fashion — It's Your Style.

VELORA is a fashion e-commerce frontend project designed around a modern luxury shopping experience. It combines an editorial-inspired interface, curated fashion collections, interactive UI elements, and a personalized **Style Studio Quiz** to help users explore their fashion preferences.

## ✨ Features

### 🛍️ Fashion Homepage
- Luxury-inspired design with a beige, brown, and neutral colour palette.
- Editorial hero section with visual storytelling.
- Category cards and curated product collections.
- Product showcase featuring dresses, skirts, denim, and footwear.
- Brand story and campaign sections.
- Newsletter subscription interface.
- Responsive navigation and footer.

### 🎨 Style Studio Quiz
- Dedicated quiz page separate from the homepage.
- Interactive, multi-step quiz with 10 questions.
- Explore different fashion aesthetics, including Soft Girl, Old Money, Minimal Chic, Coquette, Streetwear, Romantic, and Edgy.
- Discover preferred colour palettes, outfit silhouettes, accessories, and style moods.
- Select a preferred shopping budget and occasion.
- Personalized style profile and outfit recommendations.
- Dynamic progress bar and answer selection.
- Back and next navigation with answer validation.
- Retake functionality to restart the quiz.
- Responsive layout for desktop and mobile devices.

### ⚡ Interactive Elements
- Mobile navigation menu.
- Product interactions and bag counter.
- Wishlist interface.
- Newsletter feedback messages.
- Toast notifications.
- Smooth scrolling and back-to-top functionality.
- Theme toggle, where implemented.

## 🛠️ Tech Stack

- **HTML5** — Page structure and semantic markup.
- **CSS3** — Layout, styling, animations, and responsive design.
- **JavaScript** — Interactive components, quiz logic, and dynamic recommendations.
- **Google Fonts** — Editorial typography.
- **Visual Studio Code** — Development environment.

No frontend framework or additional JavaScript library is required for the Style Studio Quiz.

## 📁 Project Structure

```text
VELORA/
│
├── index.html
├── style.css
├── script.js
│
├── quiz.html
├── quiz.css
├── quiz.js
│
├── cart.html
├── cart.css
├── cart.js
│
├── login.html
├── login.css
├── login.js
│
├── images/
│   ├── dress.jpg
│   ├── skirt.jpg
│   ├── jeans.jpg
│   └── heels.jpg
│
├── videos/
│   └── main.mp4
│
└── README.md
```

*Note: The structure above lists the expected project files. Keep only files and assets that actually exist in your repository.*

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Open the project

Open the VELORA folder in Visual Studio Code.

### 3. Run the website

Use the **Live Server** extension in VS Code and open `index.html`.

Alternatively, open `index.html` directly in your browser.

### 4. Explore the Style Studio

Click the **Quiz** link in the navigation bar to open `quiz.html`.

Answer all 10 questions to view your personalized style profile and product recommendations.

## 🎯 Quiz Recommendation Logic

The Style Studio uses JavaScript to evaluate selected answers and generate a style profile.

- **Aesthetic:** Identifies the dominant fashion style based on selected preferences.
- **Colour palette:** Displays a coordinated colour scheme.
- **Mood:** Reflects the user's selected fashion mood.
- **Budget:** Filters sample products according to the selected price range.
- **Occasion:** Influences product recommendation scoring.
- **Style edit:** Displays matching products from the available sample collection.

The quiz currently uses predefined questions, style profiles, product data, and local image paths. It does not use AI, a backend, or a live product database.

## 📱 Responsive Design

The interface includes responsive layouts for smaller screens, including:
- Flexible navigation.
- Mobile-friendly question cards.
- Responsive result and product grids.
- Adjusted typography and spacing for mobile devices.

## 🔮 Future Improvements

- Connect products to a shared product catalogue.
- Add individual product detail pages.
- Implement a functional shopping cart and checkout flow.
- Add product search, filters, and category pages.
- Store quiz results and user preferences.
- Add authentication and backend integration.
- Improve personalized recommendations using a larger product catalogue.
- Integrate a newsletter subscription service.

## 👩‍💻 Project Information

**Project:** VELORA — Fashion E-commerce Frontend  
**Category:** Web Development / Frontend Development  
**Technologies:** HTML, CSS, JavaScript

**Tagline:** More Than Fashion — It's Your Style.

---

*VELORA is a frontend project created to explore fashion-focused UI design, responsive web development, and interactive user experiences.*
