window.goTo = function (url) {
  window.location.href = url;
};

// Enregistrer le SW à chaque visite pour que les mises à jour soient
// détectées. Le garde dlDone respecte le choix « NON MERCI » : pas de
// service worker tant que l'utilisateur n'a rien téléchargé.
if ('serviceWorker' in navigator && localStorage.getItem('dlDone')) {
  navigator.serviceWorker.register('sw.js').catch(function () {});
}
