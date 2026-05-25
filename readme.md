# Little Wall Wonders website

This is a static GitHub Pages site. It does not need a database or paid ecommerce system while checkout happens on Etsy.

## Pages

- `index.html` - home page
- `wall-decals.html` - wall decals product page
- `prints.html` - prints product page
- `about.html` - placeholder about page
- `contact.html` - contact page

## Updating products

Product data lives in:

```text
data/products.json
```

Each product has:

- `category`: use `wall-decals` or `prints`
- `title`
- `description`
- `price`
- `image`: path to an image in `assets/products`
- `etsyUrl`: the Etsy listing or shop URL
- `featured`: `true` if it should appear on the home page

Product images live in:

```text
assets/products
```

Add a new image there, then point the product's `image` value to it.

## Updating the logo

The logo used by the site is:

```text
assets/logo/logo.png
```

To test a new logo, replace that file with another image using the same file name. The CSS is currently tuned for the provided wide logo with white space around it, so a tightly cropped logo may need a small CSS adjustment in `.brand-logo`.

## Colour direction

The current palette is based on the logo:

- Primary: coral `#ff6f61`
- Secondary: mustard `#ffad14`
- Tertiary: teal `#72c4bd`
- Supporting blue: `#5c8fb8`
- Supporting pink: `#ffa1a7`

## Before launch

The pages currently use:

```html
<meta name="robots" content="noindex,nofollow" />
```

and `robots.txt` blocks crawling. This is deliberate while the site is under construction. Before launch, change those to allow indexing.
