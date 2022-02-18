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
                  <td colSpan={8} className="text-5xl font-semibold">
                   JOIN SERA COMMUNITY
                    {/* <Image loader={myLoader as ImageLoader} src="logo.png" alt="SERA" width={100} height={120} /> */}
                  </td>
                  
                </tr>
                <tr>
                  <td >
                    <svg className="h-8 w-8 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                  </td>
                  <td className="text-3xl px-4 py-4 hover:text-white"><a href="https://twitter.com/Project_SERA">Twitter</a></td>
                  <td>
                  <svg className="h-8 w-8 text-white ml-10"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
                  </td>
                  <td className="text-3xl px-4 py-4"><a href="https://t.me/Sera_Project">Telegram</a></td>
                  <td>
                  <svg className="h-8 w-8 text-white ml-10"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                  </td>
                  <td className="text-3xl px-4 py-4"><a href="https://bit.ly/SERA_Project">Youtube</a></td>
                  <td>
                  <svg className="h-8 w-8 text-white ml-10"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                  </td>
                  <td className="text-3xl px-4 py-4"><a href="https://www.linkedin.com/company/sera-project/">LinkedIn</a></td>
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
