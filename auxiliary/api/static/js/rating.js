$( document ).ready(function() {
    console.log( "ready!" );
});

var test;

Plotly.d3.json('/rating', function(data) {
    console.log(data)
    test = data;

    test.forEach(el => {
        // var d = new Date(el.DateOnly);
        // console.log(d)
        var date = $.datepicker.formatDate('yy-mm-dd', new Date(el.DateOnly));
        el.DateOnly = date;
    })

    var x = data.map(el => el.DateOnly);
    var y = data.map(el => el.Rating);

    var frames = [];
    for (var i = 0; i < x.length; i++) { 
        frames[i] = {data: [{x: [], y: []}]}
        frames[i].data[0].x = x.slice(0, i+1);
        frames[i].data[0].y = y.slice(0, i+1);
    };

    console.log(frames);

    Plotly.plot('graph', [{
        x: x,
        y: y,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'markers',
        line: {color: 'blue'}
      }], {
        title: "Average Rating",
        xaxis: {
        //   type: 'date',
        //   range: [
        //     frames[frames.length-1].data[0].x[0],
        //     frames[frames.length-1].data[0].x[-1]
        //   ]
        },
        yaxis: {
            range: [
              0,
              5.5
            ]
          },
          updatemenus: [{
            x: 0.1,
            y: 0,
            yanchor: "top",
            xanchor: "right",
            showactive: false,
            direction: "left",
            type: "buttons",
            pad: {"t": 87, "r": 10},
            buttons: [{
              method: "animate",
              args: [null, {
                fromcurrent: true,
                transition: {
                  duration: 0,
                },
                frame: {
                  duration: 500,
                  redraw: false
                }
              }],
              label: "Play"
            }, {
              method: "animate",
              args: [
                [null],
                {
                  mode: "immediate",
                  transition: {
                    duration: 0
                  },
                  frame: {
                    duration: 0,
                    redraw: false
                  }
                }
              ],
              label: "Pause"
            }]
        }]
        
    }).then(function() {
        Plotly.addFrames('graph', frames);
        // console.log(frames);
      });
    
})


// Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv", function(err, rows){

//   function unpack(rows, key) {
//   return rows.map(function(row) { return row[key]; });
// }
  
//   var frames = []
//   var x = unpack(rows, 'AAPL_x')
//   var y = unpack(rows, 'AAPL_y')
//   console.log(x)

//   var n = 100;
//   for (var i = 0; i < n; i++) { 
//     frames[i] = {data: [{x: [], y: []}]}
//     frames[i].data[0].x = x.slice(0, i+1);
//     frames[i].data[0].y = y.slice(0, i+1);
//   }
//   console.log(frames)

//   Plotly.plot('graph', [{
//     x: frames[1].data[0].x,
//     y: frames[1].data[0].y,
//     fill: 'tozeroy',
//     type: 'scatter',
//     mode: 'lines',
//     line: {color: 'green'}
//   }], {
//     title: "Filled-Area Animation",
//     xaxis: {
//       type: 'date', 
//       range: [
//         frames[99].data[0].x[0], 
//         frames[99].data[0].x[99]
//       ]
//     },
//     yaxis: {
//       range: [
//         0, 
//         90
//       ]
//     },
//     updatemenus: [{
//       x: 0.1,
//       y: 0,
//       yanchor: "top",
//       xanchor: "right",
//       showactive: false,
//       direction: "left",
//       type: "buttons",
//       pad: {"t": 87, "r": 10},
//       buttons: [{
//         method: "animate",
//         args: [null, {
//           fromcurrent: true,
//           transition: {
//             duration: 0,
//           },
//           frame: {
//             duration: 40,
//             redraw: false
//           }
//         }],
//         label: "Play"
//       }, {
//         method: "animate",
//         args: [
//           [null],
//           {
//             mode: "immediate",
//             transition: {
//               duration: 0
//             },
//             frame: {
//               duration: 0,
//               redraw: false
//             }
//           }
//         ],
//         label: "Pause"
//       }]
//     }]
//   }).then(function() {
//     Plotly.addFrames('graph', frames);
//   });
  
// }) 