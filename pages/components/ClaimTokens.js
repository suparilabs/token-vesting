import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ethers}  from 'ethers';
import { useState } from 'react';
import Token from '../../artifacts/contracts/Token.sol/Token.json';

const tokenAddress = "0xd4e01531ed88E4099b1bFAE0116Df77cE2178542"
const PrivateSaleAddress = "0x0Bd94b768eaaF1763aE58228C79cA511EFBeB377";

//ETHERS - no use
function ClaimTokens () {
  const [tokenData, setTokenData] = useState({});
  const [amount, setAmount] = useState();
  const [userAccountId, setUserAccountId] = useState();

  React.useEffect( async () => {
    if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const signer = provider.getSigner();
      return provider;
    }
  }, []);

  // async function _initializeContract(init) {
  // const tokenContract = new ethers.Contract(tokenAddress, Token, init);
  // const PrivateSale = new ethers.Contract(PrivateSaleAddress, PrivateSale, init);
  // return PrivateSale;
  // }
}

export default ClaimTokens;

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
