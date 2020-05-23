
function ShowDischarge() {

 function convertToJSON(csvurl)
 {
 
var url = csvurl;

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

var csvData = new Array();
var customers = new Array();
 var rows = request.responseText.split(/\r?\n|\r/);
 for (var i = 0; i < rows.length; i++) {
 var cells = rows[i].split(",");
if (cells.length > 1) {
	 var customer = {};
	customer.Name = cells[0];
	customer.Lat = cells[1];
	customer.Lon = cells[2];
	//customer.Area = cells[3];
	customer.Gender = cells[3];
	//customer.AreaType = cells[5];
	customer.Age = cells[4];
	customer.Status = cells[5];
	customer.ImageUrl = cells[8];
	customers.push(customer);
   }
}
							
return customers;
}

 var locations=[];

 
 if(document.getElementById("Positive").checked )
 {
	  var Positive = convertToJSON('layerdata/data.csv');
	  for (i = 0; i < Positive.length; i++) {
			Positive[i].ImageUrl ='positive.png';
			
			
			}
	  locations = Positive;
 }
  // if(document.getElementById("Recoverd").checked )
 // {
	 // var Recoverd = convertToJSON('layerdata/data.csv');
		// for (i = 0; i < Recoverd.length; i++) {
			
			// }
	// var tempRecoverd = Recoverd.filter( x => 
			// x.Status == 'Recoverd');
			
			// for (i = 0; i < tempRecoverd.length; i++) {
			// tempRecoverd[i].ImageUrl ='recovered.png';
			// }
			
	 // locations = locations.concat(tempRecoverd);
 // }
  if(document.getElementById("Discharged").checked )
 {
	  var Discharged = convertToJSON('layerdata/data.csv');
	  var tempDischarged = Discharged.filter( x => 
			x.Status == 'DISCHARGED');
			
			for (i = 0; i < tempDischarged.length; i++) {
			tempDischarged[i].ImageUrl ='Discharge.jpg';
			}
	   locations = locations.concat(tempDischarged);
 }
  if(document.getElementById("Death").checked )
 {
	 var Death = convertToJSON('layerdata/data.csv');
	  var tempDeath = Death.filter( x => 
			x.Status == 'DECEASED');
			
			for (i = 0; i < tempDeath.length; i++) {
			tempDeath[i].ImageUrl ='death.png';
			}
	   locations = locations.concat(tempDeath);

 }
 if(document.getElementById("Male").checked )
 {
	 var Male = convertToJSON('layerdata/data.csv');
	   var tempMale = Male.filter( x => 
			x.Gender == 'MALE');
			
			for (i = 0; i < tempMale.length; i++) {
			tempMale[i].ImageUrl ='bluedot.png';
			}
	    locations = locations.concat(tempMale);
	   
	   if(document.getElementById("AgeGrp1").checked )
		{
			 var AgeGrp1 = locations.filter( x => 
			x.Age <= 20);
			locations=AgeGrp1;
		}
		if(document.getElementById("AgeGrp2").checked )
		{
			 var AgeGrp2 = locations.filter( x => 
			x.Age >= 20 && x.Age <= 40);
			locations=AgeGrp2;
		}
		if(document.getElementById("AgeGrp3").checked )
		{
			 var AgeGrp3 = locations.filter( x => 
			x.Age >= 40 && x.Age <= 60);
			locations=AgeGrp3;
		}
		if(document.getElementById("AgeGrp4").checked )
		{
			 var AgeGrp4 = locations.filter( x => 
			x.Age >=  60);
			locations=AgeGrp4;
		}
	   
 }
 if(document.getElementById("Female").checked )
 {
	 var Female = convertToJSON('layerdata/data.csv');
		var tempFemale = Female.filter( x => 
			x.Gender == 'FEMALE');
			
			for (i = 0; i < tempFemale.length; i++) {
			tempFemale[i].ImageUrl ='Pinkdot.png';
			}
	   locations = locations.concat(tempFemale);
	  
	   if(document.getElementById("AgeGrp1F").checked )
		{
			
			var AgeGrp1_F = locations.filter( y => 
			y.Age <= 20);
			locations=AgeGrp1_F;
	
		}
		if(document.getElementById("AgeGrp2F").checked )
		{
			 var AgeGrp2_F = locations.filter( x => 
			x.Age >= 20 && x.Age <= 40);
			locations=AgeGrp2_F;
		
		}
		if(document.getElementById("AgeGrp3_F").checked )
		{
			 var AgeGrp3_F = locations.filter( x => 
			x.Age >= 40 && x.Age <= 60);
			locations=AgeGrp3_F;
		}
		if(document.getElementById("AgeGrp4_F").checked )
		{
			 var AgeGrp4_F = locations.filter( x => 
			x.Age >=  60);
			locations=AgeGrp4_F;
		}
	   
  }
  // if(document.getElementById("Curfew").checked )
 // {
	 // var Curfew = convertToJSON('layerdata/ThanawiseCurfew.csv');
	   // locations = locations.concat(Curfew);
 // }
  if(document.getElementById("Active").checked )
 {
	 var Active = convertToJSON('layerdata/data.csv');
	 var tempActive = Active.filter( x => 
			x.Status == 'SYMPTOMATIC');
			
			for (i = 0; i < tempActive.length; i++) {
			tempActive[i].ImageUrl ='active.jpg';
			}
	   locations = locations.concat(tempActive);
	  
	 
	  
 }
 
if(locations== '')
 {
	  Positive = convertToJSON('layerdata/data.csv');
	 
			for (i = 0; i < Positive.length; i++) {
			Positive[i].ImageUrl ='positive.png';
			
			
			}
	  
	  locations = Positive;
	  
	  document.getElementById("Positive").checked =true;
	
			
			
 }
 
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(26.9202933, 75.8273711),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  })

var src = 'https://drive.google.com/open?id=1kkJABS8GOaFofaQeH0igaI72AP4oHe0i';
  var kmlLayer = new google.maps.KmlLayer(src, {
          suppressInfoWindows: true,
          preserveViewport: false,
          map: map
        });

  var infowindow = new google.maps.InfoWindow({})

  var marker, i

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].Lat, locations[i].Lon),
     // label: { color: '#00aaff', fontWeight: 'bold', fontSize: '12px', text: locations[i].Area },
	 
	  map: map,
	   icon: {
     url: 'Images/' + locations[i].ImageUrl,
     labelOrigin: { x: 12, y: -10}
   },
    })
    google.maps.event.addListener(
      marker,
      'click',
      (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i].Age)
          infowindow.open(map, marker)
        }
      })(marker, i)
    )
	
  }
 
}

 