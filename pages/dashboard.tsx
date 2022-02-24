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

function Dashboard() {
  return (
  <div>
    <Header/>
{/* <!-- Section --> */} 

<div id="about-page" className="page">
    <div className="container">
        <div className="row">
            <div className="text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
           <div className="container card-0 justify-content-center ">
    <div className="card-body px-sm-4 px-0">
        <div className="row justify-content-center mb-5">
            <div className="col-md-10 col">
                <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> PreSale Dashboard</h3>
                <p className="mt-md-4 ml-md-0 ml-2 text-center text-sm-left"> Send Sera PreSale Setting.</p>
            </div>
        </div>
        <div className="row justify-content-center round">
            <div className="col-lg-10 col-md-12 ">
                	 <form className="sign-up-form form-1 fadeInUp wow" id="myForm"  method="post" action="#"  encType="multipart/form-data" data-wow-duration="2s">
				
                <div className="card shadow-lg card-1">
                    <div className="row justify-content-end mb-5">
                                    <div className="col-lg-12 col-auto "><button type="button" className="btn btn-primary btn-block"><small className="font-weight-bold">Start</small></button> 
                                    <button type="button" className="btn btn-danger btn-block"><small className="font-weight-bold">Stop</small></button>
                                    </div>
                                     
                                </div>
                    <div className="card-body inner-card">
                      <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Available on tge
                        <span className="text-danger"> *</span></label> <input type="text" id="availableontge" name="availableontge" placeholder="Available on tge"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Cliff period<span className="text-danger"> *</span></label> 
                        <input type="text" id="Cliffperiod" name="Cliffperiod" placeholder="Cliff period" /> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Vesting period<span className="text-danger"> *</span></label>
                        <input type="text" id="Vestingperiod" name="Vestingperiod" placeholder="Vesting period" /> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Duration<span className="text-danger"> *</span></label> 
                        <input type="text" id="Duration" name="Duration" placeholder="Duration" /> </div>
                    </div>
                         <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files"><label className="my-auto">Upload private sale or seed round manually </label> <input id="file" type="file" className="form-control" /></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                              
                                <div className="row justify-content-end mb-5">
                                    <div className="col-lg-4 col-auto "><button type="button" className="btn btn-primary btn-block"><small className="font-weight-bold">Send tge tokens now</small></button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</div>
{/* <!-- Footer --> */}
<Footer/>
</div>
  );
}

export default Dashboard;
