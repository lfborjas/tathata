Meteor.publish("observations", function(){
  return Observations.find({owner: this.userId});
});
