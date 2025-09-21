document.querySelector('#generate').addEventListener('click' ,()=>{
    let url = document.querySelector('#link-box').value;
    console.log(url);
    if(url != ''){
        document.querySelector('#qr-container').style.display = 'flex';
    }
})