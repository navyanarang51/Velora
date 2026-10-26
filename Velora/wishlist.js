
console.log("VELORA WISHLIST JS LOADED");

const WISHLIST_KEY = "veloraWishlist";

// Get saved products
function getWishlist() {
    try {
        const items = JSON.parse(localStorage.getItem(WISHLIST_KEY));
        return Array.isArray(items) ? items : [];
    } catch {
        return [];
    }
}

// Save products
function saveWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

// Show toast notification
function showWishlistToast(message) {
    let toast = document.getElementById("wishlist-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "wishlist-toast";
        toast.className = "wishlist-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.wishlistToastTimer);

    window.wishlistToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Update homepage hearts
function updateHearts() {
    const items = getWishlist();

    document.querySelectorAll("[data-wishlist-button]").forEach(button => {
        const saved = items.some(item => item.id === button.dataset.id);

        button.textContent = saved ? "♥" : "♡";
        button.classList.toggle("is-saved", saved);
        button.setAttribute("aria-pressed", String(saved));
    });
}

// Escape product text before inserting into HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Render wishlist page
function renderWishlist() {
    const grid = document.getElementById("wishlist-grid");

    if (!grid) return;

    const items = getWishlist();

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-wishlist">
                <div class="empty-heart">♡</div>
                <h2>Your wishlist is waiting.</h2>
                <p>Save your favourite pieces and find them here.</p>
                <a href="index.html#shop">EXPLORE COLLECTION</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => `
        <article class="wishlist-card">

            <img
                src="${escapeHTML(item.image)}"
                alt="${escapeHTML(item.name)}"
            >

            <div class="wishlist-info">
                <h3>${escapeHTML(item.name)}</h3>

                <p class="wishlist-price">
                    ₹${Number(item.price).toLocaleString("en-IN")}
                </p>

                <div class="wishlist-actions">

                    <button
                        type="button"
                        class="add wishlist-add-btn"
                        data-product="${escapeHTML(item.name)}"
                        data-price="${Number(item.price)}"
                        data-category="${escapeHTML(item.category || "DRESSES")}"
                        data-image="${escapeHTML(item.image)}">
                        ADD TO BAG <span>+</span>
                    </button>

                    <button
                        type="button"
                        class="remove-btn"
                        data-remove-id="${escapeHTML(item.id)}">
                        REMOVE
                    </button>

                </div>
            </div>
        </article>
    `).join("");
}

// Handle wishlist heart and remove clicks
document.addEventListener("click", function(event) {
    const heart = event.target.closest("[data-wishlist-button]");

    if (heart) {
        const product = {
            id: heart.dataset.id,
            name: heart.dataset.name,
            price: Number(heart.dataset.price),
            image: heart.dataset.image,
            category: heart.dataset.category || "DRESSES"
        };

        if (
            !product.id ||
            !product.name ||
            !product.image ||
            !Number.isFinite(product.price)
        ) {
            showWishlistToast("Unable to save this product.");
            return;
        }

        let items = getWishlist();

        const alreadySaved = items.some(
            item => item.id === product.id
        );

        if (alreadySaved) {
            items = items.filter(item => item.id !== product.id);
            saveWishlist(items);
            showWishlistToast("Removed from Wishlist");
        } else {
            items.push(product);
            saveWishlist(items);
            showWishlistToast("Added to Wishlist ♡");
        }

        updateHearts();
        renderWishlist();
        return;
    }

    const removeButton = event.target.closest("[data-remove-id]");

    if (removeButton) {
        const id = removeButton.dataset.removeId;

        saveWishlist(
            getWishlist().filter(item => item.id !== id)
        );

        updateHearts();
        renderWishlist();
        showWishlistToast("Removed from Wishlist");
    }
});

// Initialise
updateHearts();
renderWishlist();
