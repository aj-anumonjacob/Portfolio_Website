# Anumon Jacob — Portfolio

A single-page portfolio built with plain HTML, CSS and vanilla JavaScript. It has no framework, no build step and no dependencies beyond Google Fonts.

```
index.html          Page markup, SEO tags and JSON-LD
css/styles.css      Design tokens, layout, animations, light/dark themes
js/main.js          Theme toggle, typing editor, reveals, counters, contact form
assets/favicon.svg  "AJ" gradient tile
assets/og-image.png 1200×630 social sharing image
```

## Preview locally

Double-click `index.html`. It works straight from the file system.

To preview through a local server instead, which is closer to how the live site behaves:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy free on GitHub Pages

1. Create a new repository on GitHub, for example `portfolio`.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/aj-anumonjacob/portfolio.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`, and save.
4. After a minute or so the site is live at `https://aj-anumonjacob.github.io/portfolio/`.

> If you name the repository `aj-anumonjacob.github.io`, the site is served at `https://aj-anumonjacob.github.io/` without the `/portfolio` path.

## Deploy free on Netlify (drag and drop)

1. Sign in at <https://app.netlify.com>.
2. Go to **Sites → Add new site → Deploy manually**.
3. Drag this whole folder (the one that contains `index.html`) onto the drop zone.
4. Netlify gives you a URL like `https://random-name.netlify.app`. You can rename it under **Site configuration → Change site name**.

To update the site, drag the folder onto **Deploys** again.

## Connect a custom domain

Buy a domain from any registrar, such as Namecheap, GoDaddy or Cloudflare.

**GitHub Pages**
1. Go to **Settings → Pages → Custom domain**, enter `yourdomain.com` and save. GitHub adds a `CNAME` file to the repository.
2. At your registrar, add these DNS records:
   - Four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
   - A `CNAME` record for `www` pointing to `aj-anumonjacob.github.io`.
3. Once DNS has propagated, tick **Enforce HTTPS**.

**Netlify**
1. Go to **Domain management → Add a domain** and enter `yourdomain.com`.
2. Either switch your registrar's nameservers to the ones Netlify shows (the simplest option), or add:
   - An `A` record for `@` pointing to `75.2.60.5`.
   - A `CNAME` record for `www` pointing to `your-site.netlify.app`.
3. Netlify issues a free HTTPS certificate automatically.

DNS changes usually take effect within an hour, but they can take up to 48 hours.

## After you have a final URL

Social networks need **absolute** URLs for the preview image. In `index.html`, replace the two relative image paths:

```html
<meta property="og:image" content="https://yourdomain.com/assets/og-image.png">
<meta name="twitter:image" content="https://yourdomain.com/assets/og-image.png">
```

You can also add `<meta property="og:url" content="https://yourdomain.com/">` and a `<link rel="canonical" href="https://yourdomain.com/">`.

## Editing notes

- **Colours and fonts** are CSS custom properties at the top of `css/styles.css`. The light theme is on `:root` and the dark theme is in the two blocks below it.
- **Rotating hero words** are the `<span>`s inside `#rot` in `index.html`. Also update the hidden screen-reader line just before it.
- **Typed code** is written directly in `index.html` inside `<pre id="code">`. The script re-types whatever is there, so edit only the HTML.
- **Contact form** has no backend. It opens WhatsApp (`wa.me/971504039037`) or your email app with the message already filled in.
- **Theme choice** is saved in `localStorage` under `aj-theme`.
- **Accessibility:** the site honours `prefers-reduced-motion`, which turns off animations, shows the code in full and shows final counter values. It also works with JavaScript turned off.
