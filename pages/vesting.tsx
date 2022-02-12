/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";
import React, { Component, useEffect, useState } from "react";
import Footer from "./Footer";
import ContainerText from "../components/ContainerText";
import Header from "./Header";
import AccountK from "../components/AccountK";
import { useEagerConnect } from "../hooks/useEagerConnect";
// const myLoader = ({ src, width, quality }) => {
//   return `https://vesting-bsc.galaxywar.io/images/${src}?w=${width}&q=${quality || 75}`;
// };

function Vesting(props): JSX.Element {
  const triedToEagerConnect = useEagerConnect();
  const items = [{
    title: "Claim IDO Tokens",
    unlocked: "23.0540000",
    claimable: "0.0000000",
    claimingDate: "2 Jan 2022",
    unlockingDate: "1 Feb 2022",
    splMessage: "Vesting Schedule: 20% TGE then daily linear for 4 months",
  },{
    title: "Claim Private Round Tokens",
    unlocked: "101.0000000",
    claimable: "10.0000000",
    claimingDate: "2 Jan 2022",
    unlockingDate: "1 Feb 2022",
    splMessage: "Vesting Schedule: 10% TGE then daily linear for 1 year",
  },
  {
    title: "Claim Seed Round Tokens",
    unlocked: "1012.0000000",
    claimable: "10.0000000",
    claimingDate: "2 Jan 2022",
    unlockingDate: "1 Feb 2022",
    splMessage: "Vesting Schedule: 5% TGE then daily linear for 1 year",
  }]

  const itemList = items.map((item, index) => {
    return (
      <ContainerText
        key={index}
        unlocked={item.unlocked}
        title_={item.title}
        claimable={item.claimable}
        splMessage={item.splMessage}
        claimingDate={item.claimingDate}
        unlockingDate={item.unlockingDate}
      />
    );
  });
  
  return (
    <>
      <Header />
      <div className="text-center">
      <div className="bg-lime-100 bg-pack-train h-screen bg-cover">
      <div className="grid grid-flow-row-dense grid-cols-2 place-items-center grid-rows-1">
      <div className="col-span-1 ml-96">
        <img src="https://seraproject.org/views/front//images/logo.png" width="100px" height="100px" alt="Logo" />
        </div>
        <div className="col-span-1 mr-96">
        <div className="py-20 px-48 flex flex-row">
          <div className="bg-yellow-500 h-5 w-2"></div>
          <div className="justify-center">
            <div className="text-white px-4">ABOUT VESTING SCHEDULE</div>
            <div className="text-white px-4">
              Daily linear vesting on a block-by-block basis.Please don’t claim too frequently as you have to pay gas
              fee every time you claim. BSC:0x552594612f935441c01c6854EDf111F343c1Ca07
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className="flex flex-row flex-wrap space justify-between px-36 mb-16">
           {/* ITEMLIST DISPLAY */}
           {itemList}
        </div>
        <div className="grid grid-cols-3 text-white px-16 py-16">
          <div className="text-3xl">FOLLOW SERA</div>
          <div className="flex flex-row space-x-10">
            <a href="">
              <svg
                className="w-6 h-6 text-blue-300 fill-current hover:text-blue-900 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="">
              <svg
                className="w-6 h-6  text-blue-400 hover:text-blue-800 fill-current "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                className="h-6 w-6 text-red-500 hover:text-red-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {" "}
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />{" "}
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            </div>
          </div>
        </div>
        </div>
      <Footer />
    </>
  );
}

export default Vesting;



