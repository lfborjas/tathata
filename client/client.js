Meteor.subscribe("observations");

Template.gatherer.events({
  "keyup #entry": function(event){
    if (event.which == 13 && this.userId){
      Meteor.call(
        "createObservation",
        event.target.value
      );
      event.target.value = "";
    }else if(!this.userId){
      $("#entry").popover('show');
    }
  },
  "focus #entry": function(event){
    if(!this.userId){
      $("#entry").popover('show');
    }
  }
});

Template.gatherer.observations = function(){
  return Observations.find({});
}

