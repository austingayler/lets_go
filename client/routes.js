FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {
        content: "activityList",
    });
  }
});

FlowRouter.route('/viewActivity/:_id', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {
        content: "viewActivity",
        params : params
    });
  }
});
