import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
import Header from "./Header";
import Footer from "./Footer";
import Agreement from "../components/StepModals/Agreement";

const options: Highcharts.Options = {
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 160,
            depth: 45
        }
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
        <div className="text-3xl pb-10 font-bold">SERA is the first enterprise resource planning application "ERP" that uses public blockchain.</div>
        
        <div className="text-3xl pb-2 font-bold mt-1 text-blue-700">PRIVATE SALE ROUND ONE</div>
        <button className="rounded-lg bg-stone-100 text-black text-lg w-80 h-14 border-1">Private Sale Price: $0.12</button>
        <div className="text-3xl pt-3 font-bold mt-1 text-blue-700">JUST ONE SIMPLE STEP TO BUY!</div>
        {/* box for presale */}
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1 mt-4">
            <div className="col-span-2">
              <div className="box-border bg-stone-100 mb-20 w-90 p-4 rounded-2xl border-1 ...">
                <div className="text-3xl font-sans pt-6 pb-8 font-semibold">
                  {" "}
                  Participate Now in <span className="text-blue-700">Presale</span>
                </div>
                <div className="text-lg"> Participate in one of the best chances, Just one round at the cheapest price!</div>
                <div className="text-lg font-semibold mt-4 mb-4"> Please check to Agreement before you proceed.</div>
                <input type="checkbox" className="checked:bg-blue-500 ..."/> I Agree to Sera Terms and Conditions
                <div className="mt-3">
                <button className="rounded-full bg-blue-700 text-white text-lg w-48 h-12 border-1 hover:bg-green-400">Buy Sera Now</button>
                </div>
                <div className="text-3xl font-bold mt-3 mb-3 text-green-700">We Live Now!</div>
                
                <Countdown className="text-5xl font-semibold text-black" date={Date.now() + 5000000000} />
                <div className="text-zinc-500">
                    <span className="ml-4">days</span>
                    <span className="ml-4">hours</span>
                    <span className="ml-4">minutes</span>
                    <span className="ml-4">seconds</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-blue-700">Token Distribution</div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        {/* call footer */}
        <Footer />
      </div>
    </div>
  );
}

export default TokenSale;
