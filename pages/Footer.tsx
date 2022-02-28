/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";

// const myLoader = ({ src, width, quality }) => {
//   return `https://seraproject.org/views/front//images/${src}?w=${width}&q=${quality || 75}`;
// };

const Footer = () => {
    return (
      <>
        {/* Footer Start from here */}
        <div className="text-center box-border bg-blue-700 w-90 bg-clip-padding p-4 ...">
          <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
            <div className="col-span-2 mt-20 pb-20">
              <table className="table-auto">
                <tbody className="text-white">
                  <tr>
                    <td rowSpan={5}>
                      <img
                        src="https://seraproject.org/views/front//images/logo.png"
                        width="100px"
                        height="120px"
                        alt="Logo"
                      />
                      {/* <Image loader={myLoader as ImageLoader} src="logo.png" alt="SERA" width={100} height={120} /> */}
                    </td>
                    <td>
                      <div className="box-border bg-white h-0.5 ..."></div>
                    </td>
                    <td>
                      <div className="box-border bg-white h-0.5 ..."></div>
                    </td>
                    <td>
                      <div className="box-border bg-white h-0.5 ..."></div>
                    </td>
                    <td>
                      <div className="box-border bg-white h-0.5 ..."></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-3xl px-4 py-4">Products</td>
                    <td className="text-3xl px-4 py-4">Documents</td>
                    <td className="text-3xl px-4 py-4">Community</td>
                    <td className="text-3xl px-4 py-4">About</td>
                  </tr>
                  <tr>
                    <td>Github</td>
                    <td>
                      <a href="https://twitter.com/Project_SERA">Twitter</a>
                    </td>
                    <td>Investors</td>
                    <td>
                      <a href="https://www.linkedin.com/company/sera-project/">LinkedIn</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Token</td>
                    <td>Roadmap</td>
                    <td>
                      <a href="https://t.me/Sera_Project">Telegram</a>
                    </td>
                    <td>Jobs</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Privacy & Policy</td>
                    <td><a href="https://bit.ly/SERA_Project">Youtube</a></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-dark text-white text-center"> 2022 seraproject.org | All Rights Reserved</div>
        {/* Footer closed */}
      </>
    );
  };
  
  export default Footer;