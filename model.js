Observations = new Meteor.Collection("observations");

Observations.allow({
  insert: function(userId, observation){ return false; }
});

Meteor.methods({
  createObservation: function(content){
    classified = {
      type: "free_form",
      label: "success"
    };
    return Observations.insert(_(classified).extend({
      content: content,
      owner: this.userId
    }));
  }
});
