import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './activity.js';
import './request.html';

Template.request.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('activities');
    Meteor.subscribe('allUsers');
});

Template.request.rendered = function() {
    $('.datepicker').pickadate();
}

Template.request.helpers({
  data() {
    // console.log(FlowRouter.getParam('_id'));
    var id = FlowRouter.getParam('_id');
    // console.log(id);
    user = Meteor.users.findOne({_id : id});
    // console.log(user);
    return user;
  },
});

Template.request.events({
    'submit form' : function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      var date = event.target.input_date.value;
      var why = event.target.input_why.value;
      var trip = event.target.input_trip.options[event.target.input_trip.selectedIndex].text;

      date = moment(date, "D MMM, YYYY").toDate();

      if(date && why && trip) {
          //let the user request the trip for the other user.
      }

    //   console.log(date);
    //   console.log(why);
    //   console.log(trip);
    },
});
