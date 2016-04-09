import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';
import { Connections } from '../api/activities.js';

import './post.html';

Template.user.onCreated(function bodyOnCreated() {
});

Template.user.helpers({
});

Template.post.events({
    'submit form'(event) {
       // Prevent default browser form submit
       event.preventDefault();

       var input_name = event.target.guide_name.value;
       var input_gear = event.target.gear_need.value;
       var input_title = event.target.activity_title.value;
       var input_activity = event.target.activity_type.value;
       var input_skill = event.target.skill_level.value;
       var input_cost = event.target.guide_cost.value;
       var input_description = event.target.description.value;

       var act = {
         owner_id : Meteor.userId(),
         ownerName : input_name,
         gear : input_gear,
         activityTitle: input_title,
         category : input_activity,
         skill_level: input_skill,
         cost: input_cost,
         description: input_description,
         createdAt: new Date(),
       };

       console.log(act);

       Meteor.call('insert_activity', act);
       FlowRouter.go('/');

     },
});
