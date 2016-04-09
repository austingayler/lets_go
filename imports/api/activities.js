import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Activities = new Mongo.Collection('activities');
export const Connections = new Mongo.Collection('connections');

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
  Meteor.publish('allConnections', function activitiesPublication() {
    return Connections.find({});
  });

  Activities.remove({});
  Connections.remove({});
  Meteor.users.remove({});


  var userID = Accounts.createUser({
      username: "abc1",
      email: "abc1",
      password: "letsgo",
      profile: {
          name: "Tucker Tyrell",
          bio: "Yoga has been a dynamic passion in my life since the Fall of 2012. After sustaining a head injury to end my rugby career, Yoga became a powerful tool of recovery. It was the mental and emotional clarity that drew me deeper into the practice, helping me to find light in a time of deep darkness. My teaching comes from a strong personal practice with an emphasis on the connection of breath, the power of presence, and the freedom of flow; utilizing progressive sequencing to cultivate fire and access liberation to embrace on and off the mat. I hope to inspire any and all to discover and nourish the eternal light hidden within.",
          certs: ["CPR", "WFR", "200 Hour Yoga Training"],
          gear: ["15 Yoga Mats"],
          activities: ["Yoga", "Meditation", "Hiking"],
          trips: ["Spanish Peaks Yoga Retreat"],
          reviews: ["8.8"],
          picURL: ""
      }
  });

  var user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "Spanish Peaks Yoga Retreat",
      category: "Yoga",
      skill_level: "Advanced",
      createdAt: new Date(),
      picURL: "10658782 _10152825763099085.jpg",
  });



  userID = Accounts.createUser({
      username: "abc12",
      email: "abc12",
      password: "letsgo",
      profile: {
          name: "Derrick Krueger",
          bio: "A Montanan, born and raised, with a passion for skiing in the outdoors! As an avid globetrotter, I know the feeling of wanting to explore the area I am visiting to the fullest! I have been living in the Gallatin Valley for the past 7 years and every day still finding more and more reasons to stay. If you're visiting Montana for the 1st time or returning because you didn’t check everything off your check list from before- let me know me know how I can help! Currently finishing up a degree at Montana State University, so time is a little scares.Shoot me an email if you have an idea and perhaps I might have some free time!",
          certs: ["CPR"],
          gear: ["Tent", "Hammock", "Cooking Supplies", "Rain Coat"],
          activities: ["Skiing", "Duck Hunting", "Rowing"],
          trips: ["Warm Springs Duck Blind", "Pipestone Hot Springs", "Solemn Hike"],
          reviews: ["9.1"],
          picURL: "11728980_10207105966190220.jpg"
      }
  });

  user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "Warm Springs Duck Blind",
      category: "Hunting",
      skill_level: "Beginner",
      createdAt: new Date(),
      picURL: "Waterfowl - hunting.jpg",
  });




  userID = Accounts.createUser({
      username: "abc123",
      email: "abc123@a.com",
      password: "letsgo",
      profile: {
          name: "Chris Major",
          bio: "Hey everyone! I’m Chris Major and I’m a sophomore at MSU in the CpE department",
          certs: ["CPR"],
          gear: ["Running Shoes", "Headphones"],
          activities: ["Trailrunning", "hiking"],
          trips: ["The M", "Drinking Horse", "The Gallagator"],
          reviews: ["9.5"],
          picURL: "IMG_0781.JPG"
      }
  });

  user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "Traillrunning Sourdough",
      category: "Running",
      skill_level: "Trying To Learn",
      createdAt: new Date(),
      picURL: "IMG_0781.JPG",
  });




  userID = Accounts.createUser({
      username: "abc1234",
      email: "abc1234",
      password: "letsgo",
      profile: {
          name: "Martin Kepner",
          bio: "Hey, my name is Martin Kepner and I’m a Jr. in the College of Business at MSU. I currently have certifications in First Aid and CPR and Swiftwater rescue. I love to hike, backpack, snowboard, and whitewater raft. I have a lot of experience hiking in several mountain ranges in the area including the Bridgers, Gallatin, Crazy, Gallatin, Madison, and Beartooth mountain range. My services include short hikes to scenic waterfalls in the area ranging from .2 miles to 3 mile hikes. For the more avid hiker I offer summit hikes for local peaks including Baldy, Sphynx, Crazy, Blackmore and Sacagawea and backcountry options in the Beartooth, Madison and Gallatin range. These backcountry hiking options vary from 2-5 days and between 10 to 40 miles. On the hikes you can expect to see glacial lakes, waterfalls, gorgeous backcountry, and almost always are able to observe some wildlife on the trip. During hikes in the area I have been able to observe mountain goats, moose, deer, elk, and even a black bear from safe locations. Bear spray carried around my waist at all time allows me to keep my group and myself safe at all times. I also offer whitewater rafting trips on the Gallatin and Yellowstone rivers.",
          certs: ["CPR", "Swiftwater Rescue 1", "First Aid"],
          gear: ["Backcountry Backpacks", "Sleeping Pads", "Sleeping Bags"],
          activities: ["Hiking Short Half Day $25 Per person, $15 Per person for groups >3", "Backcountry Camping 3 day $200 per person, 100 Per Person for groups >3", "Whitewater Rafting Half Day $25 Per person, $15 Per person for groups >3"],
          trips: ["Hyalite Peak", "Palisade Falls", "Crazy Peak"],
          reviews: ["8"],
          picURL: "IMG_0286.jpg"
      }
  });

  user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "East Rosebud Trail",
      category: "Camping",
      skill_level: "Beginner",
      createdAt: new Date(),
      picURL: "IMG_0212.jpg",
  });




  userID = Accounts.createUser({
      username: "abc12345",
      email: "abc12345",
      password: "letsgo",
      profile: {
          name: "Duncan Kepner",
          bio: "Hey my name is Duncan Kepner and I’m a freshmen at MSU in Bozeman. I specialize in safe rock climbing techniques as well as improvised self rescue techniques for you and your climbing friends. I offer trips ranging from backcountry hikes to backcountry climbing trips. I have many certifications after completing a NOLS course last year. I have been to many of the local mtn ranges and am very knowledgeable of the area surrounding bozeman.",
          certs: ["CPR", "WFR", "EMT", "Lifeguard", "AED", "Rock Rescue 1", "Rock Rescue 1", "Avalanche 1", "Leave No Trace Master"],
          gear: ["Ice Axes", "Sleeping Pads", "Tent", "Harness"],
          activities: ["Ice Climbing", "Rock Climbing", "Mountaineering"],
          trips: ["Hiking Short Half Day $25 Per person, $15 Per person for groups >3", "Hiking Full Day Summit $45 person, $25 Per person for groups>3", "Rock Climbing Half Day $35 Per person, $25 Per person for groups >3"],
          reviews: ["9"],
          picURL: "IMG_0212.jpg"
      }
  });

  user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "Hiking The Hyalite",
      category: "Hiking",
      skill_level: "Advanced",
      createdAt: new Date(),
      picURL: "IMG_0802.JPG",
  });


  userID = Accounts.createUser({
      username: "abc123456",
      email: "abc123456",
      password: "letsgo",
      profile: {
          name: "AJ Gayler",
          bio: "Hey guys I’m AJ Gayler and I’m a senior at MSU in the CS department",
          certs: ["CPR", "First Aid", "WFR"],
          gear: ["Ice Axes", "Harnesses", "Rope, Quickdraws"],
          activities: ["Ice Climbing", "Rock Climbing"],
          trips: ["Rock Climbing Half Day $35 Per person, $25 Per person for groups >3", "Rock Climbing Full Day $55 person, $30 Per person for groups>3", "Ice Climbing Full Day $55 person, $30 Per person for groups>3"],
          reviews: ["9.5"],
          picURL: "ursa5.JPG"
      }
  });

  user = Meteor.users.findOne({
      _id: userID
  }); //get actual user object

  Activities.insert({
      owner_id: userID,
      ownerName: user.profile.name,
      gear: "Provided",
      activityTitle: "Summiting the Grand Teton",
      category: "Climbing",
      skill_level: "Beginner",
      createdAt: new Date(),
      picURL: "ursa10.jpg",
  });

}

