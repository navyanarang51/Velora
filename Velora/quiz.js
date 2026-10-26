
const questions = [
  {
    category: "YOUR AESTHETIC",
    title: "Which wardrobe feels most like you?",
    description: "Choose the world you would love to dress in.",
    options: [
      { icon: "୨୧", title: "Soft Girl", desc: "Gentle colours, pretty layers, delicate details.", tags: ["Soft Girl", "Romantic", "Coquette"] },
      { icon: "♧", title: "Old Money", desc: "Timeless pieces, polished silhouettes, quiet luxury.", tags: ["Old Money", "Minimal Chic"] },
      { icon: "✳", title: "Streetwear", desc: "Relaxed fits, bold details, effortless confidence.", tags: ["Streetwear", "Edgy"] },
      { icon: "✧", title: "Coquette", desc: "Bows, lace, feminine shapes and playful charm.", tags: ["Coquette", "Romantic", "Soft Girl"] },
      { icon: "◇", title: "Minimal Chic", desc: "Clean lines, neutral colours, less but better.", tags: ["Minimal Chic", "Old Money"] },
      { icon: "☾", title: "Edgy", desc: "Dark tones, statement pieces and strong contrasts.", tags: ["Edgy", "Streetwear"] }
    ]
  },
  {
    category: "YOUR COLOUR STORY",
    title: "Which colour palette catches your eye?",
    description: "Think about the colours you instinctively save or shop.",
    options: [
      { icon: "♡", title: "Blush & Cream", desc: "Soft pink, ivory, powder blue.", palette: "soft" },
      { icon: "♜", title: "Chocolate & Beige", desc: "Warm browns, camel, cream.", palette: "earth" },
      { icon: "◈", title: "Black & White", desc: "Crisp contrast, monochrome, charcoal.", palette: "mono" },
      { icon: "✿", title: "Pastels & Florals", desc: "Lilac, butter yellow, soft green.", palette: "pastel" },
      { icon: "♦", title: "Deep & Rich", desc: "Burgundy, forest green, deep plum.", palette: "rich" },
      { icon: "✦", title: "Denim & Neutrals", desc: "Blue denim, grey, white, muted tones.", palette: "denim" }
    ]
  },
  {
    category: "YOUR SILHOUETTE",
    title: "What outfit makes you feel your best?",
    description: "There is no right answer. Pick your natural preference.",
    options: [
      { icon: "♡", title: "Flowy & Feminine", desc: "Dresses, soft skirts, movement.", tags: ["Soft Girl", "Romantic", "Coquette"] },
      { icon: "♧", title: "Tailored & Polished", desc: "Structured trousers, blazers, clean cuts.", tags: ["Old Money", "Minimal Chic"] },
      { icon: "✳", title: "Relaxed & Oversized", desc: "Loose shirts, baggy denim, roomy layers.", tags: ["Streetwear", "Edgy"] },
      { icon: "◇", title: "Fitted & Sleek", desc: "Simple shapes, balanced proportions.", tags: ["Minimal Chic", "Edgy"] }
    ]
  },
  {
    category: "THE LITTLE DETAILS",
    title: "What details would you choose?",
    description: "The little things usually reveal the bigger style.",
    options: [
      { icon: "୨୧", title: "Lace & Bows", desc: "Delicate, playful, romantic.", tags: ["Coquette", "Romantic", "Soft Girl"] },
      { icon: "♧", title: "Gold Jewellery", desc: "Understated, elegant, timeless.", tags: ["Old Money", "Minimal Chic"] },
      { icon: "✳", title: "Bold Accessories", desc: "Statement bags, chunky pieces, attitude.", tags: ["Streetwear", "Edgy"] },
      { icon: "◇", title: "Clean & Simple", desc: "Small details, minimal embellishment.", tags: ["Minimal Chic", "Old Money"] }
    ]
  },
  {
    category: "YOUR CURRENT MOOD",
    title: "How do you want your clothes to make you feel?",
    description: "This describes your fashion mood, not your personality.",
    options: [
      { icon: "☁", title: "Soft & Dreamy", desc: "Comfortable, gentle, romantic.", mood: "Soft & Dreamy", moodDesc: "Your edit leans into gentle textures, softer colours and romantic details." },
      { icon: "☀", title: "Confident & Powerful", desc: "Put-together, bold, self-assured.", mood: "Confident & Powerful", moodDesc: "Your edit focuses on polished shapes and statement-making pieces." },
      { icon: "☾", title: "Calm & Effortless", desc: "Uncomplicated, comfortable, balanced.", mood: "Calm & Effortless", moodDesc: "Your edit favours versatile essentials that work without overthinking." },
      { icon: "⚡", title: "Playful & Experimental", desc: "Creative, expressive, a little unexpected.", mood: "Playful & Experimental", moodDesc: "Your edit encourages creative combinations and standout details." }
    ]
  },
  {
    category: "YOUR OCCASION",
    title: "Where do you want to wear your next favourite outfit?",
    description: "We will use this to shape your style suggestions.",
    options: [
      { icon: "☕", title: "College & Everyday", desc: "Easy outfits for busy days.", occasion: "everyday" },
      { icon: "♡", title: "Dates & Brunch", desc: "Feminine, polished, memorable.", occasion: "date" },
      { icon: "✧", title: "Parties & Events", desc: "Dressier pieces and statement looks.", occasion: "party" },
      { icon: "♧", title: "Internships & Formal", desc: "Smart, clean, put-together outfits.", occasion: "formal" }
    ]
  },
  {
    category: "YOUR BUDGET",
    title: "What price range feels comfortable per item?",
    description: "Your recommendations will prioritise pieces within this range.",
    options: [
      { icon: "₹", title: "Under ₹3,000", desc: "Affordable finds and thoughtful basics.", budget: 3000 },
      { icon: "₹", title: "₹3,000–₹5,000", desc: "A considered mid-range wardrobe.", budget: 5000 },
      { icon: "₹", title: "₹5,000–₹7,000", desc: "Investment pieces and statement styles.", budget: 7000 },
      { icon: "✧", title: "Flexible Budget", desc: "Show me what best fits my style.", budget: Infinity }
    ]
  },
  {
    category: "YOUR STYLE ENERGY",
    title: "Which outfit would you save first?",
    description: "Pick the energy you want your wardrobe to have.",
    options: [
      { icon: "♡", title: "Pretty & Romantic", desc: "Soft fabrics and graceful shapes.", tags: ["Romantic", "Soft Girl", "Coquette"] },
      { icon: "♧", title: "Quiet Luxury", desc: "Elevated basics and timeless styling.", tags: ["Old Money", "Minimal Chic"] },
      { icon: "✳", title: "Cool & Urban", desc: "Denim, relaxed layers and contrast.", tags: ["Streetwear", "Edgy"] },
      { icon: "◇", title: "Modern & Minimal", desc: "Simple, sleek, versatile pieces.", tags: ["Minimal Chic", "Old Money", "Edgy"] }
    ]
  },
  {
    category: "YOUR FINISHING TOUCH",
    title: "What would complete your outfit?",
    description: "Choose the finishing touch you reach for most.",
    options: [
      { icon: "♡", title: "Delicate Jewellery", desc: "Fine necklaces and subtle accents.", tags: ["Romantic", "Soft Girl", "Coquette"] },
      { icon: "♧", title: "A Structured Bag", desc: "Classic accessories that pull it together.", tags: ["Old Money", "Minimal Chic"] },
      { icon: "✳", title: "Statement Shoes", desc: "A look with a little extra attitude.", tags: ["Streetwear", "Edgy"] },
      { icon: "✧", title: "Simple Everyday Pieces", desc: "Versatile accessories you can rewear.", tags: ["Minimal Chic", "Old Money"] }
    ]
  },
  {
    category: "YOUR SHOPPING PRIORITY",
    title: "What matters most when buying clothes?",
    description: "This helps us decide what to put first in your style edit.",
    options: [
      { icon: "♡", title: "Feeling Beautiful", desc: "Pieces that make me feel like myself.", priority: "self-expression", tags: ["Romantic", "Soft Girl", "Coquette"] },
      { icon: "♧", title: "Versatility", desc: "One piece, many outfits.", priority: "versatility", tags: ["Minimal Chic", "Old Money"] },
      { icon: "✳", title: "Standing Out", desc: "Something distinctive and memorable.", priority: "statement", tags: ["Edgy", "Streetwear"] },
      { icon: "◇", title: "Comfort & Wearability", desc: "Pieces that fit into real life.", priority: "comfort", tags: ["Streetwear", "Minimal Chic"] }
    ]
  }
];

