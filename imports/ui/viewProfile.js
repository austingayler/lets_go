import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './activity.js';
import './viewProfile.html';

Template.viewProfile.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('activities');
    Meteor.subscribe('allUsers');
    Meteor.subscribe('allConnections');
});

Template.viewProfile.helpers({
  data() {
    // console.log(FlowRouter.getParam('_id'));
    user = Meteor.users.findOne({_id : FlowRouter.getParam('_id')});
    // console.log(user);
    return user;
  },
  getPicURL() {
      var ret = "";
      console.log(this);
      console.log(this.picURL);
      if(!this.picURL) {
          ret = "/pix/riley.jpg";
      } else {
          ret = this.picURL;
      }
      return ret;
  }
});

Template.viewProfile.events({
});
