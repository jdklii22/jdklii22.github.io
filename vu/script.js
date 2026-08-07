// ═══════════════════════════════════════════
//   Vu Phan, Realtor® — Site Configuration
//   RE/MAX Access · Philadelphia, PA
//   ➜ Edit SITE_DATA below to update listings,
//     contact info, and stats without touching HTML.
// ═══════════════════════════════════════════

const SITE_DATA = {
  // ── Contact Info ──────────────────────────
  phone:      "215-713-6655",
  brokerage:  "RE/MAX Access",
  address:    "100 Spring Garden St, Philadelphia, PA 19123",
  googleUrl:  "https://www.google.com/maps/place/Vu+Phan,+Realtor%C2%AE/@39.9594715,-75.1394882,577m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89c6c9714684fbe7:0x4b9cdbbd3472b8b6!8m2!3d39.9594715!4d-75.1394882!16s%2Fg%2F11x2pwpk81!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwNC4wIKXMDSoASAFQAw%3D%3D",

  // ── Stats Bar ─────────────────────────────
  stats: [
    { target: 150, suffix: "+",    label: "Transactions Closed" },
    { target: 75,  suffix: "M+",   label: "In Sales Volume",   prefix: "$" },
    { target: 99,  suffix: ".4%",  label: "List-to-Sale Ratio" },
    { target: 5,   suffix: "★",    label: "Google Rating" }
  ],

  // ── Featured Listings ─────────────────────
  // Add / remove / edit objects here to update the listings grid.
  listings: [
    {
      id: 1,
      title:       "Spring Garden Luxury Townhome",
      address:     "420 Spring Garden St, Philadelphia, PA",
      area:        "spring-garden",
      type:        "townhome",
      price:       "$985,000",
      priceRaw:    985000,
      beds:        4,
      baths:       3.5,
      sqft:        "3,200 sqft",
      tag:         "Just Listed",
      image:       "spring_garden.jpg"
    },
    {
      id: 2,
      title:       "Center City Penthouse",
      address:     "1414 Market St #2802, Philadelphia, PA",
      area:        "center-city",
      type:        "condo",
      price:       "$1,650,000",
      priceRaw:    1650000,
      beds:        3,
      baths:       3,
      sqft:        "2,450 sqft",
      tag:         "Featured",
      image:       "philadelphia_hero.jpg"
    },
    {
      id: 3,
      title:       "Rittenhouse Parkside Residence",
      address:     "220 Rittenhouse Sq #12B, Philadelphia, PA",
      area:        "rittenhouse",
      type:        "condo",
      price:       "$2,200,000",
      priceRaw:    2200000,
      beds:        3,
      baths:       3.5,
      sqft:        "2,900 sqft",
      tag:         "Exclusive",
      image:       "rittenhouse.jpg"
    },
    {
      id: 4,
      title:       "Old City Loft with Rooftop",
      address:     "115 N 3rd St, Philadelphia, PA",
      area:        "old-city",
      type:        "townhome",
      price:       "$849,000",
      priceRaw:    849000,
      beds:        2,
      baths:       2.5,
      sqft:        "2,100 sqft",
      tag:         "Under Contract",
      image:       "old_city.jpg"
    },
    {
      id: 5,
      title:       "Fishtown New Construction",
      address:     "1620 Frankford Ave, Philadelphia, PA",
      area:        "fishtown",
      type:        "single",
      price:       "$725,000",
      priceRaw:    725000,
      beds:        3,
      baths:       3,
      sqft:        "2,200 sqft",
      tag:         "New Build",
      image:       "fishtown.jpg"
    },
    {
      id: 6,
      title:       "Northern Liberties Single Family",
      address:     "710 N 3rd St, Philadelphia, PA",
      area:        "fishtown",
      type:        "single",
      price:       "$1,150,000",
      priceRaw:    1150000,
      beds:        4,
      baths:       4,
      sqft:        "3,400 sqft",
      tag:         "Price Reduced",
      image:       "fishtown.jpg"
    }
  ]
};


// ═══════════════════════════════════════════
//   Initialization
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initNavbar();
  initReveal();
  initCounters();
  renderListings(SITE_DATA.listings);
  initMobileMenu();
});


// ── Footer Year ──────────────────────────────────────────────
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}


// ── Navbar — transparent on hero, white on scroll ─────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once immediately
}


// ── Mobile Menu Toggle ────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById("navHamburger");
  const menu      = document.getElementById("navMenu");
  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("nav-menu--open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("nav-menu--open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}


// ── Scroll Reveal (IntersectionObserver) ─────────────────────
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}


// ── Animated Stat Counters ────────────────────────────────────
function initCounters() {
  const chips = document.querySelectorAll(".stat-chip__num");
  if (!chips.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      const isInt  = Number.isInteger(target);
      const dur    = 1600; // ms
      const start  = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / dur, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current  = eased * target;
        el.textContent = isInt ? Math.floor(current) : current.toFixed(0);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isInt ? target : target;
      };

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  chips.forEach(chip => observer.observe(chip));
}


// ── Listings Renderer ─────────────────────────────────────────
function renderListings(items) {
  const grid = document.getElementById("listingsGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = `
      <div class="listings__empty">
        <p>No properties matched your search. <a href="#contact" style="color:var(--gold-600)">Contact Vu</a> for off-market options.</p>
      </div>`;
    return;
  }

  grid.innerHTML = items.map((p, i) => `
    <article class="prop-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="prop-card__img-wrap">
        <img class="prop-card__img" src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="prop-card__tag">${p.tag}</span>
        <span class="prop-card__price">${p.price}</span>
      </div>
      <div class="prop-card__body">
        <h3 class="prop-card__title">${p.title}</h3>
        <p class="prop-card__address">${p.address}</p>
        <div class="prop-card__features">
          <span>🛏 ${p.beds} Beds</span>
          <span>🛁 ${p.baths} Baths</span>
          <span>📐 ${p.sqft}</span>
        </div>
      </div>
    </article>
  `).join("");

  // Trigger reveal for newly inserted cards
  requestAnimationFrame(() => initReveal());
}


// ── Filter Listings ───────────────────────────────────────────
function applyFilters() {
  const area  = document.getElementById("fArea")?.value  || "all";
  const type  = document.getElementById("fType")?.value  || "all";
  const price = document.getElementById("fPrice")?.value || "all";

  let filtered = SITE_DATA.listings;

  if (area  !== "all") filtered = filtered.filter(p => p.area === area);
  if (type  !== "all") filtered = filtered.filter(p => p.type === type);
  if (price !== "all") filtered = filtered.filter(p => p.priceRaw <= Number(price));

  renderListings(filtered);

  document.getElementById("listings")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}


// ── Valuation Form ────────────────────────────────────────────
function handleValuation(event) {
  event.preventDefault();
  const addr   = document.getElementById("valAddr")?.value;
  const status = document.getElementById("valStatus");
  if (status) {
    status.textContent = `✓ Valuation request received for ${addr}. Vu Phan will be in touch within 24 hours.`;
    event.target.reset();
  }
}


// ── Contact Form ──────────────────────────────────────────────
function handleContact(event) {
  event.preventDefault();
  const name   = document.getElementById("cName")?.value;
  const status = document.getElementById("cStatus");
  if (status) {
    status.textContent = `✓ Thanks, ${name}! Your message has been sent. Vu will respond promptly.`;
    event.target.reset();
  }
}
