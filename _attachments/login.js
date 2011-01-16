$(function() {
    $.couch.app(function(app) {
      $("#account").evently("account", app);
      $("#profile").evently("profile", app);
      $.evently.connect("#account","#profile", ["loggedIn","loggedOut"]);
      $("#items").evently("items", app);
    });
});