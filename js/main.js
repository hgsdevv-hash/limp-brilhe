// =========================================================
// Limp Brilhe | interações da landing page
// =========================================================

// WhatsApp da equipe (só números, com 55 e DDD)
const WHATSAPP = "5519991705557";
const MSG = "Olá! Vim pelo site e gostaria de um orçamento.";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Botões de contato ----------
const contactUrl = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MSG)}`
  : "https://ig.me/m/limp_brilhe";
document.querySelectorAll("[data-contact]").forEach((link) => {
  link.href = contactUrl;
  link.target = "_blank";
  link.rel = "noopener";
});

// ---------- Logo: volta para o topo da página ----------
document.getElementById("brand").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
});

// ---------- Menu do celular ----------
const menuBtn = document.getElementById("menuBtn");
const menuMobile = document.getElementById("menuMobile");
menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  menuMobile.classList.toggle("open", !open);
});
menuMobile.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuMobile.classList.remove("open");
  })
);

// ---------- Neblina: textura de vidro embaçado com sabão ----------
function paintFog(ctx, w, h, { text } = {}) {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, w, h);
  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, "rgba(222, 231, 241, .97)");
  base.addColorStop(1, "rgba(206, 218, 232, .97)");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // manchas claras de espuma e escuras de poeira
  const area = w * h;
  const blobs = Math.round(area / 9000);
  for (let i = 0; i < blobs; i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const r = 20 + Math.random() * Math.min(w, h) * 0.12;
    const light = Math.random() > 0.35;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, light ? "rgba(255,255,255,.55)" : "rgba(150,140,120,.14)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  // bolhinhas de sabão
  const bubbles = Math.round(area / 14000);
  for (let i = 0; i < bubbles; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = 2 + Math.random() * 9;
    ctx.strokeStyle = "rgba(255,255,255,.75)";
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.25, 0, Math.PI * 2); ctx.fill();
  }
  // nome escrito na neblina, como um dedo no vidro
  if (text) {
    const size = Math.min(w * 0.13, 120);
    ctx.font = `800 ${size}px Sora, Manrope, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(37, 35, 90, .16)";
    ctx.fillText(text, w / 2, h / 2);
  }
}

function sizeCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}

// ---------- Abertura: o rodinho limpa a tela na técnica do "S" ----------
const intro = document.getElementById("intro");
const introOn = root.classList.contains("js-intro");

function finishIntro() {
  if (root.classList.contains("intro-over")) return;
  root.classList.add("intro-over");
  intro.classList.add("done");
  setTimeout(() => intro.remove(), 600);
}

