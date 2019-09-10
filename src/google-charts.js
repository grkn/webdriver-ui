google.charts.load('current', {'packages': ['corechart']});

function mockChart(element,testSuiteCount,testCaseCount) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['TestCase', testCaseCount],
    ['TestSuites', testSuiteCount]
  ]);

  // Set chart options
  var options = {
    'title': 'Test Case And Test Suite Ratio',
    'width': element.style.width,
    'height': element.style.height
  };


  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(element);
  chart.draw(data, options);
}
