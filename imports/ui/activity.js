import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './activity.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('activities.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('activities.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('activities.setPrivate', this._id, !this.private);
  },
});
