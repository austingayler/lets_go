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
    Meteor.subscribe('allConnections');
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

      if(date && why && trip) {
          date = moment(date, "D MMM, YYYY").toDate();
          var request = {
              date : date,
              why : why,
              trip : trip,
              guideId : FlowRouter.getParam('_id')
          }
          console.log("nigga we made it");
          Meteor.call('connections.insert', request);
      }

    //   console.log(date);
    //   console.log(why);
    //   console.log(trip);
    },
});
