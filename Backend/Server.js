import bodyParser from 'body-parser';
import express from 'express'
import {createWriteStream , readFile,unlink,readdir} from 'fs'
import {image} from 'qr-image'
import {resolve , join,dirname} from 'path' 
import {fileURLToPath} from 'url'
let imgCount = 0
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(resolve(__filename,'..'));
function createQR(URL){
    return new Promise((res,rej)=>{
        if(res){
            imgCount++;
            let qr_svg = image(URL,{type : 'svg'});
            qr_svg.pipe(createWriteStream(join(dirname(__filename,'..'),'data','qr'+imgCount+'.svg')));
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
        res.sendFile(join(dirname(__filename,'..'),'data',data))
    })
    return (imagePath+data)
    
}
const app = express()
const port = 3000;
const api = '/api'
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(join(__dirname,'Frontend','public')))

app.get('/' ,(req,res)=>{
    res.sendFile(join(__dirname,'Frontend','index.html'))
})
app.get(api,(req,res)=>{
    const url = req.query.url;
    createQR(url).then((data)=>{
        return generateSvg(data)
    })
    .then((data)=>{
        let imgData = {url: data}
        res.setHeader("Content-Type" , "application/json")
        res.send(JSON.stringify(imgData))
    })
})
app.get(api+'/download' , (req,res)=>{
    let file = req.query.path
    res.download(join(resolve(),file) , 'qr.svg')
})
app.listen(port,console.log(`server is live at ${port}`))
// garbage cleaner
function cleaner(){
    setTimeout(()=>{
        delFiles()
        cleaner()
    } , 1800000)
}
function getFiles(){
    return new Promise((res,rej)=>{
        readdir('./data','utf8',(err,data)=>{
            if(err) throw err
            res(data)
        })
    })
}
function delFiles(){
    getFiles().then((data)=>{
        for(let i in data){
            unlink('./data/'+data[i], (err)=>{
                if(err) throw err
            })
        }
    })
}
cleaner()