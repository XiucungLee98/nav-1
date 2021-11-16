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
    if(e.key!=='\n'){uncheck()
    const key = e.key
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            check(hashMap[i],i,key)
            break
        }
    }
}else if((e.keyCode || e.which) === 13){
    console.log('输入回车')
}
})

const check =(site,index,key)=>{
    if(site.logo===key){
        let element=$("ul li").eq(index)
        $(element).css('color','red')
        $(element).css('border','1px solid red')
        $(element).focus()
    }
}
const  uncheck=()=>{
        let element=$("ul li")
        $(element).css('color','black')
}