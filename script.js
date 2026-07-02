/* Hydro Nails and Spa — interactions */
(function () {
  "use strict";

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Sticky header shrink
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("navmenu");
  if (toggle && menu) {
    // Scrim
    var scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);

    var setOpen = function (open) {
      document.body.classList.toggle("nav-open", open);
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("open"));
    });
    scrim.addEventListener("click", function () { setOpen(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
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
