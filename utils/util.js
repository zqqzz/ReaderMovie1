function convertToStartsArray(stars){ 
    let num=stars.toString().substring(0,1);
    let array=[];
    for(let i=1;i<5;i++){
        if(i<=num){
            array.push(1);
        }else{
            array.push(0);
        }
    }
    return array;
}
// 异步方法
function http(url,callBack){//让这个函数接受一个url,将这个url传到请求中
    wx.request({//callBack是一个回调函数
      url: url,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/xml'
      },
      success(res) {
          callBack(res.data);
      },
      fail() {
        console.log('fail')
      },
    })
  }
  function convertToCastString(casts){
     let castsjoin='';
     for(let idx in casts){
       castsjoin=castsjoin+casts[idx].name+'/';//将演员的名字用/分割起来
     }
     return castsjoin.substring(0,castsjoin.length-2);//将最后一个/去掉
  }

   function convertToCastInfos(casts){
     let castsArray=[];
     for(let idx in casts){
       let cast={
         img:casts[idx].avatars?casts[idx].avatars.large:'',
         name:casts[idx].name
       }
       castsArray.push(cast);
     }
     return castsArray;
   }
module.exports={
    convertToStartsArray:convertToStartsArray,
    http:http,
    convertToCastString:convertToCastString,
    convertToCastInfos:convertToCastInfos
}