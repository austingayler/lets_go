import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './activity.js';
import './viewActivity.html';

Template.viewActivity.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('activities');
});

Template.viewActivity.helpers({
  data() {
    return Activities.findOne({_id : FlowRouter.getParam('_id')});
  },
  incompleteCount() {
    return Activities.find({ checked: { $ne: true } }).count();
  },
});

Template.viewActivity.events({
});
