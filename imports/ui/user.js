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
      return Connections.find({});
  },
  notifications2() {
      console.log("we in this2");
      var x = Connections.findOne();
      console.log(x);
      return Connections.findOne();
  }
});

Template.user.events({
});
