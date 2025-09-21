document.querySelector('#generate').addEventListener('click' ,()=>{
    let url = document.querySelector('#link-box').value;
    console.log(url);
    if(url != ''){
        fetch('http://localhost:3000/api?url='+url).then((data)=> data.json()).then(data => document.querySelector('#svg').innerHTML = data)
        document.querySelector('#qr-container').style.display = 'flex';
    }
})