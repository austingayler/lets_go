import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Activities } from '../api/activities.js';

import './activity.js';
import './activityList.html';

Template.activityList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('activities');
  Meteor.subscribe('allConnections');
});

Template.activityList.helpers({
  activities() {

    const instance = Template.instance();

    // REVIEWING VARIABLE STATES TO DETERMINE WHICH ACTIVITIES SHOW UP AND WHICH DO NOT
    var activity = null;
    if (instance.state.get('hideCompleted')) {
        return Activities.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Isolate camping activities
    if (instance.state.get('showCamping')) {
        activity = 'Camping';
    }
    // Isolate hiking activities
    if (instance.state.get('showHiking')) {
        activity = 'Hiking';
    }
    // Isolate fishing activities
    if (instance.state.get('showFishing')) {
        activity = 'Fishing';
    }
    // Isolate rafting activities
    if (instance.state.get('showRafting')) {
        activity = 'Rafting';
    }
    // Isolate biking activities
    if (instance.state.get('showBiking')) {
        activity = 'Biking';
    }
    // Isolate caving activities
    if (instance.state.get('showCaving')) {
        activity = 'Caving';
    }
    // Isolate surfing activities
    if (instance.state.get('showSurfing')) {
        activity = 'Surfing';
    }
    // Isolate climbing activities
    if (instance.state.get('showClimbing')) {
        activity = 'Climbing';
    }
    // Isolate climbing activities
    if (instance.state.get('showSwimming')) {
        activity = 'Swimming';
    }
    // Isolate flyfishing activities
    if (instance.state.get('showFlyfishing')) {
        activity = 'Flyfishing';
    }
    // Isolate running activities
    if (instance.state.get('showRunning')) {
        activity = 'Running';
    }
    // Isolate hunting activities
    if (instance.state.get('showHunting')) {
        activity = 'Hunting';
    }
    // Isolate yoga activities
    if (instance.state.get('showYoga')) {
        activity = 'Yoga';
    }

    // REVIEWING SKILL LEVELS TO DETERMINE WHICH ACTIVITIES SHOW UP AND WHICH DO NOT
    var skill = null;
    if (instance.state.get('hideCompleted')) {
        return Activities.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Isolate trying to learn level
    if (instance.state.get('showLearning')) {
        skill = 'Trying To Learn';
    }
    // Isolate beginner level
    if (instance.state.get('showBeginner')) {
        skill = 'Beginner';
    }
    // Isolate intermediate level
    if (instance.state.get('showIntermediate')) {
        skill = 'Intermediate';
    }
    // Isolate advanced level
    if (instance.state.get('showAdvanced')) {
        skill = 'Advanced';
    }

    // REVIEWING SKILL LEVELS TO DETERMINE WHICH ACTIVITIES SHOW UP AND WHICH DO NOT
    var gear_need = null;
    if (instance.state.get('hideCompleted')) {
        return Activities.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Isolate gear required
    if (instance.state.get('gearRequired')) {
        gear_need = 'Required';
    }
    // Isolate gear provided
    if (instance.state.get('gearProvided')) {
        gear_need = 'Provided';
    }

    // Return final result
    if (activity == null) {         // If NO activity
      if (skill == null) {          // If NO skill
          if (gear_need == null) {  // If NO gear
              return Activities.find({}, { sort: { createdAt: -1 } });
          } else {                  // If YES gear
              return Activities.find({gear: gear_need}, { sort: { createdAt: -1 } });
          }
      } else {                      // If YES skill
          if (gear_need == null) {  // If NO gear
              return Activities.find({skill_level: skill}, { sort: { createdAt: -1 } });
          } else {                  // If YES gear
              return Activities.find({skill_level: skill, gear: gear_need}, { sort: { createdAt: -1 } });
          }
      }
    } else {                       // If YES activity
      if (skill == null) {         // If NO skill
          if (gear_need == null) { // If NO gear
              return Activities.find({ category: activity}, { sort: { createdAt: -1 } });
          } else {                 // If YES gear
              return Activities.find({ category: activity, gear: gear_need}, { sort: { createdAt: -1 } });
          }
      } else {                     // If YES skill
          if (gear_need == null) { // If NO gear
              return Activities.find({ category: activity, skill_level: skill}, { sort: { createdAt: -1 } });
          } else {                 // If YES gear
              return Activities.find({ category: activity, skill_level: skill, gear: gear_need}, { sort: { createdAt: -1 } });
          }
      }
    }
  },

    incompleteCount() {
      return Activities.find({ checked: { $ne: true } }).count();
    },
});


Template.activityList.events({
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


  // CODE TO ISOLATE SPECIFIC ACTIVITY CATEGORIES
  // Isolating camping
  'change .show-camping input'(event, instance) {
    instance.state.set('showCamping', event.target.checked);
  },
  // Isolating hiking
  'change .show-hiking input'(event, instance) {
    instance.state.set('showHiking', event.target.checked);
  },
  // Isolating fishing
  'change .show-fishing input'(event, instance) {
    instance.state.set('showFishing', event.target.checked);
  },
  // Isolating hiking
  'change .show-climbing input'(event, instance) {
    instance.state.set('showClimbing', event.target.checked);
  },
  // Isolating rafting
  'change .show-rafting input'(event, instance) {
    instance.state.set('showRafting', event.target.checked);
  },
  // Isolating biking
  'change .show-biking input'(event, instance) {
    instance.state.set('showBiking', event.target.checked);
  },
  // Isolating caving
  'change .show-caving input'(event, instance) {
    instance.state.set('showCaving', event.target.checked);
  },
  // Isolating surfing
  'change .show-surfing input'(event, instance) {
    instance.state.set('showSurfing', event.target.checked);
  },
  // Isolating swimming
  'change .show-swimming input'(event, instance) {
    instance.state.set('showSwimming', event.target.checked);
  },
  // Isolating flyfishing
  'change .show-flyfishing input'(event, instance) {
    instance.state.set('showFlyfishing', event.target.checked);
  },
  // Isolating running
  'change .show-running input'(event, instance) {
    instance.state.set('showRunning', event.target.checked);
  },
  // Isolating hunting
  'change .show-hunting input'(event, instance) {
    instance.state.set('showHunting', event.target.checked);
  },
  // Isolating yoga
  'change .show-yoga input'(event, instance) {
    instance.state.set('showYoga', event.target.checked);
  },

  // CODE TO ISOLATE SKILL LEVELS
  // Isolating trying-to-learn
  'change .learning input'(event, instance) {
    instance.state.set('showLearning', event.target.checked);
  },
  // Isolating beginner
  'change .beginner input'(event, instance) {
    instance.state.set('showBeginner', event.target.checked);
  },
  // Isolating intermediate
  'change .intermediate input'(event, instance) {
    instance.state.set('showIntermediate', event.target.checked);
  },
  // Isolating advanced
  'change .advanced input'(event, instance) {
    instance.state.set('showAdvanced', event.target.checked);
  },

  // CODE TO ISOLATE SPECIFIC GEAR REQUIREMENTS
  // Isolating gear required
  'change .gear-required input'(event, instance) {
    instance.state.set('gearRequired', event.target.checked);
  },
  // Isolating gear provided
  'change .gear-provided input'(event, instance) {
    instance.state.set('gearProvided', event.target.checked);
  },

  // Price
  //var max_price = activityList.getElementByID('max_price');

});
