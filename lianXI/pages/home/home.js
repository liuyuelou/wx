// pages/toutiao/toutiao.js
let{
  requestApi
}=require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDatas:[{
      id:0,
      title:"首页"
    },
    {
      id:1,
      title:"家用电器"
    },
    {
      id:2,
      title:"男装女装"
    },
    {
      id:3,
      title:"鞋靴箱包"
    },
    {
      id:4,
      title:"手机数码"
    },
    {
      id:5,
      title:"电脑办公"
    },
    {
      id:6,
      title:"家居家纺"
    },
    {
      id:7,
      title:"个人化妆"
    }],
    currentIndex:0,  //从那个索引位置开始
    oLeft:0,
    widH:0,
    oColor:"",
    swiperDatas:"",
    flag:0,
    swipeNav:[],
    miaoshaData:[],
    miaoshaList:[],
    twoListjk:[],
    active:0,
    page:1,
 
    swiperNew:[{
      id:0,
      title:"刘月楼1"
    },
    {
      id:1,
      title:"刘月楼2"
    },
    {
      id:2,
      title:"刘月楼3"
    },]
  },
changeTab(e){
console.log(e);
if(e.target.dataset.current>=2&&e.target.dataset.current<7){
 this.setData({
  oLeft:(e.target.dataset.current-2)*120
 })
}
this.setData({
  currentIndex:e.target.dataset.current
})

},
changeSwiper(e){
  console.log(e);    
  this.setData({
      currentIndex:e.detail.current
  })
},
//抢购中的点击事件
qiang(e){

console.log(e.currentTarget.dataset.id);
this.setData({
   active:e.currentTarget.dataset.active
})

let cid=e.currentTarget.dataset.id;
let tommorow
if(cid==25){  
  tommorow=0
}else{
  tommorow=1
}

this.qianggou(cid,tommorow)

},
changeSwiper1(e){
  // console.log(e);
  
  let color=["rgb(243,70,70)", "rgb(228,49,36)", "rgb(60,129,255)", "rgb(2,131,121)", "rgb(64,125,255)"];
  this.setData({
    oColor:color[e.detail.current]
  })
},
changeNav(e){
  console.log(e.detail.current);
  let active1=e.detail.current
  this.setData({
    flag:active1
  })
},
changeNew(e){
  console.log(e);
  
},
// 倒计时秒杀
miaosha(){
   setInterval(()=>{
    var obj={}
    var miaosha1=[]
    var data=new Data
    var end
   })
  
},
// 抢购中的方法
 qianggou(id,tomorrow){
  requestApi("https://x.dscmall.cn/api/visual/visual_seckill",{
    id:id,
    tomorrow:tomorrow
  }).then(res=>{
    console.log(res.data.data.time_list);
   console.log(res);
   
    
    this.setData({
      miaoshaData:res.data.data.time_list,
      miaoshaList:res.data.data.seckill_list
    })
    
  })
 },
 scrollTwoList(e){
    console.log(e);
    this.setData({
      page:++this.data.page,
      
    })
    this.twoListjk(this.data.page)
    console.log(this.data.page);
    
 },
//  一行两列接口
 async twoListjk(page) {
  let twoListjk1 = await requestApi("https://x.dscmall.cn/api/goods/type_list?page=1&size=10&type=is_best", {
    page: page,
    size: 10,
    type: "is_best",
  })
  console.log(twoListjk1);
  if(this.data.twoListjk.length==0){
    this.setData({
      twoListjk: twoListjk1.data.data
    })
    
}
else{
  this.setData({
    twoListjk:this.data.twoListjk.concat(twoListjk1.data.data)
  })
  
}
console.log(twoListjk1.data.data);
    
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.twoListjk()
wx.getSystemInfo({
  success: (result) => {
   console.log(result.windowHeight)
   this.setData({
     widH:result.windowHeight
   })
  },
}),
 wx.request({
   url: 'https://x.dscmall.cn/api/visual/view',
   method:'POST',
   header:'content-type:application/x-www-form-urlencode',
   data:{
    id: 3,
    type: "index",
    device: "h5"
   },
   success:(res)=>{
     let data=JSON.parse(res.data.data.data)
     console.log(data);
     let swiper=data[2].data.list
     let descDatas=data[3].data.list
     console.log(descDatas);
     let arr=[]
      // for(var i=0;i<descDatas.length/10;i++){
      //     arr.push(descDatas.slice(i,i+10))
      //   }
      let num=10;
      for(var i=0;i<descDatas.length;i+=num){
        arr.push(descDatas.slice(i,i+num))
      }
      console.log(arr);
      
    //  console.log(swiper);
     
     this.setData({
      swiperDatas:swiper,
      swipeNav:arr
     })
     
    
     
   }
 })
//  秒杀接口
wx.request({
  url: 'url',
})
//  滚动新闻的接口
  wx.request({
    url: 'https://x.dscmall.cn/api/visual/article',
    method:"POST",
    header:'content-type:application/x-www-form-urlencode',
    data:{
      cat_id: 20,
      num: 10
    },
    success:(res)=>{
        console.log(res.data.data);
        this.setData({
          swiperNew:res.data.data
        })
        
    }
  }),
  this.twoListjk()
  this.qianggou()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})