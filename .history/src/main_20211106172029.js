const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const hashMap = [
    {logo:'S',url:'stackoverflow.com'},
    {logo:'W',url:'wangdoc.com'}
]
const render =()=>{
    hashMap.forEach(node=>{
        const $li = $(`
        <li>
        <a href="${node.url}">
           <div class="site">
                <div class="initial">${node.url[0]}</div>
               <div class="link">${node.url}</div>
            </div>
       </a>
         </li>
        `).insertBefore($lastLi)
    })
}
render()
$('.addButton')
.on('click',()=>{
    let url = window.prompt('请输入你要添加的网站')
    const showUrl=url
    if(url.indexOf('http')!==0){
       url='http://'+url
    }   
    const $li = $(`
             <li>
                 <a href="${url}">
                    <div class="site">
                         <div class="initial">${showUrl[0]}</div>
                        <div class="link">${showUrl}</div>
                     </div>
                </a>
            </li>
    `).insertBefore($lastLi)
})

