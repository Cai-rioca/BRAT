// --------------------
// GSAP ANIMAÇÕES
// --------------------
gsap.set(
    [".main-title", ".badges", ".video-player", ".description", ".arrow-circle", ".header"],
    { opacity: 0 }
  );
  
  const timeline = gsap.timeline({ delay: 0.3 });
  timeline
    .to(".header", { opacity: 1, duration: 0.8, ease: "power2.out" })
    .to(".main-title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.4")
    .to(".badges", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
    .to(".video-player", { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-0.5")
    .to(".description", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .to(".arrow-circle", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.2");
  
  // --------------------
  // ELEMENTOS
  // --------------------
  const arrowBtn = document.querySelector(".arrow-circle");
  const widget = SC.Widget(document.getElementById("sc-player"));
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const musicPlayBtn = document.getElementById("play");
  const icon = document.getElementById("playIcon");
  const volumeBtn = document.getElementById("volume");
  const volumeSlider = document.getElementById("volumeSlider");
  
  // --------------------
  // BOTÕES HOVER
  // --------------------
  arrowBtn.addEventListener("mouseenter", () =>
    gsap.to(arrowBtn, { scale: 1.1, duration: 0.3 })
  );
  arrowBtn.addEventListener("mouseleave", () =>
    gsap.to(arrowBtn, { scale: 1, duration: 0.3 })
  );
  
  // Clique com rotação
  arrowBtn.addEventListener("click", () => {
    gsap.to(arrowBtn, { rotation: "+=360", duration: 0.6, ease: "power2.out" });
  });
  
  // Efeito parallax no scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    gsap.to(arrowBtn, { y: scrolled * 0.3, duration: 0.3 });
  });
  
  // --------------------
  // SOUND CLOUD PLAYER
  // --------------------
  let isPlaying = false;
  let trackIndex = 0;
  
  const tracks = [
    "https://api.soundcloud.com/tracks/293",
    "https://api.soundcloud.com/tracks/1123049251",
    "https://api.soundcloud.com/tracks/1967183415",
  ];
  
  function loadTrack(i, autoplay = false) {
    widget.load(tracks[i], { auto_play: autoplay, show_artwork: false });
  }
  loadTrack(trackIndex);
  
  // play/pause
  musicPlayBtn.addEventListener("click", () => {
    if (isPlaying) widget.pause();
    else widget.play();
  });
  
  // prev
  prevBtn.addEventListener("click", () => {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex, true);
  });
  
  // next
  nextBtn.addEventListener("click", () => {
    trackIndex = (trackIndex + 1) % tracks.length;
    loadTrack(trackIndex, true);
  });
  
  // troca ícone play/pause
  widget.bind(SC.Widget.Events.PLAY, () => {
    isPlaying = true;
    icon.classList.replace("fa-play", "fa-pause");
  });
  widget.bind(SC.Widget.Events.PAUSE, () => {
    isPlaying = false;
    icon.classList.replace("fa-pause", "fa-play");
  });
  
  // --------------------
  // VOLUME
  // --------------------
  volumeBtn.addEventListener("click", () => {
    volumeSlider.style.display =
      volumeSlider.style.display === "block" ? "none" : "block";
  });
  
  volumeSlider.addEventListener("input", (e) => {
    const vol = e.target.value / 100;
    widget.setVolume(vol);
  });
  