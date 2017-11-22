function Category (name, description,checked) {
  this.id;  
  this.name = name == undefined?"":name;
  this.checked = checked==undefined?0:checked;
  this.description = description==undefined?"":description;
  this.style = new Style();
  this.toString = function(){
      return "{id="+this.id+" name="+this.name+" description="+this.description+" checked="+this.checked+"style="+this.style.toString()+"}";
  }
} 


function getDummyCategoryList(){
    var catlist= [
        {   
            id :"1",
            name : "English Words",
            description : "",
            checked:"30%", 
            style: {"cardBackGroundColor":"red","cardForeGroundColor":"white","cardFontName":"sans-serif","cardFontSize":"14"}
        },
        {   
            id :"2",
            name : "Business English Words",
            description : "",
            checked:"50%",
            style: {"cardBackGroundColor":"green","cardForeGroundColor":"white","cardFontName":"arial","cardFontSize":"14"}
        },
        {   
            id :"3",
            name : "Advanced Angular Questions",
            description : "",
            checked:"2%",
            style: {"cardBackGroundColor":"pink","cardForeGroundColor":"white","cardFontName":"times","cardFontSize":"16"}
        }


    ];
    return catlist;
}