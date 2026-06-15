// Countdown
  (function () {
    let totalSeconds = (2 * 24 * 60 * 60) + (14 * 60 * 60) + (37 * 60) + 19;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
      let remaining = totalSeconds;

      const days = Math.floor(remaining / 86400);
      remaining %= 86400;

      const hours = Math.floor(remaining / 3600);
      remaining %= 3600;

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;

      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

      if (totalSeconds > 0) totalSeconds--;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  })();

  // Special Slider
  (function () {
    const slider = document.getElementById("specialSlider");
    const prev = document.getElementById("specialPrev");
    const next = document.getElementById("specialNext");

    if (!slider || !prev || !next) return;

    const scrollAmount = 320;

    next.addEventListener("click", function () {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });

    prev.addEventListener("click", function () {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
  })();

  // Product Scroller
  (function () {
    const scroller = document.getElementById("product-scroller");
    const scrollLeftBtn = document.getElementById("scroll-left");
    const scrollRightBtn = document.getElementById("scroll-right");

    if (!scroller || !scrollLeftBtn || !scrollRightBtn) return;

    scrollLeftBtn.addEventListener("click", function () {
      scroller.scrollBy({ left: -320, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", function () {
      scroller.scrollBy({ left: 320, behavior: "smooth" });
    });

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    scroller.addEventListener("mousedown", function (e) {
      isDown = true;
      startX = e.pageX - scroller.offsetLeft;
      scrollStart = scroller.scrollLeft;
    });

    scroller.addEventListener("mouseleave", function () {
      isDown = false;
    });

    scroller.addEventListener("mouseup", function () {
      isDown = false;
    });

    scroller.addEventListener("mousemove", function (e) {
      if (!isDown) return;

      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.5;
      scroller.scrollLeft = scrollStart - walk;
    });
  })();

  // Hero Slider
  (function () {
  const hero = document.getElementById("hero");
  const track = document.getElementById("hero-track");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  const dotsWrap = document.getElementById("hero-dots");

  if (!hero || !track || !dotsWrap) return;

  const slides = Array.from(track.querySelectorAll(".hero-slide"));
  const total = slides.length;

  if (!total) return;

  let current = 0;
  let scrollTimer = null;

  function buildDots() {
    dotsWrap.innerHTML = "";

    slides.forEach(function (_, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot";
      dot.setAttribute("aria-label", "رفتن به اسلاید " + (index + 1));

      dot.addEventListener("click", function () {
        goTo(index);
      });

      dotsWrap.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll(".hero-dot");

    dots.forEach(function (dot, index) {
      const isActive = index === current;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    current = index;

    slides[current].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });

    updateDots();
  }

  function detectCurrentSlide() {
    const trackRect = track.getBoundingClientRect();
    const trackLeft = trackRect.left;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach(function (slide, index) {
      const slideRect = slide.getBoundingClientRect();
      const distance = Math.abs(slideRect.left - trackLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== current) {
      current = closestIndex;
      updateDots();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(current + 1);
    });
  }

  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(function () {
      detectCurrentSlide();
    }, 80);
  }, { passive: true });

  window.addEventListener("resize", function () {
    goTo(current);
  });

  buildDots();
  updateDots();
})();