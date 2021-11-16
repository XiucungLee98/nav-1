$('.addButton')
.on('click',()=>{
    let url = window.prompt('请输入你要添加的网站')
    const showUrl=url
    if(url.indexOf('http')!==0){
       url='http://'+url
    }   
    const $siteList = $('.siteList')
    const $li = $(`
             <li>
                 <a href="${url}">
                    <div class="site">
                         <div class="initial">${showUrl(0)}</div>
                        <div class="link">${showUrl}</div>
                     </div>
                </a>
            </li>
    `).appendTo($siteList)
})

