<div align="center">

# ⚡ Crypto Volatility Scanner

**Measure the volatility. Anticipate the market. Decide with data.**

A responsive, real-time crypto volatility dashboard powered by **Chart.js**, with sparklines,
CSV export, light/dark theme toggle and Top 10 / 50 / 100 universe filters.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.1-FF6384?style=flat-square&logo=chart.js&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-8ea6ff?style=flat-square)](#-license)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [How Volatility Is Calculated](#-how-volatility-is-calculated)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deploying to GitHub Pages](#-deploying-to-github-pages)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Customization](#-customization)
- [Data Source](#-data-source)
- [Roadmap](#-roadmap)
- [Financial Disclaimer](#️-financial-disclaimer)
- [License](#-license)
- [Author](#-author)

---

## 🔎 Overview

**Crypto Volatility Scanner ⚡** is a single-page dashboard that scans **100 major digital assets**
and ranks them by a simple, transparent statistical measure of volatility: the **standard deviation
of daily returns** over the last 30 days.

The interface updates itself **every 5 seconds**, drawing live **Chart.js** visualizations, sorting
the scanner table, and highlighting the most and least volatile assets — all with a soft, modern
palette available in both **light** and **dark** mode.

---

## 🚀 Live Demo

Once published on GitHub Pages, the demo will be available at:



---

## ✨ Features

| | Feature | Description |
|---|---|---|
| ⚡ | **Real-time auto-refresh** | Data updates automatically every **5 seconds** with a visible countdown |
| 📊 | **Chart.js visualizations** | Two responsive bar charts — one for volatility, one for performance |
| 📈 | **Inline sparklines** | 30-day mini-trends drawn with `<canvas>` for every asset in the table |
| 🎯 | **Universe filters** | Top **10** · Top **50** · Top **100** assets |
| ⏱ | **Period filters** | **24H** · **7D** · **30D** performance windows |
| 🔀 | **Sortable table** | Click any column header to sort ascending / descending |
| 📥 | **CSV Export** | Download the current filtered & sorted view as an Excel-friendly CSV |
| 🌗 | **Light / Dark theme** | Toggle in the top bar — preference saved in `localStorage` |
| 🕒 | **Live clock** | Current date and time shown in the top bar |
| ⌨️ | **F5 shortcut** | Press **F5** to refresh data without reloading the page |
| 📱 | **Fully responsive** | Optimized for desktop, tablet and mobile |
| ♿ | **Reduced motion** | Respects `prefers-reduced-motion` and `prefers-color-scheme` |

---

## 🧮 How Volatility Is Calculated

For every asset we generate **30 days of daily returns** and compute the
**sample standard deviation (σ)**:



Where:

- `xᵢ` = daily return on day *i*
- `x̄`  = mean of the daily returns
- `n`  = number of observations (30)

The resulting **σ** is displayed as a percentage and classified into three volatility levels:

| Level | Threshold (σ daily) | Badge color |
|---|---|---|
| **Low** | σ < 1.6 % | 🟢 Green |
| **Medium** | 1.6 % ≤ σ < 3.0 % | 🟡 Amber |
| **High** | σ ≥ 3.0 % | 🔴 Red |

> ⚠️ This is a **simplified statistical estimate**. It does **not** account for correlations,
> tail risk, liquidity risk or any other market factor, and it has **no predictive value**.

---

## 🛠 Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, `color-mix()`, `backdrop-filter`, responsive grid & flexbox
- **Vanilla JavaScript (ES6+)** — no framework, no build step
- **[Chart.js 4.4.1](https://www.chartjs.org/)** — via jsDelivr CDN
- **[Inter](https://fonts.google.com/specimen/Inter)** & **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** — Google Fonts

---

## 📂 Project Structure


crypto-volatility-scanner/
│
├── index.html # Main HTML structure (hero, filters, charts, table, footer)
├── style.css # All styling: palette, themes, layout, responsive rules
├── script.js # Data generation, math, charts, sparklines, CSV export, theme
└── README.md # This file


No dependencies to install. No bundler. Just **open `index.html`** and it works.

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/crypto-volatility-scanner.git
cd crypto-volatility-scanner

# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

const COINS = [
  { sym: "BTC", name: "Bitcoin",  color: "#f7931a" },
  { sym: "ETH", name: "Ethereum", color: "#627eea" },
  // ...
];

function volLevel(vol) {
  if (vol < 1.6) return { label: "Low",    css: "badge--low" };
  if (vol < 3.0) return { label: "Medium", css: "badge--medium" };
  return              { label: "High",   css: "badge--high" };
}


:root,
[data-theme="dark"]{
  --brand:   #8ea6ff;
  --brand-2: #c2a3ff;
  --cyan:    #7ee0f5;
  --green:   #7df3c8;
  --red:     #ff9fb2;
  --amber:   #ffd18a;
  /* ... */
}

async function buildDataset() {
  const res  = await fetch("https://api.example.com/crypto/ohlc");
  const raw  = await res.json();
  return raw.map(r => {
    const returns = r.closes.map((c, i, a) => i ? (c - a[i-1]) / a[i-1] * 100 : 0).slice(1);
    const vol     = stdDev(returns);
    return { sym: r.symbol, name: r.name, color: r.color,
             vol: +vol.toFixed(2), r24: r.change24, r7: r.change7, r30: r.change30,
             series: returns };
  });
}

MIT License

Copyright (c) 2026 Sicalimer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

crypto-volatility-scanner/
├── index.html     ← main HTML
├── style.css      ← all styling
├── script.js      ← logic + charts + sparklines + CSV
└── README.md      ← this file
