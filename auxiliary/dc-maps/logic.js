boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
wardURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/ward-2012.geojson"
ancURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/advisory-neighborhood-commission-2013.geojson"
smdURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/single-member-district-2013.geojson"

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
  var boundary = L.geoJSON(boundaryData)

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
    onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h3> Ward'+feature.properties.WARD_ID+'</h3>');
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
  onEachFeature: function (feature, layer) {
    var marker3 = layer.bindPopup('<h3>'+feature.properties.NAME+'</h3>');
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
  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Wards": ward,
    "DC ANC": anc,
    "DC Single Member Districts": smd
  }



  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);
})
})
})
})
})