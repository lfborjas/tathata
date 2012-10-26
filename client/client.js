Meteor.subscribe("observations");

Template.gatherer.events({
  "keyup #entry": function(event){
    if (event.which == 13){
      Meteor.call(
        "createObservation",
        event.target.value
      );
      event.target.value = "";
    }
  }
});

Template.gatherer.observations = function(){
  return Observations.find({});
}

