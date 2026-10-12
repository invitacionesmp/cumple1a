(function () {
  var cfg = window.INVITACION || {};

  /* ---------- Cuenta regresiva ---------- */
  var target = new Date(cfg.fechaEvento || "2025-06-20T17:00:00").getTime();
  var el = {
    d: document.getElementById("cd-days"),
    h: document.getElementById("cd-hrs"),
    m: document.getElementById("cd-mins"),
    s: document.getElementById("cd-secs")
  };
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    el.d.textContent = pad(Math.floor(s / 86400));
    el.h.textContent = pad(Math.floor((s % 86400) / 3600));
    el.m.textContent = pad(Math.floor((s % 3600) / 60));
    el.s.textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Enlaces ---------- */
  function setLink(id, href) {
    var a = document.getElementById(id);
    if (a && href) { a.href = href; a.target = "_blank"; a.rel = "noopener"; }
  }
  setLink("btn-rsvp", cfg.rsvpLink);

  /* ---------- Música ---------- */
  var audio = document.getElementById("musica");
  var btn = document.getElementById("btn-musica");
  if (cfg.musica) audio.src = cfg.musica;

  function setPlaying(on) {
    btn.classList.toggle("playing", on);
    btn.setAttribute("aria-label", on ? "Pausar música" : "Reproducir música");
  }
  function play() {
    var p = audio.play();
    if (p && p.then) p.then(function () { setPlaying(true); }).catch(function () { setPlaying(false); });
  }
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (audio.paused) play(); else { audio.pause(); setPlaying(false); }
  });
  // Los navegadores bloquean el autoplay: arranca con la primera interacción.
  var started = false;
  function firstTouch() {
    if (started) return;
    started = true;
    play();
  }
  ["click", "touchstart", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, firstTouch, { once: true, passive: true });
  });
  // Si el usuario pausa a mano antes de la primera interacción, no forzar.
  btn.addEventListener("click", function () { started = true; });

  /* ---------- Carrusel de la galería ---------- */
  (function () {
    var track = document.getElementById("car-track");
    var dotsBox = document.getElementById("car-dots");
    var prev = document.getElementById("car-prev");
    var next = document.getElementById("car-next");
    if (!track) return;

    var list = cfg.galeria || [];
    var auto = typeof cfg.carruselAuto === "number" ? cfg.carruselAuto : 4500;
    var timer = null, stopped = false, visible = true, raf = 0;

    function slides() { return track.querySelectorAll(".car-slide"); }
    function width() { return track.clientWidth || 1; }
    function current() { return Math.round(track.scrollLeft / width()); }

    function goTo(i) {
      var n = slides().length;
      if (!n) return;
      i = Math.max(0, Math.min(n - 1, i));
      track.scrollTo({ left: i * width(), behavior: "smooth" });
    }

    function renderDots() {
      var n = slides().length;
      dotsBox.innerHTML = "";
      for (var k = 0; k < n; k++) dotsBox.appendChild(document.createElement("i"));
      var many = n > 1;
      dotsBox.hidden = !many;
      prev.hidden = !many;
      next.hidden = !many;
      update();
    }
    function update() {
      var dots = dotsBox.children, c = current();
      for (var k = 0; k < dots.length; k++) dots[k].classList.toggle("on", k === c);
    }

    /* Construir las diapositivas desde config.js; si una foto no existe, se omite */
    list.forEach(function (src, idx) {
      var slide = document.createElement("div");
      slide.className = "car-slide";
      var img = new Image();
      img.alt = "Foto " + (idx + 1) + " de la galería";
      img.draggable = false;
      img.decoding = "async";
      img.onerror = function () { slide.remove(); renderDots(); };
      img.src = src;
      slide.appendChild(img);
      track.appendChild(slide);
    });
    renderDots();

    track.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; update(); });
    }, { passive: true });
    window.addEventListener("resize", function () { goTo(current()); update(); });

    /* Botones y teclado */
    prev.addEventListener("click", function () { stopAuto(); goTo(current() - 1); });
    next.addEventListener("click", function () { stopAuto(); goTo(current() + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { stopAuto(); goTo(current() - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { stopAuto(); goTo(current() + 1); e.preventDefault(); }
    });

    /* Arrastrar con el mouse (en el celular el deslizado es nativo) */
    var down = false, startX = 0, startLeft = 0;
    track.addEventListener("pointerdown", function (e) {
      stopAuto();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add("dragging");
      try { track.setPointerCapture(e.pointerId); } catch (err) {}
    });
    track.addEventListener("pointermove", function (e) {
      if (down) track.scrollLeft = startLeft - (e.clientX - startX);
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      track.classList.remove("dragging");
      var w = width(), dx = e.clientX - startX, i = Math.round(startLeft / w);
      if (dx < -w * 0.15) i++; else if (dx > w * 0.15) i--;
      goTo(i);
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("touchstart", stopAuto, { passive: true });
    track.addEventListener("wheel", function (e) { if (Math.abs(e.deltaX) > 0) stopAuto(); }, { passive: true });

    /* Avance automático (solo mientras el carrusel está a la vista) */
    function tick() {
      var n = slides().length;
      if (!visible || stopped || n < 2) return;
      goTo(current() + 1 >= n ? 0 : current() + 1);
    }
    function stopAuto() { stopped = true; if (timer) { clearInterval(timer); timer = null; } }
    if (auto > 0) timer = setInterval(tick, auto);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0.5 }).observe(track);
    }
  })();
})();