if (!introOn) {
  intro.remove();
} else {
  window.scrollTo(0, 0);
  const canvas = document.getElementById("introFog");
  const sq = document.getElementById("squeegee");
  const { ctx, w: W, h: H } = sizeCanvas(canvas);
  paintFog(ctx, W, H, { text: "Limp Brilhe" });
  intro.classList.add("ready");

  // caminho em "S": passadas horizontais que viram fora da tela
  const rows = W < 700 ? 4 : 3;
  const rowH = H / rows;
  const blade = rowH * 1.3;           // a borracha cobre um pouco mais que a faixa, sem sobrar sujeira
  const turnR = rowH / 2;
  const pad = blade * 0.35 + 20;      // começa e vira fora da tela
  const segs = [];
  for (let i = 0; i < rows; i++) {
    const y = rowH * (i + 0.5);
    const ltr = i % 2 === 0;
    const x0 = ltr ? -pad : W + pad, x1 = ltr ? W + pad : -pad;
    segs.push({ type: "line", x0, y, x1, len: Math.abs(x1 - x0) });
    if (i < rows - 1) segs.push({ type: "arc", cx: x1, cy: y + turnR, ltr, len: Math.PI * turnR });
  }
  const total = segs.reduce((s, g) => s + g.len, 0);

  // posição e direção do rodo a uma distância "d" do começo do caminho
  function at(d) {
    for (const s of segs) {
      if (d <= s.len) {
        if (s.type === "line") {
          const dir = Math.sign(s.x1 - s.x0);
          return { x: s.x0 + dir * d, y: s.y, a: dir > 0 ? 0 : Math.PI };
        }
        const t = d / s.len;                       // meia-volta: de cima para baixo
        const side = s.ltr ? 1 : -1;
        const th = -Math.PI / 2 + t * Math.PI;
        return {
          x: s.cx + side * Math.cos(th) * turnR,
          y: s.cy + Math.sin(th) * turnR,
          a: s.ltr ? th + Math.PI / 2 : Math.PI / 2 - th,
        };
      }
      d -= s.len;
    }
    const last = segs[segs.length - 1];
    return { x: last.x1, y: last.y, a: Math.sign(last.x1 - last.x0) > 0 ? 0 : Math.PI };
  }

  // a borracha é perpendicular ao movimento
  const edge = (p) => {
    const nx = -Math.sin(p.a), ny = Math.cos(p.a);
    return [p.x + nx * blade / 2, p.y + ny * blade / 2, p.x - nx * blade / 2, p.y - ny * blade / 2];
  };

  const sqW = blade * (110 / 300);
  sq.style.width = `${sqW}px`;
  sq.style.height = `${blade}px`;

  const duration = 1500 + rows * 300;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  let last = 0, start = null, stopped = false;
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";

  function frame(now) {
    if (stopped) return;
    if (start === null) start = now;
    const t = Math.min((now - start) / duration, 1);
    const d = ease(t) * total;

    // apaga a faixa varrida em pequenos passos, para as curvas ficarem lisas
    for (let s = last; s < d; s += 6) {
      const a = edge(at(Math.max(s - 3, 0))), b = edge(at(Math.min(s + 9, d)));  // passos sobrepostos: sem riscos entre eles
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]); ctx.lineTo(a[2], a[3]); ctx.lineTo(b[2], b[3]); ctx.lineTo(b[0], b[1]);
      ctx.closePath();
      ctx.fill();
    }
    last = d;

    const p = at(d);
    sq.style.transform = `translate(${p.x - sqW}px, ${p.y - blade / 2}px) rotate(${p.a}rad)`;

    if (t < 1) requestAnimationFrame(frame);
    else end();
  }

  function end() {
    stopped = true;
    ctx.clearRect(0, 0, W, H);
    sq.style.opacity = "0";
    finishIntro();
  }

  document.getElementById("introSkip").addEventListener("click", () => { stopped = true; finishIntro(); });
  // espera a fonte (no máximo meio segundo) para o nome na neblina sair certo
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 500))]).then(() => {
    paintFog(ctx, W, H, { text: "Limp Brilhe" });
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000";
    setTimeout(() => requestAnimationFrame(frame), 250);
  });
}

// ---------- Janela do topo: o visitante limpa com o dedo ----------
const pane = document.getElementById("pane");
const paneFog = document.getElementById("paneFog");
const paneStatus = document.getElementById("paneStatus");
const paneClean = document.getElementById("paneClean");
let fog;

function resetPane() {
  fog = sizeCanvas(paneFog);
  paintFog(fog.ctx, fog.w, fog.h);
  fog.ctx.globalCompositeOperation = "destination-out";
  fog.ctx.lineCap = "round";
  fog.ctx.lineJoin = "round";
  fog.ctx.lineWidth = Math.max(40, fog.w * 0.11);
  pane.classList.remove("clean", "touched");
  paneStatus.textContent = "Vidro embaçado";
  paneClean.textContent = "Limpar tudo";
}

function setClean() {
  pane.classList.add("clean", "touched");
  paneStatus.textContent = "Vidro limpo";
  paneClean.textContent = "Embaçar de novo";
}

// confere quanto do vidro já foi limpo (amostra pixels, sem pesar)
function cleanedRatio() {
  const { width, height } = paneFog;
  const data = fog.ctx.getImageData(0, 0, width, height).data;
  let clear = 0, n = 0;
  for (let i = 3; i < data.length; i += 4 * 37) { n++; if (data[i] < 40) clear++; }
  return clear / n;
}

