Meteor.publish("observations", function(){
  if(this.userId){
    return Observations.find({owner: this.userId});
  }else{
    return Observations.demo_observations();
  }
});
