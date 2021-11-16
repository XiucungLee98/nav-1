const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const all = localStorage.getItem('all')
const allObject = JSON.parse(all)
const hashMap = allObject || [
    {logo:'S',url:'stackoverflow.com'},
    {logo:'W',url:'wangdoc.com'}
]
const render =()=>{
    $siteList.find('li:not(.lastLi)').remove()
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
   hashMap.push(
       {
           logo:url[0],
           url:url
       }
   )
   render()
})

window.onbeforeunload =()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('all',string)
}
