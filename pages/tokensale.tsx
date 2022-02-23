import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
import Header from "./Header";
import Footer from "./Footer";
import Agreement from "../components/StepModals/Agreement";

const options: Highcharts.Options = {
  title: {
    text: "Token Distribution",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
  },
  series: [
    {
      name: "Tokenomics",
      colorByPoint: true,
      type: "pie",
      data: [
        {
          name: "Liquidity",
          y: 2,
        },
        {
          name: "SEED ROUND",
          y: 10,
        },
        {
          name: "Private Sale",
          y: 10,
        },
        {
          name: "Public Sale",
          y: 1.5,
        },
        {
          name: "Team",
          y: 18,
        },
        {
          name: "Marketing",
          y: 7.5,
        },
        {
          name: "Ecosystem",
          y: 25,
        },
        {
          name: "Advisors",
          y: 10,
        },
        {
          name: "Treasury and Reserve",
          y: 6,
        },
        {
          name: "Staking",
          y: 10,
        },
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

// "rgb(10, 3, 255)",
// "rgb(191, 191, 243)",
// "rgb(192, 208, 242)",
// "rgb(161, 198, 250)",
// "rgb(101, 173, 255)",
// "rgb(44, 142, 249)",
// "rgb(69, 167, 255)",
// "rgb(1,121,243)",
// "rgb(26,146,255)",
// "rgb(1,121,243)",
// "rgba(1,121,243,0.1)",
// "rgba(1,121,243,0.2)",

// function StageData(props) {
//   return (
//     <div className="">
//       <div className="w-fit text-sm font-normal bg-slate-300 rounded pr-2 pl-2 pt-2 pb-2">{props.date}</div>
//       <div className="rounded  box-border w-64 border-1 border-slate-300 text-left mb-2">
//         <div className="font-bold text-xl ml-2  mt-2">{props.round}</div>
//         <div>
//           <span className="font-medium ml-2">Price:</span> {props.price}
//         </div>
//         <div>
//           <span className="font-medium ml-2">Tokens:</span> {props.tokens}
//         </div>
//       </div>
//     </div>
//   );
// }

function TokenSale() {
  return (
  <div>
    <Header/>
 
{/* <!-- Start Page --> */}
<div id="about-page" className="page">
    <div className="container">
        <div className="row">
               <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="heading">
                    <h2 className="titlenew titlenew3"> 
                       SERA is the first enterprise resource planning application "ERP"
that uses a public blockchain.
                    </h2>
                </div>
            </div>
             
    </div>
</div>
{/* <!-- End Page -->
<!-- Start Page --> */}
<div id="about-page" className="page">
    <div className="container">
        <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="heading heading2">
                      <h2 className="title"> 
                   Private Sale Round One  
                    </h2>
                    <div className="about-image Privatepage">
                    Private Sale Price: $0.12
                </div>
                
                    <h2 className="title"> 
                     Just One simple step to buy!
                    </h2>
                </div>
                 
                </div>
               <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 Presale_side">
                    <div className="heading heading2">
                    <h2 className="titlenew"> 
                    Participate Now in <span className="titlespan">Presale</span>
                    </h2>  
                </div>

            <div className="text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <p>
                Participate in one of the best chances, Just one round at the cheapest price!
                    </p>
                </div>
                <div className="about-image buycontainer">
    
 <h2 className="titlenew2">Please check to Agreement before you proceed.</h2>
<p className="titlespanbuy"><input id="terms" type="checkbox" name="terms" value="on" /><a href="presale.pdf" className="buylink" target="_blank"> I Agree to Sera Terms And Conditions</a>
 <p className="titlespanbuynot">You Must Agree to Sera Terms And Conditions</p>
  
 
<div className="wrap">
  <a type="button" id="trem_check"  className="btn btn-light trem_check">Buy SERA Now</a>
  </div>
  </p>
  </div>
  <div className="heading">
    <h2 className="titlenew">
      We will be live in
    </h2>
    <h2 className="titlespanbuynot2"  >We live Now !</h2>
    <ul className="countdown">
      <li> <span className="days">00</span>
      <p className="days_ref">days</p>
      </li> 
      <li className="seperator">. </li>
      <li> <span className="hours">00</span>
      <p className="hours_ref">hours</p>
      </li>
      <li className="seperator">:</li>
      <li> <span className="minutes">00</span>
      <p className="minutes_ref">minutes</p>
      </li>
      <li className="seperator">:</li>
      <li> <span className="seconds">00</span>
      <p className="seconds_ref">seconds</p>
      </li>
      </ul>
      </div>
      </div>
      </div>
      </div>
    </div>
</div>
{/* <!-- End Section --> */}
{/* <!-- Footer --> */}
<Footer/>
</div>
  );
}

export default TokenSale;
