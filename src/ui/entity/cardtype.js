function typeOfCard () {
    this.DICTIONARY = "DICTIONARY";
    this.GAP_FILL = "GAP-FILL";  
    this.MULTI_CHOICE = "MULTI-CHOICE";
    this.TRANSLATE = "TRANSLATE";
    this.QUESTIONING = "QUESTIONING"; 
  }

  function getTypesOfCard(){
    var types = [];
    types.push("DICTIONARY");
    types.push("GAP-FILL");  
    types.push("MULTI-CHOICE");
    types.push("TRANSLATE");
    types.push("QUESTIONING"); 

    return types;
  }

  function getDefaultType(){
     return "DICTIONARY";
  }
