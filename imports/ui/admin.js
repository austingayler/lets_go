import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './admin.html';

Template.admin.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('activities');
    Meteor.subscribe('allUsers');
    Meteor.subscribe('allConnections');
});

Template.admin.helpers({
  userData() {
    // console.log(FlowRouter.getParam('_id'));
    var user = Meteor.users.findOne(
        {_id : Meteor.userId()}
    );
    // console.log(user);
    return user;
  },
  notifications() {
      return Connections.find({});
  }

});

Template.admin.events({
    'click button' : function() {
        console.log("fuck");
        Meteor.call('fixtures.insert');
    }
});
