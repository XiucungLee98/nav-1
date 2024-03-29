const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const all = localStorage.getItem('all')
const allObject = JSON.parse(all)
const hashMap = allObject || [
    {logo:'s',url:'https://www.stackoverflow.com'},
    {logo:'w',url:'https://www.wangdoc.com'}
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

let flag = -1
$(document).on('keypress',(e)=>{
    if(e.key!=='\n'){
    uncheck()
    const key = e.key.toLowerCase()
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            flag=i
            check(hashMap[i],i,key)
            break
        }
    }
}if(e.keyCode === 13){
    if(flag>=0)window.open(hashMap[flag].url)
    flag = -1
}
})

const check =(site,index,key)=>{
    if(site.logo===key){
        let element=$("ul li").eq(index)
        $(element).css('color','red')
        $(element).focus()
    }
}
const  uncheck=()=>{
        let element=$("ul li")
        $(element).css('color','black')
}