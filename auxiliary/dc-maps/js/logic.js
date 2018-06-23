boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
wardURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/ward-2012.geojson"
ancURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/advisory-neighborhood-commission-2013.geojson"
smdURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/single-member-district-2013.geojson"
neighborhoodsURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/neighborhood-clusters.geojson"
zipcodesURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/zip-codes.geojson"
policeDistrictsURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/police-districts-mpd.geojson"
gunshot_or_firecracker_URL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/gunshot-or-firecracker.json"
single_gunshot_URL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/single-gunshots.json"
multi_gunshot_URL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/multi-gunshots.json"
sportsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/sports-arenas.json"

  var multiGunIcon = L.ExtraMarkers.icon({
    icon: "fa-exclamation-triangle",
    iconColor: "white",
    markerColor: "red",
    prefix: "fa"
  });

    var singleGunIcon = L.ExtraMarkers.icon({
    icon: "fa-exclamation-triangle",
    iconColor: "black",
    markerColor: "yellow",
    prefix: "fa"
  });

    var firecrackerIcon = L.ExtraMarkers.icon({
    icon: "fa-exclamation-triangle",
    iconColor: "white",
    markerColor: "blue",
    prefix: "fa"
  });

  var sportsIcon = L.ExtraMarkers.icon({
    icon: "fa-basketball-ball",
    iconColor: "white",
    markerColor: "blue",
    prefix: "fa"
  });

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicmllaGxlYSIsImEiOiJjamlhdWlzcnkxMndiM3FsbWl1aXE0MXJtIn0.g7oyFuzbGAh1O0SXpGI8nw");

var baseMaps = {
  "Street Map": streetmap,
};

function chooseColor(quadrant) {
  switch (quadrant) {
  case "SW":
    return "yellow";
  case "SE":
    return "red";
  case "NE":
    return "orange";
  case "NW":
    return "green";
  default:
    return "black";
  }
}

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData, {
        onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h1>Washington, DC</h1><h3>Mayor: Muriel Bowser</h3><h3>Population: 693,972</h3><h3>Area: '+feature.properties.AREAMILES+' Square Miles</h3><h3><a href='+feature.properties.WEB_URL+' target="_blank">Discover DC</a></h3>');
    marker1.on('mouseover', function (event) {
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
        fillColor: chooseColor(feature.properties.QUADRANT),
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
})
d3.json(wardURL, function(wardData) {
  var ward = L.geoJSON(wardData, {
            style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "red"
      };
    },
    onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h3> Ward '+feature.properties.WARD_ID+'</h3><h4><a href="https://planning.dc.gov/page/about-ward-'+feature.properties.WARD_ID+'" target="_blank">About Ward '+feature.properties.WARD_ID+'</a>');
    marker1.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
            fillOpacity: 0.8
          });
});
marker1.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker1.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
  }
  })

d3.json(smdURL, function(smdData) {
  var smd = L.geoJSON(smdData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "red"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker2 = layer.bindPopup('<h3>ANC'+feature.properties.SMD_ID+'</h3>');
    marker2.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker2.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker2.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
  }
  })

d3.json(ancURL, function(ancData) {
  var anc = L.geoJSON(ancData, {
    style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "red"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker3 = layer.bindPopup('<h3>'+feature.properties.NAME+'</h3><h4><a href="http://www.anc'+feature.properties.ANC_ID+'.org" target="_blank">About '+feature.properties.NAME+'</a></h4>');
    marker3.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker3.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker3.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })
  d3.json(neighborhoodsURL, function(neighborhoodData) {
  var neighborhood = L.geoJSON(neighborhoodData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "purple"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>'+feature.properties.NBH_NAMES+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker4.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })
  d3.json(zipcodesURL, function(zipcodeData) {
  var zipcode = L.geoJSON(zipcodeData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "green"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker5 = layer.bindPopup('<h3>'+feature.properties.ZIPCODE+'</h3><h4>'+feature.properties.NAME+'</h4>');
    marker5.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker5.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker5.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })
   d3.json(policeDistrictsURL, function(policeData) {
  var police = L.geoJSON(policeData, {
  onEachFeature: function (feature, layer) {
    var marker5 = layer.bindPopup('<h3>Police District '+feature.properties.DISTRICT+'</h3>');
    marker5.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker5.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker5.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

  d3.json(gunshot_or_firecracker_URL, function(response) {
  var GunshotOrFirecracker = L.markerClusterGroup();
  for (var i = 0; i < response.length; i++) {
    GunshotOrFirecracker.addLayer(L.marker([response[i]['Lat (100m)'], response[i]['Lon (100m)']], {icon: firecrackerIcon})
        .bindPopup('<h3>'+response[i].Date+'</h3><h3>'+response[i].Time+'</h3><h3>'+response[i].Type+'</h3>'));
  }
  d3.json(single_gunshot_URL, function(response) {
  var singleGunshots = L.markerClusterGroup();
  for (var i = 0; i < response.length; i++) {
    singleGunshots.addLayer(L.marker([response[i]['Lat (100m)'], response[i]['Lon (100m)']], {icon: singleGunIcon})
        .bindPopup('<h3>'+response[i].Date+'</h3><h3>'+response[i].Time+'</h3><h3>'+response[i].Type+'</h3>'));
  }
  d3.json(multi_gunshot_URL, function(response) {
  var multiGunshots = L.markerClusterGroup();
  for (var i = 0; i < response.length; i++) {
    multiGunshots.addLayer(L.marker([response[i]['Lat (100m)'], response[i]['Lon (100m)']], {icon: multiGunIcon})
        .bindPopup('<h3>'+response[i].Date+'</h3><h3>'+response[i].Time+'</h3><h3>'+response[i].Type+'</h3>'));
  }
  d3.json(sportsURL, function(response) {
  var sportsArenas = L.markerClusterGroup();
  for (var i = 0; i < response.length; i++) {
    sportsArenas.addLayer(L.marker([response[i]['LAT'], response[i]['LON']], {icon: sportsIcon})
        .bindPopup('<h3>'+response[i].STADIUM+'</h3><h4>Seats: '+response[i].CAPACITY+'</h4><h4>Home To: '+response[i].TEAMS+'</h4>'));
  }

  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Wards": ward,
    "DC Police Districts": police,
    "DC Zipcodes": zipcode, 
    "DC Neighborhoods": neighborhood,
    "DC ANC": anc,
    "DC Single Member Districts": smd,
    "Gunshot or Firecracker Locations": GunshotOrFirecracker,
    "Single Gunshot Locations": singleGunshots,
    "Multiple Gunshot Locations": multiGunshots,
    "Sports Arenas": sportsArenas
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