var currentPage = 0;

var $body = document.querySelector('body');
var $content = document.querySelector('#content');

var keyPressHandler = function(e) {
  if (e.keyCode === 97) {
    goToPreviousPage();
  } else if (e.keyCode === 115) {
    goToNextPage();
  }
};

var getHtml = function(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(xhr.responseText);
      } else {
        cb(undefined, Error('Failure, status = ' + xhr.statusText));
      }
    }
  };

  xhr.onerror = function(e) {
    cb(undefined, Error('Failure, status = ' + xhr.statusText));
  };

  xhr.send(null);
};

var goToNextPage = function() {
  goToPage(currentPage + 1);
};

var goToPreviousPage = function() {
  goToPage(currentPage - 1);
};

var goToPage = function(page) {
  getHtml('/slides/' + page, function(html, e) {
    if (typeof e === undefined) {
      console.log('ERROR Retrieving slide ' + page);
      console.log(e);
      return;
    }

    $content.innerHTML = html;
    Rainbow.color($content);
    currentPage = page;
  });
};

$body.addEventListener('keypress', keyPressHandler);
goToPage(1);

