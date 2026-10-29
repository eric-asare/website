# Updating the site

The site is built by GitHub Pages with Jekyll. Push to `main` and it rebuilds in about a minute.

## Where things live
| What | Where |
|---|---|
| Pages (home, blog list, talks) | `index.html`, `blog.html`, `talks.html` (must stay at the top level) |
| Header, menu, footer shared by every page | `_layouts/default.html` |
| Blog post layout | `_layouts/post.html` |
| Styles | `style.css` |
| Scripts (typing effect etc.) | `script.js` |
| News, publications, talks, etc. | `_data/*.yml` |
| Blog posts / drafts | `_posts/`, `_drafts/` |
| Paper PDFs / talk slide PDFs | `papers/`, `talks/` |
| Images | `images/` (`images/papers/` for thumbnails, `images/blog/` for posts) |
| Site settings (links, `news_years`) | `_config.yml` |

## Write a blog post
1. Create a Markdown file in `_posts/` named `YYYY-MM-DD-your-post-title.md`, e.g. `_posts/2026-11-05-my-first-paper.md`.
2. Start it with a title, then write Markdown:
   ```
   ---
   title: My First Paper
   ---
   Your post here...
   ```
3. Images go in `images/blog/` and are used as `![description](/images/blog/pic.png)`.
4. Commit and push. The post shows at the top of the Blog page, at `/blog/my-first-paper/`.

Unfinished posts can live in `_drafts/` (no date in the name); they are not published.
`_drafts/template.md` shows every formatting option.

## Add a talk
Add an entry to `_data/talks.yml` (newest first). The file's comments list every field.
- Slides: put the PDF in `talks/` and set `slides: talks/NAME.pdf`, or set `slides_embed:` to a Google Slides / Speaker Deck embed link.
- Video: set `youtube:` or `vimeo:` to the video ID.

Slides and video are previewed on the Talks page at `/talks/`.

## Hide a page (Blog, Talks)
- **Hide the menu link only:** in `_layouts/default.html`, wrap the page's `<a ...>` line in `{% comment %}` ... `{% endcomment %}`. The page still exists at its URL.
- **Turn the page off completely:** also change `published: true` to `published: false` at the top of `blog.html` or `talks.html`. The page is not built, so its URL returns a 404.

## Edit home page sections
| Section | File |
|---|---|
| News (only the last `news_years` years show; set in `_config.yml`) | `_data/news.yml` |
| Publications | `_data/publications.yml` |
| Experience (hidden while commented out) | `_data/experience.yml` |
| Projects (hidden while empty) | `_data/projects.yml` |
| "I ..." typing phrases | `_data/typing.yml` |
| Bio, title, photo | `index.html` |
| Email, Scholar, GitHub, LinkedIn links, `news_years` | `_config.yml` |

Paper thumbnail (macOS): `qlmanage -t -s 600 -o images/papers papers/NAME.pdf`, then rename `NAME.pdf.png` to `NAME.png`.

## Preview locally
```
export PATH=/opt/homebrew/opt/ruby/bin:$PATH
bundle install          # first time only
bundle exec jekyll serve --drafts
```
Then open http://localhost:4000.
