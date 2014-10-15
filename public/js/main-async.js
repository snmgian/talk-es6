var currentPage = 0;

var $body = document.querySelector('body');
var $content = document.querySelector('#content');

var async = function(makeGenerator) {
  return function() {
    var generator = makeGenerator.apply(this, arguments);

    function handle(result) {
      if (result.done) {
        return result.value;
      }

      return result.value.then(function (res) {
        return handle(generator.next(res));
      }, function(err) {
        return handle(generator.throw(err));
      });
    }

    return handle(generator.next());
  };
};

var keyPressHandler = function(e) {
  if (e.keyCode === 97) {
    goToPreviousPage();
  } else if (e.keyCode === 115) {
    goToNextPage();
  }
};

var getHtml = function(url) {
  return new Promise(function(fullfill, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          fullfill(xhr.responseText);
        } else {
          reject(Error('Failure, status = ' + xhr.statusText));
        }
      }
    };

    xhr.onerror = function(e) {
      reject(Error('Failure, status = ' + xhr.statusText));
    };

    xhr.send(null);
  });
};

var goToNextPage = function() {
  goToPage(currentPage + 1);
};

var goToPreviousPage = function() {
  goToPage(currentPage - 1);
};

var goToPage = async(function* (page) {
  try {
    var html = yield getHtml('/slides/' + page);

    $content.innerHTML = html;

    Rainbow.color($content);
    currentPage = page;

  } catch(e) {
    console.log('ERROR Retrieving slide ' + page);
    console.log(e);
  }
});

$body.addEventListener('keypress', keyPressHandler);
goToPage(1);

