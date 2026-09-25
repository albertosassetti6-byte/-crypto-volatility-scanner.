/* =========================================================
   Crypto Volatility Scanner ⚡ — script.js
   Volatilità = deviazione standard dei rendimenti giornalieri
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     1) UNIVERSO ASSET (seed deterministico)
     ======================================================= */
  const COINS = [
    { sym: "BTC", name: "Bitcoin",    color: "#f7931a" },
    { sym: "ETH", name: "Ethereum",   color: "#627eea" },
    { sym: "SOL", name: "Solana",     color: "#14f195" },
    { sym: "BNB", name: "BNB",        color: "#f3ba2f" },
    { sym: "XRP", name: "XRP",        color: "#23a3dc" },
    { sym: "ADA", name: "Cardano",    color: "#0033ad" },
    { sym: "AVAX",name: "Avalanche",  color: "#e84142" },
    { sym: "DOGE",name: "Dogecoin",   color: "#c2a633" },
    { sym: "DOT", name: "Polkadot",   color: "#e6007a" },
    { sym: "MATIC",name:"Polygon",    color: "#8247e5" },
    { sym: "LINK",name: "Chainlink",  color: "#2a5ada" },
    { sym: "TON", name: "Toncoin",    color: "#0098ea" },
    { sym: "TRX", name: "TRON",       color: "#eb0029" },
    { sym: "SHIB",name: "Shiba Inu",  color: "#f00500" },
    { sym: "LTC", name: "Litecoin",   color: "#a6a9aa" },
    { sym: "BCH", name: "Bitcoin Cash",color: "#8dc351" },
    { sym: "NEAR",name: "NEAR",       color: "#00c08b" },
    { sym: "UNI", name: "Uniswap",    color: "#ff007a" },
    { sym: "APT", name: "Aptos",      color: "#00b4d8" },
    { sym: "ATOM",name: "Cosmos",     color: "#6f7390" },
    { sym: "FIL", name: "Filecoin",   color: "#0090ff" },
    { sym: "ICP", name: "Internet Computer", color: "#29abe2" },
    { sym: "ETC", name: "Ethereum Classic", color: "#328332" },
    { sym: "XLM", name: "Stellar",    color: "#7d00ff" },
    { sym: "HBAR",name: "Hedera",     color: "#222222" },
    { sym: "INJ", name: "Injective",  color: "#00d2ff" },
    { sym: "OP",  name: "Optimism",   color: "#ff0420" },
    { sym: "ARB", name: "Arbitrum",   color: "#12aaff" },
    { sym: "SUI", name: "Sui",        color: "#4da2ff" },
    { sym: "TIA", name: "Celestia",   color: "#7b2bf9" },
    { sym: "SEI", name: "Sei",        color: "#9e1f19" },
    { sym: "AAVE",name: "Aave",       color: "#b6509e" },
    { sym: "MKR", name: "Maker",      color: "#1aab9b" },
    { sym: "RNDR",name: "Render",     color: "#ff3a00" },
    { sym: "IMX", name: "Immutable",  color: "#0ed0d0" },
    { sym: "GRT", name: "The Graph",  color: "#6747ed" },
    { sym: "ALGO",name: "Algorand",   color: "#000000" },
    { sym: "FTM", name: "Fantom",     color: "#1969ff" },
    { sym: "SAND",name: "The Sandbox",color: "#00adef" },
    { sym: "MANA",name: "Decentraland",color:"#ff2d55" },
    { sym: "AXS", name: "Axie Infinity",color:"#0055d5" },
    { sym: "EOS", name: "EOS",        color: "#443f54" },
    { sym: "XTZ", name: "Tezos",      color: "#2c7df7" },
    { sym: "EGLD",name: "MultiversX", color: "#1b46c2" },
    { sym: "FLOW",name: "Flow",       color: "#00ef8b" },
    { sym: "CHZ", name: "Chiliz",     color: "#cd0124" },
    { sym: "CRV", name: "Curve",      color: "#40649f" },
    { sym: "SNX", name: "Synthetix",  color: "#00d1ff" },
    { sym: "COMP",name: "Compound",   color: "#00d395" },
    { sym: "ZEC", name: "Zcash",      color: "#f4b728" },
    { sym: "DASH",name: "Dash",       color: "#008ce7" },
    { sym: "NEO", name: "Neo",        color: "#58bf00" },
    { sym: "IOTA",name: "IOTA",       color: "#131f37" },
    { sym: "QTUM",name: "Qtum",       color: "#2e9ad0" },
    { sym: "WAVES",name:"Waves",      color: "#0155ff" },
    { sym: "KSM", name: "Kusama",     color: "#000000" },
    { sym: "ZIL", name: "Zilliqa",    color: "#49c1e0" },
    { sym: "ONE", name: "Harmony",    color: "#00ade8" },
    { sym: "ENJ", name: "Enjin",      color: "#7866d5" },
    { sym: "BAT", name: "Basic Attention", color: "#ff5000" },
    { sym: "ANKR",name: "Ankr",       color: "#356dff" },
    { sym: "STORJ",name:"Storj",      color: "#268ff7" },
    { sym: "KAVA",name: "Kava",       color: "#ff564f" },
    { sym: "ROSE",name: "Oasis",      color: "#0092f6" },
    { sym: "CELO",name: "Celo",       color: "#35d07f" },
    { sym: "BAND",name: "Band Protocol", color:"#516aff" },
    { sym: "OCEAN",name:"Ocean",      color: "#141414" },
    { sym: "RSR", name: "Reserve Rights", color:"#000000" },
    { sym: "LRC", name: "Loopring",   color: "#1c42ff" },
    { sym: "SUSHI",name:"SushiSwap",  color: "#0e0f23" },
    { sym: "YFI", name: "yearn.finance", color:"#006ae3" },
    { sym: "UMA", name: "UMA",        color: "#ff4a4a" },
    { sym: "REN", name: "Ren",        color: "#001b3a" },
    { sym: "KNC", name: "Kyber",      color: "#31cb9e" },
    { sym: "BAL", name: "Balancer",   color: "#1e1e1e" },
    { sym: "CVC", name: "Civic",      color: "#3ab03e" },
    { sym: "GNO", name: "Gnosis",     color: "#04795b" },
    { sym: "NMR", name: "Numeraire",  color: "#0d1b2a" },
    { sym: "MLN", name: "Enzyme",     color: "#1e1e1e" },
    { sym: "REP", name: "Augur",      color: "#602a52" },
    { sym: "ANT", name: "Aragon",     color: "#24d3ee" },
    { sym: "MANA2",name:"Mana",       color: "#ff2d55" },
    { sym: "HNT", name: "Helium",     color: "#474dff" },
    { sym: "AKT", name: "Akash",      color: "#ff4141" },
    { sym: "AR",  name: "Arweave",    color: "#222222" },
    { sym: "THETA",name:"Theta",      color: "#2ab8e6" },
    { sym: "TFUEL",name:"Theta Fuel", color: "#e5a11f" },
    { sym: "JASMY",name:"JasmyCoin",  color: "#00a3ff" },
    { sym: "GMT", name: "STEPN",      color: "#b0ff00" },
    { sym: "GST", name: "Green Satoshi", color:"#b0ff00" },
    { sym: "APE", name: "ApeCoin",    color: "#0054f9" },
    { sym: "LDO", name: "Lido",       color: "#00a3ff" },
    { sym: "RPL", name: "Rocket Pool",color: "#ff7f50" },
    { sym: "PEPE",name: "Pepe",       color: "#3dae2b" },
    { sym: "WIF", name: "dogwifhat",  color: "#c19a6b" },
    { sym: "BONK",name: "Bonk",       color: "#ff8c00" },
    { sym: "FLOKI",name:"Floki",      color: "#f5a623" },
    { sym: "ORDI",name: "ORDI",       color: "#111111" }
  ];

  /* =======================================================
     2) GENERATORE PSEUDO-CASUALE DETERMINISTICO
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
     3) CALCOLO VOLATILITÀ (deviazione standard)
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
    // "vol base" diversa per ogni asset, così i valori sono realistici
    const base = 0.6 + rnd() * 3.4; // 0.6% .. 4%
    for (let i = 0; i < days; i++) {
      // distribuzione approssimativamente normale (Box-Muller)
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

      const vol  = stdDev(r30);                        // σ giornaliera (30D)
      const perf24 = r1.reduce((a, b) => a + b, 0);    // somma 1 giorno
      const perf7  = r7.reduce((a, b) => a + b, 0);
      const perf30 = r30.reduce((a, b) => a + b, 0);

      return {
        sym: c.sym,
        name: c.name,
        color: c.color,
        vol: +vol.toFixed(2),
        r24: +perf24.toFixed(2),
        r7:  +perf7.toFixed(2),
        r30: +perf30.toFixed(2)
      };
    });
  }

  /* =======================================================
     4) UTILS UI
     ======================================================= */
  const $  = (sel) => document.querySelector(sel);

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

  /* =======================================================
     5) STATO APPLICAZIONE
     ======================================================= */
  const state = {
    top: 10,
    period: "24H",
    sortKey: "vol",
    sortDir: "desc",
    data: []
  };

  /* =======================================================
     6) CHART.JS — configurazione
     ======================================================= */
  let chartVol  = null;
  let chartPerf = null;

  const gridColor  = "rgba(120, 150, 210, 0.10)";
  const tickColor  = "#9fb0d0";
  const fontFamily = "Inter, system-ui, sans-serif";

  function buildVolChart(labels, values, colors) {
    const ctx = document.getElementById("chartVol").getContext("2d");
    if (chartVol) chartVol.destroy();

    chartVol = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "σ giornaliera (%)",
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
            backgroundColor: "rgba(10,15,28,0.95)",
            borderColor: "rgba(109,140,255,0.4)",
            borderWidth: 1,
            titleColor: "#e8eefc",
            bodyColor: "#9fb0d0",
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (item) => ` ${item.parsed.y.toFixed(2)}%  ·  σ giornaliera`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: tickColor,
              font: { family: fontFamily, size: 11, weight: "600" }
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            border: { display: false },
            ticks: {
              color: tickColor,
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
      v >= 0 ? "rgba(46,230,166,0.75)" : "rgba(255,93,122,0.75)"
    );
    const borders = values.map(v =>
      v >= 0 ? "#2ee6a6" : "#ff5d7a"
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
            backgroundColor: "rgba(10,15,28,0.95)",
            borderColor: "rgba(109,140,255,0.4)",
            borderWidth: 1,
            titleColor: "#e8eefc",
            bodyColor: "#9fb0d0",
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
              color: tickColor,
              font: { family: fontFamily, size: 11, weight: "600" }
            }
          },
          y: {
            grid: { color: gridColor },
            border: { display: false },
            ticks: {
              color: tickColor,
              font: { family: fontFamily, size: 11 },
              callback: (v) => v + "%"
            }
          }
        }
      }
    });
  }

  /* =======================================================
     7) RENDER TABELLA
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
      `;
      frag.appendChild(tr);
    });

    tbody.innerHTML = "";
    tbody.appendChild(frag);
  }

  /* =======================================================
     8) ORDINAMENTO
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
     9) KPI
     ======================================================= */
  function renderKpis(rows) {
    const avg = rows.reduce((s, r) => s + r.vol, 0) / (rows.length || 1);
    $("#kpiCount").textContent    = rows.length;
    $("#kpiAvgVol").textContent   = avg.toFixed(2) + "%";

    let best = rows[0], worst = rows[0];
    rows.forEach((r) => {
      if (r.r24 > best.r24)  best  = r;
      if (r.r24 < worst.r24) worst = r;
    });

    $("#kpiBest").textContent     = fmtPct(best.r24);
    $("#kpiBestName").textContent = best.sym;
    $("#kpiWorst").textContent    = fmtPct(worst.r24);
    $("#kpiWorstName").textContent = worst.sym;
  }

  /* =======================================================
     10) RENDER PRINCIPALE
     ======================================================= */
  function render() {
    const slice = state.data.slice(0, state.top);
    const rows  = sortRows(slice);

    renderTable(rows);
    renderKpis(rows);
    updateSortIndicators();

    // testi note
    $("#volNote").textContent   = `σ giornaliera · top ${state.top}`;
    $("#perfNote").textContent  = `variazione % · top ${state.top}`;
    $("#perfPeriodLabel").textContent = state.period;
    $("#universeCount").textContent   = COINS.length;

    // grafici
    const labels = rows.map(r => r.sym);
    const vols   = rows.map(r => r.vol);
    const colors = rows.map(r => r.color);
    const perfMap = { "24H": "r24", "7D": "r7", "30D": "r30" };
    const perfs  = rows.map(r => r[perfMap[state.period]]);

    buildVolChart(labels, vols, colors);
    buildPerfChart(labels, perfs, state.period);
  }

  /* =======================================================
     11) OROLOGIO + COUNTDOWN
     ======================================================= */
  const REFRESH_SECONDS = 5;
  let secondsLeft = REFRESH_SECONDS;

  function updateClock() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("it-IT", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric"
    });
    const timeStr = now.toLocaleTimeString("it-IT", { hour12: false });

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
     12) REFRESH DATI
     ======================================================= */
  function refreshData(silent) {
    state.data = buildDataset();
    render();
    if (!silent) showToast("Dati aggiornati ✦");
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
     13) EVENTI
     ======================================================= */
  function bindEvents() {
    // filtro universo
    document.querySelectorAll("#filterTop .seg").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#filterTop .seg")
          .forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.top = parseInt(btn.dataset.top, 10);
        render();
      });
    });

    // filtro periodo
    document.querySelectorAll("#filterPeriod .seg").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#filterPeriod .seg")
          .forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.period = btn.dataset.period;
        render();
      });
    });

    // ordinamento tabella
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

    // pulsante refresh
    $("#btnRefresh").addEventListener("click", manualRefresh);

    // F5 → aggiorna i dati senza ricaricare la pagina
    document.addEventListener("keydown", (e) => {
      if (e.key === "F5") {
        e.preventDefault();
        manualRefresh();
      }
    });

    // pausa countdown quando la tab non è visibile
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) secondsLeft = REFRESH_SECONDS;
    });
  }

  /* =======================================================
     14) INIT
     ======================================================= */
  function init() {
    $("#year").textContent = new Date().getFullYear();

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
