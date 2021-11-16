const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const all = localStorage.getItem('all')
const allObject = JSON.parse(all)
const hashMap = allObject || [
    {logo:'S',url:'https://www.stackoverflow.com'},
    {logo:'W',url:'https://www.wangdoc.com'}
]

const simplifyUrl =(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}
const render =()=>{
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach(node=>{
        const $li = $(`
        <li>
           <div class="site">
                <div class="initial">${node.logo}</div>
               <div class="link">${simplifyUrl(node.url)}</div>
               <div class="close">
                    <svg class="icon">
                     <use xlink:href="#icon-close"></use>
                     </svg>
               </div>
            </div>
         </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{console.log(node.url)})
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
    })
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
           logo:simplifyUrl(url)[0],
           url:url
       }
   )
   render()
})

window.onbeforeunload =()=>{
   const string = JSON.stringify(hashMap)
   localStorage.setItem('all',string)
}
