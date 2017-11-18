var meteo = [];
var pictureWidth = 862;
var pictureHeight = 838;
var startLong = 13.8;
var startLat = 48.7;
var endLong = 24.33;
var endLat = 55.2;

var divText = "";

var temp = "";

var tableData = "";




function getData(){
    var result = null;
    $.ajax({
        
        url: "https://raw.githubusercontent.com/LightTest/poland-meteor/master/poland-right-file-meteors.json",


        dataType: "json",
        success: function(data){
            result = data;
        },
        async: false
    });
    return result;
}

meteo = getData();


$(document).ready(function() {
     


  $("#click").click(function() {
    for(i = 0; i < 31; i++) {
     
        if( meteo[i][2] != 1 && meteo[i][3] != 1) {
        
        divText = '<div class="drawLine">' + 'Name: ' + meteo[i][0] +'</div>';
        $(".wholecontent").prepend(divText);        
 //       $(".wholecontent").prepend('<div class="drawLine"></div>');       
        $(".wholecontent").prepend('<div class="met"></div>');
        $(".met:first-child").css("width", Math.sqrt(meteo[i][2])/3);
        $(".met:first-child").css("height", Math.sqrt(meteo[i][2])/3);
        $(".met:first-child").css("background-color", "rgba(255,0,255,0.3)");
        $(".met:first-child").css("border-radius", "50%");
//       $(".met:first-child").css("left", (meteo[i][4]-13.8)*81.86);         
//        $(".met:first-child").css("bottom", (meteo[i][3]-48.7)*128.9);
        $(".met:first-child").css("left", (convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)));         
        $(".met:first-child").css("bottom", (convertToSvgHeight(meteo[i][3],startLat, endLat, pictureHeight)));        
        $(".met:first-child").css("transform", "translate(-50%,50%)"); 
// To draw a line
//        $(".drawLine:nth-child(2)").css("left", (convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)+Math.sqrt(meteo[i][4])/1));          
        $(".drawLine:nth-child(2)").css("left", (convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)+ (Math.sqrt(meteo[i][2])/3)/2  )  );         
        $(".drawLine:nth-child(2)").css("bottom", (convertToSvgHeight(meteo[i][3],startLat, endLat, pictureHeight)));    
            
           // temp = translate(convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth),0);
          //  console.log(temp);
    //    $(".drawLine:nth-child(2)").css("width", Math.sqrt(meteo[i][2])/1);
    //    $(".drawLine:nth-child(2)").css("height", (Math.sqrt(meteo[i][2])/3)/1);        
    //    $(".drawLine:nth-child(2)").css("background-color", "rgba(0,0,255,0.3)"); 
//$(".drawLine:nth-child(2)").css("transform", "translate('convertToSvgWidth(meteo[i][4],startLong , endLong , pictureWidth)',0)");         
//$(".drawLine:nth-child(2)").css("transform", "translate(50%,200%)"); 
        
        divText = "";
    }
    
    }
     $("#click").prop("disabled",true); 
  });
    
    
    $("#loadDataTable").click(function() {

       
      for(var j = 0; j < 30; j++) { 
          
          tableData = '<div style="display: table-row;">' + '<div style="display: table-cell;">' + 'N: ' + (j+1) + '</div>' + '<div style="display: table-cell;">' + ' Name: ' + meteo[j][0] + '</div>' + '<div style="display: table-cell;">' + ' Year of Found: ' + meteo[j][1] + '</div>' + '<div style="display: table-cell;">' + ' Place Of Found: ' + meteo[j][6] + '</div>' + '<div style="display: table-cell;">' + ' Meteorite Type: ' + meteo[j][7] + '</div>' + '<div style="display: table-cell;">' + ' Mass in g: ' + meteo[j][2] + '</div></div>';
         $(".tableContent").append(tableData);  
            tableData = "";
      }  

       /*
        for(var j = 0; j < 30; j++) {
        
            tableData = '<div class="innerTable">' + 'NUMBER: ' + (j+1) + ' Name: ' + meteo[j][0] + ' YearOfFound: ' + meteo[j][1] + ' Place Of Found: ' + meteo[j][6] + ' Meteorite Type: ' + meteo[j][7] + ' Mass in g: ' + meteo[j][2]; 
            
        $(".tableContent").append(tableData);

        $("#loadDataTable").prop("disabled",true);
        
            tableData = "";
            }
        
       */
       $("#loadDataTable").prop("disabled",true); 
        
    });
    
});

function convertToSvgWidth(yourLong, startLong , endLong , pictureWidth ) {
    
    return (yourLong-startLong)*(pictureWidth/(endLong-startLong));
    
}

function convertToSvgHeight(yourLat, startLat, endLat, pictureHeight){
    return (yourLat-startLat)*(pictureHeight/(endLat-startLat));
}


