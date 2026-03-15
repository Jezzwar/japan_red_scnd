// ===== MOBILE MENU =====
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}
document.addEventListener('click', e => {
  const nav = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ===== CART =====
let cartCount = 0;
function addToCart(btn) {
  cartCount++;
  const badge = document.getElementById('cartBadge');
  badge.textContent = cartCount;
  badge.style.display = 'flex';
  const floatingBadge = document.getElementById('floatingBadge');
  if (floatingBadge) floatingBadge.textContent = cartCount;
  const original = btn.innerHTML;
  btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Added`;
  btn.style.background = '#4caf50';
  setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 900);
}

// ===== MENU FILTERING =====
let seeAllOpen = false;

function filterMenu(cat) {
  const cards = document.querySelectorAll('.menu-card');
  cards.forEach(card => {
    const cardCat = card.dataset.cat;
    const isExtra = card.classList.contains('extra-item');

    if (cat === 'all') {
      // In "All" mode: show non-extra always; extra only if seeAll is open
      if (!isExtra) {
        card.style.display = 'flex';
      } else {
        card.style.display = seeAllOpen ? 'flex' : 'none';
      }
    } else {
      // In filtered mode: show all matching cards regardless of extra status
      if (cardCat === cat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filterMenu(btn.dataset.filter);
  });
});

// ===== SEE ALL / SEE LESS =====
function toggleSeeAll() {
  seeAllOpen = !seeAllOpen;
  const btn = document.getElementById('seeAllBtn');
  const activeFilter = document.querySelector('.tab.active')?.dataset.filter || 'all';

  if (seeAllOpen) {
    btn.innerHTML = `See Less <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
  } else {
    btn.innerHTML = `See All Menu <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
  }

  filterMenu(activeFilter);
}

// ===== RESERVATION MODAL =====
function handleReservation(e) {
  e.preventDefault();
  // Show custom modal instead of browser alert
  document.getElementById('reserveModal').classList.add('active');
}

function closeModal(e) {
  // Close only when clicking backdrop
  if (e && e.target !== document.getElementById('reserveModal')) return;
  document.getElementById('reserveModal').classList.remove('active');
}

function closeModalBtn() {
  document.getElementById('reserveModal').classList.remove('active');
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalBtn();
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== CAROUSEL =====
(function () {
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.cdot');
  if (!track) return;
  const total = track.children.length;
  let idx = 0, timer;

  function go(n) {
    idx = (n + total) % total;
    const w = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${idx * w}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.idx); reset(); }));

  function reset() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 4500); }
  reset();
})();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll(
  '.menu-card:not(.extra-item), .tcard, .chef-card, .service-item, .services-img, .services-content, .reservation-left, .reservation-form'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
