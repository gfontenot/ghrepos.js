// ghrepos.js - http://github.com/gfontenot/ghrepos.js
// 
// Copyright 2012, Gordon Fontenot - http://gordonfontenot.com
// Released under the WTFPL license - http://sam.zoy.org/wtfpl/

(function($) {

  $.fn.getUserRepos = function( options ) {
    var settings = {
      username: 'example',
      showForks: false,
      showInverted: true,
      allowedRepos: ['']
    }

    $.extend( settings, options );

    return this.each(function() {
      // Github API V3 endpoint
      var gh_pub_repos_url = "https://api.github.com/users/" + settings.username + "/repos";

      var repos_list = this;

      $.ajax({
        url: gh_pub_repos_url,
        dataType: 'jsonp',
        type: 'get',
        success: function(response) {
          // The data from the response is the array of repos
          var repos = response.data;

          // sort the repos by date modified
          function sort_by_date(a, b) {
            return new Date(a.pushed_at) - new Date(b.pushed_at);
          }
          repos.sort(sort_by_date);

          // Invert the repo order, to show most recent repos first
          (settings.showInverted) ? repos.reverse() : false;

          var i;
          for(i = 0; i < repos.length; i++){
            var repo = repos[i];

            // Only show specified repos
            // First, check to see if the repo is in the allowedRepos array
            // Then check to see if the user wants to show all forks
            // Finally, make sure the repo isn't a fork if we've gotten this far
            if (settings.allowedRepos.indexOf(repo.name) >= 0 || settings.showForks || !repo.fork) {

              // Create an <a> for the repo name linked to the github url
              var a = $('<a>').attr('href', repo.html_url)
                              .attr('title', repo.name)
                              .text(repo.name);

              // Nest the <a> in a <dt>
              var dt = $('<dt>').append(a);

              // Add a <dd> for the repo description
              var dd = $('<dd>').addClass('project-description')
                                .text(repo.description);

              // Nest the <dt> and <dd> inside the #gh-projects <dl>
              $(repos_list).append(dt).append(dd);
            }
          }
        }
      });
    });
  }
})(jQuery);