document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-search");
    const mobileOpenBtn = document.getElementById("mobile-open-search");
    const closeBtn = document.getElementById("close-search");
    const overlay = document.getElementById("search-overlay");
    const input = document.getElementById("product-search");
    const results = document.getElementById("search-results");
    const noResults = document.getElementById("no-results");
    const resultsLabel = document.getElementById("search-results-label");
    const resultCount = document.getElementById("search-result-count");

    if (!overlay || !input || !results) {
        console.error("VELORA Search: Required HTML elements are missing.");
        return;
    }

    function getProducts() {
        return Array.from(document.querySelectorAll("#shop .product"))
            .map(function (card) {
                const name = card.querySelector(".product-info h3");
                const category = card.querySelector(".product-info small");
                const price = card.querySelector(".product-info strong");
                const image = card.querySelector(".product-image img");

                if (!name || !image) return null;

                return {
                    name: name.textContent.trim(),
                    category: category ? category.textContent.trim() : "",
                    price: price ? price.textContent.trim() : "",
                    image: image.getAttribute("src") || "",
                    alt: image.getAttribute("alt") || name.textContent.trim(),
                    element: card
                };
            })
            .filter(Boolean);
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function renderResults(query = "") {
        const products = getProducts();
        const searchTerm = query.trim().toLowerCase();

        const matchedProducts = products.filter(function (product) {
            const searchableText =
                product.name + " " + product.category;

            return searchableText.toLowerCase().includes(searchTerm);
        });

        results.innerHTML = "";

        matchedProducts.forEach(function (product, index) {
            const originalIndex = products.indexOf(product);

            const card = document.createElement("button");
            card.type = "button";
            card.className = "search-result-card";
            card.dataset.productIndex = originalIndex;

            card.innerHTML = `
                <span class="search-result-image">
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.alt)}"
                        loading="lazy"
                    >
                </span>

                <span class="search-result-info">
                    <span class="search-result-category">
                        ${escapeHTML(product.category)}
                    </span>

                    <span class="search-result-name">
                        ${escapeHTML(product.name)}
                    </span>

                    <span class="search-result-price">
                        ${escapeHTML(product.price)}
                    </span>
                </span>

                <span class="search-result-arrow">↗</span>
            `;

            results.appendChild(card);
        });

        if (resultsLabel) {
            resultsLabel.textContent = searchTerm
                ? "SEARCH RESULTS"
                : "THE CURRENT FAVOURITES";
        }

        if (resultCount) {
            resultCount.textContent =
                matchedProducts.length +
                (matchedProducts.length === 1 ? " PIECE" : " PIECES");
        }

        if (noResults) {
            noResults.hidden = matchedProducts.length !== 0;
        }

        results.style.display = matchedProducts.length ? "grid" : "none";
    }

    function openSearch(event) {
        if (event) event.preventDefault();

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu) mobileMenu.classList.remove("active");

        input.value = "";
        renderResults();

        setTimeout(function () {
            input.focus();
        }, 100);
    }

    function closeSearch() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (openBtn) {
        openBtn.addEventListener("click", openSearch);
    }

    if (mobileOpenBtn) {
        mobileOpenBtn.addEventListener("click", openSearch);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeSearch);
    }

    input.addEventListener("input", function () {
        renderResults(input.value);
    });

    results.addEventListener("click", function (event) {
        const card = event.target.closest(".search-result-card");
        if (!card) return;

        const products = getProducts();
        const product = products[Number(card.dataset.productIndex)];

        if (!product) return;

        closeSearch();

        product.element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        product.element.classList.add("search-highlight");

        setTimeout(function () {
            product.element.classList.remove("search-highlight");
        }, 1800);
    });

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSearch();
        }
    });

    renderResults();
});