const products = [
  {
    name: "Cloud Dress",
    price: 7900,
    category: "DRESSES",
    image: "images/dress.jpg",
    tags: ["Soft Girl", "Romantic", "Coquette"],
    occasions: ["date", "party"],
    description: "A romantic statement for your softer side."
  },
  {
    name: "Lace Mini",
    price: 4800,
    category: "SKIRTS",
    image: "images/skirt.jpg",
    tags: ["Coquette", "Romantic", "Soft Girl", "Edgy"],
    occasions: ["date", "party", "everyday"],
    description: "A playful piece for styling your own way."
  },
  {
    name: "Low Rise Denim",
    price: 5600,
    category: "DENIM",
    image: "images/jeans.jpg",
    tags: ["Streetwear", "Edgy", "Minimal Chic"],
    occasions: ["everyday", "date"],
    description: "An everyday staple with a confident edge."
  },
  {
    name: "Chocolate Heels",
    price: 6500,
    category: "FOOTWEAR",
    image: "images/heels.jpg",
    tags: ["Old Money", "Minimal Chic", "Romantic"],
    occasions: ["date", "party", "formal"],
    description: "A polished finish for an elevated outfit."
  }
];

const styleProfiles = {
  "Soft Girl": {
    description: "You gravitate towards gentle colours, feminine silhouettes and outfits that feel effortless but thoughtful.",
    formula: "Soft layers, delicate details",
    formulaDescription: "Try flowing shapes, lighter colours and small accessories. Balance pretty pieces with everyday staples."
  },
  "Old Money": {
    description: "Your style leans timeless and refined. You prefer pieces that look considered rather than overly complicated.",
    formula: "Tailoring, texture, timeless basics",
    formulaDescription: "Build outfits around structured shapes, restrained colours and accessories that work across occasions."
  },
  "Minimal Chic": {
    description: "You like clean silhouettes, versatility and clothes that look put-together without needing too many details.",
    formula: "Clean lines, versatile separates",
    formulaDescription: "Start with a strong base, add one complementary texture and keep the finishing details intentional."
  },
  "Coquette": {
    description: "You enjoy playful femininity and small details that give an outfit its own identity.",
    formula: "Romantic details, playful silhouettes",
    formulaDescription: "Mix delicate textures with simple basics so the details stand out without overwhelming the outfit."
  },
  "Streetwear": {
    description: "Your style is relaxed, expressive and grounded in pieces you can move around in comfortably.",
    formula: "Relaxed fits, confident contrasts",
    formulaDescription: "Combine denim or roomy shapes with a strong accessory or a contrasting layer."
  },
  "Romantic": {
    description: "You are drawn to graceful silhouettes, expressive details and outfits that feel a little special.",
    formula: "Flowing shapes, graceful details",
    formulaDescription: "Try soft textures and balanced proportions, with one detail that makes the look feel personal."
  },
  "Edgy": {
    description: "You prefer a stronger visual identity, interesting contrasts and pieces with a bit of attitude.",
    formula: "Contrast, statement pieces, structure",
    formulaDescription: "Use darker tones or contrasting textures and keep the rest of the outfit balanced."
  }
};

