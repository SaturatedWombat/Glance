document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('newtab');
  checkPageButton.addEventListener('click', function() {


    chrome.tabs.getSelected(null, function(tab) {
      /*
      d = document;

      var f = d.createElement('form');
      f.action = 'newtab.html';
      f.method = 'post';
      d.body.appendChild(f);
      f.submit();
      */
      window.open("newtab.html");

    });
  }, false);
}, false);
