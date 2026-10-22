# Manifesting Magic landing page

Static VSL → application funnel for the agency. Vanilla HTML/CSS/JS, no build
step, no framework, no npm. Eventually ports into Duda.

**Live:** https://lucia-manifestingmagic.github.io/manifesting-magic-landing/
Deploys on push to `main` via GitHub Pages.

## Design constraints — these were specified and should hold

Editorial minimalism, **strictly monochrome**. No accent colour, no gradients,
no shadows, no rounded cards. All colour lives in `:root` as a warm
paper-and-ink grey scale, and there is **no pure `#000` or `#FFF` anywhere**.
The inverted `--panel` treatment is used on exactly two sections: the proof bar
and the close.

One type family at contrasting weights, 8px baseline grid, body copy capped at
a 34rem measure (~64 characters). `--font` is a one-line swap for the Duda brand
font. Every `/* === SECTION === */` band is self-contained with no selector
nesting deeper than one level, so sections lift out individually.

**No em dashes anywhere.** All 50 were rewritten sentence by sentence — colons
where a list follows, full stops where two thoughts were joined, commas only for
genuine asides. Do not reintroduce them.

## Three placeholders

| Marker | What to do |
|---|---|
| `#vsl` | Replace div contents with the video embed. Box, border and caption already styled. |
| `#lucia-portrait` | 4:5 portrait. Add a real `alt`. |
| `#apply` | Set the form `action` to the handler. Until set, submitting shows a "not connected" notice rather than failing silently. |

## Things that are deliberate

**Case-study slots are empty on purpose.** Invented testimonials are the fastest
way to lose a high-ticket buyer, and the page says so in the copy.

**Pricing is off the page.** Quoted on the call so the call can price upward. The
priced version, including the EN/ES toggle and its JS, is preserved at the
`v-with-pricing` tag.

**Geography is "your city", not San Diego.** The eyebrow claims first-in-the-US,
so pinning the body to one city argued against the positioning. The footer keeps
San Diego as the company address.

**CTA is "Request your casting call", not "Book a call".** Request implies
availability is not assumed, which is true at three clients a month. The close
deliberately does **not** say the call costs nothing — risk-reversal language
undercuts a premium frame.

**The comparison table exists twice.** A `<table>` for ≥900px and four `<dl>`
blocks below it, because CSS cannot transpose a table's axis and the spec
required per-column stacking rather than horizontal scroll. **Edit both.**

## Sourcing

Sixteen numbered references with superscript markers. Five figures were corrected
during verification — the AI-trust numbers, Latino consumption, multicultural ad
spend, a reversed Ipsos statistic and an overstated "#1 deal killer". Check a
claim before adding it; several in the original draft did not survive.
