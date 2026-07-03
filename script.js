/* Hydro Nails and Spa — interactions */
(function () {
  "use strict";

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Sticky header: shrink + reveal-on-scroll-up
  var header = document.getElementById("siteHeader");
  var lastY = window.scrollY;
  var onScroll = function () {
    var y = window.scrollY;
    if (y > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Reveal on ANY upward scroll; hide when scrolling down past the header.
    if (y > lastY && y > 90) {
      header.classList.add("header-hidden");
    } else if (y < lastY) {
      header.classList.remove("header-hidden");
    }
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav (drawer + scrim live in the HTML now)
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("navmenu");
  var drawer = document.getElementById("navDrawer");
  if (toggle && menu && drawer) {
    // The header uses backdrop-filter, which makes it the containing block for
    // any fixed descendant. Move the drawer to <body> so inset:0 resolves to the
    // full viewport (correct height, no bottom gap).
    document.body.appendChild(drawer);

    var isOpen = false;
    var setOpen = function (open) {
      isOpen = open;
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () { setOpen(!isOpen); });

    // Close on scrim tap, on any nav link tap, and on Escape.
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]") || e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) setOpen(false);
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox (only initializes if real <a class="glightbox"> images are added)
  if (window.GLightbox) {
    try { GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true }); } catch (e) {}
  }

  // Booking form — non-wired; provide friendly feedback instead of a real submit
  var form = document.querySelector(".book-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("book-note");
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      if (!name.value.trim() || !phone.value.trim()) {
        if (note) note.textContent = "Please add your name and a phone number so the studio can reach you.";
        (name.value.trim() ? phone : name).focus();
        return;
      }
      form.querySelectorAll("input, select, textarea, button").forEach(function (el) { el.disabled = true; });
      if (note) note.textContent = "Thanks, " + name.value.trim().split(" ")[0] + "! Your request is noted — the studio will call (225) 677-0507 to confirm. (Demo form: not yet wired to send.)";
    });
  }
})();
