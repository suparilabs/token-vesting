import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
import Header from "./Header";
import Footer from "./Footer";

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
          y: 11,
        },
        {
          name: "Treasury and Reserve",
          y: 5,
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

function StageData(props) {
  return (
    <div className="">
      <div className="w-fit text-sm font-normal bg-slate-300 rounded pr-2 pl-2 pt-2 pb-2">{props.date}</div>
      <div className="rounded  box-border w-64 border-1 border-slate-300 text-left mb-2">
        <div className="font-bold text-xl ml-2  mt-2">{props.round}</div>
        <div>
          <span className="font-medium ml-2">Price:</span> {props.price}
        </div>
        <div>
          <span className="font-medium ml-2">Tokens:</span> {props.tokens}
        </div>
      </div>
    </div>
  );
}

function TokenSale() {
  return (
    <div>
      <Header />
      <div className="text-center pt-6">
        <div className="text-5xl pb-10 font-bold">Time for Blockchain is now </div>
        <div className="text-lg text-green-700 dark:text-green-700">
          <div className="mb-2">
            <p>SERA is the first enterprise resource planning application &quot;ERP&quot;</p>
            <p>that uses a public blockchain.A full Digital and blockchain transformation</p>
            <p> platform for businesses that enables crypto settlements in B2B transactions.</p>
          </div>
          <div className="mb-2">
            <p>SERA aims to encourage businesses to join blockchain by providing</p>
            <p>the latest ERP business application which is built on a public blockchain.</p>
          </div>
          <div className="mb-2">
            <p>SERA is built on layer 2 blockchain with the support of ZK-rollups</p>
            <p>to maximize security and data privacy.</p>
          </div>
        </div>
        {/* <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
          <div className="col-span-1 bg-slate-50">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="col-span-1 text-lg">
            <p><span className="font-semibold">Total Supply </span>  25,000,000 SERA</p>
            <p><span className="font-semibold">Liquidity  </span> 500,000(2%)</p>
            <p><span className="font-semibold">SEED ROUND </span> 2,500,000(10%)</p>
            <p><span className="font-semibold">Private Sale </span> 2,500,000(10%)</p>
            <p><span className="font-semibold">Public Sale </span> 375,000(1.5%)</p>
            <p><span className="font-semibold">Team </span> 4,500,000(18.0%)</p>
            <p><span className="font-semibold">Marketing </span> 1,875,000(7.5%)</p>
            <p><span className="font-semibold">Ecosystem </span> 6,250,000(25.0%)</p>
            <p><span className="font-semibold">Advisors </span> 2,750,000(11.0%)</p>
            <p><span className="font-semibold">Tresury and Reserve </span> 1,250,000(5.0%)</p>
            <p><span className="font-semibold">Staking </span> 2,500,000(10.0%)</p>
            
          </div>
        </div> */}
        <HighchartsReact highcharts={Highcharts} options={options} />
        {/* <div className="text-5xl pt-6 pb-8 font-bold">Presale Stages</div> */}
        {/* <div className="text-xl pb-8">
          <p>We are now in IDO stage doing presale so that we can collect the liquidity we need to pump</p>
          <p>
            it into the currency&#39;s liquidity pool, This gives it the right price, which is of course will be raise
          </p>
          <p>up and profitable for everyone who participates in this stage.</p>
        </div> */}
        {/* <div className="grid grid-cols-3 gap-6 place-items-center">
          <div>
            <StageData date="March 15, 2021" round="Round1" price="$0.10" tokens="2,000,000" />
          </div>
          <div>
            <StageData date="March 22, 2021" round="Round2" price="$0.11" tokens="3,000,000" />
          </div>
          <div>
            <StageData date="March 29, 2021" round="Round3" price="$0.12" tokens="2,400,000" />
          </div>
          <div>
            <StageData date="April 05, 2021" round="Round4" price="$0.13" tokens="1,600,0000" />
          </div>
          <div>
            <StageData date="April 12, 2021" round="Round5" price="$0.14" tokens="1,000,000" />
          </div>
          <div>
            <div className="text-xl pt-6 pb-6 font-medium mt-1">Will launch in</div>
            <span className="box-border bg-black h-13 w-70 p-4 border-4 place-items-center...">
              <Countdown className="text-3xl text-white" date={Date.now() + 5000000000} />
            </span>
          </div>
        </div> */}
        <div className="text-5xl pt-6 pb-8 font-bold mt-20">Private Sale</div>
        {/* Grid for Private Sale section */}
        <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
          <div className="col-span-1 ml-28">
            <div className="font-sans text-4xl pt-6 pb-8 font-semibold text-blue-600 ml-52 text-left">
              Participate in one of the best chances, Just one round at the cheapest price!
            </div>
          </div>
          <div className="col-span-1 mr-28">
            <div className="mt-10">
              <StageData date="Completed" round="Private Sale" price="$0.12" tokens="1,000,000" />
            </div>
            <div className="text-xl pt-6 pb-3 font-medium">Countdown is Over</div>
            <span className="box-border bg-black h-13 w-70 p-3 border-4 place-items-center...">
              <Countdown className="text-3xl text-white" date={Date.now()} />
            </span>
          </div>
        </div>
        <div className="mt-20">
          <div className="text-5xl font-sans pt-6 pb-8 font-semibold text-blue-600">Just 4 simple steps to buy!</div>
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
            <div className="col-span-2">
              <ul className="stepper box-border border-1 ..." data-mdb-stepper="stepper">
                <li className="stepper-step">
                  <div className="stepper-head">
                    <span className="stepper-head-icon"> 1 </span>
                    <span className="stepper-head-text"> Agreement </span>
                  </div>
                </li>
                <li className="stepper-step">
                  <div className="stepper-head">
                    <span className="stepper-head-icon"> 2 </span>
                    <span className="stepper-head-text"> Checkout </span>
                  </div>
                </li>
                <li className="stepper-step">
                  <div className="stepper-head">
                    <span className="stepper-head-icon"> 3 </span>
                    <span className="stepper-head-text"> Confirm </span>
                  </div>
                </li>
                <li className="stepper-step">
                  <div className="stepper-head">
                    <span className="stepper-head-icon"> 4 </span>
                    <span className="stepper-head-text"> Completed </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
            <div className="col-span-2 mt-20">
              <div className="box-border bg-slate-200 mb-20 w-90 bg-clip-padding p-4 rounded-2xl border-4 ...">
                <div className="text-5xl font-sans pt-6 pb-8 font-semibold">
                  {" "}
                  Participate Now in <span className="text-blue-600">Presale</span>
                </div>
                <div className="text-3xl font-sans pt-6 pb-8 font-light">
                  {" "}
                  Early participation is always the best chance to make <span className="font-bold">
                    over x50{" "}
                  </span>{" "}
                  easily!
                </div>
                <button
                  type="button"
                  className="inline-block px-10 py-3.5 bg-gray-200 text-gray-700 font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Buy SERA Now
                </button>
                <div className="text-xl pt-6 pb-6 font-medium mt-1">Will live in</div>
                <span className="box-border bg-black h-13 w-70 p-3 ...">
                  <Countdown className="text-2xl text-white" date={Date.now() + 5000000000} />
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {/* call footer */}
        <Footer />
      </div>
    </div>
  );
}

export default TokenSale;
