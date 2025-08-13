document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel img");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (!carousel || slides.length === 0) {
    console.error("Carousel or slides not found.");
    return;
  }

  let index = 0;
  let intervalId = null;
  const AUTO_DELAY = 3000; // ms

  function goToSlide(i) {
    // keep index within bounds
    index = (i % slides.length + slides.length) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() {
    goToSlide(index + 1);
  }
  function prev() {
    goToSlide(index - 1);
  }

  function startAuto() {
    stopAuto();
    intervalId = setInterval(next, AUTO_DELAY);
  }

  function stopAuto() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // button handlers
  nextBtn.addEventListener("click", function () {
    stopAuto();
    next();
    startAuto();
  });
  prevBtn.addEventListener("click", function () {
    stopAuto();
    prev();
    startAuto();
  });

  // init
  goToSlide(0);
  startAuto();

  // Optional: pause on hover
  const wrapper = document.querySelector(".wrapper");
  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);
});
