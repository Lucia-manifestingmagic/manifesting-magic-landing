# Manifesting Magic — landing page

Static landing page for Manifesting Magic Agency. Step 1 of a VSL → book-a-call
funnel. Vanilla HTML/CSS/JS, no build step, no framework, no npm.

```
index.html    markup and copy
styles.css    all styles, banded by section in page order
script.js     scroll reveal, sticky mobile CTA
```

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

## Three placeholders to swap before launch

| Marker | What to do |
|---|---|
| `#vsl` | Replace the div's contents with the video embed iframe. The 16:9 box, border and caption are already styled. |
| `#lucia-portrait` | Replace with the 4:5 portrait image. Add a real `alt`. |
| `#book-link` | The live booking URL. Every other CTA points at `#book` (the close section); only the button inside that section points at `#book-link`. The CTA reads “Request your casting call”, so the booking form should carry qualifying questions — niche, city, revenue band — or the word overpromises. |

## Porting to Duda

- Every `/* === SECTION === */` band in `styles.css` is self-contained and no
  selector nests deeper than one level, so sections can be lifted individually.
- The brand font is a one-line swap: change `--font` in `:root`. Inter Tight is
  loaded from Google Fonts as the default.
- Sections 3 and 6 carry no CSS of their own — they run on the base rhythm
  rules, which is why those banners hold only a comment.

## The comparison table renders twice

Under 900px the table reformats into stacked blocks **per column**, which CSS
cannot do by transposing a `<table>`. So the markup exists in two forms — a
`<table>` for ≥900px and four `<dl>` blocks below it — with each media query
hiding the other. Both are semantic and neither scrolls horizontally.

**Edit both when the comparison copy changes.**

## Pricing is off the page

Package prices are quoted on the sales call, not published. The cards carry the
tier name and who it is for; the number is not stated anywhere, and no floor is
implied, so the call is free to price upward.

The priced version, including the English / English + Spanish toggle and the
JS that drove it, is preserved at the `v-with-pricing` tag:

```bash
git show v-with-pricing:index.html > index.html   # restore that version
git diff v-with-pricing -- index.html             # see what changed
```

## Design constraints

Editorial minimalism, strictly monochrome. No accent colour, no gradients, no
shadows, no rounded cards. All colour lives in `:root` as a warm paper-and-ink
grey scale — there is no pure `#000` or `#FFF` anywhere. The inverted `--panel`
treatment is used on exactly two sections: the proof bar and the close.

Type is one family at contrasting weights, on an 8px baseline grid, with body
copy capped at a 34rem measure (~64 characters).

## Before this goes live

Third-party figures (Meta, System1/IPA, Ipsos, Goldman Sachs, IAB, Nielsen) and
the Tax Court references should be re-verified and dated. The 90-day guarantee
and the exclusivity claim are contractual promises on a public page and want a
lawyer's read.
