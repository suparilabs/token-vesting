import Image from "next/image"; 
 
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
                                <td rowSpan={5}><Image src="https://seraproject.org/views/front//images/logo.png" width="100px" height="120px" alt="Logo"/></td>
                                <td><div className="box-border bg-white h-0.5 ..."></div></td>
                                <td><div className="box-border bg-white h-0.5 ..."></div></td>
                                <td><div className="box-border bg-white h-0.5 ..."></div></td>
                                <td><div className="box-border bg-white h-0.5 ..."></div></td>
                            </tr>
                            <tr>      
                                <td className="text-3xl px-4 py-4">Products</td>
                                <td className="text-3xl px-4 py-4">Documents</td>
                                <td className="text-3xl px-4 py-4">Community</td>
                                <td className="text-3xl px-4 py-4">About</td>            
                            </tr>           
                            <tr>
                                <td>Wallet</td>
                                <td>Github</td>
                                <td>Twitter</td>
                                <td>Investors</td>
                            </tr>
                            <tr>
                                <td>Token</td>
                                <td>Roadmap</td>
                                <td>Telegram</td>
                                <td>Jobs</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Privacy & Policy</td>
                                <td>Youtube</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div> 
   <div className="bg-dark text-white text-center"> 2022 Sera.org | All Rights Reserved</div>
   {/* Footer closed */}
    </>
    );
}

export default Footer;
 