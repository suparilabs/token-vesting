/* eslint-disable @next/next/no-img-element */
// import Image, { ImageLoader } from "next/image";

// const myLoader = ({ src, width, quality }) => {
//   return `https://seraproject.org/views/front//images/${src}?w=${width}&q=${quality || 75}`;
// };

const Footer = () => {
  return (
    <>
      {/* Footer Start from here */}
      
{/* START SECTION */}
<section className="custom-social2"  id="Socials">
    <div className="container">
        <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="heading">
                    <h2 className="title">
                        Join Sera Community
                    </h2>
                </div>
                <div className="text">

                    <p>

                    </p>
                </div>
                <ul className="social2">
                    <li>
                        <a  target="_blank"  href="https://twitter.com/Project_SERA">
                            <span>
                            <i className="bi bi-twitter"></i>
                            </span>
                            <span>
                                Twitter
                            </span>
                        </a>
                    </li>
                  
                    <li>
                        <a  target="_blank"  href="https://t.me/Sera_Project">
                            <span>
                            <i className="bi bi-telegram"></i>
                            </span>
                            <span>
                                Telegram
                            </span>
                        </a>
                    </li>
                     <li>
                        <a  target="_blank"  href="https://bit.ly/SERA_Project">
                            <span>
                            <i className="bi bi-youtube"></i>
                            </span>
                            <span>
                                Youtube
                            </span>
                        </a>
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
</section>
{/* END SECTION */}
{/* START FOOTER */}

    <footer className="footer" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12">
            <div data-aos-delay="500" data-aos="fade-right" className="text">
            </div>
          </div>
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12">
          </div>
        </div>
        <div className="row">

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="copyrights">
              <p>
              SERA Technologies Ltd. Copyright © 2021-2022. All rights reserved.
              </p>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="copyrights">
                <p>Sera is Beta group company</p>
              </div>
          </div>
        </div>
      </div>
    </footer>
  {/* END FOOTER */}
      {/* Footer closed */}
    </>
  );
};

export default Footer;
