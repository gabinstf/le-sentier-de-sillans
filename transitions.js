// Navigation animée — fade out du body avant de changer de page
window.goTo = function (url) {
  document.body.style.transition = 'opacity 0.18s ease';
  document.body.style.opacity = '0';
  setTimeout(function () { window.location.href = url; }, 190);
};
