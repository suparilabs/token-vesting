import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Countdown from "react-countdown";
import Header from "./Header";
import Footer from "./Footer";
import Agreement from "../components/StepModals/Agreement";

function Dashboard() {
  return (
    <div>
      <Header/>
      <div className="pt-6">
        {/* box for presale */}
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1 mt-4 mb-44">
            <div className="col-span-2">
              <div className="box-border p-44 border-2 bg-blue-600">
                <div className="text-center relative bottom-40 text-white text-2xl font-bold">PreSale Dashboard</div>
              <div className="box-border mb-20 w-90 py-32 px-16 rounded-2xl border-2 shadow-lg shadow-amber-900 bg-white">
                {/* Buttons for start stop */}
                <button className="rounded-md relative bottom-20 bg-blue-600 text-white text-lg w-24 h-12 border-1 hover:bg-blue-800">START</button>
                <button className="rounded-md relative bottom-20 bg-red-600 text-white text-lg w-24 h-12 border-1 hover:bg-red-800">STOP</button>
                {/* FORM */}
                <form>
                <table className="table-auto">
                  <tbody>
                  <tr>
                    <td>
                      <label className="block px-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md text-slate-700">
                          Available on tge
                        </span>
                        <input type="text" name="available" className="mt-1 px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full sm:text-sm focus:ring-1" placeholder="Available on tge" />
                      </label>
                    </td>
                    <td>
                      <label className="block px-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md text-slate-700">
                          Cliff period
                        </span>
                        <input type="text" name="cliff" className="mt-1 px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full sm:text-sm focus:ring-1" placeholder="Cliff period" />
                      </label> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="block px-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md text-slate-700">
                          Vesting period
                        </span>
                        <input type="text" name="vesting" className="mt-1 px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full sm:text-sm focus:ring-1" placeholder="Vesting period" />
                      </label>
                    </td>
                    <td>
                      <label className="block px-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md text-slate-700">
                          Duration
                        </span>
                        <input type="text" name="duration" className="mt-1 px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full sm:text-sm focus:ring-1" placeholder="Duration" />
                      </label> 
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} rowSpan={2}>
                    <div className="row justify-content-center mt-4">
                      <div className="form-group files"><label className="my-auto">Upload private sale or seed round manually </label> <input id="file" type="file" className="form-control" /></div>
                    </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <button type="button" className="mt-8 float-right btn btn-primary btn-block"><small className="font-weight-bold">SEND TGE TOKENS NOW</small></button>
                </form>    
              </div>
              </div>
            </div>
          </div>
        {/* call footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
