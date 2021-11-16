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
    hashMap.forEach((node,index)=>{
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
        $li.on('click',()=>{window.open(node.url)})
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
    })
    })
    }
render()
$('.addButton')
.on('click',()=>{
    let url = window.prompt('请输入你要添加的网站')
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

$(document).on('keypress',(e)=>{
    const key = e.key
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            console.log(hashMap[i].url)
        }
    }
})

const chose =(site)=>{
    const x = $siteList.find('li')
    
}