Meteor.methods({
  // 'activities.insert'(text) {
  //   check(text, String);
  //
  //   // Make sure the user is logged in before inserting a task
  //   if (! this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Activities.insert({
  //     text,
  //     createdAt: new Date(),
  //     owner: this.userId,
  //     username: Meteor.users.findOne(this.userId).username,
  //   });
  // },

  'connections.insert'(request) {
    console.log(request);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    var fname;
    var usr = Meteor.users.findOne(this.userId);
    if(usr) {
        if(usr.profile) {
            if(usr.profile.name) { //this hurts me on the inside
                fname = Meteor.users.findOne(this.userId).profile.name;
            }
        }
    }
    if(!fname) {
        fname = "John Doe";
    }

    var con = {
      followerId : this.userId,
      followerName : fname,
      guideId : request.guideId,
      guideName : Meteor.users.findOne(request.guideId).profile.name,
      date : request.date,
      msg : request.why,
      status : null,
      createdAt: new Date(),
      owner: this.userId,
      trip : request.trip
  };
    console.log(con);
    Connections.insert(con);

    FlowRouter.go('/');

  },

  'fixtures.insert'() {
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      var con = {
        followerId : "conrad_anker",
        followerName : "Conrad Anker",
        guideId : Meteor.userId(),
        guideName : "Conrad Anker",
        date : new Date(),
        msg : "plz teach me how to double dyno to micro crimpers",
        status : null,
        createdAt: new Date(),
        owner: Meteor.userId(),
        trip : "Rock Climbing Half Day $35 Per person, $25 Per person for groups >3"
    };
      console.log(con);

      var randDays = Math.floor(Math.random() * (10)) + 1;

      con.date = new Date(new Date().getTime()+(randDays*24*60*60*1000));
      Connections.insert(con);
  },

  'confirmActivity'(id) {
      request = Connections.findOne({_id : id});
      Meteor.users.update({
        _id: request.guideId
      }, {
        $push: {
          "profile.activities" : request
        }
      });
      Connections.remove({_id : id});
      console.log(Meteor.users.findOne({_id : request.guideId}));
  },

  'denyActivity'(id) {
      Connections.remove({_id : id});
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
  'insert_activity'(act) {
    console.log(act.owner_id);
    if (act.owner_id) {
        var usr = Meteor.users.findOne({_id : act.owner_id});
        if(!usr.profile) {
            var profile = {
                name : act.ownerName,
                bio : "No bio yet.",
                certs : [],
                gear : [],
                activities : [],
                trips : [],
                reviews : [],
                picURL : ""
            };
            Meteor.users.update(
                {_id: act.owner_id},
                {$set : {'profile' : profile} });
        }

        Activities.insert(act);
    }
  },
});
