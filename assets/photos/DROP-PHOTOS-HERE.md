# Drop real photos here

The salon's real photos are on Facebook and Yelp, which are token/access-blocked for automated
download. Add real images here to replace the tasteful placeholders in the site.

## What to add

| File name        | Where it's used            | Ideal size / notes                          |
|------------------|----------------------------|---------------------------------------------|
| `hero.jpg`       | Hero (top of page)         | ~1200×1500 (4:5), a finished set or studio  |
| `gallery-1.jpg`  | Gallery tile (tall)        | ~800×1000                                    |
| `gallery-2.jpg`  | Gallery tile               | ~800×600                                     |
| `gallery-3.jpg`  | Gallery tile               | ~800×600                                     |
| `gallery-4.jpg`  | Gallery tile               | ~800×600                                     |
| `gallery-5.jpg`  | Gallery tile               | ~800×600                                     |
| `gallery-6.jpg`  | Gallery tile (wide)        | ~1200×600, e.g. spa pedicure                 |

Keep each file **under ~400 KB** (JPG/WebP, quality ~80). Real nail-art and clean-studio shots
work best.

## How to wire them in

1. **Hero** (`index.html`, look for `IMG-NEEDED: real hero photo`): replace the
   `.hero-photo` placeholder block with:
   ```html
   <img class="hero-photo" src="assets/photos/hero.jpg" alt="Freshly finished nails at Hydro Nails and Spa" width="1200" height="1500" />
   ```

2. **Gallery** (look for `IMG-NEEDED: real nail-art`): replace each `<figure class="tile">`
   with a lightbox-enabled image:
   ```html
   <figure class="tile tile-a">
     <a class="glightbox" href="assets/photos/gallery-1.jpg" data-gallery="hydro">
       <img src="assets/photos/gallery-1.jpg" alt="Dip powder set in soft blush" loading="lazy" />
     </a>
   </figure>
   ```
   The GLightbox script is already loaded and auto-initializes on `.glightbox` links.

Make the `<img>` fill its tile with `style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"`
(or add a small CSS rule).
