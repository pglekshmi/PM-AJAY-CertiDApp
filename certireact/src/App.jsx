import { useState } from 'react'
import { createWalletClient, custom,createPublicClient } from 'viem'
import { writeContract, readContract } from 'viem/actions'
import { hardhat, hoodi } from 'viem/chains'
import cert from './assets/cert.json'
// import {contractAddress} from './assets/cert.json'

import './App.css'




function App() {

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    course: '',
    grade: '',
    date: ''
  })

  const [addr, setAddr] = useState(null)
  const [output,setOutput] = useState('')


  const walletClient = createWalletClient({
    chain: hoodi,
    transport: custom(window.ethereum)
  })


  const connectMetamask = async () => {
    console.log(walletClient);

    // await window.ethereum.request({ method: "eth_requestAccounts" })
    const [Addr] = await walletClient.requestAddresses()
    setAddr(Addr)

    console.log("Connected Address", addr);

  }

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(name, value);

    setFormData((preState) => ({ ...preState, [name]: value }))

  }

  const handleForm = async () => {
    console.log(cert.abi);
    console.log(formData.id);

    console.log("addr",addr);
    const id = parseInt(formData.id)

    const txhash = await writeContract(walletClient, {
      address: cert.contractAddress,
      abi: cert.abi,
      functionName: "issue",
      args: [id, formData.name, formData.course, formData.grade, formData.date],
      account: addr
    })

    console.log(txhash);

  }

 

  const viewCertificate = async()=>{
    const qId = document.getElementById("cid").value;
    const qID = parseInt(qId)

    const txReceipt = await readContract(walletClient,{
      address: cert.contractAddress,
      abi: cert.abi,
      functionName: "Certificates",
      args:[qID],
      account: addr
    })

    console.log(txReceipt);
    setOutput(`Name:${txReceipt[0]}, Course: ${txReceipt[1]}, Grade:${txReceipt[2]}, Date: ${txReceipt[3]}`)
    

  }





  return (
    < div className='m-4' >
      <div className='m-4 flex justify-end' >
        <input className=' border-2 bg-sky-500 rounded-full border-transparent p-3 ' type='button' value='Connect to Metamask' onClick={connectMetamask} />
      </div>
      <p className='font-bold m-4'>Enter Certificate Details</p>
      <div className='flex mb-2'>
        <p className='mr-2'>Certificate ID :</p>
        <input name='id' type='text' className='border border-black' onChange={handleChange} />
      </div>
      <div className='flex mb-2'>
        <p className='mr-2'>Candidate Name :</p>
        <input name='name' type='text' className='border border-black' onChange={handleChange} />
      </div>
      <div className='flex mb-2'>
        <p className='mr-2'>Course :</p>
        <input name='course' type='text' className='border border-black' onChange={handleChange} />
      </div>
      <div className='flex mb-2'>
        <p className='mr-2'>Grade :</p>
        <input name='grade' type='text' className='border border-black' onChange={handleChange} />
      </div>
      <div className='flex mb-2'>
        <p className='mr-2'>Date :</p>
        <input name='date' type='text' className='border border-black' onChange={handleChange} />
      </div>
      <div className='flex justify-center'>
        <input type='button' className='bg-sky-500 rounded-full p-2' value='Submit' onClick={handleForm} />
      </div>
      <div>
        <p className='font-bold m-4'>View Certificate</p>
        <div className='flex '>
          <p className='mr-2'>Enter Certifcate Id:</p>
          <input type='text' id='cid' className='border border-black m-4'/>
          <input type='button' className='bg-sky-500 rounded-full p-2' value='View'  onClick={viewCertificate}/>
        </div>
        <div>
          {output}
        </div>
      </div>
    </div>
  )
}

export default App
