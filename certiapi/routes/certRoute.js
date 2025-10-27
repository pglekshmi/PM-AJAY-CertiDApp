import { Router } from "express";
import client from "../app.js";
import {writeContract,readContract,waitForTransactionReceipt} from 'viem/actions'
import cert from '../assets/cert.json' with {type:'json'}

const router = Router()

router.get("/",(req,res)=>{
    res.send("Hello World")
})

router.post('/issueCertificate',async(req,res)=>{
    const data = req.body;
    console.log(data);
    
    const hash = await writeContract(client,{
        address: cert.contractAddress,
        abi:cert.abi,
        functionName:`issue`,
        args:[data.id,data.name,data.course,data.grade,data.date]
    })

    await waitForTransactionReceipt(client,{hash})
    console.log(hash);
    
    
})

router.get('/getCertificate/:id',async(req,res)=>{
    console.log(req.params.id);
    const ID = req.params.id

    const txReceipt = await readContract(client,{
        address: cert.contractAddress,
        abi:cert.abi,
        functionName:'Certificates',
        args:[ID]
    })

    console.log(txReceipt);
    res.json({msg:txReceipt})
    
    
})

export default router;