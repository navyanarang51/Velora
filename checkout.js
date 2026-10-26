
document.addEventListener("DOMContentLoaded", () => {
    const CART_KEY = "veloraCart";
    const SETTINGS_KEY = "veloraCartSettings";
    const ORDERS_KEY = "veloraOrders";

    const cartItemsContainer = document.getElementById("summary-lines");
    const subtotalElement = document.getElementById("sum-subtotal");
    const discountElement = document.getElementById("sum-discount");
    const shippingElement = document.getElementById("sum-shipping");
    const giftElement = document.getElementById("sum-gift");
    const totalElement = document.getElementById("sum-total");

    const checkoutForm = document.getElementById("checkout-form");

    const formatPrice = (amount) =>
        `₹${Number(amount).toLocaleString("en-IN")}`;

    function getCart() {
        try {
            const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
            return Array.isArray(cart) ? cart : [];
        } catch {
            return [];
        }
    }

    function getSettings() {
        try {
            return JSON.parse(
                localStorage.getItem(SETTINGS_KEY) || "{}"
            ) || {};
        } catch {
            return {};
        }
    }

    function getQuantity(item) {
        return Math.max(1, Number(item.quantity) || 1);
    }

    function getPrice(item) {
        return Math.max(0, Number(item.price) || 0);
    }

    function calculateTotals(cart) {
        const subtotal = cart.reduce((sum, item) => {
            return sum + getPrice(item) * getQuantity(item);
        }, 0);

        const discount = 0;

        const shipping =
            subtotal === 0 || subtotal >= 5000 ? 0 : 199;

        const settings = getSettings();
        const giftWrap = settings.giftWrap ? 149 : 0;

        const total = subtotal - discount + shipping + giftWrap;

        return {
            subtotal,
            discount,
            shipping,
            giftWrap,
            total
        };
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function renderCartItems(cart) {
        if (!cartItemsContainer) return;

        cartItemsContainer.replaceChildren();

        if (cart.length === 0) {
            const emptyMessage = createElement(
                "p",
                "checkout-empty",
                "Your bag is empty."
            );

            const shopLink = createElement("a", "", "Continue shopping");
            shopLink.href = "index.html";

            cartItemsContainer.append(emptyMessage, shopLink);
            return;
        }

        cart.forEach((item) => {
            const row = createElement("div", "checkout-item");

            const image = createElement("img", "checkout-item-image");
            image.src = item.image || item.img || "";
            image.alt = item.name || item.title || "Product";

            const details = createElement("div", "checkout-item-details");

            const name = createElement(
                "p",
                "checkout-item-name",
                item.name || item.title || "VELORA Product"
            );

            const quantity = getQuantity(item);
            const price = getPrice(item);

            const description = createElement(
                "p",
                "checkout-item-description",
                `${formatPrice(price)} × ${quantity}`
            );

            if (item.size) {
                description.textContent += ` · Size: ${item.size}`;
            }

            if (item.color) {
                description.textContent += ` · Colour: ${item.color}`;
            }

            details.append(name, description);

            const itemTotal = createElement(
                "strong",
                "checkout-item-total",
                formatPrice(price * quantity)
            );

            row.append(image, details, itemTotal);
            cartItemsContainer.appendChild(row);
        });
    }

    function updateAmount(element, amount) {
        if (element) {
            element.textContent = formatPrice(amount);
        }
    }

    function renderSummary() {
        const cart = getCart();
        const totals = calculateTotals(cart);

        renderCartItems(cart);

        updateAmount(subtotalElement, totals.subtotal);
        updateAmount(discountElement, totals.discount);
        updateAmount(shippingElement, totals.shipping);
        updateAmount(giftElement, totals.giftWrap);
        updateAmount(totalElement, totals.total);

        const emptyCart = cart.length === 0;

        if (checkoutForm) {
            const submitButton = checkoutForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = emptyCart;
            }
        }

        return { cart, totals };
    }

    // Keep the checkout totals synced with the cart.
    const currentOrder = renderSummary();

    // Delivery PIN code estimator.
    const pinInput = document.getElementById("pincode");
    const deliveryMessage = document.getElementById("delivery-message");

    if (pinInput && deliveryMessage) {
        pinInput.addEventListener("input", () => {
            const pin = pinInput.value.trim();

            if (!pin) {
                deliveryMessage.textContent = "";
                return;
            }

            if (!/^[1-9][0-9]{5}$/.test(pin)) {
                deliveryMessage.textContent =
                    "Enter a valid 6-digit PIN code.";
                return;
            }

            const start = new Date();
            start.setDate(start.getDate() + 4);

            const end = new Date();
            end.setDate(end.getDate() + 7);

            const options = {
                day: "numeric",
                month: "short"
            };

            deliveryMessage.textContent =
                `Estimated delivery: ${start.toLocaleDateString("en-IN", options)} – ${end.toLocaleDateString("en-IN", options)}.`;
        });
    }

    // Place order.
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const { cart, totals } = renderSummary();

            if (cart.length === 0) {
                alert("Your bag is empty. Add a product before checkout.");
                return;
            }

            if (!checkoutForm.reportValidity()) {
                return;
            }

            const formData = new FormData(checkoutForm);
            const customer = Object.fromEntries(formData.entries());

            const paymentInput = checkoutForm.querySelector(
                'input[name="payment"]:checked'
            );

            const paymentMethod = paymentInput
                ? paymentInput.value
                : "COD";

            const settings = getSettings();

            const order = {
                id: "VEL-" + Date.now(),
                date: new Date().toISOString(),
                customer,
                paymentMethod,
                items: cart,
                subtotal: totals.subtotal,
                discount: totals.discount,
                shipping: totals.shipping,
                giftWrap: totals.giftWrap,
                giftMessage: settings.giftMessage || "",
                total: totals.total,
                status: "Placed"
            };

            let orders = [];

            try {
                orders = JSON.parse(
                    localStorage.getItem(ORDERS_KEY) || "[]"
                );

                if (!Array.isArray(orders)) {
                    orders = [];
                }
            } catch {
                orders = [];
            }

            orders.push(order);

            try {
                localStorage.setItem(
                    ORDERS_KEY,
                    JSON.stringify(orders)
                );
            } catch {
                alert("Unable to save your order. Please try again.");
                return;
            }

            // Clear the bag only after saving the order.
            localStorage.removeItem(CART_KEY);
            localStorage.removeItem(SETTINGS_KEY);

            alert(
                `Thank you for shopping with VELORA!\n\n` +
                `Order ID: ${order.id}\n` +
                `Total: ${formatPrice(order.total)}\n` +
                `Payment: ${paymentMethod}\n\n` +
                `Your demo order has been placed.`
            );

            window.location.href = "index.html";
        });
    }
});
