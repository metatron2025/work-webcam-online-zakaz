/* Нижняя кнопка на телефоне, окно анкеты, калькулятор. Без скрипта страница читается целиком; кнопки ведут в Telegram. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Нижняя кнопка появляется, когда первая кнопка ушла с экрана */
  var bar = $('.nizhnyaya'), first = $('.pervyj .knopka');
  if (bar && first && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { bar.classList.toggle('vidna', !e[0].isIntersecting); }).observe(first);
  }

  /* Окно анкеты: ХОЧУ СКОРЕЕ */
  var okno = $('#anketa');
  function zakryt() { if (okno) { okno.classList.remove('otkryto'); if (location.hash === '#anketa') history.replaceState(null, '', location.pathname + location.search); okno.style.display = 'none'; setTimeout(function () { okno.style.display = ''; }, 0); } }
  $$('[data-anketa]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); okno.classList.add('otkryto'); var f = $('input[type=text]', okno); if (f) f.focus(); });
  });
  $$('.okno__x, .okno__fon').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); zakryt(); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zakryt(); });
  /* Квиз (bot-priemnik.js) открывается поверх: когда он появился, окно анкеты закрываем */
  if (okno && 'MutationObserver' in window) {
    new MutationObserver(function (m) {
      m.forEach(function (r) { r.addedNodes.forEach(function (n) { if (n.classList && n.classList.contains('kz-f')) zakryt(); }); });
    }).observe(document.body, { childList: true });
  }

  /* Калькулятор: дни в неделю × коэффициент часов × коэффициент английского, как на боевом (Tilda: pr*ask*engl) */
  var k = $('#kalk');
  if (!k) return;
  var itog = $('#k-itog');
  function koef(name) { var r = $('input[name=' + name + ']:checked', k); return r ? parseFloat(r.getAttribute('data-k')) : 0; }
  function schitat() {
    var v = (+$('#k-dni', k).value) * koef('ask') * koef('engl');
    itog.textContent = isNaN(v) ? 0 : Math.round(10 * v) / 10;
  }
  k.addEventListener('input', schitat); k.addEventListener('change', schitat); schitat();
  var s1 = $('[data-shag="1"]', k), s2 = $('[data-shag="2"]', k), err = $('#k-oshibka');
  $('#k-dalee').addEventListener('click', function () {
    if (!$('input[name=ask]:checked', k) || !$('input[name=engl]:checked', k)) { err.hidden = false; return; }
    err.hidden = true; s1.hidden = true; s2.hidden = false; $('#k-kontakt').focus();
  });
  $('#k-nazad').addEventListener('click', function () { s2.hidden = true; s1.hidden = false; });
  /* Отправка: сам обработчик квиза (bot-priemnik.js) ловит submit и открывает 4 вопроса, как на боевом. Пустой контакт — по месту. */
  $('#k-kontakt').required = true; k.removeAttribute('novalidate');
})();
