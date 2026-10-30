const imageFiles = [
    "img4.jpg", "img15.jpg", "img18.jpg", "img21.jpg",
    "img24.jpg", "img27.jpg", "img30.jpg", "img33.jpg",
    "img38.jpg", "img41.jpg", "img44.jpg", "img47.jpg",
    "img50.jpg", "img53.jpg", "img56.jpg", "img59.jpg",
    "img64.jpg", "img67.jpg", "img70.jpg", "img73.jpg",
    "img76.jpg", "img81.jpg", "img84.jpg", "img89.jpg",
    "img92.jpg", "img95.jpg", "img98.jpg", "img101.jpg",
    "img104.jpg", "img107.jpg", "img112.jpg", "img115.jpg",
    "img118.jpg", "img121.jpg", "img124.jpg", "img127.jpg",
    "img130.jpg", "img133.jpg", "img138.jpg", "img141.jpg",
    "img144.jpg", "img148.jpg", "img151.jpg", "img154.jpg",
    "img157.jpg", "img160.jpg", "img165.jpg", "img168.jpg",
    "img171.jpg", "img174.jpg", "img177.jpg", "img180.jpg"
];

const categories = [
    "DRESSES",
    "TOPS",
    "SKIRTS",
    "DENIM",
    "CO-ORDS",
    "CASUAL WEAR"
];

const prices = [1499, 899, 1299, 999, 1599, 1199];

const productNames = [
    "Cloud Dress",
    "Soft Touch Top",
    "Lace Mini",
    "Classic Denim",
    "Everyday Co-ord",
    "Casual Essential"
];

const productsGrid = document.getElementById("productsGrid");

imageFiles.forEach((filename, index) => {

    const nameIndex = index % productNames.length;

    const productName = productNames[nameIndex];
    const category = categories[nameIndex];
    const price = prices[nameIndex];

    const imagePath = "images/" + filename;

    const product = document.createElement("article");
    product.className = "product";

    product.innerHTML = `
        <div class="product-image">

            <button class="heart"
                type="button"
                data-wishlist-button
                data-id="${filename}"
                data-name="${productName}"
                data-price="${price}"
                data-image="${imagePath}"
                aria-label="Add ${productName} to wishlist">
                ♡
            </button>

            <img src="${imagePath}" alt="${productName}">

            <button class="add"
                type="button"
                data-product="${productName}"
                data-price="${price}"
                data-category="${category}"
                data-image="${imagePath}">
                ADD TO BAG <span>+</span>
            </button>

        </div>

        <div class="product-info">

            <div>
                <small>${category}</small>
                <h3>${productName}</h3>
            </div>

            <strong>₹${price.toLocaleString("en-IN")}</strong>

        </div>
    `;

    productsGrid.appendChild(product);

});