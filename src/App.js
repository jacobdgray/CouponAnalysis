import logo from './logo.svg';
import './App.css';
import ValueOverTime from './charts/valueOverTime'
import CouponsPerState from './charts/couponsPerState'
import CouponsPerDepartment from './charts/couponsPerDepartment'
import CouponSavingsDist from "./charts/couponsSavingsDist"
import CouponCalc from "./charts/couponCalc"
import CouponsPerStore from './charts/couponsPerStore'
import SavingsPerStore from './charts/savingsPerStore'
import SavingsPerDepartment from './charts/savingsPerDepartment'
import CouponCashValue from './charts/couponCashValue'

function App() {
  return (
    <div className="App">
      <div className='row'>
        <ValueOverTime height={400} width={700}/>
        <CouponSavingsDist />
        <CouponCalc height={400} width={700}/>
        <CouponsPerState height={400} width={700}/>
        <CouponsPerDepartment height={400} width={700}/>
        <SavingsPerDepartment height={400} width={700}/>
        <CouponsPerStore height={400} width={700}/>
        <SavingsPerStore height={400} width={700}/>
        <CouponCashValue height={400} width={700}/>
        
      </div>
    </div>
  );
}

export default App;
