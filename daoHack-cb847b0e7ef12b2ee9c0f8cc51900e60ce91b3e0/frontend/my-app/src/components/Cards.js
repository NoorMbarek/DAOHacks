import React,{ useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";


async function CreateProposal(recipient,flowRate){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

  const signer = provider.getSigner();
  //const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
      // chainId: "42",//Number(chainId),
      networkName: "kovan",

      provider: provider
  });

  const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
  const ETHx = "0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1"

  try {
      const createFlowOperation = sf.cfaV1.createFlow({
          receiver: recipient,
          flowRate: flowRate,
          superToken: ETHx
          // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      console.log(
          `Congrats - you've just created a money stream!
  View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
  Network: Kovan
  Super Token: DAIx
  Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
  Receiver: ${recipient},
  FlowRate: ${flowRate}
  `
      );
      const StreamFundAdress = "0xB5458B55989aC4221415DbFC6017798086fC9Eb4";
  const ABI = [
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "_name",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_symbol",
                  "type": "string"
              },
              {
                  "internalType": "contract ISuperfluid",
                  "name": "host",
                  "type": "address"
              },
              {
                  "internalType": "contract IConstantFlowAgreementV1",
                  "name": "cfa",
                  "type": "address"
              },
              {
                  "internalType": "contract ISuperToken",
                  "name": "acceptedToken",
                  "type": "address"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "approved",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "ApprovalForAll",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "burnNFT",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "int96",
                  "name": "flowRate",
                  "type": "int96"
              }
          ],
          "name": "editNFT",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "receiver",
                  "type": "address"
              },
              {
                  "internalType": "int96",
                  "name": "flowRate",
                  "type": "int96"
              }
          ],
          "name": "issueNFT",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId1",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId2",
                  "type": "uint256"
              }
          ],
          "name": "mergeStreams",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "internalType": "address",
                  "name": "receiver",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "int96",
                  "name": "flowRate",
                  "type": "int96"
              }
          ],
          "name": "NFTIssued",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "_data",
                  "type": "bytes"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "int96",
                  "name": "newTokenFlowRate",
                  "type": "int96"
              }
          ],
          "name": "splitStream",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "_acceptedToken",
          "outputs": [
              {
                  "internalType": "contract ISuperToken",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "cfaV1",
          "outputs": [
              {
                  "internalType": "contract ISuperfluid",
                  "name": "host",
                  "type": "address"
              },
              {
                  "internalType": "contract IConstantFlowAgreementV1",
                  "name": "cfa",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "flowRates",
          "outputs": [
              {
                  "internalType": "int96",
                  "name": "",
                  "type": "int96"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "getApproved",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              }
          ],
          "name": "isApprovedForAll",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "name",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "nextId",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "ownerOf",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
              }
          ],
          "name": "supportsInterface",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "symbol",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "tokenURI",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ];
  const ProjectToFundAdress =recipient;
  
  const contract = new ethers.Contract(StreamFundAdress,ABI,signer)
  

  const tx = await contract.issueNFT(ProjectToFundAdress,flowRate);
  await tx.wait();
  
  } catch (error) {
      console.log(
          "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error.message);
  }
}
async function createNewFlow(recipient, flowRate) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

  const signer = provider.getSigner();
  console.log(signer)
  //const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
      // chainId: "42",//Number(chainId),
      networkName: "kovan",

      provider: provider
  });

  const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
  const ETHx = "0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1"

  try {
      const createFlowOperation = sf.cfaV1.createFlow({
          receiver: recipient,
          flowRate: flowRate,
          superToken: ETHx
          // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      console.log(
          `Congrats - you've just created a money stream!
  View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
  Network: Kovan
  Super Token: DAIx
  Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
  Receiver: ${recipient},
  FlowRate: ${flowRate}
  `
      );
  } catch (error) {
      console.log(
          "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error.message);
  }
}
// async function issueNFT(){
//   const StreamFundAdress = "0xB5458B55989aC4221415DbFC6017798086fC9Eb4";
//   const ABI = [
//       {
//           "inputs": [
//               {
//                   "internalType": "string",
//                   "name": "_name",
//                   "type": "string"
//               },
//               {
//                   "internalType": "string",
//                   "name": "_symbol",
//                   "type": "string"
//               },
//               {
//                   "internalType": "contract ISuperfluid",
//                   "name": "host",
//                   "type": "address"
//               },
//               {
//                   "internalType": "contract IConstantFlowAgreementV1",
//                   "name": "cfa",
//                   "type": "address"
//               },
//               {
//                   "internalType": "contract ISuperToken",
//                   "name": "acceptedToken",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "nonpayable",
//           "type": "constructor"
//       },
//       {
//           "anonymous": false,
//           "inputs": [
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "owner",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "approved",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "Approval",
//           "type": "event"
//       },
//       {
//           "anonymous": false,
//           "inputs": [
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "owner",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "operator",
//                   "type": "address"
//               },
//               {
//                   "indexed": false,
//                   "internalType": "bool",
//                   "name": "approved",
//                   "type": "bool"
//               }
//           ],
//           "name": "ApprovalForAll",
//           "type": "event"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "to",
//                   "type": "address"
//               },
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "approve",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "burnNFT",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               },
//               {
//                   "internalType": "int96",
//                   "name": "flowRate",
//                   "type": "int96"
//               }
//           ],
//           "name": "editNFT",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "receiver",
//                   "type": "address"
//               },
//               {
//                   "internalType": "int96",
//                   "name": "flowRate",
//                   "type": "int96"
//               }
//           ],
//           "name": "issueNFT",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId1",
//                   "type": "uint256"
//               },
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId2",
//                   "type": "uint256"
//               }
//           ],
//           "name": "mergeStreams",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "anonymous": false,
//           "inputs": [
//               {
//                   "indexed": false,
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               },
//               {
//                   "indexed": false,
//                   "internalType": "address",
//                   "name": "receiver",
//                   "type": "address"
//               },
//               {
//                   "indexed": false,
//                   "internalType": "int96",
//                   "name": "flowRate",
//                   "type": "int96"
//               }
//           ],
//           "name": "NFTIssued",
//           "type": "event"
//       },
//       {
//           "anonymous": false,
//           "inputs": [
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "previousOwner",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "newOwner",
//                   "type": "address"
//               }
//           ],
//           "name": "OwnershipTransferred",
//           "type": "event"
//       },
//       {
//           "inputs": [],
//           "name": "renounceOwnership",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "from",
//                   "type": "address"
//               },
//               {
//                   "internalType": "address",
//                   "name": "to",
//                   "type": "address"
//               },
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "safeTransferFrom",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "from",
//                   "type": "address"
//               },
//               {
//                   "internalType": "address",
//                   "name": "to",
//                   "type": "address"
//               },
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               },
//               {
//                   "internalType": "bytes",
//                   "name": "_data",
//                   "type": "bytes"
//               }
//           ],
//           "name": "safeTransferFrom",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "operator",
//                   "type": "address"
//               },
//               {
//                   "internalType": "bool",
//                   "name": "approved",
//                   "type": "bool"
//               }
//           ],
//           "name": "setApprovalForAll",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               },
//               {
//                   "internalType": "int96",
//                   "name": "newTokenFlowRate",
//                   "type": "int96"
//               }
//           ],
//           "name": "splitStream",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "anonymous": false,
//           "inputs": [
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "from",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "address",
//                   "name": "to",
//                   "type": "address"
//               },
//               {
//                   "indexed": true,
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "Transfer",
//           "type": "event"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "from",
//                   "type": "address"
//               },
//               {
//                   "internalType": "address",
//                   "name": "to",
//                   "type": "address"
//               },
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "transferFrom",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "newOwner",
//                   "type": "address"
//               }
//           ],
//           "name": "transferOwnership",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "_acceptedToken",
//           "outputs": [
//               {
//                   "internalType": "contract ISuperToken",
//                   "name": "",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "owner",
//                   "type": "address"
//               }
//           ],
//           "name": "balanceOf",
//           "outputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "",
//                   "type": "uint256"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "cfaV1",
//           "outputs": [
//               {
//                   "internalType": "contract ISuperfluid",
//                   "name": "host",
//                   "type": "address"
//               },
//               {
//                   "internalType": "contract IConstantFlowAgreementV1",
//                   "name": "cfa",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "",
//                   "type": "uint256"
//               }
//           ],
//           "name": "flowRates",
//           "outputs": [
//               {
//                   "internalType": "int96",
//                   "name": "",
//                   "type": "int96"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "getApproved",
//           "outputs": [
//               {
//                   "internalType": "address",
//                   "name": "",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "address",
//                   "name": "owner",
//                   "type": "address"
//               },
//               {
//                   "internalType": "address",
//                   "name": "operator",
//                   "type": "address"
//               }
//           ],
//           "name": "isApprovedForAll",
//           "outputs": [
//               {
//                   "internalType": "bool",
//                   "name": "",
//                   "type": "bool"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "name",
//           "outputs": [
//               {
//                   "internalType": "string",
//                   "name": "",
//                   "type": "string"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "nextId",
//           "outputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "",
//                   "type": "uint256"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "owner",
//           "outputs": [
//               {
//                   "internalType": "address",
//                   "name": "",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "ownerOf",
//           "outputs": [
//               {
//                   "internalType": "address",
//                   "name": "",
//                   "type": "address"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "bytes4",
//                   "name": "interfaceId",
//                   "type": "bytes4"
//               }
//           ],
//           "name": "supportsInterface",
//           "outputs": [
//               {
//                   "internalType": "bool",
//                   "name": "",
//                   "type": "bool"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [],
//           "name": "symbol",
//           "outputs": [
//               {
//                   "internalType": "string",
//                   "name": "",
//                   "type": "string"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       },
//       {
//           "inputs": [
//               {
//                   "internalType": "uint256",
//                   "name": "tokenId",
//                   "type": "uint256"
//               }
//           ],
//           "name": "tokenURI",
//           "outputs": [
//               {
//                   "internalType": "string",
//                   "name": "",
//                   "type": "string"
//               }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//       }
//   ];
//   const ProjectToFundAdress =recipient;
//   const flowRate = flowRate;
  
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(StreamFundAdress,ABI,signer)
  

