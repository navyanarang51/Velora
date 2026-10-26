const loader = document.querySelector(".loader");
const header = document.querySelector("#header");
const menuBtn = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const bagCount = document.querySelector("#bag-count");
const toast = document.querySelector("#toast");
const topBtn = document.querySelector("#top-btn");
const hearts = document.querySelectorAll(".heart");
const addButtons = document.querySelectorAll(".add");
const newsletterForm = document.querySelector("#newsletter-form");
const email = document.querySelector("#email");
const newsletterMessage = document.querySelector("#newsletter-message");
const loginLink = document.querySelector("#login-link");
const signupLink = document.querySelector("#signup-link");
const loaderPercent = document.querySelector("#loader-percent");

// LOADER
let progress = 0;

const loaderTimer = setInterval(() => {
    progress += 1;

    if (loaderPercent) {
        loaderPercent.textContent = progress + "%";
    }

    if (progress >= 100) {
        clearInterval(loaderTimer);
    }
}, 30);

window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) loader.classList.add("hidden");
        document.body.classList.add("loaded");
    }, 3000);
});

// HEADER AND SCROLL
window.addEventListener("scroll", () => {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 60);
    }

    if (topBtn) {
        topBtn.classList.toggle("show", window.scrollY > 500);
    }
});

// MOBILE MENU: ONE CLICK LISTENER ONLY
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// BAG COUNT: ALWAYS READ FROM ACTUAL CART
function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("veloraCart")) || [];
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function updateBagCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce((sum, item) => {
        return sum + Math.max(0, Number(item.quantity) || 0);
    }, 0);

    localStorage.setItem("veloraBag", String(totalQuantity));

    if (bagCount) {
        bagCount.textContent = totalQuantity;
    }
}

// Update immediately when the page loads
updateBagCount();

// LOGIN STATUS
let loggedIn = localStorage.getItem("veloraLoggedIn") === "true";

function updateNavbar() {
    if (!loginLink || !signupLink) return;

    if (loggedIn) {
        loginLink.textContent = "Account";
        loginLink.href = "#";

        signupLink.textContent = "Logout";
        signupLink.href = "#";

        signupLink.onclick = (event) => {
            event.preventDefault();

            localStorage.removeItem("veloraLoggedIn");
            loggedIn = false;

            updateNavbar();
            showToast("You have been logged out.");
        };
    } else {
        loginLink.textContent = "Login";
        loginLink.href = "login.html";

        signupLink.textContent = "Sign Up";
        signupLink.href = "login.html";

        signupLink.onclick = null;
    }
}

updateNavbar();

// ADD TO BAG
addButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!loggedIn) {
            localStorage.setItem(
                "veloraPendingProduct",
                button.dataset.product
            );

            window.location.href = "login.html";
            return;
        }

        const cart = getCart();
        const productName = button.dataset.product;

        const existing = cart.find(item => item.name === productName);

        if (existing) {
            existing.quantity = (Number(existing.quantity) || 0) + 1;
        } else {
            cart.push({
                name: productName,
                price: Number(button.dataset.price),
                category: button.dataset.category,
                image: button.dataset.image,
                quantity: 1
            });
        }

        localStorage.setItem("veloraCart", JSON.stringify(cart));

        updateBagCount();

        showToast(`${productName} added to your bag ✦`);

        setTimeout(() => {
            window.location.href = "cart.html";
        }, 600);
    });
});

// HEARTS
hearts.forEach(heart => {
    heart.addEventListener("click", () => {
        heart.classList.toggle("active");

        heart.textContent = heart.classList.contains("active")
            ? "♥"
            : "♡";
    });
});

// TOAST
function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// NEWSLETTER
if (newsletterForm && email && newsletterMessage) {
    newsletterForm.addEventListener("submit", event => {
        event.preventDefault();

        const value = email.value.trim();

        if (!value || !value.includes("@")) {
            newsletterMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        newsletterMessage.textContent =
            "Welcome to Velora. You're on the list ✦";

        newsletterForm.reset();
    });
}

// BACK TO TOP
if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");

        if (href === "#") return;

        const target = document.querySelector(href);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// CHECKOUT BUTTON
const checkoutBtn = document.querySelector("#checkout-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        const isLoggedIn =
            localStorage.getItem("veloraLoggedIn") === "true";

        if (isLoggedIn) {
            window.location.href = "checkout.html";
        } else {
            localStorage.setItem("redirectAfterLogin", "checkout.html");
            window.location.href = "login.html";
        }
    });
}

// THEME TOGGLE
const themeToggle = document.querySelector("#theme-toggle");
const themeBtn = document.querySelector("#theme-btn");

function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀" : "☾";
    }

    if (themeBtn) {
        themeBtn.textContent = theme === "dark" ? "☀" : "☾";
    }
}

let savedTheme = localStorage.getItem("veloraTheme") || "light";
applyTheme(savedTheme);

function toggleTheme() {
    savedTheme = savedTheme === "light" ? "dark" : "light";

    localStorage.setItem("veloraTheme", savedTheme);
    applyTheme(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
}

// SYNC BAG COUNT IF CART CHANGES IN ANOTHER TAB
window.addEventListener("storage", event => {
    if (event.key === "veloraCart" || event.key === "veloraBag") {
        updateBagCount();
    }
});