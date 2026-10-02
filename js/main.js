/* KAHF — shared behaviour */
(function () {
  "use strict";

  /* Sticky header state */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Scroll reveals */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Contact form → opens the visitor's mail client with a composed message */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var topic = form.querySelector("#cf-topic").value;
      var message = form.querySelector("#cf-message").value.trim();

      var subject = "KAHF enquiry — " + (topic || "General") + (name ? " — " + name : "");
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Topic: " + topic + "\n\n" +
        message;

      window.location.href =
        "mailto:info@ecommercewing.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var status = document.getElementById("form-status");
      if (status) {
        status.textContent = "Your email app should open with the message ready to send.";
      }
    });
  }
})();
