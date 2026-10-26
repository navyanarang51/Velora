
document.addEventListener("DOMContentLoaded", () => {
    const ORDERS_KEY = "veloraOrders";

    const ordersContainer = document.getElementById("orders-container");
    const emptyOrders = document.getElementById("empty-orders");

    const stages = [
        "Placed",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered"
    ];

    function money(amount) {
        return "₹" + Number(amount || 0).toLocaleString("en-IN");
    }

    function readOrders() {
        try {
            const orders = JSON.parse(
                localStorage.getItem(ORDERS_KEY) || "[]"
            );

            return Array.isArray(orders) ? orders : [];
        } catch {
            return [];
        }
    }

    function saveOrders(orders) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }

    function makeElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    function getStageIndex(status) {
        const index = stages.findIndex(
            stage => stage.toLowerCase() ===
                String(status || "Placed").toLowerCase()
        );

        return index === -1 ? 0 : index;
    }

    function getOrderTotal(order) {
        if (order.total !== undefined && Number.isFinite(Number(order.total))) {
            return Number(order.total);
        }

        const items = Array.isArray(order.items) ? order.items : [];

        const subtotal = items.reduce((sum, item) => {
            return sum +
                Math.max(0, Number(item.price) || 0) *
                Math.max(1, Number(item.quantity) || 1);
        }, 0);

        return subtotal
            - (Number(order.discount) || 0)
            + (Number(order.shipping) || 0)
            + (Number(order.giftWrap) || 0);
    }

    function formatDate(dateValue) {
        if (!dateValue) return "Date unavailable";

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function renderProducts(order) {
        const productsContainer = makeElement("div", "order-products");
        const items = Array.isArray(order.items) ? order.items : [];

        if (items.length === 0) {
            productsContainer.appendChild(
                makeElement("p", "product-meta", "No product details available.")
            );

            return productsContainer;
        }

        items.forEach(item => {
            const product = makeElement("div", "order-product");

            const imageSource = item.image || item.img || "";
            let imageElement;

            if (imageSource) {
                imageElement = makeElement("img", "product-image");
                imageElement.src = imageSource;
                imageElement.alt = item.name || item.title || "Product";

                imageElement.addEventListener("error", () => {
                    const placeholder = makeElement(
                        "div",
                        "product-image-placeholder",
                        "♡"
                    );

                    imageElement.replaceWith(placeholder);
                }, { once: true });
            } else {
                imageElement = makeElement(
                    "div",
                    "product-image-placeholder",
                    "♡"
                );
            }

            const info = makeElement("div", "product-info");

            const name = makeElement(
                "h4",
                "product-name",
                item.name || item.title || "VELORA Product"
            );

            const quantity = Math.max(1, Number(item.quantity) || 1);
            const price = Math.max(0, Number(item.price) || 0);

            let metaText = `Qty: ${quantity}`;

            if (item.size) {
                metaText += ` · Size: ${item.size}`;
            }

            if (item.color) {
                metaText += ` · Colour: ${item.color}`;
            }

            const meta = makeElement("p", "product-meta", metaText);

            info.append(name, meta);

            const priceElement = makeElement(
                "strong",
                "product-price",
                money(price * quantity)
            );

            product.append(imageElement, info, priceElement);
            productsContainer.appendChild(product);
        });

        return productsContainer;
    }

    function renderDetails(order) {
        const details = makeElement("div", "order-details");

        const payment = order.paymentMethod || "Not specified";
        const customer = order.customer || {};

        const detailItems = [
            ["Payment method", payment],
            ["Items", (order.items || []).reduce(
                (sum, item) => sum + Math.max(1, Number(item.quantity) || 1),
                0
            )],
            ["Deliver to", customer.city || "Address unavailable"]
        ];

        detailItems.forEach(([label, value]) => {
            const block = makeElement("div", "detail-block");

            block.append(
                makeElement("p", "detail-label", label),
                makeElement("p", "detail-value", value)
            );

            details.appendChild(block);
        });

        return details;
    }

    function renderTimeline(order) {
        const section = makeElement("section", "tracking-section");

        const heading = makeElement("div", "tracking-heading");

        heading.append(
            makeElement("h3", "", "Delivery progress"),
            makeElement(
                "p",
                "",
                `Status: ${order.status || "Placed"}`
            )
        );

        const timeline = makeElement("div", "tracking-timeline");
        const activeIndex = getStageIndex(order.status);

        stages.forEach((stage, index) => {
            const step = makeElement(
                "div",
                "tracking-step" + (index <= activeIndex ? " completed" : "")
            );

            const circle = makeElement(
                "div",
                "step-circle",
                index <= activeIndex ? "✓" : String(index + 1)
            );

            const label = makeElement("p", "step-label", stage);

            step.append(circle, label);
            timeline.appendChild(step);
        });

        section.append(heading, timeline);

        return section;
    }

    function renderOrder(order, orders) {
        const card = makeElement("article", "order-card");

        // Order heading
        const header = makeElement("div", "order-header");
        const orderInfo = makeElement("div", "order-info");

        orderInfo.append(
            makeElement("p", "order-label", "Order ID"),
            makeElement("p", "order-id", order.id || "VEL-UNKNOWN"),
            makeElement("p", "order-date", `Placed on ${formatDate(order.date)}`)
        );

        const status = makeElement(
            "span",
            "status-badge",
            order.status || "Placed"
        );

        header.append(orderInfo, status);

        // Products and order details
        const products = renderProducts(order);
        const details = renderDetails(order);

        // Total
        const footer = makeElement("div", "order-footer");
        const totalInfo = makeElement("div", "total-info");

        totalInfo.append(
            makeElement("p", "order-total-label", "Order total"),
            makeElement("p", "order-total", money(getOrderTotal(order)))
        );

        // Demo tracking controls
        const actions = makeElement("div", "tracking-actions");
        const currentIndex = getStageIndex(order.status);

        const advanceButton = makeElement(
            "button",
            "primary-button",
            currentIndex === stages.length - 1
                ? "DELIVERED ✓"
                : "ADVANCE DEMO STATUS →"
        );

        advanceButton.type = "button";
        advanceButton.disabled = currentIndex === stages.length - 1;

        advanceButton.addEventListener("click", () => {
            const latestOrders = readOrders();

            const orderIndex = latestOrders.findIndex(
                savedOrder => savedOrder.id === order.id
            );

            if (orderIndex === -1) return;

            const latestIndex = getStageIndex(
                latestOrders[orderIndex].status
            );

            if (latestIndex < stages.length - 1) {
                latestOrders[orderIndex].status = stages[latestIndex + 1];

                saveOrders(latestOrders);
                renderAllOrders();
            }
        });

        const shopButton = makeElement(
            "a",
            "secondary-button",
            "CONTINUE SHOPPING"
        );

        shopButton.href = "index.html";

        actions.append(advanceButton, shopButton);
        footer.append(totalInfo, actions);

        card.append(
            header,
            products,
            details,
            renderTimeline(order),
            footer
        );

        return card;
    }

    function renderAllOrders() {
        const orders = readOrders();

        ordersContainer.replaceChildren();

        if (orders.length === 0) {
            emptyOrders.hidden = false;
            return;
        }

        emptyOrders.hidden = true;

        // Newest orders first
        orders
            .slice()
            .reverse()
            .forEach(order => {
                ordersContainer.appendChild(
                    renderOrder(order, orders)
                );
            });
    }

    renderAllOrders();
});
