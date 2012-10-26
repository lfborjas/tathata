Observations = new Meteor.Collection("observations");

Observations.demo_observations = function(){
  demos = [
    {type: "feeling",  label: "info", content: "Feeling happy because of meteorjs"},
    {type: "expense", label: "important", content: "Spent $5 on chipotle" },
    {type: "income",  label: "success",   content: "Got $10 for selling a kidney"},
    {type: "feeling", label: "info", content: "Feeling sad because of the semicolons"},
  ];

  ids = _(demos).map(function(observation){
    found = Observations.findOne(observation)._id;
    if(!found){
       return Observations.insert(observation);
    }else{
      return found;
    }
  });

  return Observations.find({
    _id: {$in: ids} 
  });
};

Observations.allow({
  insert: function(userId, observation){ return false; }
});

Meteor.methods({
  createObservation: function(content){
    classified = Classifier.classify(content);
    return Observations.insert(_(classified).extend({
      owner: this.userId
    }));
  }
});
