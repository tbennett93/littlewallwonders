const PRODUCTS_FALLBACK = [
  {
    id: "rainbow-name-decal",
    category: "wall-decals",
    title: "Rainbow Name Decal",
    description: "A bright peel-and-stick rainbow design for nursery doors, cot corners and bedroom walls.",
    price: "From \u00a312.00",
    image: "assets/products/rainbow-name-decal.svg",
    etsyUrl: "https://www.etsy.com/uk/shop/littlewallwondersuk",
    featured: true
  },
  {
    id: "woodland-wall-set",
    category: "wall-decals",
    title: "Woodland Wall Set",
    description: "Playful trees, stars and mushrooms for a colourful woodland wall without muted nursery grey.",
    price: "From \u00a316.00",
    image: "assets/products/woodland-wall-set.svg",
    etsyUrl: "https://www.etsy.com/uk/shop/littlewallwondersuk",
    featured: true
  },
  {
    id: "sunshine-alphabet-print",
    category: "prints",
    title: "Sunshine Alphabet Print",
    description: "A cheerful alphabet print with bright shapes, warm colour and a clean professional finish.",
    price: "From \u00a38.00",
    image: "assets/products/sunshine-alphabet-print.svg",
    etsyUrl: "https://www.etsy.com/uk/shop/littlewallwondersuk",
    featured: true
  },
  {
    id: "playroom-shapes-print",
    category: "prints",
    title: "Playroom Shapes Print",
    description: "A bold geometric print for playrooms, gallery walls and little corners that need colour.",
    price: "From \u00a38.00",
    image: "assets/products/playroom-shapes-print.svg",
    etsyUrl: "https://www.etsy.com/uk/shop/littlewallwondersuk",
    featured: false
  }
];

const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function productCard(product) {
  const categoryLabel = product.category === "wall-decals" ? "Wall decals" : "Prints";
  const url = product.etsyUrl || "https://www.etsy.com/uk/shop/littlewallwondersuk";

  return `
    <article class="product-card">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" />
      <div class="product-body">
        <span class="product-kicker">${categoryLabel}</span>
        <h3>${escapeHtml(product.title)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-meta">
          <span class="price">${escapeHtml(product.price)}</span>
          <a class="product-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">View on Etsy</a>
        </div>
      </div>
    </article>
  `;
}

async function getProducts() {
  try {
    const response = await fetch("data/products.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Product data request failed");
    }
    return await response.json();
  } catch {
    return PRODUCTS_FALLBACK;
  }
}

async function renderProducts() {
  const targets = document.querySelectorAll("[data-products]");
  if (!targets.length) {
    return;
  }

  const products = await getProducts();

  targets.forEach((target) => {
    const category = target.dataset.category;
    const featuredOnly = target.dataset.featured === "true";
    const filtered = products.filter((product) => {
      if (featuredOnly && !product.featured) {
        return false;
      }
      return category ? product.category === category : true;
    });

    target.innerHTML = filtered.length
      ? filtered.map(productCard).join("")
      : '<p class="empty-state">No products are listed here yet. Add products to data/products.json.</p>';
  });
}

renderProducts();
