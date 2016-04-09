import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './activity.html';

Template.activity.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  getPicURL() {
      var ret = "";
      if(!this.picURL) {
          ret = "/pix/riley.jpg";
      } else {
          ret = this.picURL;
      }
      return ret;
  }
});

Template.activity.events({

});