const palettes = {
  soft: {
    name: "Blush & Cream",
    colours: ["#ead1d0", "#f7eee3", "#c9d8e5"],
    description: "Gentle pinks, ivory and powder blue create a softer, romantic colour story."
  },
  earth: {
    name: "Chocolate & Beige",
    colours: ["#674330", "#c3a184", "#f1e5d5"],
    description: "Warm browns, camel and cream make an easy, polished palette."
  },
  mono: {
    name: "Black & White",
    colours: ["#242321", "#f8f7f2", "#898680"],
    description: "Monochrome shades give your wardrobe contrast and flexibility."
  },
  pastel: {
    name: "Pastel Garden",
    colours: ["#d9c9e8", "#f2e4a9", "#c8d9c1"],
    description: "Lilac, butter yellow and soft green add lightness and playfulness."
  },
  rich: {
    name: "Deep & Rich",
    colours: ["#6e263a", "#264536", "#d5bba0"],
    description: "Burgundy, forest green and warm neutrals create a richer, deeper palette."
  },
  denim: {
    name: "Denim & Neutrals",
    colours: ["#536e8b", "#e7e0d6", "#73716d"],
    description: "Denim blue, grey and off-white create a practical, relaxed colour story."
  }
};

const budgetLabels = [
  { max: 3000, label: "Affordable Finds" },
  { max: 5000, label: "Considered Mid-Range" },
  { max: 7000, label: "Investment Pieces" },
  { max: Infinity, label: "Flexible Budget" }
];

