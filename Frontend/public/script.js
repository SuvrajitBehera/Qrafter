let path;
document.querySelector('#generate').addEventListener('click' , getQr)
document.querySelector('#link-box').addEventListener('keydown' ,(e)=>{
    if(e.key == 'Enter'){
        getQr();
    }
})
document.querySelector('#download').addEventListener('click',()=>{
    window.location.href = 'http://localhost:3000/api/download?path='+path
})
function getQr(){
    let url = document.querySelector('#link-box').value;
    if(url != ''){
        fetch('http://localhost:3000/api?url='+url)
        .then((data)=> data.json()).then(data => {
            console.log(data)
            document.querySelector('#svg').innerHTML = '<img src=".'+data.url+'"/>'
            path = data;
        })
        document.querySelector('#qr-container').style.display = 'flex';
    }
}