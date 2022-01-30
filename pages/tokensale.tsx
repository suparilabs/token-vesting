import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

function TokenSale() {
  return (
    <div>
      <div className="text-center">
        <div className="text-2xl font-bold">The Best Generation DeFi Protocol</div>
        <div className="text-green">
          Stake to earn high passive income without doing anything, safe inflation at %5 annually!
        </div>
        <div className="md:flex">
          <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div>
            <p>Total Supply - 25,000,000 SERA</p>
            <p>Liquidity - 500,000(2%)</p>
            <p>SEED ROUND - 2,500,000(10%)</p>
            <p>Public Sale - 375,000(1.5%)</p>
          </div>
        </div>
        <div>
            Presale Stages
        </div>
      </div>
    </div>
  );
}

export default TokenSale;
