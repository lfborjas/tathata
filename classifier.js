Classifier = {};

var rule = function(pattern, callback){
  return function(input){
    if(matched = input.match(pattern))
      return callback(matched);
    else
      return false;
  };
}

Classifier.rules = {
   expense: rule(/(spent|paid) (.)(\d+\.?\d*) (on|in|at) (\w+)/i, function(matches){
    return {
      content: matches[0],
      type: "expense",
      label: "important",
      currency: matches[2],
      amount: Number(matches[3]),
      reason: matches[5]
    }
  })
  ,income: rule(/(got|made) (.)(\d+\.?\d*) (from|at) (\w+)/i, function(matches){
    return {
      content: matches[0],
      type: "income",
      label: "success",
      currency: matches[2],
      amount: Number(matches[3]),
      reason: matches[5]
    }
  })
  ,feeling: rule(/(happy|sad) because ([A-Za-z ]+)/i, function(matches){
    return{
      content: matches[0],
      type: "feeling",
      label: "info",
      sentiment: matches[1],
      reason: matches[2]
    }
  })
}

Classifier.classify = function(raw_content){

  for(rule in Classifier.rules){
    if(Classifier.rules.hasOwnProperty(rule)){
      if(rule_met = Classifier.rules[rule](raw_content))
        return rule_met;
    }
  }

  return {
    content: raw_content,
    type: "unidentified",
    label: "inverse"
  };
}
