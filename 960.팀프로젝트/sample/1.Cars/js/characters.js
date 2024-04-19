let gallerySwiper = new Swiper(".gallerySwiper", {
    centeredSlides: true,
    slidesPerView: 2,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1500,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});