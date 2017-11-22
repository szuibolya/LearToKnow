function Lessons (name, description,checked) {
    this.id;  
    this.name = name;
    this.checked = checked==undefined?0:checked;
    this.description = description==undefined?"":description;
    this.style = new Style();
  } 
  
  function getDummyLessonsList(){
      var catlist= [
          {   
              id :"1",
              name : "Clothes",
              description : "In this lesson we will learn about clothes: dress, shirt, skirt, t-shirt, coat, hat, cap, scarf",
              checked:"30%", 
              style: {"cardBackGroundColor":"blue","cardForeGroundColor":"white","cardFontName":"sans-serif","cardFontSize":"14"}
          },
          {   
              id :"2",
              name : "Family",
              description : "In this lesson we will learn about the member of the family: father, mother, parents, daughter, son, sibling, grandparents",
              checked:"50%",
              style: {"cardBackGroundColor":"orange","cardForeGroundColor":"white","cardFontName":"arial","cardFontSize":"14"}
          },
          {   
              id :"3",
              name : "Animals",
              description : "In this lesson we will learn about animals: wild animals, domestic animals, fierce anmals, gently animals, mammal, marsupial, fish",
              checked:"2%",
              style: {"cardBackGroundColor":"yellow","cardForeGroundColor":"white","cardFontName":"times","cardFontSize":"16"}
          }
      ];
      return catlist;
  }