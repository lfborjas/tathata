Observations = new Meteor.Collection("observations");

Observations.demo_observations = function(){
  demos = [
    {type: "feeling",  label: "info", content: "happy because of meteorjs"},
    {type: "expense", label: "important", content: "Spent $5 on chipotle" },
    {type: "income",  label: "success",   content: "Got $10 for selling a kidney"},
    {type: "feeling", label: "info", content: "sad because of the semicolons"},
  ];

  ids = _(demos).map(function(observation){
    found = Observations.findOne(observation);
    if(!found){
       return Observations.insert(observation);
    }else{
      return found._id;
    }
  });

  return Observations.find({
    _id: {$in: ids} 
  });
};

var allow_own = function(userId, observations){
    return _(observations).all(function(o){ return o.owner == userId });
}

Observations.allow({
  remove: allow_own,
  update: allow_own
});

Meteor.methods({
  createObservation: function(content){
    classified = Classifier.classify(content);
    return Observations.insert(_(classified).extend({
      owner: this.userId
    }));
  }
});
