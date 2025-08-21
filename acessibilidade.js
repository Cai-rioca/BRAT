// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Aparecer header
gsap.set([".header", ".accessibility-section"], { opacity: 0 });
gsap.to(".header", { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 });

// Seções que aparecem/somem no scroll
const sections = gsap.utils.toArray(".accessibility-section");
sections.forEach((section, index) => {
  gsap.set(section, { opacity: 0, y: 50 });
  
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    onEnter: () => {
      gsap.to(section, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        delay: index * 0.1
      });
    },
    onLeave: () => {
      gsap.to(section, { opacity: 0, y: -50, duration: 0.6 });
    },
    onEnterBack: () => {
      gsap.to(section, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(section, { opacity: 0, y: 50, duration: 0.6 });
    }
  });
});

// Animação hover dos cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
});

// Efeito parallax suave nos títulos
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.section-title').forEach(el => {
    gsap.to(el, { y: scrolled * 0.5, duration: 0.3, ease: "none" });
  });
});
