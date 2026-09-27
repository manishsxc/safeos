# Safe OS for Windows

This Electron desktop app opens the live Safe OS website at <https://safe-os.netlify.app/>. It does not bundle or recreate the website and requires an internet connection.

## Install dependencies

Install Node.js 22 and npm, then from this directory run:

```sh
npm install
```

## Run locally on macOS

```sh
npm start
```

This opens the website in an Electron window. The Windows installer is built by GitHub Actions; no Windows machine, Wine, or Docker is needed on your Mac.

## Push to GitHub from macOS

Create an empty GitHub repository first, then open Terminal and run these commands from this project directory. Replace the remote URL with your repository's HTTPS URL:

```sh
git init
git add main.js package.json README.md .github/workflows/windows.yml
git commit -m "Initial Safe OS desktop app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Git must be installed and authenticated with GitHub. The first push to `main` starts the Windows build workflow. Later updates can be pushed with `git add`, `git commit`, and `git push`.

## Download the Windows installer

1. Open the repository on GitHub and select **Actions**.
2. Open the completed **Build Safe OS for Windows** run.
3. Under **Artifacts**, download **Safe-OS-Windows**.
4. The artifact contains `Safe OS Setup 1.0.0.exe`.

GitHub Actions generates the Windows x64 `.exe` on GitHub's `windows-latest` runner. The Mac is only used to develop and push the project; it does not cross-compile the Windows installer.
