const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const root = process.cwd();
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(dist)) {
    console.error('dist directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const tmpDir = path.join(root, '.gh-pages-temp');

  // remove temp if exists
  if (fs.existsSync(tmpDir)) {
    execSync(`git -C "${tmpDir}" reset --hard`, { stdio: 'inherit' });
    execSync(`rm -rf "${tmpDir}"`, { stdio: 'inherit' });
  }

  fs.mkdirSync(tmpDir);

  // initialize a new git repo in the temp dir
  execSync('git init', { cwd: tmpDir, stdio: 'inherit' });
  execSync('git checkout -b gh-pages', { cwd: tmpDir, stdio: 'inherit' });
  execSync('git remote add origin https://github.com/charansaikondilla/ChaiClub.git', { cwd: tmpDir, stdio: 'inherit' });

  // copy dist contents into temp repo
  // use platform-agnostic copy via node
  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursiveSync(dist, tmpDir);

  execSync('git add -A', { cwd: tmpDir, stdio: 'inherit' });
  try {
    execSync('git commit -m "Publish site (GitHub Pages)"', { cwd: tmpDir, stdio: 'inherit' });
  } catch (e) {
    // commit may fail if nothing changed; ignore
  }

  // force-push to gh-pages
  execSync('git push origin gh-pages --force', { cwd: tmpDir, stdio: 'inherit' });

  // cleanup
  // on Windows, use rimraf or built-in recursive remove; we'll use fs.rm
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {
    // ignore cleanup errors
  }

  console.log('\nPublish complete. The site should be available at: https://charansaikondilla.github.io/ChaiClub/');
} catch (err) {
  console.error('Deployment failed:', err.message || err);
  process.exit(1);
}
