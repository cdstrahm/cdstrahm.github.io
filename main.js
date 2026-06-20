'use strict';

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

function syncCaptionWidths() {
  document.querySelectorAll('.project-images-row figure').forEach(figure => {
    const img = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');
    if (img && caption) {
      caption.style.width = (img.offsetWidth * 0.95) + 'px';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const images = document.querySelectorAll('.project-images-row img');
  let loaded = 0;
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) syncCaptionWidths();
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === images.length) syncCaptionWidths();
      });
    }
  });
});
