function Style(cardBackGroundColor,cardForeGroundColor,cardFontName,cardFontSize){
    this.cardBackGroundColor = cardBackGroundColor == undefined? "green" : cardBackGroundColor;
    this.cardBackGroundColorClass = getBackgroundColorClassName(this.cardBackGroundColor);
    this.cardForeGroundColor =  cardForeGroundColor == undefined? "white" : cardForeGroundColor,
    this.cardForeGroundColorClass =  getForegroundColorClassName(this.cardForeGroundColor),
    this.cardFontName =  cardFontName == undefined? "sans-serif" : cardFontName;
    this.cardFontSize =  cardFontSize == undefined? "14" : cardFontSize;
    this.toString = function(){
        return "{cardBackGroundColor="+this.cardBackGroundColor+" cardForeGroundColor="+this.cardForeGroundColor+" cardFontName="+this.cardFontName+
        " cardFontName="+this.cardFontName+" cardFontSize="+this.cardFontSize+"}";
    }    
}
function getBackgroundColorOptions(){
    var backgroundColors = [];
    backgroundColors.push({title: "lightblue",class:"blue-light"});
    backgroundColors.push({title: "pastelblue",class:"blue-pastel"});
    backgroundColors.push({title: "blue",class:"blue"});
    backgroundColors.push({title: "lightgreen",class:"green-light"});
    backgroundColors.push({title: "pastelgreen",class:"green-pastel"});
    backgroundColors.push({title: "green",class:"green"});
    backgroundColors.push({title: "lightyellow",class:"yellow-light"});
    backgroundColors.push({title: "pastelyellow",class:"yellow-pastel"});
    backgroundColors.push({title: "yellow",class:"yellow"});
    backgroundColors.push({title: "lightred",class:"red-light"});
    backgroundColors.push({title: "pastelred",class:"red-pastel"});
    backgroundColors.push({title: "red",class:"red"});
    return backgroundColors;
}
function getForegroundColorOptions(){
    var foregroundColors = [];
    foregroundColors.push({title: "white",class:"white-foreground"});
    foregroundColors.push({title: "black",class:"black-foreground"});
    
    return foregroundColors;
}

function getBackgroundColorClassName(colorTitle){
    var backgroundColors = getBackgroundColorOptions();
    for(index in backgroundColors){
        if(backgroundColors[index].title==colorTitle){
            return backgroundColors[index].class;
        }
    }
}
function getForegroundColorClassName(colorTitle){
    console.log("getForegroundColorClassName colorTitle="+colorTitle);
    var foregroundColors = getForegroundColorOptions();
    for(index in foregroundColors){
        console.log("coloritem.title="+foregroundColors[index].title);
        if(foregroundColors[index].title==colorTitle){
            console.log("equals return="+foregroundColors[index].class);
            return foregroundColors[index].class;
        }
    }
}