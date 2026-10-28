/* Нижняя кнопка на телефоне: появляется, когда первый экран прокручен. Без скрипта страница работает целиком. */
(function () {
  var bar = document.querySelector('.nizhnyaya');
  var hero = document.querySelector('.pervyj');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (e) {
    bar.classList.toggle('vidna', !e[0].isIntersecting);
  }, { threshold: 0 }).observe(hero.querySelector('.knopka'));
})();
