# ghrepos.js #
A simple jQuery plugin for accessing a user's public repos via the GitHub API.

# Useage #
```javascript
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.ghrepos.js"></script>
<script>
  $(document).ready(function(){
    // Target your dl
    $("#github-repo-list").getUserRepos(username: 'yourNameHere');
  });
</script>
```

This will populate the targeted `<dl>` with 2 elements:

- A `<dt>` containing an `<a>` element with the name of the repo linking to the repo on GitHub
- A `<dd>` containing the description of the repo

# Options #

The only required setting is the `username` (as shown in the example). Other than that, there are a few other options you can set to fit your preferences:

- `showForks` (`boolean`) - Show user's repos that are forks. Set to `false` by default.
- `showInverted` (`boolean`) - Show the list of repos sorted inversely by date last updated. Set to `true` by default.
- `allowedRepos` (`array`) - Explicitly whitelist repos by name. Useful if `showInverted` is set to `false`, but you still want a specific repo to be displayed.