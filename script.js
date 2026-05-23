const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mobileNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
