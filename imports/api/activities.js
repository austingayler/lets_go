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
  Meteor.publish('allUsers', function activitiesPublication() {
    return Meteor.users.find({});
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
  Meteor.users.remove({});

  Activities.insert({
    owner_id : 1,
    ownerName : "Conrad Anker",
    gear : 'Required',
    activityTitle: "Hiking in the Amazon",
    category : "Hiking",
    skill_level: 'Advanced',
    cost: 69,
    createdAt: new Date(),
  });

  Activities.insert({
    owner_id : 2,
    ownerName : "Alex Lowe",
    gear : 'Provided',
    activityTitle: "Alpine Skinny-dipping",
    category : "Swimming",
    skill_level: 'Trying To Learn',
    cost: 15,
    createdAt: new Date(),
  });

  Activities.insert({
    owner_id : 3,
    ownerName : "Danny MacAskill",
    gear : 'Provided',
    activityTitle: "Fly-fishing the Madison",
    category : "Fishing",
    skill_level: 'Intermediate',
    cost: 30,
    createdAt: new Date(),
  });

  Activities.insert({
    owner_id : 4,
    ownerName : "Joe Brown",
    gear : 'Provided',
    activityTitle : 'Hiking the M - Bozeman',
    category : "Hiking",
    skill_level: 'Beginner',
    cost: 10,
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 5,
    ownerName : "Danny MacAskill",
    gear : 'Required',
    activityTitle : 'Fly-fishing the Jefferson',
    category : "Fishing",
    skill_level: 'Beginner',
    cost: 35,
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 6,
    ownerName : "Sarah Reid",
    gear : 'Required',
    activityTitle : 'Climbing Mt. Everest',
    category : "Climbing",
    skill_level: 'Advanced',
    cost: 750,
    createdAt : new Date(),
  });

  Activities.insert({
    owner_id : 7,
    ownerName : "Chris Minor",
    gear : 'Provided',
    activityTitle : 'Camping at Clearwater National Forest',
    category : "Camping",
    skill_level: 'Trying To Learn',
    cost: 25,
    createdAt : new Date(),
  });

  Activities.insert({
	owner_id : 8,
	ownerName : "Tucker Tyrell",
	gear : 'Provided',
	activityTitle: "Spanish Peaks Yoga Retreat",
	category : "Yoga",
	skill_level : 'Advanced',
  cost: 20,
  createdAt: new Date(),
	picURL : "10658782_10152825763099085.jpg",
  });

  Activities.insert({
  	owner_id : 9,
  	ownerName : "Derrick Krueger",
  	gear : 'Provided',
  	activityTitle: "Warm Springs Duck Blind",
  	category : 'Hunting',
  	skill_level : 'Beginner',
    cost: 25,
    createdAt: new Date(),
  	picURL : "Waterfowl-hunting.jpg",
    });

  Activities.insert({
	   owner_id : 10,
	   ownerName : "Chris Major",
	   gear : 'Provided',
	   activityTitle: "Trail Running Sourdough",
	   category : 'Running',
	   skill_level : 'Beginner',
     cost: 15,
     createdAt: new Date(),
	   picURL : "IMG_0781.JPG",
     });

 Activities.insert({
  	owner_id : 11,
  	ownerName : "Martin Kepner",
  	gear : 'Provided',
  	activityTitle: "East Rosebud Trail",
  	category : 'Camping',
    skill_level : 'Beginner',
    cost: 35,
  	createdAt: new Date(),
  	picURL : "IMG_0212.jpg",
    });

 Activities.insert({
    owner_id : 12,
  	ownerName : "Duncan Kepner",
  	gear : 'Provided',
    activityTitle: "Hiking The Hyalite",
    category : 'Hiking',
    skill_level : 'Advanced',
    cost: 45,
    createdAt: new Date(),
    picURL : "IMG_0802.JPG",
    });

 Activities.insert({
   	owner_id : 13,
   	ownerName : "Ryeland Allenson",
   	gear : 'Provided',
   	activityTitle: "Full Day on the Gallatin River",
   	category : 'Flyfishing',
   	skill_level : 'Beginner',
    cost: 150,
   	createdAt: new Date(),
   	picURL : "Screen Shot 2016-04-09 at 3.11.22 AM.png",
    });

 Activities.insert({
  	owner_id : 14,
	  ownerName : "AJ Gayler",
	  gear : 'Provided',
	  activityTitle: "Summiting the Grand Teton",
	  category : 'Climbing',
	  skill_level : 'Beginner',
    cost: 100,
	  createdAt: new Date(),
	  picURL : "ursa10.jpg",
    });



  var prof = {
    name : "Conrad Anker",
    bio : "ya i do sports deal with it",
    certs : [],
    gear : [],
    activities : [],
    trips : [],
    reviews : []
    };

  for(var i = 0; i < 5; i++) {

        var email = i.toString();

      Accounts.createUser({email : email, password : "letsgo", profile : prof});
  }

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
