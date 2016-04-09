import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './activity.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('activities');
});

Template.body.helpers({
  activities() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter activities
      return Activities.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    // Isolate camping activities
    if (instance.state.get('showCamping')) {
      // If hide completed is checked, filter activities
      return Activities.find({ category: 'Camping' }, { sort: { createdAt: -1 } });
    }

    // Isolate hiking activities
    if (instance.state.get('showHiking')) {
      // If hide completed is checked, filter activities
      return Activities.find({ category: 'Hiking' }, { sort: { createdAt: -1 } });
    }


    // Otherwise, return all of the activities
    return Activities.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Activities.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('activities.insert', text);

    // Clear form
    target.text.value = '';
  },

  // Isolating "completed"
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  // Isolating camping
  'change .show-camping input'(event, instance) {
    instance.state.set('showCamping', event.target.checked);
  },

  // Isolating hiking
  'change .show-hiking input'(event, instance) {
    instance.state.set('showHiking', event.target.checked);
  },
});
