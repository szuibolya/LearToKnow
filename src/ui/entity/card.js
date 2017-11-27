//cardList: list of Card {typeOfCard, question, answer}
function Card (categoryId,lessonId,typeOfCard, question, answer, answerA, answerB, answerC) {
    this.id; 
    this.categoryId = categoryId; 
    this.lessonId = lessonId; 
    this.typeOfCard = typeOfCard;
    this.answer = answer;
    this.answerA = answerA==undefined?"":answerA;
    this.answerB = answerB==undefined?"":answerB;
    this.answerC = answerC==undefined?"":answerC;
    
  } 
  
  function getDummyCardsList(){
      var list= [
          {   
              id :"1",
              typeOfCard : "DICTIONARY",
              question : "This is a piece of clothes that women wear. That hangs from the waist and does not have legs",
              answer : "skirt",
              answerA :"",
              answerB :"",
              answerC :""
          },
          {   
              id :"2",
              typeOfCard :"GAP-FILL", 
              question : "The powerful central figure is a classic one-button tuxedo in wool crêpe with satin lapels worn with a classic tuxedo shirt and XXX.",
              answer : "bow tie",
              answerA :"",
              answerB :"",
              answerC :""
          },
          {   
            id :"3",
            typeOfCard : "MULTI-CHOICE",
            question : "Please put on your XXX to avoid the glare.",
            answer : "sunglasses",
            answerA :"straw hat",
            answerB :"sunglasses",
            answerC :"overcoat"
          },
          {   
            id :"4",
            typeOfCard : "TRANSLATE", 
            question : "sál",
            answer : "scarf",
            answerA :"",
            answerB :"",
            answerC :""
          },
          {   
            id :"5",
            typeOfCard : "QUESTIONING", 
            question : "Definition of clothes",
            answer : "Things such as dresses and trousers that you wear to cover, protect, or decorate your body",
            answerA :"",
            answerB :"",
            answerC :""
          }
  
      ];
      return list;
  }
