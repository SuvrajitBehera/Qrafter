import bodyParser from 'body-parser';
import express from 'express'
import {createWriteStream , readFile} from 'fs'
import {image} from 'qr-image'
import {resolve , join} from 'path' 
let imgCount = 0
function createQR(URL){
    return new Promise((res,rej)=>{
        if(res){
            imgCount++;
            let qr_svg = image(URL,{type : 'svg'});
            qr_svg.pipe(createWriteStream(join(resolve(),'data','qr'+imgCount+'.svg')));
            res('qr'+imgCount+'.svg')
        }
        else{
            rej('Error')
        }
    })
}

function generateSvg(data){
    const imagePath = '/data/'
    app.get(imagePath+data , (req,res)=>{
        res.sendFile(join(resolve(),'data',data))
    })
    return (imagePath+data)
    
}
const app = express()
const port = 3000;
const api = '/api'
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(join(resolve('..'),'Frontend','public')))

app.get('/' ,(req,res)=>{
    res.sendFile(join(resolve('..'),'Frontend','index.html'))
})
app.get(api,(req,res)=>{
    const url = req.query.url;
    createQR(url).then((data)=>{
        return generateSvg(data)
    })
    .then((data)=>{
        res.send(JSON.stringify(data))
    })
})
app.get(api+'/download' , (req,res)=>{
    let file = req.query.path
    res.download(join(resolve(),file) , 'qr.svg')
})
app.listen(port,console.log(`server is live at ${port}`))