import { rejects } from 'assert';
import express from 'express'
import {createWriteStream , readFile} from 'fs'
import { resolve } from 'path';
import {image} from 'qr-image'

function createQR(URL){
    return new Promise((res,rej)=>{
        if(res){
            let qr_svg = image(URL,{type : 'svg'});
            qr_svg.pipe(createWriteStream(URL+'.svg'));
            res(URL+'.svg')
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
createQR('Hey')
.then((data)=>{
    return generateSvg(data)
})
.then((data)=>{
    console.log(typeof data)
})
