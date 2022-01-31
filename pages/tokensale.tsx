import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";

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
      <div className="w-fit text-xs bg-slate-300 rounded pr-2 pl-2 pt-2 pb-2">{props.date}</div>
      <div className="rounded box-border w-64 border-1 border-slate-300 text-left">
        <div className="font-bold text-base">{props.round}</div>
        <div><span className="font-bold">Price</span> {props.price}</div>
        <div><span className="font-bold">Tokens</span> {props.tokens}</div>
      </div>
    </div>
  );
}

function TokenSale() {
  return (
    <div>
      <div className="text-center pt-6">
        <div className="text-5xl pb-10 font-bold">The Best Generation DeFi Protocol</div>
        <div className="text-lg text-green-700 dark:text-green-700">
          <p>Stake to earn high passive income without doing anything,</p>
          <p>safe inflation at %5 annually!</p>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
          <div className="col-span-1">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="col-span-1">
            <p>Total Supply - 25,000,000 SERA</p>
            <p>Liquidity - 500,000(2%)</p>
            <p>SEED ROUND - 2,500,000(10%)</p>
            <p>Public Sale - 375,000(1.5%)</p>
          </div>
        </div>
        <div className="text-5xl pt-6 pb-8 font-bold">Presale Stages</div>
        <div className="text-xl pb-8">
          <p>We are now in IDO stage doing presale so that we can collect the liquidity we need to pump</p>
          <p>
            it into the currency&#39;s liquidity pool, This gives it the right price, which is of course will be raise
          </p>
          <p>up and profitable for everyone who participates in this stage.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 place-items-center">
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
            <div>Will launch in</div>
            <div>
              <Countdown date={Date.now() + 5000000000}>
                <div>Launched!</div>
              </Countdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenSale;
