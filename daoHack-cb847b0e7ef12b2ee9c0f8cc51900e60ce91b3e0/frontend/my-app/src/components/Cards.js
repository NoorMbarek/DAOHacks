import React,{ useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';



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
                //adress={x.walletAdress}
                label='cute'
                path="/show_proj/"
                id={x.walletAdress}
                requestProposal={()=>alert("click me ")}
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