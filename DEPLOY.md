# Deploying to GitHub Pages (manual, no Actions)

This project is prepared for GitHub Pages deployment without using GitHub Actions. It uses Vite's `base` set to `/ChaiClub/` so the built assets will load when served from `https://<user>.github.io/ChaiClub/`.

Follow these PowerShell-friendly steps to build and publish the `dist` folder to the `gh-pages` branch.

Notes before you start:
- Do this from the project root.
- Ensure your local git remote `origin` points to `https://github.com/charansaikondilla/ChaiClub.git` (or an SSH equivalent).
- These commands will force-update the `gh-pages` branch with your latest build.

Steps (PowerShell):

1. Install dependencies (use `npm ci` if you're on CI; `npm install` is fine locally):

```powershell
npm install
```

2. Build the project:

```powershell
npm run build
```

3. Create a temporary branch from the build output and push it to `gh-pages` (safe, does not modify your main branches):

```powershell
# create a temporary branch containing the contents of the dist directory
git subtree split --prefix dist -b gh-pages-deploy

# push that temporary branch to origin's gh-pages branch (force update)
git push origin gh-pages-deploy:gh-pages --force

# delete the temporary local branch
git branch -D gh-pages-deploy
```

4. On GitHub: open repository Settings > Pages, and set the source to `gh-pages` branch (if not already set). Wait a minute; your site should be available at:

```
https://charansaikondilla.github.io/ChaiClub/
```

Troubleshooting & tips:
- If you get permission errors, ensure your local git is authenticated with an account that has push access. Using SSH keys or a personal access token may help.
- If your production site looks broken, double-check that `vite.config.ts` has `base: '/ChaiClub/'` (we set this in the repo).
- If you prefer to host from `docs/`, you can copy `dist` contents into a `docs/` folder and push to `main`. The steps above avoid that and keep `main` clean.

Optional: Using `git worktree` is another robust approach; the `subtree` approach is simplest and works well on Windows.

Mobile testing & optimization checklist
- Confirm `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` is present (it is in `index.html`).
- Test pages on small screen widths (320–480px) and use Chrome/Edge device toolbar.
- Ensure interactive elements meet touch target sizes (>=44px recommended).
- Use responsive utilities (Tailwind classes) — this project already uses Tailwind CDN in `index.html`.

If you'd like, I can also add a small npm script that runs a local preview server after build and a single command that runs the subtree push flow — or I can attempt to run the build and push from here if you give me permission to run git push with your credentials (not recommended; better you run the final push locally).
