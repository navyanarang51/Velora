/* VELORA CART PLUS
   Keeps the existing "veloraCart" key.
   Demo-only front-end: live inventory, account sync and payments require a backend.
*/
(() => {
    "use strict";

    const CART_KEY = "veloraCart";
    const WISHLIST_KEY = "veloraWishlist";
    const SAVED_KEY = "veloraSavedForLater";
    const SETTINGS_KEY = "veloraCartSettings";
    const SHIPPING_THRESHOLD = 5000;
    const GIFT_WRAP_PRICE = 149;

    const $ = selector => document.querySelector(selector);
    const cartItemsElement = $("#cart-items");
    const subtotalElement = $("#subtotal");
    const totalElement = $("#total");
    const checkoutButton = $("#checkout-btn");

    const recommendationProducts = [
        {
            id: "velora-recommend-cloud-dress",
            name: "Cloud Dress",
            price: 7900,
            category: "DRESSES",
            image: "images/dress.jpg",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Ivory", "Black", "Mocha"],
            stock: 6
        },
        {
            id: "velora-recommend-sculpted-skirt",
            name: "Sculpted Skirt",
            price: 3200,
            category: "BOTTOMS",
            image: "images/skirt.jpg",
            sizes: ["XS", "S", "M", "L"],
            colors: ["Espresso", "Ivory"],
            stock: 4
        },
        {
            id: "velora-recommend-denim",
            name: "Everyday Denim",
            price: 2800,
            category: "DENIM",
            image: "images/jeans.jpg",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Blue", "Black"],
            stock: 8
        },
        {
            id: "velora-recommend-heels",
            name: "The Evening Heel",
            price: 4500,
            category: "SHOES",
            image: "images/heels.jpg",
            sizes: ["36", "37", "38", "39", "40", "41"],
            colors: ["Black", "Nude"],
            stock: 3
        }
    ];

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.warn(`VELORA: could not read ${key}`, error);
            return [];
        }
    }

    function readSettings() {
        try {
            const value = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
            return {
                giftWrap: Boolean(value.giftWrap),
                giftMessage: typeof value.giftMessage === "string" ? value.giftMessage : ""
            };
        } catch {
            return { giftWrap: false, giftMessage: "" };
        }
    }

    let cart = readArray(CART_KEY).map(normalizeProduct);
    let savedItems = readArray(SAVED_KEY).map(normalizeProduct);
    let wishlist = readArray(WISHLIST_KEY);
    let settings = readSettings();

    function normalizeProduct(item) {
        const safe = item && typeof item === "object" ? item : {};
        return {
            id: String(safe.id || safe.productId || safe.name || `velora-${Math.random().toString(36).slice(2, 9)}`),
            name: String(safe.name || safe.product || "VELORA piece"),
            price: Math.max(0, Number(safe.price) || 0),
            quantity: Math.max(1, Math.floor(Number(safe.quantity) || 1)),
            image: String(safe.image || "images/dress.jpg"),
            category: String(safe.category || "VELORA"),
            size: String(safe.size || ""),
            color: String(safe.color || safe.colour || ""),
            sizes: Array.isArray(safe.sizes) ? safe.sizes.map(String) : [],
            colors: Array.isArray(safe.colors) ? safe.colors.map(String) : (Array.isArray(safe.colours) ? safe.colours.map(String) : []),
            stock: Number.isFinite(Number(safe.stock)) && safe.stock !== "" ? Math.max(0, Number(safe.stock)) : null
        };
    }

    function saveCart() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            showNotice("Your browser couldn't save these changes. Check its storage settings.");
            console.error("VELORA storage error:", error);
        }
        updateBagCount();
    }

    function formatPrice(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(Number(amount) || 0);
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
    }

    function updateBagCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll("#bag-count, [data-cart-count]").forEach(element => {
            element.textContent = String(count);
            element.setAttribute("aria-label", `${count} items in bag`);
        });
    }

    function showNotice(message) {
        const notice = $("#cart-notice");
        if (notice) {
            notice.textContent = message;
            notice.hidden = false;
        }
    }

    function cartSubtotal() {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function shippingCost(subtotal) {
        return subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 199;
    }

    function giftCost() {
        return settings.giftWrap ? GIFT_WRAP_PRICE : 0;
    }

    function itemKey(item) {
        return `${item.id}::${item.size}::${item.color}`;
    }

    function renderShippingProgress(subtotal) {
        const fill = $("#shipping-progress-fill");
        const message = $("#shipping-progress-message");
        const progress = $("#shipping-progress");
        if (!fill || !message || !progress) return;

        const percent = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);
        fill.style.width = `${percent}%`;
        progress.setAttribute("aria-valuenow", String(Math.round(percent)));

        if (subtotal >= SHIPPING_THRESHOLD) {
            message.textContent = "You've unlocked complimentary shipping.";
        } else if (subtotal === 0) {
            message.textContent = `Add ${formatPrice(SHIPPING_THRESHOLD)} to unlock complimentary shipping.`;
        } else {
            message.textContent = `Add ${formatPrice(SHIPPING_THRESHOLD - subtotal)} more to unlock free shipping.`;
        }
    }

    function variantSelect(options, selected, type, index) {
        if (!options.length) {
            return `<span class="variant-missing">${type === "size" ? "Size not specified" : "Colour not specified"}</span>`;
        }
        const safeSelected = String(selected || "");
        return `
            <label class="variant-control">
                <span>${type === "size" ? "SIZE" : "COLOUR"}</span>
                <select data-variant="${type}" data-index="${index}" aria-label="Choose ${type}">
                    <option value="">Choose ${type}</option>
                    ${options.map(option => `<option value="${escapeHTML(option)}" ${option === safeSelected ? "selected" : ""}>${escapeHTML(option)}</option>`).join("")}
                </select>
            </label>
        `;
    }

    function renderCart() {
        if (!cartItemsElement || !subtotalElement || !totalElement) return;

        if (!cart.length) {
            cartItemsElement.innerHTML = `
                <div class="empty">
                    <span class="empty-mark" aria-hidden="true">V.</span>
                    <p class="eyebrow">A LITTLE ROOM FOR SOMETHING NEW</p>
                    <h2>Your bag is <em>waiting.</em></h2>
                    <p>Looks like you haven't found your next favourite piece yet.</p>
                    <a href="index.html#shop" class="shop-btn">EXPLORE THE COLLECTION <span aria-hidden="true">↗</span></a>
                </div>`;
        } else {
            cartItemsElement.innerHTML = cart.map((item, index) => {
                const name = escapeHTML(item.name);
                const image = escapeHTML(item.image);
                const category = escapeHTML(item.category);
                const itemTotal = item.price * item.quantity;
                let stockText = "";
                if (item.stock !== null) {
                    stockText = item.stock <= 3
                        ? `<p class="stock-note ${item.stock === 0 ? "stock-out" : ""}">${item.stock === 0 ? "Currently out of stock" : `Only ${item.stock} left · demo inventory`}</p>`
                        : `<p class="stock-note">Availability shown from product data</p>`;
                }
                return `
                    <article class="cart-item">
                        <a class="cart-image" href="index.html#shop" aria-label="Continue shopping">
                            <img src="${image}" alt="${name}" loading="lazy"
                                 onerror="this.onerror=null;this.src='images/dress.jpg';">
                        </a>
                        <div class="item-info">
                            <div class="item-details">
                                <span class="item-category">${category}</span>
                                <h2 class="item-name">${name}</h2>
                                <p class="item-price">${formatPrice(item.price)}</p>
                                ${stockText}
                                <div class="variant-grid">
                                    ${variantSelect(item.sizes, item.size, "size", index)}
                                    ${variantSelect(item.colors, item.color, "color", index)}
                                </div>
                            </div>
                            <div class="item-actions">
                                <div class="qty" aria-label="Quantity controls for ${name}">
                                    <button type="button" data-quantity="-1" data-index="${index}" aria-label="Decrease quantity" ${item.quantity <= 1 ? "disabled" : ""}>−</button>
                                    <span aria-live="polite">${item.quantity}</span>
                                    <button type="button" data-quantity="1" data-index="${index}" aria-label="Increase quantity" ${item.stock !== null && item.quantity >= item.stock ? "disabled" : ""}>+</button>
                                </div>
                                <button type="button" class="text-action" data-save-index="${index}">SAVE FOR LATER</button>
                                <button type="button" class="text-action" data-wishlist-index="${index}">MOVE TO WISHLIST</button>
                                <button type="button" class="text-action remove" data-remove-index="${index}">REMOVE</button>
                            </div>
                        </div>
                        <div class="item-total">
                            <span class="item-total-label">ITEM TOTAL</span>
                            <strong>${formatPrice(itemTotal)}</strong>
                        </div>
                    </article>`;
            }).join("");
        }

        const subtotal = cartSubtotal();
        const shipping = shippingCost(subtotal);
        const gift = giftCost();
        const total = subtotal + shipping + gift;

        subtotalElement.textContent = formatPrice(subtotal);
        totalElement.textContent = formatPrice(total);
        $("#shipping-cost").textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
        $("#gift-wrap-cost").textContent = gift ? formatPrice(gift) : "—";
        $("#gift-wrap-toggle").checked = settings.giftWrap;
        $("#gift-message").value = settings.giftMessage;
        $("#gift-message-wrap").hidden = !settings.giftWrap;
        if (checkoutButton) checkoutButton.disabled = cart.length === 0;
        renderShippingProgress(subtotal);
        renderSavedItems();
        renderRecommendations();
        updateBagCount();
    }

    function changeQuantity(index, change) {
        const item = cart[index];
        if (!item) return;

        const next = item.quantity + change;
        if (next < 1) return;
        if (item.stock !== null && next > item.stock) {
            showNotice("That quantity exceeds the available stock recorded for this item.");
            return;
        }

        item.quantity = next;
        saveCart();
        renderCart();
    }

    function removeItem(index) {
        if (!cart[index]) return;
        const name = cart[index].name;
        cart.splice(index, 1);
        saveCart();
        renderCart();
        showNotice(`${name} removed from your bag.`);
    }

    function saveForLater(index) {
        const item = cart[index];
        if (!item) return;
        if (!savedItems.some(saved => itemKey(saved) === itemKey(item))) {
            savedItems.push({ ...item, quantity: 1 });
        }
        cart.splice(index, 1);
        saveCart();
        renderCart();
        showNotice(`${item.name} saved for later.`);
    }

    function moveToWishlist(index) {
        const item = cart[index];
        if (!item) return;

        const wishlistItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            size: item.size,
            color: item.color
        };

        const existing = wishlist.find(saved =>
            String(saved.id || saved.productId || saved.name) === item.id
        );
        if (!existing) wishlist.push(wishlistItem);

        cart.splice(index, 1);
        saveCart();
        renderCart();
        showNotice(`${item.name} moved to your wishlist.`);
    }

    function restoreSavedItem(index) {
        const item = savedItems[index];
        if (!item) return;
        const existing = cart.find(cartItem => itemKey(cartItem) === itemKey(item));
        if (existing) existing.quantity += 1;
        else cart.push({ ...item, quantity: 1 });

        savedItems.splice(index, 1);
        saveCart();
        renderCart();
        showNotice(`${item.name} moved back to your bag.`);
    }

    function removeSavedItem(index) {
        if (!savedItems[index]) return;
        savedItems.splice(index, 1);
        saveCart();
        renderCart();
    }

    function renderSavedItems() {
        const container = $("#saved-items");
        const section = $("#saved-section");
        if (!container || !section) return;
        section.hidden = savedItems.length === 0;

        container.innerHTML = savedItems.map((item, index) => `
            <article class="saved-item">
                <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy"
                     onerror="this.onerror=null;this.src='images/dress.jpg';">
                <div class="saved-info">
                    <span class="item-category">${escapeHTML(item.category)}</span>
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>${formatPrice(item.price)}</p>
                    <div class="saved-actions">
                        <button type="button" class="text-action" data-restore-saved="${index}">MOVE TO BAG</button>
                        <button type="button" class="text-action remove" data-delete-saved="${index}">REMOVE</button>
                    </div>
                </div>
            </article>`).join("");
    }

    function renderRecommendations() {
        const container = $("#recommendation-items");
        if (!container) return;

        const inCart = new Set(cart.map(item => item.id));
        const choices = recommendationProducts.filter(product => !inCart.has(product.id)).slice(0, 4);

        container.innerHTML = choices.map(product => `
            <article class="recommendation-card">
                <div class="recommendation-image">
                    <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy"
                         onerror="this.onerror=null;this.src='images/dress.jpg';">
                    <span class="recommendation-tag">THE VELORA EDIT</span>
                </div>
                <div class="recommendation-info">
                    <span class="item-category">${escapeHTML(product.category)}</span>
                    <h3>${escapeHTML(product.name)}</h3>
                    <p>${formatPrice(product.price)}</p>
                    <button type="button" class="recommendation-add" data-add-recommendation="${escapeHTML(product.id)}">ADD TO BAG <span aria-hidden="true">+</span></button>
                </div>
            </article>`).join("");
    }

    function addRecommendation(productId) {
        const product = recommendationProducts.find(item => item.id === productId);
        if (!product) return;

        const already = cart.find(item => item.id === product.id && !item.size && !item.color);
        if (already) already.quantity += 1;
        else cart.push({ ...product, quantity: 1, size: "", color: "" });

        saveCart();
        renderCart();
        showNotice(`${product.name} added to your bag. Choose a size and colour if required.`);
    }

    cartItemsElement?.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;

        if (button.hasAttribute("data-quantity")) {
            changeQuantity(Number(button.dataset.index), Number(button.dataset.quantity));
        } else if (button.hasAttribute("data-remove-index")) {
            removeItem(Number(button.dataset.removeIndex));
        } else if (button.hasAttribute("data-save-index")) {
            saveForLater(Number(button.dataset.saveIndex));
        } else if (button.hasAttribute("data-wishlist-index")) {
            moveToWishlist(Number(button.dataset.wishlistIndex));
        }
    });

    cartItemsElement?.addEventListener("change", event => {
        const select = event.target.closest("select[data-variant]");
        if (!select) return;

        const item = cart[Number(select.dataset.index)];
        if (!item) return;
        const type = select.dataset.variant;
        const nextValue = select.value;

        if (type === "size") item.size = nextValue;
        if (type === "color") item.color = nextValue;

        // Merge identical product/size/colour combinations.
        const currentIndex = Number(select.dataset.index);
        const key = itemKey(item);
        const duplicateIndex = cart.findIndex((candidate, index) => index !== currentIndex && itemKey(candidate) === key);
        if (duplicateIndex !== -1) {
            cart[duplicateIndex].quantity += item.quantity;
            cart.splice(currentIndex, 1);
        }

        saveCart();
        renderCart();
    });

    $("#saved-items")?.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.hasAttribute("data-restore-saved")) restoreSavedItem(Number(button.dataset.restoreSaved));
        if (button.hasAttribute("data-delete-saved")) removeSavedItem(Number(button.dataset.deleteSaved));
    });

    $("#recommendation-items")?.addEventListener("click", event => {
        const button = event.target.closest("[data-add-recommendation]");
        if (button) addRecommendation(button.dataset.addRecommendation);
    });

    $("#gift-wrap-toggle")?.addEventListener("change", event => {
        settings.giftWrap = event.target.checked;
        saveCart();
        renderCart();
    });

    $("#gift-message")?.addEventListener("input", event => {
        settings.giftMessage = event.target.value.slice(0, 180);
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.warn("Could not save gift message", error);
        }
    });

    checkoutButton?.addEventListener("click", () => {
        if (!cart.length) {
            showNotice("Your bag is empty. Explore the collection to find your next favourite piece.");
            return;
        }

        const hasRequiredVariant = cart.some(item =>
            (item.sizes.length && !item.size) || (item.colors.length && !item.color)
        );
        if (hasRequiredVariant) {
            showNotice("Please choose a size and colour for each item that offers those options before checkout.");
            return;
        }

        const loggedIn = localStorage.getItem("veloraLoggedIn") === "true";
        if (!loggedIn) {
            localStorage.setItem("redirectAfterLogin", "cart.html");
            window.location.href = "login.html";
            return;
        }

        window.location.href = "checkout.html";
    });

    saveCart();
    renderCart();
})();
