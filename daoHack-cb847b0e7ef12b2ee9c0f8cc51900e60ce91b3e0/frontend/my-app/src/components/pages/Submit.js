import React from 'react';
import '../../App.css';
import { useState } from "react";
import './Submit.css';
import { Web3Storage } from 'web3.storage';
import { getFilesFromPath } from 'web3.storage'
import { File } from 'web3.storage';
import { Buffer } from 'buffer';
import toast from 'react-hot-toast';

export default function Submit() {
  function getAccessToken() {

    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
  }
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  function makeFileObjects(title, descp, adress) {

    const obj = { title: title, Description: descp, WalletAdress: adress }
    const buffer = Buffer.from(JSON.stringify(obj))

    const file =
      new File([buffer], 'Project.json')

    return file
  }
  async function storeFiles(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target[3].files[0]
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const img = new File([Buffer(reader.result)], 'Image.png')
      const info = makeFileObjects(event.target[0].value, event.target[1].value, event.target[2].value)
      const myPromise = storeFiles([info, img])

      toast.promise(myPromise, {
        loading: 'Submitting',
        success: 'Project successfully submitted',
        error: 'Error ',
      });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-box'>
        <label>Title:
          <input className='gray_back' placeholder="Title" type="text" name="title" value={inputs.title || ""} onChange={handleChange} />
        </label>
        <label>Description:
          <textarea className='gray_back' placeholder="Description" type="text" name="description" value={inputs.description || ""} onChange={handleChange} />
        </label>
        <label>Address:
          <input className='gray_back' placeholder="Address" type="text" name="address" value={inputs.address || ""} onChange={handleChange} />
        </label>
        <label>Image:
          <input className='gray_back' type="file" name="img" value={inputs.img || ""} onChange={handleChange} />
        </label>
        <input className="subBtn" type="submit" />
      </div>
    </form>
  )
}
