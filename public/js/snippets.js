var tx = getTransaction('pages', 'readwrite');
var store = tx.objectStore('pages');
store.add({number: page, content: html})


var tx = getTransaction('pages');
var store = tx.objectStore('pages');
var index = store.index('number');
index.get(page).onsuccess = function(event) {
  // ..
};


function getPage(page) {
  getCachedPage(page,
    function(html) {
      putHtmlIntoDocument(html);
    },
    function() {
      // page not cached yet.

      getHtml('/slides/' + page,
        function(html) {
          putHtmlIntoDocument(html);
          cachePage(page, html,
            function() {
              console.debug('Page ' + page + ' saved.');
            },
            function(e) {
              console.error(e);
            });
          },
          function(e) {
            // error when retrieving page.
            console.error(e);
          });
    });
}

function getPage(page) {
  getCachedPage(page).then(function(html) {
    putHtmlIntoDocument(html);
  }, function() {

    getHtml('/slides/' + page).then(function(html) {
      putHtmlIntoDocument(html);
      return cachePage(page, html);
    }).then(function() {
      console.debug('Page ' + page + ' saved.');
    }

  }).catch(e) {
    console.error(e);
  });
}

