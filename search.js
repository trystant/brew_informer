var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('API_KEY');
breweries();
	//-------------------------------SELECT CASCADING-------------------------//
  	var currentCities=[];
// This is a demo API key that can only be used for a short period of time, and will be unavailable soon. You should rather request your API key (free)  from http://battuta.medunes.net/ 	
var BATTUTA_KEY= "bb03b960b7d675d47e5d78b1795da95c";
  	// Populate country select box from battuta API
	url="https://battuta.medunes.net/api/country/all/?key="+ BATTUTA_KEY +"&callback=?";
  	$.getJSON(url,function(countries)
  	{
  		console.log(countries);
      $('#country').material_select();
	    //loop through countries..
	    $.each(countries,function(key,country)
	    {
	        $("<option></option>")
	         				.attr("value",country.code)
	         				.append(country.name)
	                     	.appendTo($("#country"));
	       
	    }); 
	    // trigger "change" to fire the #state section update process
	    $("#country").material_select('update');
	    $("#country").trigger("change");
	    

  	});
    
    $("#country").on("change",function()
  	{
  	
  		countryCode=$("#country").val();
  		
  		// Populate country select box from battuta API
	    url="https://battuta.medunes.net/api/region/"
	    +countryCode
	    +"/all/?key="+BATTUTA_KEY+"&callback=?";

  		$.getJSON(url,function(regions)
  		{
  			$("#region option").remove();
		    //loop through regions..
		    $.each(regions,function(key,region)
		    {
		        $("<option></option>")
		         				.attr("value",region.region)
		         				.append(region.region)
		                     	.appendTo($("#region"));
		    });
		    // trigger "change" to fire the #state section update process
	    	$("#region").material_select('update');
	    	$("#region").trigger("change");
	    	
	    }); 
	    
  	});
  	$("#region").on("change",function()
  	{
  		
  		// Populate country select box from battuta API
  		countryCode=$("#country").val();
		region=$("#region").val();
	    url="https://battuta.medunes.net/api/city/"
	    +countryCode
	    +"/search/?region="
	    +region
	    +"&key="
	    +BATTUTA_KEY
	    +"&callback=?";
  		
  		$.getJSON(url,function(cities)
  		{
  			currentCities=cities;
        	var i=0;
        	$("#city option").remove();
        
		    //loop through regions..
		    $.each(cities,function(key,city)
		    {
		        $("<option></option>")
		         				.attr("value",i++)
		         				.append(city.city)
		                .appendTo($("#city"));
		    });
		    // trigger "change" to fire the #state section update process
	    	$("#city").material_select('update');
	    	$("#city").trigger("change");
	    	
	    }); 
	    
  	});	
  	$("#city").on("change",function()
  	{
      currentIndex=$("#city").val();
      currentCity=currentCities[currentIndex];
      city=currentCity.city;
      region=currentCity.region;
      country=currentCity.country;
      lat=currentCity.latitude;
      lng=currentCity.longitude;
      // $("#location").html('<i class="fa fa-map-marker"></i> <strong> '+city+"/"+region+"</strong>("+lat+","+lng+")");
      $("#location").html('<span class="random-sentence">This is were the results will show up</span>');
    });
   //-------------------------------END OF SELECT CASCADING-------------------------//