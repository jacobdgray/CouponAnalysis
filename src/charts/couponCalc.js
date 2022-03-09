import * as d3 from 'd3'
import { useEffect, useState} from 'react'
import dataSet from "./couponDataset.csv"

function CouponCalc(props) {
    let csvURL = dataSet

    const {width, height } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
            getURLData();
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
       

  //console.log(tempData)

}

let today = new Date();
let expiredArray = []
let validArray = []


data.map((ele) => {
  if(ele.date < today){
  expiredArray.push(ele)
  }
  else {
  validArray.push(ele)
  }
})

//console.log(expiredArray)
//console.log(validArray)

const totalSum = data.reduce((sum,a)=>sum+a.value,0);
let totalSumR = totalSum.toFixed(2);
//console.log('Total Coupons Value', totalSum)

const expiredSum = expiredArray.reduce((sum,a)=>sum+a.value,0);
let expiredSumR = expiredSum.toFixed(2);
//console.log('Expired Coupons Value', expiredSum)

const validSum = validArray.reduce((sum,a)=>sum+a.value,0);
let validSumR = validSum.toFixed(2);
//console.log('Valid Coupons Value', validSum)

const totalAvg =(totalSum/data.length);
let totalAvgR = totalAvg.toFixed(2);
//console.log(totalAvg)

//expiredAVG
const expiredAvg =(expiredSum/expiredArray.length);
let expiredAvgR = expiredAvg.toFixed(2);
//validAVG
const validAvg =(validSum/validArray.length);
let validAvgR = validAvg.toFixed(2);


return (
  <div>
  <h4 allignment = 'center'> Discussion of Coupon Value and General Statistics </h4>
  <div className='container'>
      <p>
        In general, coupons range between a few cents to $10. Once in a blue moon, there are extraordinary coupons worth considerably more than this.<br />
        <br />    
        Total Savings from All Coupons: ${totalSumR} <br />
        Average Savings from All Coupons: ${totalAvgR} <br />
        <br />
        Potential Savings from Valid Coupons: ${validSumR} <br />
        Average Savings from Valid Coupons: ${validAvgR} <br /> 
        <br />
        Missed Savings from Expired Coupons: ${expiredSumR} <br />
        Average Missed Savings from Expired Coupons: ${expiredAvgR} <br />
      </p>
  </div>
  </div>
	)

}

export default CouponCalc;