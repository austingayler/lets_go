import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './activity.html';

Template.activity.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.activity.events({

});
