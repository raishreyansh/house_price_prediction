// both grtBathVlue and getBHKValue iterate through our button bar to see which value was checked

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    // get value of different variables previously clicked after clicking on estimate button
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    // var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx
    // we need to specify  port and we are using api here rather than just hardcoding the port
    //configure reverse proxy so when we request it route that request to 5000 port
    var url = "/api/predict_home_price"; // Use this if  you are using nginx.
    // this will help us in estimating the value by providinng values to all the keys in our postman app POST call
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
  //URL that was entered to get location in our postman application
  function onPageLoad() {
    console.log( "document loaded" );
    // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx
    var url = "/api/get_location_names"; // Use this if  you are using nginx. 
    // get response of location back in data
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        // iterate through locations file we got from response
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            // iterate through locations  and add in our drop down
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;




  //architecture of our application in
// 0:51
// Amazon ec2 instance I will be using
// 0:54
// nginx as my webserver nginx is a light
// 0:57
// web server which can solve two HTTP
// 1:00
// requests when you load the URL into your
// 1:03
// web browser it will go to our instance
// 1:05
// and from nginx web server it will return
// 1:08
// all app our app dot HTML GS and CSS file
// 1:12
// back to the server after that when you
// 1:14
// click on a button to predict the home
// 1:16
// price from your JS file from your
// 1:21
// browser it will again make a call to
// 1:23
// nginx server and we'll be using a
// 1:25
// reverse proxy set up on nginx
// 1:29
// to route all our requests less API
// 1:31
// request to our ply Python flash server
// 1:34
// which will be running on the same ec2
// 1:36
// instance and using the saved ml model to
// 1:40
// solve the prediction request so this is