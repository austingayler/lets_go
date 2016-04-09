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
