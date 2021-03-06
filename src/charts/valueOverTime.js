import * as d3 from 'd3'
import { useEffect, useState} from 'react'
import dataSet from "./couponDataset.csv"

function TimeSeries(props) {
    let csvURL = dataSet

    const {width, height } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
            drawChart2();
        }
        else {
            getURLData();
        }
    }, [data])

    const getURLData = async () => {
        let tempData = [];
          await d3.csv(csvURL,
          (() =>{}),
          function(d){
            //console.log(d);
            tempData.push({date: d3.timeParse("%Y-%m-%d")(d.couponExpires), value: parseFloat(d.couponSavings)})
          }
    
        )
          //setData(tempData);
          setData(tempData.sort(function(a,b){return b.date - a.date}));
      } 
    
    //console.log(data)

    const drawChart = () => {

        // establish margins
        const margin = { top: 10, right: 50, bottom: 50, left: 50 };
    
        // create the chart area
        const svg = d3
            .select('#valueOverTime')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        // Add X axis --> it is a date format
            var x = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);
              
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));
    
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
        
        // set line coordinates
        const line = d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1)
          .attr("d", line)
 }

 const drawChart2 = () => {

  // establish margins
  const margin = { top: 10, right: 50, bottom: 50, left: 50 };

  // create the chart area
  const svg = d3
      .select('#valueOverTimeNarrow')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
        
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 11])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));
  
  // set line coordinates


  svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.date); } )
    .attr("cy", function (d) { return y(d.value); } )
    .attr("r", 1.5)
    .style("fill", "#69b3a2")
}



return (
	<div>
    <h4>Coupons Savings (USD) vs Time (Days) </h4>
    <div id='valueOverTime'/>
    <h4>Coupons Savings (USD) vs Time (Days) without Outliers </h4>
    <div id='valueOverTimeNarrow'/>
  </div>
	)

}

export default TimeSeries;