/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TokenPreVesting,
  TokenPreVestingInterface,
} from "../TokenPreVesting";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Released",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Revoked",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "cliff",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "computeNextVestingScheduleIdForHolder",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "computeReleasableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "computeVestingScheduleIdForAddressAndIndex",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_slicePeriodSeconds",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_revocable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createVestingSchedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_beneficiaries",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_durations",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_slicePeriodSeconds",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "_revocables",
        type: "bool[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "createVestingSchedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "getLastVestingScheduleForHolder",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slicePeriodSeconds",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "amountTotal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "released",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
        ],
        internalType: "struct TokenPreVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getVestingIdAtIndex",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "getVestingSchedule",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slicePeriodSeconds",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "amountTotal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "released",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
        ],
        internalType: "struct TokenPreVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getVestingScheduleByAddressAndIndex",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slicePeriodSeconds",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "amountTotal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "released",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "revoked",
            type: "bool",
          },
        ],
        internalType: "struct TokenPreVesting.VestingSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVestingSchedulesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "getVestingSchedulesCountByBeneficiary",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVestingSchedulesTotalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWithdrawableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "launchTimestampset",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "vestingScheduleId",
        type: "bytes32",
      },
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cliff",
        type: "uint256",
      },
    ],
    name: "setLaunchTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "start",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620022cd380380620022cd83398101604081905262000034916200010f565b6200003f33620000bf565b600180556001600160a01b038116620000ad5760405162461bcd60e51b815260206004820152602660248201527f546f6b656e50726556657374696e673a20746f6b656e2061646472657373206960448201526573207a65726f60d01b606482015260840160405180910390fd5b6001600160a01b031660805262000141565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156200012257600080fd5b81516001600160a01b03811681146200013a57600080fd5b9392505050565b60805161215b62000172600039600081816101c901528181610815015281816112ae0152611463015261215b6000f3fe6080604052600436106101775760003560e01c80638af104da116100ca578063cf6e7fd811610079578063f51321d711610056578063f51321d7146105a4578063f7c469f0146105c4578063f9079b371461063957005b8063cf6e7fd81461053a578063ea1bb3d514610564578063f2fde38b1461058457005b80639ef346b4116100a75780639ef346b414610426578063b75c7dc614610504578063be9a65551461052457005b80638af104da146103915780638da5cb5b146103f357806390be10cc1461041157005b80635a7bb69a1161012657806366afd8ef1161010357806366afd8ef146102cc578063715018a6146102ec5780637e913dc61461030157005b80635a7bb69a146102565780635d46b8eb1461028c57806362fc451a146102ac57005b80632e1a7d4d116101545780632e1a7d4d1461020157806338f5e76f1461022157806348deb4711461024157005b8063130836171461018057806313d033c0146101a457806321df0da7146101ba57005b3661017e57005b005b34801561018c57600080fd5b506005545b6040519081526020015b60405180910390f35b3480156101b057600080fd5b5061019160035481565b3480156101c657600080fd5b507f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200161019b565b34801561020d57600080fd5b5061017e61021c366004611d8e565b610659565b34801561022d57600080fd5b5061017e61023c366004611dd1565b610843565b34801561024d57600080fd5b50600754610191565b34801561026257600080fd5b50610191610271366004611e21565b6001600160a01b031660009081526008602052604090205490565b34801561029857600080fd5b5061017e6102a7366004611e3c565b610d5e565b3480156102b857600080fd5b5061017e6102c7366004611eaa565b610e39565b3480156102d857600080fd5b5061017e6102e7366004611e3c565b61100c565b3480156102f857600080fd5b5061017e6112e3565b34801561030d57600080fd5b5061032161031c366004611e21565b611349565b60405161019b91906000610100820190508251151582526001600160a01b036020840151166020830152604083015160408301526060830151606083015260808301511515608083015260a083015160a083015260c083015160c083015260e0830151151560e083015292915050565b34801561039d57600080fd5b506101916103ac366004611f9b565b6040516bffffffffffffffffffffffff19606084901b1660208201526034810182905260009060540160405160208183030381529060405280519060200120905092915050565b3480156103ff57600080fd5b506000546001600160a01b03166101e9565b34801561041d57600080fd5b5061019161143c565b34801561043257600080fd5b50610321610441366004611d8e565b6040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101919091525060009081526006602081815260409283902083516101008082018652825460ff808216151584529190046001600160a01b031693820193909352600182015494810194909452600281015460608501526003810154821615156080850152600481015460a0850152600581015460c08501529091015416151560e082015290565b34801561051057600080fd5b5061017e61051f366004611d8e565b6114e8565b34801561053057600080fd5b5061019160045481565b34801561054657600080fd5b506002546105549060ff1681565b604051901515815260200161019b565b34801561057057600080fd5b5061019161057f366004611d8e565b6116e2565b34801561059057600080fd5b5061017e61059f366004611e21565b6117b4565b3480156105b057600080fd5b506103216105bf366004611f9b565b611896565b3480156105d057600080fd5b506101916105df366004611e21565b6001600160a01b0381166000908152600860209081526040808320548151606086901b6bffffffffffffffffffffffff19168185015260348082019290925282518082039092018252605401909152805191012092915050565b34801561064557600080fd5b50610191610654366004611d8e565b611924565b600260015414156106b15760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026001556000546001600160a01b031633146107105760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b80306001600160a01b03166390be10cc6040518163ffffffff1660e01b815260040160206040518083038186803b15801561074a57600080fd5b505afa15801561075e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107829190611fc5565b10156107f65760405162461bcd60e51b815260206004820152602e60248201527f546f6b656e50726556657374696e673a206e6f7420656e6f756768207769746860448201527f6472617761626c652066756e647300000000000000000000000000000000000060648201526084016106a8565b61083c61080b6000546001600160a01b031690565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690836119ae565b5060018055565b60025460ff16156108a75760405162461bcd60e51b815260206004820152602860248201527f546f6b656e50726556657374696e673a206c61756e63682074696d657374616d6044820152671c081a5cc81cd95d60c21b60648201526084016106a8565b6000546001600160a01b031633146109015760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b80306001600160a01b03166390be10cc6040518163ffffffff1660e01b815260040160206040518083038186803b15801561093b57600080fd5b505afa15801561094f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109739190611fc5565b1015610a0d5760405162461bcd60e51b815260206004820152604d60248201527f546f6b656e50726556657374696e673a2063616e6e6f7420637265617465207660448201527f657374696e67207363686564756c652062656361757365206e6f74207375666660648201527f696369656e7420746f6b656e7300000000000000000000000000000000000000608482015260a4016106a8565b60008411610a835760405162461bcd60e51b815260206004820152602560248201527f546f6b656e50726556657374696e673a206475726174696f6e206d757374206260448201527f65203e203000000000000000000000000000000000000000000000000000000060648201526084016106a8565b60008111610adf5760405162461bcd60e51b815260206004820152602360248201527f546f6b656e50726556657374696e673a20616d6f756e74206d7573742062652060448201526203e20360ec1b60648201526084016106a8565b6001831015610b565760405162461bcd60e51b815260206004820152603060248201527f546f6b656e50726556657374696e673a20736c696365506572696f645365636f60448201527f6e6473206d757374206265203e3d20310000000000000000000000000000000060648201526084016106a8565b604051630f7c469f60e41b81526001600160a01b0386166004820152600090309063f7c469f09060240160206040518083038186803b158015610b9857600080fd5b505afa158015610bac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd09190611fc5565b60408051610100808201835260018083526001600160a01b038b811660208086019182528587018d8152606087018d81528c15156080890190815260a089018d8152600060c08b0181815260e08c018281528e83526006978890529c9091209a518b5497517fffffffffffffffffffffff0000000000000000000000000000000000000000009098169015157fffffffffffffffffffffff0000000000000000000000000000000000000000ff161796909716909802949094178855905194870194909455925160028601555160038501805460ff19908116921515929092179055925160048501555160058401559251919092018054909216901515179055600754909150610ce09083611a1a565b6007556005805460018181019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018290556001600160a01b03871660009081526008602052604090205490610d39908290611a1a565b6001600160a01b03909716600090815260086020526040902096909655505050505050565b6000546001600160a01b03163314610db85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b60025460ff1615610e165760405162461bcd60e51b815260206004820152602260248201527f546f6b656e50726556657374696e673a20616c7265616479206c61756e636865604482015261642160f01b60648201526084016106a8565b6002805460ff191660011790556004829055610e328282611a1a565b6003555050565b60025460ff1615610e9d5760405162461bcd60e51b815260206004820152602860248201527f546f6b656e50726556657374696e673a206c61756e63682074696d657374616d6044820152671c081a5cc81cd95d60c21b60648201526084016106a8565b6000546001600160a01b03163314610ef75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b8887148015610f0557508685145b8015610f1057508483145b8015610f1b57508281145b610f415760405162461bcd60e51b815260206004820152600060248201526044016106a8565b60005b89811015610fff57610fed8b8b83818110610f6157610f61611fde565b9050602002016020810190610f769190611e21565b8a8a84818110610f8857610f88611fde565b90506020020135898985818110610fa157610fa1611fde565b90506020020135888886818110610fba57610fba611fde565b9050602002016020810190610fcf9190611ff4565b878787818110610fe157610fe1611fde565b90506020020135610843565b80610ff781612027565b915050610f44565b5050505050505050505050565b6002600154141561105f5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106a8565b60026001908155600083815260066020526040902054839160ff90911615151461108857600080fd5b6000818152600660208190526040909120015460ff16156110a857600080fd5b6000838152600660205260408120805491549091336001600160a01b036101009092048216811492919091161481806110de5750805b6111765760405162461bcd60e51b815260206004820152604560248201527f546f6b656e50726556657374696e673a206f6e6c792062656e6566696369617260448201527f7920616e64206f776e65722063616e2072656c6561736520766573746564207460648201527f6f6b656e73000000000000000000000000000000000000000000000000000000608482015260a4016106a8565b604080516101008082018352855460ff808216151584529190046001600160a01b03166020830152600186015492820192909252600285015460608201526003850154821615156080820152600485015460a0820152600585015460c08201526006850154909116151560e08201526000906111f190611a26565b90508581101561126b576040805162461bcd60e51b81526020600482015260248101919091527f546f6b656e50726556657374696e673a2063616e6e6f742072656c656173652060448201527f746f6b656e732c206e6f7420656e6f7567682076657374656420746f6b656e7360648201526084016106a8565b600584015461127a9087611a1a565b600585015583546007546101009091046001600160a01b03169061129e9088611b12565b6007556112d56001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001682896119ae565b505060018055505050505050565b6000546001600160a01b0316331461133d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b6113476000611b1e565b565b604080516101008101825260008082526020808301829052828401829052606083018290526080830182905260a0830182905260c0830182905260e083018290526001600160a01b0385168252600890529182205490916006916113b59085906103ac90600190612042565b8152602080820192909252604090810160002081516101008082018452825460ff808216151584529190046001600160a01b031694820194909452600182015492810192909252600281015460608301526003810154831615156080830152600481015460a0830152600581015460c083015260060154909116151560e082015292915050565b6007546040516370a0823160e01b81523060048201526000916114e3916001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906370a082319060240160206040518083038186803b1580156114a557600080fd5b505afa1580156114b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114dd9190611fc5565b90611b12565b905090565b6000546001600160a01b031633146115425760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b600081815260066020526040902054819060ff16151560011461156457600080fd5b6000818152600660208190526040909120015460ff161561158457600080fd5b6000828152600660205260409020600381015460ff1615156001146116115760405162461bcd60e51b815260206004820152602960248201527f546f6b656e50726556657374696e673a2076657374696e67206973206e6f742060448201527f7265766f6361626c65000000000000000000000000000000000000000000000060648201526084016106a8565b604080516101008082018352835460ff808216151584529190046001600160a01b03166020830152600184015492820192909252600283015460608201526003830154821615156080820152600483015460a0820152600583015460c08201526006830154909116151560e082015260009061168c90611a26565b9050801561169e5761169e848261100c565b60006116bb83600501548460040154611b1290919063ffffffff16565b6007549091506116cb9082611b12565b6007555050600601805460ff191660011790555050565b600081815260066020526040812054829060ff16151560011461170457600080fd5b6000818152600660208190526040909120015460ff161561172457600080fd5b60008381526006602081815260409283902083516101008082018652825460ff808216151584529190046001600160a01b031693820193909352600182015494810194909452600281015460608501526003810154821615156080850152600481015460a0850152600581015460c08501529182015416151560e0830152906117ac90611a26565b949350505050565b6000546001600160a01b0316331461180e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b6001600160a01b03811661188a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016106a8565b61189381611b1e565b50565b60408051610100810182526000808252602080830182905282840182905260608084018390526080840183905260a0840183905260c0840183905260e084019290925283519186901b6bffffffffffffffffffffffff1916828201526034808301869052845180840390910181526054909201909352805192019190912061191d90610441565b9392505050565b600061192f60055490565b82106119895760405162461bcd60e51b8152602060048201526024808201527f546f6b656e50726556657374696e673a20696e646578206f7574206f6620626f604482015263756e647360e01b60648201526084016106a8565b6005828154811061199c5761199c611fde565b90600052602060002001549050919050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b179052611a15908490611b86565b505050565b600061191d8284612059565b60025460009060ff16611a3b57506000919050565b6003544290811080611a53575060e083015115156001145b15611a615750600092915050565b6040830151600454611a7291611a1a565b8110611a8b5760c083015160a084015161191d91611b12565b6000611aa260045483611b1290919063ffffffff16565b60608501519091506000611ab68383611c6b565b90506000611ac48284611c77565b90506000611aed8860400151611ae7848b60a00151611c7790919063ffffffff16565b90611c6b565b9050611b068860c0015182611b1290919063ffffffff16565b98975050505050505050565b600061191d8284612042565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000611bdb826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611c839092919063ffffffff16565b805190915015611a155780806020019051810190611bf99190612071565b611a155760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016106a8565b600061191d828461208e565b600061191d82846120b0565b60606117ac848460008585843b611cdc5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016106a8565b600080866001600160a01b03168587604051611cf891906120ff565b60006040518083038185875af1925050503d8060008114611d35576040519150601f19603f3d011682016040523d82523d6000602084013e611d3a565b606091505b5091509150611d4a828286611d55565b979650505050505050565b60608315611d6457508161191d565b825115611d745782518084602001fd5b8160405162461bcd60e51b81526004016106a8919061211b565b600060208284031215611da057600080fd5b5035919050565b80356001600160a01b0381168114611dbe57600080fd5b919050565b801515811461189357600080fd5b600080600080600060a08688031215611de957600080fd5b611df286611da7565b945060208601359350604086013592506060860135611e1081611dc3565b949793965091946080013592915050565b600060208284031215611e3357600080fd5b61191d82611da7565b60008060408385031215611e4f57600080fd5b50508035926020909101359150565b60008083601f840112611e7057600080fd5b50813567ffffffffffffffff811115611e8857600080fd5b6020830191508360208260051b8501011115611ea357600080fd5b9250929050565b60008060008060008060008060008060a08b8d031215611ec957600080fd5b8a3567ffffffffffffffff80821115611ee157600080fd5b611eed8e838f01611e5e565b909c509a5060208d0135915080821115611f0657600080fd5b611f128e838f01611e5e565b909a50985060408d0135915080821115611f2b57600080fd5b611f378e838f01611e5e565b909850965060608d0135915080821115611f5057600080fd5b611f5c8e838f01611e5e565b909650945060808d0135915080821115611f7557600080fd5b50611f828d828e01611e5e565b915080935050809150509295989b9194979a5092959850565b60008060408385031215611fae57600080fd5b611fb783611da7565b946020939093013593505050565b600060208284031215611fd757600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561200657600080fd5b813561191d81611dc3565b634e487b7160e01b600052601160045260246000fd5b600060001982141561203b5761203b612011565b5060010190565b60008282101561205457612054612011565b500390565b6000821982111561206c5761206c612011565b500190565b60006020828403121561208357600080fd5b815161191d81611dc3565b6000826120ab57634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156120ca576120ca612011565b500290565b60005b838110156120ea5781810151838201526020016120d2565b838111156120f9576000848401525b50505050565b600082516121118184602087016120cf565b9190910192915050565b602081526000825180602084015261213a8160408501602087016120cf565b601f01601f1916919091016040019291505056fea164736f6c6343000809000a";

type TokenPreVestingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenPreVestingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenPreVesting__factory extends ContractFactory {
  constructor(...args: TokenPreVestingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TokenPreVesting";
  }

  deploy(
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenPreVesting> {
    return super.deploy(token_, overrides || {}) as Promise<TokenPreVesting>;
  }
  getDeployTransaction(
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(token_, overrides || {});
  }
  attach(address: string): TokenPreVesting {
    return super.attach(address) as TokenPreVesting;
  }
  connect(signer: Signer): TokenPreVesting__factory {
    return super.connect(signer) as TokenPreVesting__factory;
  }
  static readonly contractName: "TokenPreVesting";
  public readonly contractName: "TokenPreVesting";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenPreVestingInterface {
    return new utils.Interface(_abi) as TokenPreVestingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenPreVesting {
    return new Contract(address, _abi, signerOrProvider) as TokenPreVesting;
  }
}