let drawing = false, lastPt = null, lastCheck = 0;
const point = (e) => {
  const r = paneFog.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
};
pane.addEventListener("pointerdown", (e) => {
  if (pane.classList.contains("clean")) return;
  drawing = true;
  pane.setPointerCapture(e.pointerId);
  pane.classList.add("touched");
  lastPt = point(e);
  fog.ctx.beginPath(); fog.ctx.moveTo(lastPt.x, lastPt.y); fog.ctx.lineTo(lastPt.x + .1, lastPt.y); fog.ctx.stroke();
});
pane.addEventListener("pointermove", (e) => {
  if (!drawing) return;
  const p = point(e);
  fog.ctx.beginPath(); fog.ctx.moveTo(lastPt.x, lastPt.y); fog.ctx.lineTo(p.x, p.y); fog.ctx.stroke();
  lastPt = p;
  const now = performance.now();
  if (now - lastCheck > 250) {
    lastCheck = now;
    if (cleanedRatio() > 0.6) { drawing = false; setClean(); }
  }
});
["pointerup", "pointercancel"].forEach((ev) => pane.addEventListener(ev, () => {
  if (drawing && cleanedRatio() > 0.6) setClean();
  drawing = false;
}));
paneClean.addEventListener("click", () => (pane.classList.contains("clean") ? resetPane() : setClean()));

resetPane();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (!pane.classList.contains("clean")) resetPane(); }, 200);
});

// ---------- Trabalhos: vídeos que rodam sem som e abrem com som ----------
const reelsList = document.getElementById("reels");
const reelVideos = [...reelsList.querySelectorAll("video")];
const canHover = window.matchMedia("(hover: hover)").matches;

// barrinha de progresso de cada vídeo
reelVideos.forEach((video) => {
  const bar = document.createElement("span");
  bar.className = "reel-progress";
  video.parentElement.appendChild(bar);
  video.addEventListener("timeupdate", () => bar.style.setProperty("--p", video.duration ? video.currentTime / video.duration : 0));
});

const play = (v) => { if (!reduceMotion) v.play().catch(() => {}); };

if (canHover) {
  // computador: o vídeo de destaque roda ao aparecer, os outros quando o mouse passa
  const feature = reelsList.querySelector(".reel-feature video");
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? play(feature) : feature.pause()), { threshold: 0.5 }).observe(feature);
  reelVideos.filter((v) => v !== feature).forEach((video) => {
    const btn = video.parentElement;
    btn.addEventListener("mouseenter", () => play(video));
    btn.addEventListener("mouseleave", () => video.pause());
  });
} else {
  // celular: roda só o vídeo que está bem visível na faixa, para poupar dados
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.intersectionRatio > 0.75 ? play(entry.target) : entry.target.pause()));
  }, { threshold: [0, 0.75, 1] });
  reelVideos.forEach((v) => io.observe(v));
}

// setas da faixa (tablet)
document.querySelectorAll(".reels-arrow").forEach((btn) =>
  btn.addEventListener("click", () => {
    const step = reelsList.querySelector(".reel").getBoundingClientRect().width + 16;
    reelsList.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
  })
);

// player em tela cheia, com som
const player = document.getElementById("player");
const playerVideo = document.getElementById("playerVideo");
reelsList.querySelectorAll(".reel-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    reelVideos.forEach((v) => v.pause());
    playerVideo.src = btn.dataset.src;
    player.setAttribute("aria-label", btn.dataset.title);
    player.showModal();
    playerVideo.play().catch(() => {});
  })
);
document.getElementById("playerClose").addEventListener("click", () => player.close());
player.addEventListener("click", (e) => { if (e.target === player) player.close(); });   // clique fora do vídeo
player.addEventListener("close", () => { playerVideo.pause(); playerVideo.removeAttribute("src"); playerVideo.load(); });
