boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
neighborhoodsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/neighborhood-clusters.geojson"
policeURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/police-districts-mpd.geojson"
ancURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/advisory-neighborhood-commission-2013.geojson"
smdURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/single-member-district-2013.geojson"
zipcodesURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/zip-codes.geojson"
data2012URL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/crime-incidents-2012.geojson"
data2013URL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/crime-incidents-2013.geojson"
data2014URL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/crime-incidents-2014.geojson"
data2015URL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/crime-incidents-2015.geojson"
data2016URL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/crime-incidents-2016.geojson"

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicmllaGxlYSIsImEiOiJjamlhdWlzcnkxMndiM3FsbWl1aXE0MXJtIn0.g7oyFuzbGAh1O0SXpGI8nw");

var baseMaps = {
  "Street Map": streetmap,
};

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData, {
        onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h1>Washington, DC</h1><h3>Mayor: Muriel Bowser</h3><h3>Population: 693,972</h3><h3>Area: '+feature.properties.AREAMILES+' Square Miles</h3><h3><a href='+feature.properties.WEB_URL+' target="_blank">Discover DC</a></h3>');
    marker1.on('click', function (event) {
  this.openPopup();
});
  }
})

  var myMap = L.map("map", {
    center: [
      38.9, -77
    ],
    zoom: 11,
    layers: [streetmap, boundary]
  });

