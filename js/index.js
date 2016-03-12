$(document).ready(function(){
  

  function searchDates(startDate, numOfDays, countryCode, userYear){
    // var userYear = "2008",
    //     userMonth = "01",
    //     userDay = "16",
    //     startDate = userMonth +"/"+ userDay +"/"+ userYear,
    //     numOfDays = 7,
    //     countryCode = "ES";


    
    $("#datesContainer").empty();
    
    $("#datesContainer").datepicker({
      numberOfMonths: numOfDays > 30 ? Math.ceil(numOfDays/30) : 1 
    });

    alert("Num of days: " + numOfDays +"\n"+ Math.ceil(numOfDays/30))
    
    $("#datesContainer").datepicker("setDate", startDate);
    $("#datesContainer").datepicker( "option", "dateFormat", "yy-mm-dd" );
    
    
    //Geting the JSON data
    $.getJSON( "http://holidayapi.com/v1/holidays?country="+countryCode+"&year="+userYear, function(data) {
      console.log(data);

      console.log("http://holidayapi.com/v1/holidays?country="+countryCode+"&year="+userYear);


      var items = [];
      
        $(".ui-datepicker td").map(function(i,elem){


          //Variables
          var year = $(elem).data("year"),
            month = parseInt($(elem).data("month")) + 1,
            monthOutput = month < 10 ? "0" + month : month,
            day = parseInt($(elem).find("a").text()),
            dayOutput = day < 10 ? "0" + day : day,
            entireDate = year +"-"+ monthOutput +"-"+ dayOutput;
          
          $.each( data.holidays, function( i, item ) {
          if(entireDate == item[0].date){
            
            $(elem).addClass("holiday").find("a").css({"background":"#e67e22", "color":"#ffffff"});
            
            $(elem).append("<div class='holiday-hint'><p class='holidayName'>"+ item[0].name +"</p> <p class='holidayDate'>"+ item[0].date +"</p></div>");
            
          }
            
          }); // end $.each
          //console.log(entireDate);
          
        }); // end map
      
        // $.each( data.holidays, function( i, item ) {
        //   items.push( "<li id='" + item[0].name + "'>" + item[0].name + ", " + item[0].date + "</li>" );
        // });
      
        // $("#results").append(items);
      
        
      }); // end $.getJSON


      // Hover effect for displaying the holiday hints
      $(".ui-datepicker td").hover(function(){
        $(this).find(".holiday-hint").fadeIn();

      }, function(){
        $(this).find(".holiday-hint").fadeOut();

      });
    } // end searchDates function

    $("#startdate").datepicker();

    $(".show-me-btn").click(function(){

      var startdate = $("#startdate").val();
          numOfDays = $("#numOfDays").val();
          countryCode = $("#countryCode").val();
          dateStart = startdate.substring(6);
            


          //dateStart = dateStart.substring(6);

          alert(dateStart);

          searchDates(startdate, numOfDays, countryCode, dateStart);
    })
  
}); // end ready



















