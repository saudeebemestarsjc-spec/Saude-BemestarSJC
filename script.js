/* ==========================================================================
   EVENTO DE SAÚDE & BEM-ESTAR — SJC
   JavaScript puro, sem dependências.

   >>> PARA ATUALIZAR DATA, HORÁRIO, ENDEREÇO OU LINKS, EDITE SÓ O OBJETO CONFIG ABAIXO. <<<
   Os textos marcados com data-cfg="..." no index.html e os botões de mapa/Instagram
   (data-link="...") são preenchidos automaticamente a partir dele.
   (O texto que já está escrito no HTML serve de reserva para quem abrir sem JavaScript
   e para os buscadores. Se mudar a data/endereço, atualize também os metadados do <head>.)
   ========================================================================== */

const CONFIG = {
  // Texto exibido no site (edição de 31 de outubro; o ano ainda não foi confirmado)
  dateLong: "31 de outubro",
  timeText: "16h30",
  placeName: "Igreja Adventista do Sétimo Dia",
  placeShort: "Galo Branco, São José dos Campos/SP",
  addressStreet: "Av. Antônio Ferreira Vinhas, 1173",
  addressDistrictCity: "Galo Branco — São José dos Campos/SP",

  // Endereço completo: usado nos links de mapa e no botão "Copiar endereço"
  addressFull: "Avenida Antônio Ferreira Vinhas, 1173, Galo Branco, São José dos Campos, SP",

  // Links
  instagram: "https://www.instagram.com/saude_e_bem_estar_sjc/",

  // Link da página usado ao compartilhar.
  // Deixe vazio ("") para usar o endereço em que a página estiver aberta (recomendado).
  // Depois de publicar, você pode colocar aqui a URL final do GitHub Pages.
  siteUrl: "",

  // Mensagem de compartilhamento
  shareTitle: "Evento de Saúde & Bem-Estar | Exercício Físico é Saúde, é Vida",
  shareText: "Evento de Saúde & Bem-Estar: Exercício Físico é Saúde, é Vida. 31 de outubro, às 16h30. Entrada gratuita, aberto ao público. Venha com a sua família!",

  // Artes que abrem ampliadas (caminhos relativos a esta pasta)
  gallery: [
    {
      id: "cartaz",
      src: "assets/images/cartaz-evento.jpg",
      title: "Cartaz oficial do evento",
      alt: "Cartaz oficial do Evento de Saúde e Bem-Estar: dia 31/10 às 16h30, convidado especial Prof. Mário, Educação Física. Tema: Exercício Físico é Saúde, é Vida. Exercício físico, hidratação e sorteio de brindes. Igreja Adventista do Sétimo Dia, Av. Antônio Ferreira Vinhas, 1173, Galo Branco. Entrada gratuita. Evento aberto ao público."
    }
  ]
};

