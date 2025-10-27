import express,{json} from 'express'
import router from './routes/certRoute.js';

const app=express()

app.use(json())
app.use('/',router)



app.listen(8000,()=>{
    console.log("Server connected to 8000");
    
})