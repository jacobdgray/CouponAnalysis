import * as d3 from 'd3';
import {useEffect, useState} from 'react';
import dataSet from "./couponDataset.csv"

const Histogram = (props) => {

    let csvURL = dataSet

    const {width, height } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
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
            tempData.push({state: d.stateCode})
          }
    
        )
      

	//console.log(data)

	let stateFreq = [];
	tempData.forEach((element) => {
		if (stateFreq[element.state] > 0) {
			stateFreq[element.state] = stateFreq[element.state] + 1;
		} else {
			stateFreq[element.state] = 1;
		}
	})

	//console.log(stateFreq)

	let stateFreqArray = Object.keys(stateFreq).map(function(key) {
		return {'state': key, 'frequency': stateFreq[key]};
	})

	setData(stateFreqArray.sort(function(a,b){
		if(a.state < b.state) { return -1; }
		if(a.state > b.state) { return 1; }
		return 0;
	}))
	//console.log(stateFreqArray)
	
	}

	const drawChart = () => {

	// declare margins
	const margin = {top: 70, right: 50, bottom: 70, left: 50};

	// create the svg that holds the chart
    const svg = d3.select("#CouponsPerState")
    .append('svg')
		  .style("background-color", "white")
		  .attr("width", width)
		  .attr("height", height)
		  .append('g')
		  .attr("transform",`translate(0,-${margin.bottom-10})`);

	// create the x axis scale, scaled to the states
	const xScale = d3.scaleBand()
		.domain(data.map(d => d.state))
		.rangeRound([margin.left, width - margin.right])
		.padding(0.2)

	// create the y axis scale, scaled from 0 to the max
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.frequency)])
		.range([height - margin.bottom, margin.top])

	// create a scale between colors that varies by the frequency
	const barColors = d3.scaleLinear()
	  .domain([0,d3.max(data, d => d.frequency)])
	  .range(["blue","red"])

	// set the x axis on the bottom.
	// tilts the axis text so it's readable and not smushed.
    svg.append("g")
      .attr('transform', `translate(0,${height-margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
	  .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // set the y axis on the left
    svg.append("g")
    .attr('transform', `translate(${margin.left},0)`)
    	.call(d3.axisLeft(yScale));

	  // create the actual bars on the graph, appends a 'rect' for every data element
	  // sets the x and y positions relative to the scales already established
	  // sets the height according to the yscale
	  // static bar width, color is scaled on the y axis
	  // finally the bars have an outline
	  const bars = svg
	  .selectAll("rect")
	  .data(data)
	  .enter().append("rect")
	    .attr('x', d => xScale(d.state))
	    .attr('y', d => yScale(d.frequency))
	    .attr('width', xScale.bandwidth())
	    .attr('height', d => yScale(0) - yScale(d.frequency))
	    .style("padding", "3px")
	    .style("margin", "1px")
	    .style("width", d => `${d * 10}px`)
	    .attr("fill", function(d) {return barColors(d.frequency)})
	    .attr("stroke", "black")
	    .attr("stroke-width", 1)

}

return (
	<div>
	  	<h4> Number of Coupons per State</h4>
	<div id='CouponsPerState'/>
	<h4> Discussion of Coupons and States </h4>
    <div className='container'>
      <p>
        There is a respectable variance in the number of coupons available per state.
		 The state with the most coupons is Ohio while the state with the least is Michigan.
		 This is a reasonable result. Additionally, there is no region in the US with more coupons than another (i.e. New England is similar to the Northwest).
      </p>
    </div>
	</div>
	)
}

export default Histogram;