const intro = document.getElementById("intro");
const quizPanel = document.getElementById("quiz-panel");
const resultPanel = document.getElementById("result-panel");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const retakeBtn = document.getElementById("retake-btn");

const questionCounter = document.getElementById("question-counter");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const questionCategory = document.getElementById("question-category");
const questionTitle = document.getElementById("question-title");
const questionDescription = document.getElementById("question-description");
const optionsGrid = document.getElementById("options-grid");
const validationMessage = document.getElementById("validation-message");

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);

function showSection(section) {
  intro.classList.add("hidden");
  quizPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");

  section.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  currentQuestion = 0;
  answers = Array(questions.length).fill(null);
  showSection(quizPanel);
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const chosenAnswer = answers[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  questionCounter.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  progressPercent.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;

  questionCategory.textContent = question.category;
  questionTitle.textContent = question.title;
  questionDescription.textContent = question.description;
  validationMessage.textContent = "";

  optionsGrid.replaceChildren();

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-card";

    if (chosenAnswer === optionIndex) {
      button.classList.add("selected");
    }

    button.setAttribute("aria-pressed", chosenAnswer === optionIndex ? "true" : "false");

    const icon = document.createElement("span");
    icon.className = "option-icon";
    icon.textContent = option.icon;

    const copy = document.createElement("span");
    copy.className = "option-copy";

    const title = document.createElement("span");
    title.className = "option-title";
    title.textContent = option.title;

    const description = document.createElement("span");
    description.className = "option-description";
    description.textContent = option.desc;

    copy.append(title, description);
    button.append(icon, copy);

    button.addEventListener("click", () => {
      answers[currentQuestion] = optionIndex;
      renderQuestion();
    });

    optionsGrid.appendChild(button);
  });

  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = chosenAnswer === null;

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "Reveal My Style ↗"
      : "Next Question →";
}