(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function pageUrl() {
    return CONFIG.siteUrl || window.location.href.split("#")[0];
  }

  // Copia texto: usa a API moderna e, se não houver, um método de reserva.
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) { /* cai no método de reserva */ }
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  // Mostra uma mensagem curta numa região "aria-live" e apaga depois.
  function say(el, message, ms) {
    if (!el) return;
    el.textContent = message;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => { el.textContent = ""; }, ms || 5000);
  }

  /* ---------- 1. preencher textos e links a partir do CONFIG ---------- */
  function applyConfig() {
    $$("[data-cfg]").forEach((el) => {
      const value = CONFIG[el.dataset.cfg];
      if (typeof value === "string" && value) el.textContent = value;
    });

    const q = encodeURIComponent(CONFIG.addressFull);
    const links = {
      instagram: CONFIG.instagram,
      maps: "https://www.google.com/maps/search/?api=1&query=" + q,
      directions: "https://www.google.com/maps/dir/?api=1&destination=" + q,
      waze: "https://waze.com/ul?q=" + q + "&navigate=yes"
    };
    $$("[data-link]").forEach((a) => {
      const href = links[a.dataset.link];
      if (href) a.setAttribute("href", href);
    });
  }

  /* ---------- 2. menu mobile ---------- */
  function initMenu() {
    const toggle = $(".menu-toggle");
    const nav = $("#menu-principal");
    if (!toggle || !nav) return;

    const icon = $("use", toggle);
    const label = $(".visually-hidden", toggle);
    const desktop = window.matchMedia("(min-width: 960px)");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (icon) icon.setAttribute("href", open ? "#i-fechar" : "#i-menu");
      if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
    }

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    // Ao fechar clicando fora do cabeçalho
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false);
    });
    const onChange = (e) => { if (e.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------- 3. compartilhar convite ---------- */
  function initShare() {
    const btn = $("#btn-compartilhar");
    const fallback = $("#share-fallback");
    const status = $("#share-status");
    const wa = $("#share-whatsapp");
    const copyBtn = $("#share-copiar");
    if (!btn) return;

    const message = () => CONFIG.shareText + " " + pageUrl();
    if (wa) wa.setAttribute("href", "https://wa.me/?text=" + encodeURIComponent(message()));

    function showFallback() {
      if (wa) wa.setAttribute("href", "https://wa.me/?text=" + encodeURIComponent(message()));
      if (fallback) fallback.hidden = false;
    }

    btn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: CONFIG.shareTitle, text: CONFIG.shareText, url: pageUrl() });
          return;
        } catch (err) {
          if (err && err.name === "AbortError") return; // a pessoa cancelou
        }
      }
      showFallback();
      const first = fallback && $("a, button", fallback);
      if (first) first.focus();
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const ok = await copyText(pageUrl());
        say(status, ok ? "Link copiado! Agora é só colar na conversa." : "Não foi possível copiar. Copie o endereço na barra do navegador.");
      });
    }
  }

  /* ---------- 4. copiar endereço ---------- */
  function initCopyAddress() {
    const btn = $("#btn-copiar-endereco");
    const status = $("#copy-status");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const ok = await copyText(CONFIG.addressFull);
      say(status, ok ? "Endereço copiado!" : "Não foi possível copiar. Selecione o endereço e copie manualmente.");
    });
  }

  /* ---------- 5. lightbox das artes (usa <dialog>, sem bibliotecas) ---------- */
  function initLightbox() {
    const dlg = $("#lightbox");
    if (!dlg || typeof dlg.showModal !== "function") {
      // Navegador muito antigo: abre a imagem direto em outra aba.
      $$("[data-lightbox]").forEach((b) => {
        b.addEventListener("click", () => {
          const item = CONFIG.gallery.find((g) => g.id === b.dataset.lightbox);
          if (item) window.open(item.src, "_blank", "noopener");
        });
      });
      return;
    }

    const img = $("#lightbox-img");
    const caption = $("#lightbox-legenda");
    const items = CONFIG.gallery;
    let index = 0;
    if (items.length < 2) dlg.classList.add("lightbox-solo");

    function show(i) {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.src;
      img.alt = item.alt;
      caption.textContent = items.length > 1 ? item.title + " (" + (index + 1) + " de " + items.length + ")" : item.title;
    }

    function open(id) {
      const i = items.findIndex((g) => g.id === id);
      show(i < 0 ? 0 : i);
      document.documentElement.classList.add("no-scroll");
      dlg.showModal();
      $("#lightbox-fechar").focus();
    }

    $$("[data-lightbox]").forEach((b) => b.addEventListener("click", () => open(b.dataset.lightbox)));
    $("#lightbox-fechar").addEventListener("click", () => dlg.close());
    $("#lightbox-anterior").addEventListener("click", () => show(index - 1));
    $("#lightbox-proxima").addEventListener("click", () => show(index + 1));

    // clicar fora da janela fecha
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => {
      document.documentElement.classList.remove("no-scroll");
      img.removeAttribute("src");
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { show(index - 1); }
      if (e.key === "ArrowRight") { show(index + 1); }
    });
  }

  /* ---------- 6. entrada suave dos blocos ao rolar ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- início ---------- */
  function init() {
    applyConfig();
    initMenu();
    initShare();
    initCopyAddress();
    initLightbox();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
