import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Activities = new Mongo.Collection('activities');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish activities that are public or belong to the current user
  Meteor.publish('activities', function activitiesPublication() {
    return Activities.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

  // ACTIVITY CATEGORIES - REFER FOR SAMPLE CODING
  // Showaround
  // Fly-fishing
  // Fishing
  // Climbing
  // Hiking
  // Rafting
	// Sport shooting
  // Backpacking
  // Fly Around
  // Backcountry Skiing
  // Tandem Parasailing
  // Geo Hikes
  // Biking
  // Sailing
  // Saltwater fishing
  // Diving
  // Snorkeling
  // Snowshoeing
  // Cross Country skiing
  // Snowmobile
  // ATV
  // Backcountry dirt biking
  // Surfing
  // Caving
  // Ice Climbing
  // Swimming

  Activities.remove({});

  Activities.insert({
    ownerID : 1,
    ownerName : "Conrad Anker",
    certification : 'first aid + cpr',
    activityTitle: "Hiking in the Amazon",
    category : "Hiking",
    createdAt: new Date(),
  });

  Activities.insert({
    ownerID : 1,
    ownerName : "Alex Lowe",
    certification : 'first aid + cpr',
    activityTitle: "Alpine Skinny-dipping",
    category : "Swimming",
    createdAt: new Date(),
  });

  Activities.insert({
    ownerID : 1,
    ownerName : "Danny MacAskill",
    activityTitle: "Fly-fishing the Maddy",
    category : "Fishing",
    createdAt: new Date(),
  });

  Activities.insert({
    owner_id : 1,
    ownerName : "Joe Brown",
    activityTitle : 'Hiking the M - Bozeman',
    category : "Hiking",
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 1,
    ownerName : "Danny MacAskill",
    activityTitle : 'Fly-fishing the Jefferson',
    category : "Fishing",
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 1,
    ownerName : "Sarah Reid",
    activityTitle : 'Climbing Mt. Everest',
    category : "Climbing",
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 1,
    ownerName : "Chris Minor",
    activityTitle : 'Camping at Clearwater National Forest',
    category : "Camping",
    createdAt : new Date(),
  });

}

Meteor.methods({
  'activities.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Activities.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'activities.remove'(taskId) {
    check(taskId, String);

    const task = Activities.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Activities.remove(taskId);
  },
  'activities.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Activities.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Activities.update(taskId, { $set: { checked: setChecked } });
  },
  'activities.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Activities.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Activities.update(taskId, { $set: { private: setToPrivate } });
  },
});
