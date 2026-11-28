# Kids Corner

Free games and easy lessons for KG to Class 5. A static website for GitHub Pages.

- Live site: https://csc-vle-tools-desk.github.io/Kids-Corner/
- Sister site (free online tools): https://csc-vle-tools-desk.github.io/SevaSphere/

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: class and subject filters, 38 picture-game cards, lessons and quiz cards |
| `games.html` | The 38 picture games (English and Hindi). Open one with `games.html#abc` |
| `lesson.html` | Flip-card lessons with read-aloud and a quiz. Open one with `lesson.html?id=kg-abc` (add `&play=1` for the quiz) |
| `about.html`, `contact.html`, `disclaimer.html`, `404.html` | Info pages |

## Folders
- `assets/css`, `assets/js`: styles and scripts. Lessons and quizzes live in `assets/js/data.js`. Picture-game cards live in `assets/js/picgames.js`.
- `assets/kids`: all game pictures (PNG). `assets/img`: logo and hero photo.

## Publish on GitHub Pages
1. Upload all these files to the root of the `Kids-Corner` repository (branch `main`).
2. Settings > Pages > Deploy from a branch > `main` / root.
3. Open https://csc-vle-tools-desk.github.io/Kids-Corner/

## Add a lesson
Add one object to `LESSONS` in `assets/js/data.js` (and its picture name to `LPIC`). It then appears on the home page by itself.
