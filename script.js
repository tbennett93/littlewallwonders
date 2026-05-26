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

		<img 
		  class="${product.imageFit || "cover"}"
		  src="${escapeHtml(product.image)}"
		  alt="${escapeHtml(product.title)}"
		  loading="lazy"
		/>
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
const response = await fetch("data/products.json", { cache: "no-store" });
if (!response.ok) {
  throw new Error("Product data request failed");
}
return await response.json();
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