d3.json(quadrantURL, function(quadrantData) {
  var quad = L.geoJSON(quadrantData, {
        onEachFeature: function (feature, layer) {
    layer.on('click', function (event) {
myMap.fitBounds(event.target.getBounds());
});
    var marker1 = layer.bindPopup('<h3>'+feature.properties.QUADRANT+'</h3>');
    marker1.on('mouseover', function (event) {
      this.openPopup()
    })
    marker1.on('mouseout', function (event) {
      this.closePopup()
    })
  },
    style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    }
})

  d3.json(neighborhoodsURL, function(neighborhoodData) {
  var neighborhood = L.geoJSON(neighborhoodData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>'+feature.properties.SHORT_NAME+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
});
marker4.on('mouseout', function (event) {
  this.closePopup();
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

    d3.json(policeURL, function(policeData) {
  var police = L.geoJSON(policeData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>District '+feature.properties.DISTRICT+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
});
marker4.on('mouseout', function (event) {
  this.closePopup();
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

    d3.json(zipcodesURL, function(zipcodesData) {
  var zipcodes = L.geoJSON(zipcodesData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>'+feature.properties.ZIPCODE+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
});
marker4.on('mouseout', function (event) {
  this.closePopup();
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

    d3.json(ancURL, function(ancData) {
  var anc = L.geoJSON(ancData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>'+feature.properties.NAME+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
});
marker4.on('mouseout', function (event) {
  this.closePopup();
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

    d3.json(smdURL, function(smdData) {
  var smd = L.geoJSON(smdData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "black",
        fillOpacity: 0,
        weight: 3
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>ANC '+feature.properties.SMD_ID+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
});
marker4.on('mouseout', function (event) {
  this.closePopup();
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

d3.json(data2012URL, function(data2012response) {

          theft = []
          theft_from_auto = []
          robbery = []
          burglary = []
          car_theft = []
          assault = []
          sex_abuse = []
          homicide = []
          arson = []

  var data2012 = L.geoJSON(data2012response, {
    onEachFeature: function (feature) {
      if (feature.properties.OFFENSE == "ARSON") {
        arson.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT F/AUTO") {
        theft_from_auto.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT/OTHER") {
        theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ROBBERY") {
        robbery.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "BURGLARY") {
        burglary.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "MOTOR VEHICLE THEFT") {
        car_theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ASSAULT W/DANGEROUS WEAPON") {
        assault.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "SEX ABUSE") {
        sex_abuse.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else {
        homicide.push(feature.geometry.coordinates)
      }
  }
})

  d3.json(data2013URL, function(data2013response) {

  var data2013 = L.geoJSON(data2013response, {
    onEachFeature: function (feature) {
      if (feature.properties.OFFENSE == "ARSON") {
        arson.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT F/AUTO") {
        theft_from_auto.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT/OTHER") {
        theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ROBBERY") {
        robbery.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "BURGLARY") {
        burglary.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "MOTOR VEHICLE THEFT") {
        car_theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ASSAULT W/DANGEROUS WEAPON") {
        assault.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "SEX ABUSE") {
        sex_abuse.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else {
        homicide.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
  }
})

    d3.json(data2014URL, function(data2014response) {

  var data2014 = L.geoJSON(data2014response, {
    onEachFeature: function (feature) {
      if (feature.properties.OFFENSE == "ARSON") {
        arson.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT F/AUTO") {
        theft_from_auto.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT/OTHER") {
        theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ROBBERY") {
        robbery.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "BURGLARY") {
        burglary.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "MOTOR VEHICLE THEFT") {
        car_theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ASSAULT W/DANGEROUS WEAPON") {
        assault.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "SEX ABUSE") {
        sex_abuse.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else {
        homicide.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
  }
})

      d3.json(data2015URL, function(data2015response) {

  var data2015 = L.geoJSON(data2015response, {
    onEachFeature: function (feature) {
      if (feature.properties.OFFENSE == "ARSON") {
        arson.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT F/AUTO") {
        theft_from_auto.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT/OTHER") {
        theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ROBBERY") {
        robbery.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "BURGLARY") {
        burglary.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "MOTOR VEHICLE THEFT") {
        car_theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ASSAULT W/DANGEROUS WEAPON") {
        assault.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "SEX ABUSE") {
        sex_abuse.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else {
        homicide.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
  }
})

        d3.json(data2016URL, function(data2016response) {
  var data2016 = L.geoJSON(data2016response, {
    onEachFeature: function (feature) {
      if (feature.properties.OFFENSE == "ARSON") {
        arson.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT F/AUTO") {
        theft_from_auto.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "THEFT/OTHER") {
        theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ROBBERY") {
        robbery.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "BURGLARY") {
        burglary.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "MOTOR VEHICLE THEFT") {
        car_theft.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "ASSAULT W/DANGEROUS WEAPON") {
        assault.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else if (feature.properties.OFFENSE == "SEX ABUSE") {
        sex_abuse.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
      else {
        homicide.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      }
  }
})

  var arson_heat = L.heatLayer(arson, {
    radius: 20,
    blur: 35
  })

  var theft_from_auto_heat = L.heatLayer(theft_from_auto, {
    radius: 20,
    blur: 35
  })  

  var theft_heat = L.heatLayer(theft, {
    radius: 20,
    blur: 35
  })  

  var robbery_heat = L.heatLayer(robbery, {
    radius: 20,
    blur: 35
  })  

  var burglary_heat = L.heatLayer(burglary, {
    radius: 20,
    blur: 35
  })  

  var car_theft_heat = L.heatLayer(car_theft, {
    radius: 20,
    blur: 35
  })  

  var assault_heat = L.heatLayer(assault, {
    radius: 20,
    blur: 35
  })  

  var sex_abuse_heat = L.heatLayer(sex_abuse, {
    radius: 20,
    blur: 35
  })  

  var homicide_heat = L.heatLayer(homicide, {
    radius: 20,
    blur: 35
  })  

  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Police Districts": police,
    "DC Neighborhoods": neighborhood,
    "DC Zip Codes": zipcodes,
    "DC Advisory Neighborhood Commissions":anc,
    "DC Single Member Districts": smd,
    "Theft from Auto": theft_from_auto_heat,
    "Theft - Other": theft_heat,
    "Robbery": robbery_heat,
    "Burglary": burglary_heat,
    "Car Theft": car_theft_heat,
    "Assault with a Dangerous Weapon": assault_heat,
    "Sexual Abuse": sex_abuse_heat,
    "Homicide": homicide_heat,
    "Arson": arson_heat
  }

  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);

})
})
})
})
})
})
})
})
})
})
})
})