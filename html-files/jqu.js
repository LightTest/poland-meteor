var meteo = [];
var pictureWidth = 1377;
var pictureHeight = 692;
var startLong = -180;
var startLat = -90;
var endLong = 180;
var endLat = 90;

var divText = "";

var temp = "";

var tableData = "";
  
var countPage = 0;


$(document).ready(function() {

  $("#click").click(function() {
      console.log(countPage);
      
      if(countPage > 0) {
        // reloadPage();
        //  myFunction();
          $(".met").remove();
          $(".drawLine").remove();
          $("#status").remove();
          
          countPage = 0;
         }
      
     //else  {
      var provideNumber;
      
      
                provideNumber = prompt("Please provide Quantity of Meteorites you want on the MAP \n" +  "Numbers between 1 <> 34513 \n" + "10K Takes about 2 minutes to Load whereas 35000 10<>15 minutes" , "1000");

      while(provideNumber < 0 || provideNumber > 34513 || isNaN(provideNumber)) {
            var provideNumber = prompt("PROVIDE RIGHT NUMBER 1 <> 34513 " , "1000");
            }
      
      $(".wholecontent").append('<div id="status">Loading Picture Data</div>');

      var startTime = new Date().getTime();
      
$.getJSON("https://raw.githubusercontent.com/LightTest/poland-meteor/master/meteorites-in-world.json", function(json){
    meteo = json.slice();
    

                    
                //$(".message").html(JSON.stringify(json)); //here goes text downloaded
                console.log(meteo.length);
     for(i = 0; i < provideNumber; i++) {
     
        if( meteo[i][2] != 1 && meteo[i][3] != 1) {

if(i < 10){
         divText = '<div class="drawLine">' + 'Name: ' + meteo[i][0] +'</div>';
        $(".wholecontent").prepend(divText);   
        }
 //       $(".wholecontent").prepend('<div class="drawLine"></div>');       
        $(".wholecontent").prepend('<div class="met"></div>');
        $(".met:first-child").css("width", Math.sqrt(meteo[i][2])/50);
        $(".met:first-child").css("height", Math.sqrt(meteo[i][2])/50);
 //       $(".met:first-child").css("width", "50px");
 //       $(".met:first-child").css("height", "50px");
            
        $(".met:first-child").css("background-color", "rgba(255,0,255,0.3)");
        $(".met:first-child").css("border-radius", "50%");
//       $(".met:first-child").css("left", (meteo[i][4]-13.8)*81.86);         
//        $(".met:first-child").css("bottom", (meteo[i][3]-48.7)*128.9);
        $(".met:first-child").css("left", (convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)));         
        $(".met:first-child").css("bottom", (convertToSvgHeight(meteo[i][3],startLat, endLat, pictureHeight)));        
        $(".met:first-child").css("transform", "translate(-50%,50%)"); 
// To draw a line
            
             if(i < 10) {
                 
        $(".drawLine:nth-child(2)").css("left", (convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)+ (Math.sqrt(meteo[i][2])/50)/2  )  );         
        $(".drawLine:nth-child(2)").css("bottom", (convertToSvgHeight(meteo[i][3],startLat, endLat, pictureHeight))); 
         divText = "";  
                }  
            
                   
    }
 

         
    }
        $("#status").fadeOut(200);  
    //showTimeLoading(startTime);                
    countPage = countPage +1;
            });  //} else if
//$("#click").prop("disabled",true); 
      
});
 

    
});
    
function convertToSvgWidth(yourLong, startLong , endLong , pictureWidth ) {
    
    return (yourLong-startLong)*(pictureWidth/(endLong-startLong));
    
}

function convertToSvgHeight(yourLat, startLat, endLat, pictureHeight){
    return (yourLat-startLat)*(pictureHeight/(endLat-startLat));
}

function reloadPage() {
    location.reload();
}
