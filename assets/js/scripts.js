// custom js scripts

$(document).ready(function() {

  // make img.img-card into cards and display alt text as caption
  $("main img").each(function() {
    $(this).wrap("<div class='card bg-light image-card-wrap shadow-sm d-block my-2 mx-0 mx-md-2 float-md-right'></div>");
    $(this).addClass("img-fluid card-img-top");
    var imageCaption = $(this).attr("alt");
    var imageSRC = $(this).attr("src");
    if (imageCaption == null) {
      $("<div class='card-body'><small class='card-text'><i>Caption not available</i><a class='mg-popup ml-1 text-secondary' title='Caption not available' href='" + imageSRC + "'><i class='fi fi-zoom-in ml-1'></i></a></small></div>").insertAfter(this);
    } else {
      $("<div class='card-body'><small class='card-text' role='note'>" + imageCaption + "<a class='mg-popup ml-1 text-secondary' href='" + imageSRC + "' title='" + imageCaption + "'><i class='fi fi-zoom-in ml-1'></i></a></small></div>").insertAfter(this);
    }
  });

  // make tables responsive
  $("main table").each(function() {
    $(this).addClass("table");
    $(this).wrap("<div class='table-responsive'></div>");
  });

  // enable popup gallery
  $('main').magnificPopup({
    delegate: 'a.mg-popup',
    type: 'image',
    gallery: {
      enabled: true
    },
  });


  // more code here

});


// initialise typeahead

$(function() {

  function initSearchBox() {

    var pages = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace(['title', 'abstract', 'date']),
      // datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,

      prefetch: {
      	url: '/search.json',
        ttl: 600000,
      }
    });


    $('#search-box').typeahead({
      minLength: 2,
      highlight: true,
      classNames: {
        menu: 'w-100',
        hint: 'text-muted',
        dataset: 'dropdown-menu show shadow mt-1 w-100',
        //suggestion: 'dropdown-item small text-truncate',
        highlight: 'border-bottom border-success',
      },
    }, {
      name: 'pages',
      display: 'title',
      source: pages,
      templates: {
        notFound: '<div class="dropdown-item small disabled empty-message">Nothing found</div>',
        suggestion: function(data) {
          return '<div class="dropdown-item small"><h6 class="text-truncate">' + data.title + '</h6><p class="mb-0 text-truncate"><span class="badge badge-primary mr-1">' + data.date + '</span>' + data.abstract + '</p></div>';
        },
      }
    });

    $('#search-box').bind('typeahead:select', function(ev, suggestion) {
      window.location.href = suggestion.url;
    });
  }

  initSearchBox();
});
