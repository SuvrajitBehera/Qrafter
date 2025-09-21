import bodyParser from 'body-parser';
import express from 'express'
import {createWriteStream , readFile} from 'fs'
import {image} from 'qr-image'
import {resolve , join} from 'path' 
function createQR(URL){
    return new Promise((res,rej)=>{
        if(res){
            let qr_svg = image(URL,{type : 'svg'});
            qr_svg.pipe(createWriteStream('qr.svg'));
            res('qr.svg')
        }
        else{
            rej('Error')
        }
    })
}

function generateSvg(data){
    return new Promise((resolve , rejects)=>{
        if(resolve){
            readFile(('./'+data),'utf8' , (err, data)=>{
                if(err) throw err;
                resolve(data)
            })
        }
        else{
            rejects('File Not Found')
        }
    })
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
    let svgData
    const url = req.query.url;
    createQR(url).then((data)=>{
        return generateSvg(data)
    })
    .then((data)=>{
        console.log(data)
        res.send(JSON.stringify(data))
    })
})
app.listen(port,console.log(`server is live at ${port}`))