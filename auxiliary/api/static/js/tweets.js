var $tablehead = d3.select('#table-head');
var $tablebody = d3.select('#table-body');

var tweets;

function renderTable(d) {

    $tablehead.text('');
    $tablebody.text('');

    var $headrow = $tablehead.append("tr");
        Object.keys(d[0]).forEach(item => $headrow.append('td').text(item));

        d.forEach(function(item) {
        var $bodyrow = $tablebody.append('tr');
        Object.values(item).forEach(value => $bodyrow.append('td').text(value));
    });
};

function getBar(bar) {

    var filteredBars = tweets.filter(el => {
        return el.Bar === bar;
    });
    renderTable(filteredBars.slice(-5));
}


// d3.json('/grabtweets', function(data) {
d3.json('/tweets', function(data) {
    console.log(data);

    data.forEach(el => {
        var date = $.datepicker.formatDate('yy-mm-dd', new Date(el.Date));
        el.Date = date;
    });

    tweets = data;
    
    //add dropdowns
    var bars =  data.map(el => el.Bar).filter((value, index, self) => self.indexOf(value) === index); //array of unique bar names
    var $select = d3.select('#selBar');
    
    bars.forEach(bar => {
        $select.append('option')
        .attr('value', bar)
        .text(bar.slice(1))
    });
        
    renderTable(data);

});
