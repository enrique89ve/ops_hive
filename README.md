# Ops by Hive

A minimalist, modern blockchain-themed web application that displays Hive blockchain operation statistics for users.

## ✨ Features

- 📊 Display total transaction count on Hive blockchain (all-time)
- 👤 Show user-specific operation counts with percentage representation
- 📸 Capture and download statistics as an image
- 🌍 Multi-language support (English, Spanish)
- 🖼️ Dynamic OG images for social media sharing
- 📱 Fully responsive, mobile-first design

## 🎨 Design

- **Color scheme**: Maximum black background with red accent `#e31337`
- **Typography**: Sora font
- **Animations**: GSAP for modern interactions
- **Style**: Minimalist blockchain aesthetic

## 🚀 Tech Stack

- **Framework**: Astro 5.x (Hybrid SSR/SSG)
- **Package Manager**: pnpm
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4
- **OG Images**: @vercel/og

## 📦 Installation

```sh
pnpm install
```

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |

## 🌐 API Endpoints

### Global Transaction Statistics
```
GET https://api.syncad.com/hafbe-api/transaction-statistics?granularity=yearly&direction=desc&from-block=1
```

### User-Specific Operations
```
GET https://api.syncad.com/hafah-api/accounts/{username}/operations?participation-mode=all&page-size=100&data-size-limit=200000
```

### Dynamic OG Images
```
GET /api/og/{username}.png
```
Generates a 1200x630 social media preview image with user statistics.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy!

The dynamic OG images will work automatically on Vercel's Edge Runtime.

## 📄 License

MIT
