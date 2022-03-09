import * as d3 from 'd3';
import {useEffect, useState} from 'react';
import dataSet from "./couponDataset.csv"

const SavingsPerStore = (props) => {

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
            tempData.push({store: d.store, value: parseFloat(d.couponSavings)})
          }
    
        )
      
	//console.log(tempData)

	let storeSavings = [];
	tempData.map((element) => {
		
		if (storeSavings[element.store] > 0) {
			storeSavings[element.store] = storeSavings[element.store] + element.value;
		}
		else {
			storeSavings[element.store] = element.value;
		}
	})

	//console.log(storeSavings)

	let storeSavingsArray = Object.keys(storeSavings).map(function(key) {
		return {'store': key, 'savings': storeSavings[key]};
	})

	//console.log(storeSavingsArray)

	//setData(storeSavingsArray)
	setData(storeSavingsArray.sort(function(a,b){
		if(a.store < b.store) { return -1; }
		if(a.store > b.store) { return 1; }
		return 0;
	}))

	}

	const drawChart = () => {

	// declare margins
	const margin = {top: 70, right: 50, bottom: 70, left: 50};

	// create the svg that holds the chart
    const svg = d3.select("#SavingsPerStore")
    .append('svg')
		  .style("background-color", "white")
		  .attr("width", width)
		  .attr("height", height)
		  .append('g')
		  .attr("transform",`translate(0,-${margin.bottom-10})`);

	// create the x axis scale, scaled to the states
	const xScale = d3.scaleBand()
		.domain(data.map(d => d.store))
		.rangeRound([margin.left, width - margin.right])
		.padding(0.2)

	// create the y axis scale, scaled from 0 to the max
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.savings)])
		.range([height - margin.bottom, margin.top])

	// create a scale between colors that varies by the frequency
	const barColors = d3.scaleLinear()
	  .domain([0,d3.max(data, d => d.savings)])
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
	    .attr('x', d => xScale(d.store))
	    .attr('y', d => yScale(d.savings))
	    .attr('width', xScale.bandwidth())
	    .attr('height', d => yScale(0) - yScale(d.savings))
	    .style("padding", "3px")
	    .style("margin", "1px")
	    .style("width", d => `${d * 10}px`)
	    .attr("fill", function(d) {return barColors(d.savings)})
	    .attr("stroke", "black")
	    .attr("stroke-width", 1)

}

return (
	<div>
	  	<h4> Total Savings Per Store in USD</h4>
	<div id='SavingsPerStore'/>
	<h4> Discussion of Coupons and Stores </h4>
    <div className='container'>
      <p>
        The number of coupons and savings per store are perhaps the most relevant metrics to the everyday shopper.
		 Everyone has their go to store based on convenience or brand loyalty.
		 Here, it is interesting to see there is generally a correlation between the number of coupons and the savings from said coupons.
		 One would expect more coupons means more savingsand this is the case.
		 Albestson's, PCC, and Whole Foods have the most coupons.
		 They do, infact, offer more savings than those with fewer coupons with one exception: Costco.
		 Costco has the least numbers of coupons available, yet has more than double the savings of the second place store.
		 This is possibly due to the fact Costco deals in bulk items.
		 While they offer fewer coupons, the ones they do offer are for more expensive purchases resulting in more savings for the buyer.
      </p>
    </div>
	</div>
	)
}

export default SavingsPerStore;