function nextQuestion() {
  if (answers[currentQuestion] === null) {
    validationMessage.textContent = "Choose an option to continue.";
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    return;
  }

  showResults();
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function getSelectedAnswers() {
  return answers.map((answerIndex, questionIndex) => {
    return questions[questionIndex].options[answerIndex];
  });
}

function getDominantStyle(selectedAnswers) {
  const scores = {};

  selectedAnswers.forEach(answer => {
    (answer.tags || []).forEach(tag => {
      scores[tag] = (scores[tag] || 0) + 1;
    });
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return ranked.length ? ranked[0][0] : "Minimal Chic";
}

function getBudgetLabel(maxBudget) {
  return budgetLabels.find(item => maxBudget <= item.max)?.label || "Flexible Budget";
}

function getRecommendations(style, selectedAnswers, maxBudget, occasion) {
  const profileTags = new Set([style]);

  selectedAnswers.forEach(answer => {
    (answer.tags || []).forEach(tag => profileTags.add(tag));
  });

  let rankedProducts = products.map(product => {
    let score = 0;

    product.tags.forEach(tag => {
      if (profileTags.has(tag)) score += tag === style ? 5 : 2;
    });

    if (product.occasions.includes(occasion)) score += 3;

    if (maxBudget === Infinity || product.price <= maxBudget) score += 2;
    else score -= 3;

    return { ...product, score };
  });

  const withinBudget = rankedProducts
    .filter(product => maxBudget === Infinity || product.price <= maxBudget)
    .sort((a, b) => b.score - a.score);

  // If the selected budget is below every available product, show
  // style matches transparently instead of returning an empty section.
  if (withinBudget.length === 0) {
    return {
      items: rankedProducts.sort((a, b) => b.score - a.score).slice(0, 3),
      note: "Your current VELORA sample range starts above your selected budget, so these are style matches to use as inspiration."
    };
  }

  return {
    items: withinBudget.slice(0, 3),
    note: "Selected for your aesthetic, occasion and budget preferences."
  };
}

function renderProducts(recommendation) {
  const productGrid = document.getElementById("product-grid");
  productGrid.replaceChildren();

  recommendation.items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.remove();

      const placeholder = document.createElement("div");
      placeholder.className = "product-image-placeholder";
      placeholder.textContent = "V.";
      imageWrap.appendChild(placeholder);
    }, { once: true });

    imageWrap.appendChild(image);

    const tag = document.createElement("span");
    tag.className = "product-tag";
    tag.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `₹${product.price.toLocaleString("en-IN")}`;

    const link = document.createElement("a");
    link.className = "product-link";
    link.href = "index.html#shop";
    link.textContent = "Explore piece ↗";

    card.append(imageWrap, tag, title, price, link);
    productGrid.appendChild(card);
  });

  document.getElementById("collection-description").textContent = recommendation.note;
}

function showResults() {
  const selectedAnswers = getSelectedAnswers();
  const style = getDominantStyle(selectedAnswers);
  const profile = styleProfiles[style];

  const paletteAnswer = selectedAnswers[1];
  const palette = palettes[paletteAnswer.palette] || palettes.earth;

  const moodAnswer = selectedAnswers[4];
  const occasionAnswer = selectedAnswers[5];
  const budgetAnswer = selectedAnswers[6];
  const priorityAnswer = selectedAnswers[9];

  const budget = budgetAnswer.budget;
  const recommendation = getRecommendations(
    style,
    selectedAnswers,
    budget,
    occasionAnswer.occasion
  );

  document.getElementById("result-title").textContent = `The ${style} Edit`;
  document.getElementById("result-description").textContent = profile.description;

  document.getElementById("result-mood").textContent = moodAnswer.mood;
  document.getElementById("mood-description").textContent = moodAnswer.moodDesc;

  document.getElementById("result-colours").textContent = palette.name;
  document.getElementById("colour-description").textContent = palette.description;

  const swatches = document.getElementById("colour-swatches");
  swatches.replaceChildren();

  palette.colours.forEach(colour => {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.backgroundColor = colour;
    swatch.setAttribute("aria-label", colour);
    swatches.appendChild(swatch);
  });

  document.getElementById("result-formula").textContent = profile.formula;
  document.getElementById("formula-description").textContent =
    `${profile.formulaDescription} Your priority: ${priorityAnswer.title.toLowerCase()}.`;

  document.getElementById("result-budget").textContent = getBudgetLabel(budget);
  document.getElementById("shopping-description").textContent =
    `Your preferred price range is ${budget === Infinity ? "flexible" : `up to ₹${budget.toLocaleString("en-IN")} per item`}. Your main occasion is ${occasionAnswer.title.toLowerCase()}.`;

  renderProducts(recommendation);
  showSection(resultPanel);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
backBtn.addEventListener("click", previousQuestion);
retakeBtn.addEventListener("click", startQuiz);
