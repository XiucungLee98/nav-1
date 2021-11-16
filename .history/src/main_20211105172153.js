$('.addButton')
.on('click',()=>{
    const url = window.prompt('请输入你要添加的网站')
    console.log(url)
    if(url.indexOf('http')===0)
})