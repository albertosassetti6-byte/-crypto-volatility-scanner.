/* =========================================================
   Crypto Volatility Scanner ⚡ — script.js
   Volatility = standard deviation of daily returns
   Features: sparklines, CSV export, light/dark toggle
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     1) ASSET UNIVERSE (deterministic seed)
     ======================================================= */
  const COINS = [
    { sym: "BTC",  name: "Bitcoin",        color: "#f7931a" },
    { sym: "ETH",  name: "Ethereum",       color: "#627eea" },
    { sym: "SOL",  name: "Solana",         color: "#14f195" },
    { sym: "BNB",  name: "BNB",            color: "#f3ba2f" },
    { sym: "XRP",  name: "XRP",            color: "#23a3dc" },
    { sym: "ADA",  name: "Cardano",        color: "#0033ad" },
    { sym: "AVAX", name: "Avalanche",      color: "#e84142" },
    { sym: "DOGE", name: "Dogecoin",       color: "#c2a633" },
    { sym: "DOT",  name: "Polkadot",       color: "#e6007a" },
    { sym: "MATIC",name: "Polygon",        color: "#8247e5" },
    { sym: "LINK", name: "Chainlink",      color: "#2a5ada" },
    { sym: "TON",  name: "Toncoin",        color: "#0098ea" },
    { sym: "TRX",  name: "TRON",           color: "#eb0029" },
    { sym: "SHIB", name: "Shiba Inu",      color: "#f00500" },
    { sym: "LTC",  name: "Litecoin",       color: "#a6a9aa" },
    { sym: "BCH",  name: "Bitcoin Cash",   color: "#8dc351" },
    { sym: "NEAR", name: "NEAR",           color: "#00c08b" },
    { sym: "UNI",  name: "Uniswap",        color: "#ff007a" },
    { sym: "APT",  name: "Aptos",          color: "#00b4d8" },
    { sym: "ATOM", name: "Cosmos",         color: "#6f7390" },
    { sym: "FIL",  name: "Filecoin",       color: "#0090ff" },
    { sym: "ICP",  name: "Internet Computer", color: "#29abe2" },
    { sym: "ETC",  name: "Ethereum Classic",  color: "#328332" },
    { sym: "XLM",  name: "Stellar",        color: "#7d00ff" },
    { sym: "HBAR", name: "Hedera",         color: "#3a3a3a" },
    { sym: "INJ",  name: "Injective",      color: "#00d2ff" },
    { sym: "OP",   name: "Optimism",       color: "#ff0420" },
    { sym: "ARB",  name: "Arbitrum",       color: "#12aaff" },
    { sym: "SUI",  name: "Sui",            color: "#4da2ff" },
    { sym: "TIA",  name: "Celestia",       color: "#7b2bf9" },
    { sym: "SEI",  name: "Sei",            color: "#9e1f19" },
    { sym: "AAVE", name: "Aave",           color: "#b6509e" },
    { sym: "MKR",  name: "Maker",          color: "#1aab9b" },
    { sym: "RNDR", name: "Render",         color: "#ff3a00" },
    { sym: "IMX",  name: "Immutable",      color: "#0ed0d0" },
    { sym: "GRT",  name: "The Graph",      color: "#6747ed" },
    { sym: "ALGO", name: "Algorand",       color: "#4a4a4a" },
    { sym: "FTM",  name: "Fantom",         color: "#1969ff" },
    { sym: "SAND", name: "The Sandbox",    color: "#00adef" },
    { sym: "MANA", name: "Decentraland",   color: "#ff2d55" },
    { sym: "AXS",  name: "Axie Infinity",  color: "#0055d5" },
    { sym: "EOS",  name: "EOS",            color: "#443f54" },
    { sym: "XTZ",  name: "Tezos",          color: "#2c7df7" },
    { sym: "EGLD", name: "MultiversX",     color: "#1b46c2" },
    { sym: "FLOW", name: "Flow",           color: "#00ef8b" },
    { sym: "CHZ",  name: "Chiliz",         color: "#cd0124" },
    { sym: "CRV",  name: "Curve",          color: "#40649f" },
    { sym: "SNX",  name: "Synthetix",      color: "#00d1ff" },
    { sym: "COMP", name: "Compound",       color: "#00d395" },
    { sym: "ZEC",  name: "Zcash",          color: "#f4b728" },
    { sym: "DASH", name: "Dash",           color: "#008ce7" },
    { sym: "NEO",  name: "Neo",            color: "#58bf00" },
    { sym: "IOTA", name: "IOTA",           color: "#5c6c8a" },
    { sym: "QTUM", name: "Qtum",           color: "#2e9ad0" },
    { sym: "WAVES",name: "Waves",          color: "#0155ff" },
    { sym: "KSM",  name: "Kusama",         color: "#4a4a4a" },
    { sym: "ZIL",  name: "Zilliqa",        color: "#49c1e0" },
    { sym: "ONE",  name: "Harmony",        color: "#00ade8" },
    { sym: "ENJ",  name: "Enjin",          color: "#7866d5" },
    { sym: "BAT",  name: "Basic Attention",color: "#ff5000" },
    { sym: "ANKR", name: "Ankr",           color: "#356dff" },
    { sym: "STORJ",name: "Storj",          color: "#268ff7" },
    { sym: "KAVA", name: "Kava",           color: "#ff564f" },
    { sym: "ROSE", name: "Oasis",          color: "#0092f6" },
    { sym: "CELO", name: "Celo",           color: "#35d07f" },
    { sym: "BAND", name: "Band Protocol",  color: "#516aff" },
    { sym: "OCEAN",name: "Ocean",          color: "#4a4a4a" },
    { sym: "RSR",  name: "Reserve Rights", color: "#5b5b5b" },
    { sym: "LRC",  name: "Loopring",       color: "#1c42ff" },
    { sym: "SUSHI",name: "SushiSwap",      color: "#5c4a6b" },
    { sym: "YFI",  name: "yearn.finance",  color: "#006ae3" },
    { sym: "UMA",  name: "UMA",            color: "#ff4a4a" },
    { sym: "REN",  name: "Ren",            color: "#4a5a72" },
    { sym: "KNC",  name: "Kyber",          color: "#31cb9e" },
    { sym: "BAL",  name: "Balancer",       color: "#5a5a5a" },
    { sym: "CVC",  name: "Civic",          color: "#3ab03e" },
    { sym: "GNO",  name: "Gnosis",         color: "#04795b" },
    { sym: "NMR",  name: "Numeraire",      color: "#4d6b8a" },
    { sym: "MLN",  name: "Enzyme",         color: "#5a5a5a" },
    { sym: "REP",  name: "Augur",          color: "#602a52" },
    { sym: "ANT",  name: "Aragon",         color: "#24d3ee" },
    { sym: "HNT",  name: "Helium",         color: "#474dff" },
    { sym: "AKT",  name: "Akash",          color: "#ff4141" },
    { sym: "AR",   name: "Arweave",        color: "#5a5a5a" },
    { sym: "THETA",name: "Theta",          color: "#2ab8e6" },
    { sym: "TFUEL",name: "Theta Fuel",     color: "#e5a11f" },
    { sym: "JASMY",name: "JasmyCoin",      color: "#00a3ff" },
    { sym: "GMT",  name: "STEPN",          color: "#b0ff00" },
    { sym: "APE",  name: "ApeCoin",        color: "#0054f9" },
    { sym: "LDO",  name: "Lido",           color: "#00a3ff" },
    { sym: "RPL",  name: "Rocket Pool",    color: "#ff7f50" },
    { sym: "PEPE", name: "Pepe",           color: "#3dae2b" },
    { sym: "WIF",  name: "dogwifhat",      color: "#c19a6b" },
    { sym: "BONK", name: "Bonk",           color: "#ff8c00" },
    { sym: "FLOKI",name: "Floki",          color: "#f5a623" },
    { sym: "ORDI", name: "ORDI",           color: "#5a5a5a" }
  ];

  /* =======================================================
     2) DETERMINISTIC PSEUDO-RANDOM GENERATOR
     ======================================================= */
  function hashCode(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* =======================================================
     3) VOLATILITY MATH (standard deviation)
     ======================================================= */
  function stdDev(arr) {
    if (arr.length < 2) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance =
      arr.reduce((s, v) => s + (v - mean) * (v - mean), 0) / (arr.length - 1);
    return Math.sqrt(variance);
  }

  function generateReturns(sym, days) {
    const rnd = mulberry32(hashCode(sym));
    const out = [];
    const base = 0.6 + rnd() * 3.4; // 0.6% .. 4%
    for (let i = 0; i < days; i++) {
      const u1 = Math.max(rnd(), 1e-9);
      const u2 = rnd();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      out.push(z * base);
    }
    return out;
  }

  function buildDataset() {
    return COINS.map((c) => {
      const r30 = generateReturns(c.sym, 30);
      const r7  = generateReturns(c.sym + "-7", 7);
      const r1  = generateReturns(c.sym + "-1", 1);

      const vol    = stdDev(r30);
      const perf24 = r1.reduce((a, b) => a + b, 0);
      const perf7  = r7.reduce((a, b) => a + b, 0);
      const perf30 = r30.reduce((a, b) => a + b, 0);

      return {
        sym: c.sym,
        name: c.name,
        color: c.color,
        vol: +vol.toFixed(2),
        r24: +perf24.toFixed(2),
        r7:  +perf7.toFixed(2),
        r30: +perf30.toFixed(2),
        series: r30.slice() // 30-day series for sparklines
      };
    });
  }

  /* =======================================================
     4) UI HELPERS
     ======================================================= */
  const $ = (sel) => document.querySelector(sel);

  function fmtPct(v) {
    if (v == null || isNaN(v)) return "—";
    const s = v >= 0 ? "+" : "";
    return s + v.toFixed(2) + "%";
  }

  function signClass(v) {
    if (v > 0.005) return "pos";
    if (v < -0.005) return "neg";
    return "neu";
  }

  function volLevel(vol) {
    if (vol < 1.6) return { label: "Low",    css: "badge--low" };
    if (vol < 3.0) return { label: "Medium", css: "badge--medium" };
    return              { label: "High",   css: "badge--high" };
  }

  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const r = parseInt(full.substring(0, 2), 16);
    const g = parseInt(full.substring(2, 4), 16);
    const b = parseInt(full.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function getCssVar(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  /* =======================================================
     5) APP STATE
     ======================================================= */
  const state = {
    top: 10,
    period: "24H",
    sortKey: "vol",
    sortDir: "desc",
    data: []
  };

  /* =======================================================
     6) CHART.JS
     ======================================================= */
  let chartVol  = null;
  let chartPerf = null;

  function chartGridColor() { return getCssVar("--line"); }
  function chartTickColor() { return getCssVar("--text-2"); }
  const fontFamily = "Inter, system-ui, sans-serif";

  function buildVolChart(labels, values, colors) {
    const ctx = document.getElementById("chartVol").getContext("2d");
    if (chartVol) chartVol.destroy();

    chartVol = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "σ daily (%)",
          data: values,
          backgroundColor: colors.map(c => hexToRgba(c, 0.55)),
          borderColor: colors,
          borderWidth: 1.5,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(30,40,68,0.95)",
            borderColor: "rgba(142,166,255,0.4)",
            borderWidth: 1,
            titleColor: "#eef2fb",
            bodyColor: "#b3c1dd",
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (item) => ` ${item.parsed.y.toFixed(2)}%  ·  σ daily`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: chartTickColor(),
              font: { family: fontFamily, size: 11, weight: "600" }
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: chartGridColor() },
            border: { display: false },
            ticks: {
              color: chartTickColor(),
              font: { family: fontFamily, size: 11 },
              callback: (v) => v + "%"
            }
          }
        }
      }
    });
  }

  function buildPerfChart(labels, values, periodLabel) {
    const ctx = document.getElementById("chartPerf").getContext("2d");
    if (chartPerf) chartPerf.destroy();

    const colors = values.map(v =>
      v >= 0 ? "rgba(125,243,200,0.75)" : "rgba(255,159,178,0.75)"
    );
    const borders = values.map(v =>
      v >= 0 ? "#7df3c8" : "#ff9fb2"
    );

    chartPerf = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: `Performance ${periodLabel}`,
          data: values,
          backgroundColor: colors,
          borderColor: borders,
          borderWidth: 1.5,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(30,40,68,0.95)",
            borderColor: "rgba(142,166,255,0.4)",
            borderWidth: 1,
            titleColor: "#eef2fb",
            bodyColor: "#b3c1dd",
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (item) => ` ${fmtPct(item.parsed.y)}  ·  ${periodLabel}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: chartTickColor(),
              font: { family: fontFamily, size: 11, weight: "600" }
            }
          },
          y: {
            grid: { color: chartGridColor() },
            border: { display: false },
            ticks: {
              color: chartTickColor(),
              font: { family: fontFamily, size: 11 },
              callback: (v) => v + "%"
            }
          }
        }
      }
    });
  }

  /* =======================================================
     7) SPARKLINE (small inline canvas)
     ======================================================= */
  function drawSparkline(canvas, series, color) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 90;
    const h = canvas.clientHeight || 28;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    if (!series || series.length < 2) return;

    const min = Math.min(...series);
    const max = Math.max(...series);
    const span = max - min || 1;
    const stepX = w / (series.length - 1);
    const pad = 3;

    // build smooth path
    const pts = series.map((v, i) => ({
      x: i * stepX,
      y: h - pad - ((v - min) / span) * (h - pad * 2)
    }));

    // gradient fill below line
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, hexToRgba(color, 0.35));
    grad.addColorStop(1, hexToRgba(color, 0.02));

    ctx.beginPath();
    ctx.moveTo(pts[0].x, h);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // stroke line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  /* =======================================================
     8) TABLE RENDER
     ======================================================= */
  function renderTable(rows) {
    const tbody = $("#tableBody");
    const frag  = document.createDocumentFragment();

    rows.forEach((r) => {
      const lvl = volLevel(r.vol);
      const tr  = document.createElement("tr");

      tr.innerHTML = `
        <td>
          <div class="token-cell">
            <span class="token-icon" style="background:${r.color}">${r.sym.slice(0, 3)}</span>
            <span class="token-name">
              <strong>${r.sym}</strong>
              <small>${r.name}</small>
            </span>
          </div>
        </td>
        <td class="${signClass(r.r24)}">${fmtPct(r.r24)}</td>
        <td class="${signClass(r.r7)}">${fmtPct(r.r7)}</td>
        <td class="${signClass(r.r30)}">${fmtPct(r.r30)}</td>
        <td><span class="badge ${lvl.css}">${lvl.label}</span></td>
        <td class="spark-cell"><canvas class="spark" width="90" height="28"></canvas></td>
      `;

      frag.appendChild(tr);

      // draw sparkline after element is in DOM (next tick)
      const canvas = tr.querySelector("canvas.spark");
      const lineColor = r.r30 >= 0 ? "#7df3c8" : "#ff9fb2";
      requestAnimationFrame(() => drawSparkline(canvas, r.series, lineColor));
    });

    tbody.innerHTML = "";
    tbody.appendChild(frag);
  }

  /* =======================================================
     9) SORTING
     ======================================================= */
  function sortRows(rows) {
    const k = state.sortKey;
    const dir = state.sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (k === "sym") return a.sym.localeCompare(b.sym) * dir;
      return (a[k] - b[k]) * dir;
    });
  }

  function updateSortIndicators() {
    document.querySelectorAll(".table thead th.sortable").forEach((th) => {
      th.classList.remove("asc", "desc");
      if (th.dataset.sort === state.sortKey) {
        th.classList.add(state.sortDir);
      }
    });
  }

  /* =======================================================
     10) KPI
     ======================================================= */
  function renderKpis(rows) {
    const avg = rows.reduce((s, r) => s + r.vol, 0) / (rows.length || 1);
    $("#kpiCount").textContent  = rows.length;
    $("#kpiAvgVol").textContent = avg.toFixed(2) + "%";

    let best = rows[0], worst = rows[0];
    rows.forEach((r) => {
      if (r.r24 > best.r24)  best  = r;
      if (r.r24 < worst.r24) worst = r;
    });

    $("#kpiBest").textContent      = fmtPct(best.r24);
    $("#kpiBestName").textContent  = best.sym;
    $("#kpiWorst").textContent     = fmtPct(worst.r24);
    $("#kpiWorstName").textContent = worst.sym;
  }

  /* =======================================================
     11) MASTER RENDER
     ======================================================= */
  function render() {
    const slice = state.data.slice(0, state.top);
    const rows  = sortRows(slice);

    renderTable(rows);
    renderKpis(rows);
    updateSortIndicators();

    $("#volNote").textContent   = `σ daily · top ${state.top}`;
    $("#perfNote").textContent  = `% change · top ${state.top}`;
    $("#perfPeriodLabel").textContent = state.period;
    $("#universeCount").textContent   = COINS.length;

    const labels = rows.map(r => r.sym);
    const vols   = rows.map(r => r.vol);
    const colors = rows.map(r => r.color);
    const perfMap = { "24H": "r24", "7D": "r7", "30D": "r30" };
    const perfs  = rows.map(r => r[perfMap[state.period]]);

    buildVolChart(labels, vols, colors);
    buildPerfChart(labels, perfs, state.period);
  }

  /* =======================================================
     12) CLOCK + COUNTDOWN
     ======================================================= */
  const REFRESH_SECONDS = 5;
  let secondsLeft = REFRESH_SECONDS;

  function updateClock() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric"
    });
    const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

    $("#clockDate").textContent = dateStr;
    $("#clockTime").textContent = timeStr;
  }

  function tickCountdown() {
    secondsLeft -= 1;
    if (secondsLeft < 0) {
      secondsLeft = REFRESH_SECONDS;
      refreshData(true);
    }
    $("#nextIn").textContent = secondsLeft;
  }

  /* =======================================================
     13) DATA REFRESH
     ======================================================= */
  function refreshData(silent) {
    state.data = buildDataset();
    render();
    if (!silent) showToast("Data updated ✦");
  }

  function showToast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function manualRefresh() {
    const btn = $("#btnRefresh");
    btn.classList.add("spin");
    setTimeout(() => btn.classList.remove("spin"), 500);
    secondsLeft = REFRESH_SECONDS;
    refreshData(false);
  }

  /* =======================================================
     14) CSV EXPORT
     ======================================================= */
  function exportCSV() {
    const slice = state.data.slice(0, state.top);
    const rows  = sortRows(slice);

    const header = ["Symbol", "Name", "24H (%)", "7D (%)", "30D (%)", "Volatility (σ)", "Level"];
    const lines  = [header.join(",")];

    rows.forEach(r => {
      const lvl = volLevel(r.vol).label;
      lines.push([
        r.sym,
        `"${r.name}"`,
        r.r24.toFixed(2),
        r.r7.toFixed(2),
        r.r30.toFixed(2),
        r.vol.toFixed(2),
        lvl
      ].join(","));
    });

    const csv  = "\uFEFF" + lines.join("\n"); // BOM for Excel
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);

    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.href = url;
    a.download = `crypto-volatility-${state.top}-${state.period}-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("CSV exported ⬇");
  }

  /* =======================================================
     15) THEME TOGGLE
     ======================================================= */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cvs-theme", theme);
    $("#themeIcon").textContent = theme === "dark" ? "🌙" : "☀️";

    // refresh charts so colors update
    if (state.data.length) render();
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  }

  function initTheme() {
    const saved = localStorage.getItem("cvs-theme");
    if (saved) {
      setTheme(saved);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      setTheme(prefersLight ? "light" : "dark");
    }
  }

  /* =======================================================
     16) EVENTS
     ======================================================= */
  function bindEvents() {
    document.querySelectorAll("#filterTop .seg").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#filterTop .seg")
          .forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.top = parseInt(btn.dataset.top, 10);
        render();
      });
    });

    document.querySelectorAll("#filterPeriod .seg").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#filterPeriod .seg")
          .forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.period = btn.dataset.period;
        render();
      });
    });

    document.querySelectorAll(".table thead th.sortable").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (state.sortKey === key) {
          state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        } else {
          state.sortKey = key;
          state.sortDir = "desc";
        }
        render();
      });
    });

    $("#btnRefresh").addEventListener("click", manualRefresh);
    $("#btnCsv").addEventListener("click", exportCSV);
    $("#btnTheme").addEventListener("click", toggleTheme);

    document.addEventListener("keydown", (e) => {
      if (e.key === "F5") {
        e.preventDefault();
        manualRefresh();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) secondsLeft = REFRESH_SECONDS;
    });

    window.addEventListener("resize", () => {
      clearTimeout(bindEvents._rt);
      bindEvents._rt = setTimeout(() => {
        // redraw sparklines on resize
        if (state.data.length) render();
      }, 200);
    });
  }

  /* =======================================================
     17) INIT
     ======================================================= */
  function init() {
    $("#year").textContent = new Date().getFullYear();

    initTheme();
    refreshData(true);
    bindEvents();

    updateClock();
    setInterval(updateClock, 1000);
    setInterval(tickCountdown, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
