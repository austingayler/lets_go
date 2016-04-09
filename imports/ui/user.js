import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';
import { Connections } from '../api/activities.js';

import './user.html';

Template.user.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('allConnections');
});

Template.user.helpers({
  userData() {
    // console.log(FlowRouter.getParam('_id'));
    var user = Meteor.users.findOne(
        {_id : Meteor.userId()}
    );
    // console.log(user);
    return user;
  },
  notifications() {
      console.log("we in this");
      console.log(Connections.find().count());
      return Connections.find({guide_id: Meteor.userId});
  },
  calendarOptions: {
      // Standard fullcalendar options
      height: 700,
      hiddenDays: [ 0 ],
      slotDuration: '01:00:00',
      minTime: '08:00:00',
      maxTime: '19:00:00',
      lang: 'en',
      // Function providing events reactive computation for fullcalendar plugin
      events: function(start, end, timezone, callback) {
          //console.log(start);
          //console.log(end);
          //console.log(timezone);
          var events = [];
          // Get only events from one document of the Calendars collection
          // events is a field of the Calendars collection document
          var userActivities = Meteor.users.findOne({_id : Meteor.userId() });
          console.log(userActivities);
          // events need to be an array of subDocuments:
          // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
          if (userActivities) {
              if(userActivities.profile) {
                  if(userActivities.profile.activities) { //I DON'T KNOW HOW TO NOT MAKE IT BE THIS WAY
                      console.log("got user activities");
                      userActivities.profile.activities.forEach(function (event) {
                          var eventDetails = {
                              allDay : true,
                              title : event.followerName + "\n" + event.msg,
                              start : moment(event.date).format('YYYY-MM-DD')
                          };
                          events.push(eventDetails);
                      });
                  }
              }

          }
          callback(events);
      },
      // Optional: id of the calendar
      id: "calendar1",
      // Optional: Additional classes to apply to the calendar
      addedClasses: "col-md-8",
      // Optional: Additional functions to apply after each reactive events computation
      autoruns: [
          function () {
              console.log("user defined autorun function executed!");
          }
      ]
  },
});

Template.user.events({
    'click .confirm-activity': function(event){
        event.preventDefault();
        var documentId = this._id;
        console.log(documentId);
        Meteor.call('confirmActivity', documentId);
    },
    'click .deny-activity': function(event){
        event.preventDefault();
        var documentId = this._id;
        console.log(documentId);
        Meteor.call('denyActivity', documentId);
    },

});