//   const tx = await contract.issueNFT(ProjectToFundAdress,flowRate);
//   await tx.wait();
  
// }




function CardsContainer(props) {

  return (<div>
    <div className='cards'>
      <h1>Check out these EPIC Projects!</h1>
      <div className='card-columns'>
        <div className='cards__wrapper'>

          <ul className='cards__items'>
            {props.data.map((x) => (
              <CardItem
                src={"https://" + x.cid + ".ipfs.dweb.link/Image.png" }
                title={x.title}
                text={x.description}
                adress={x.walletAdress}
                label='cute'
                path="/show_proj/"
                id={x.walletAdress}
                requestProposal={()=>{CreateProposal("0xB5458B55989aC4221415DbFC6017798086fC9Eb4",100)}}
              />
            ))}

          </ul>

        </div>
      </div>
    </div>

  </div>)
}

function Cards() {
  const [data, setData] = useState([]);
  function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
  }
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }
  async function listUploads() {
    const client = makeStorageClient()
    for await (const upload of client.list()) {
      //Object.push(retrieveFilesHTTP(upload.cid,upload.name));
      retrieveFilesHTTP(upload.cid);
    }

  }
  async function retrieveFilesHTTP(cid) {
    let FileName = "Project.json"
    const a = await axios.get("https://" + cid + ".ipfs.dweb.link/" + FileName);
    let newData = { title: a.data.title, description: a.data.description, walletAdress: a.data.walletAdress, cid: cid }
    return newData
  }

  useEffect(async () => {
    async function test() {
      let arrayy = [];
      const client = makeStorageClient()
      for await (const upload of client.list()) {
        //Object.push(retrieveFilesHTTP(upload.cid,upload.name));
        let FileName = "Project.json"
        const x = await axios.get("https://" + upload.cid + ".ipfs.dweb.link/" + FileName)
        let newData = { title: x.data.title, description: x.data.Description, walletAdress: x.data.WalletAdress, cid: upload.cid }
        arrayy.push(newData);
      }
      setData(arrayy);
    }
    test()
  }, []);

  return (
    <CardsContainer data={data} />
  );

}

export default Cards;