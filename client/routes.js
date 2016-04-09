FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {
        content: "activityList",
    });
  }
});

FlowRouter.route('/viewProfile/:_id', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "viewProfile",
        params : params
    });
  }
});

FlowRouter.route('/request/:_id', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "request",
        params : params
    });
  }
});

FlowRouter.route('/user', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "user"
    });
  }
});

FlowRouter.route('/admin', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "admin",
        params : params
    });
  }
});

FlowRouter.route('/post', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "post",
        params : params
    });
  }
});
