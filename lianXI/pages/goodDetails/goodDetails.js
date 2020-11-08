// pages/goodDetails/goodDetails.js
let app = getApp()
let {
  requestApi
} = require("../../utils/request.js")
let wxParse = require("../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetailDatas: [],
    navH: 0,
    opacity: 0,
    goId: "detail0",
    showMask: false,
    translateY: 0,
    maskOpacity: 0.8,
    time: 0.6,
    height: 0,
    goodDetailTJDatas: [],
    goodsPLDatas:[],
    topArr:[],
    heightArr:[],
    titleArr:["商品","详情","推荐","评论"],
    activeIndex:0,
    flag:false,
    buyNum:1,
    gid:0 ,  //加入购物车点击确定的id
    cartBuyNum:0
  },
  goBackFn() {
    wx.navigateBack()
  },
  // scroll滚动条事件
  scrollFn(e){
      console.log(e);
      var scrollY=e.detail.scrollTop
      var opacity=scrollY/300
      opacity=opacity>1?1:opacity
      this.setData({
        opacity:opacity
      })
        for(var i=0;i<this.data.topArr.length;i++){
          if(scrollY<this.data.topArr[i]-app.globalData.navbarHeight/2+this.data.heightArr[i]){
              this.setData({
                activeIndex:i
              })
              break;
          }
        }
      
      console.log(this.data.topArr);
      console.log(this.data.heightArr);
      if(this.data.flag){
        this.setData({
          flag:false
        })
        return
      }
  },
  toCartFn1(){
    wx.switchTab({
      url: "/pages/cart/cart"
    })
  },
  infoScrollFn(){
     var topArr=[]
     var heightArr=[]
     for(var i=0;i<4;i++){
      var idDetail="#detail"+i
      const query = wx.createSelectorQuery()
      query.select(idDetail).boundingClientRect()
      query.exec((res)=>{
        var top=res[0].top       // #the-id节点的上边界坐标
        var height=res[0].height
         console.log(top);
         console.log(height);
         topArr.push(top)
         heightArr.push(height)
         this.setData({
          topArr:topArr,
          heightArr:heightArr
         })
       })
     }
   },
  // 点击叉号显示蒙版
  animation(num, num1) {
    // 定义一个动画实例
    let animationObj = wx.createAnimation({
      delay: 0, //动画延迟
      duration: 300,  //持续时间
      timingFunction: "linear"  //过渡效果
    })

    animationObj.translateY(num).step()

    setTimeout(() => {
      animationObj.translateY(num1).step()
      this.setData({
        animationData: animationObj.export(),  //导出动画
        showMask: true,
      })
    }, 200)
    this.setData({
      animationData: animationObj.export(),  //导出动画
      showMask: true,
    })

  },
  showMaskFn() {
    this.animation(280, 0)
    this.setData({
      time: 0.8,
      maskOpacity: 0.8
    })

  },
  closeMaskFn() {
    this.animation(0, 280);
    var trime = setInterval(() => {
      this.data.time -= 0.1;
      console.log(this.data.time);
      this.setData({
        maskOpacity: this.data.time
      })
    }, 50);
    setTimeout(() => {
      clearInterval(trime);
      this.setData({
        showMask: false
      })
    }, 300)

  },

  //
  async getGoodDetails(goods_id) {
    var goodDetails1 = await requestApi("https://x.dscmall.cn/api/goods/show", {
      goods_id: goods_id,
      warehouse_id: 0,
      area_id: 0,
      is_delete: 0,
      is_on_sale: 1,
      is_alone_sale: 1,
      parent_id: "",
    }, "post")
    console.log(goodDetails1);
    this.setData({
      goodDetailDatas: goodDetails1.data.data
    })
    wxParse.wxParse('content', 'html', goodDetails1.data.data.goods_desc, this, 5)
    // this.infoScrollFn() 
  },
  //推荐接口
  async getGoodDetailsTJ() {
    let goodDetailsAni = await requestApi("https://x.dscmall.cn/api/goods/goodsguess", {
      page: 1,
      size: 10,
    }, "post")
    // console.log(goodDetails);

    this.setData({
      goodDetailTJDatas: goodDetailsAni.data.data
    })
      // this.infoScrollFn()
  },
  //商品评论
  async getGoodDetailsPL(goods_id) {
    let goodsPL = await requestApi("https://x.dscmall.cn/api/comment/goods", {
      goods_id: goods_id,
      rank: "all",
      page: 1,
      size: 10
    }, "post")
    console.log(goodsPL.data.data);
    this.setData({
      goodsPLDatas: goodsPL.data.data
    })
    // this.infoScrollFn()
  },

  buyNumFn(){
    var carts=wx.getStorageSync('carts');
    var cartBuyNum=0;
    for(var i=0;i<carts.length;i++){
      if(carts[i].isSelect){
        console.log(carts[i].buyNum);
        
        cartBuyNum +=carts[i].buyNum;
      }
    }
    this.setData({
      cartBuyNum:cartBuyNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.cartBuyNum){
      this.setData({
        buyNum:options.cartBuyNum
      })
    }
    this.buyNumFn();
    console.log(options.goods_id);
    this.getGoodDetails(options.goods_id)
    this.getGoodDetailsTJ()
    this.getGoodDetailsPL(options.goods_id)
    this.setData({
      gid:options.goods_id,
      navH: app.globalData.navbarHeight,
      height: app.globalData.windowHeight
    })

    wx.showLoading({
      title: '加载中',
    })
   
    setTimeout(()=>{
      this.infoScrollFn()
      wx.hideLoading()
    },5000)

  },

  tapNav(e){
    console.log(e);
    let index=e.currentTarget.dataset.index
    let id=e.currentTarget.dataset.id
    console.log(index);
    console.log(id);
    this.setData({
      goId:id,
      flag:"true",
      activeIndex:index
    })
    
  },
//修改蒙版数字的
  changeNum(e){
    console.log(e.currentTarget.dataset.num);
    var carts=wx.getStorageSync('carts');
    if(e.currentTarget.dataset.num==0){
      if(this.data.buyNum<=1){
          this.setData({
            buyNum:1
          })
      }else{
        this.setData({
          buyNum:this.data.buyNum-1
        })
      }
    }else{
      this.setData({
        buyNum:Number(this.data.buyNum)+1
      })
    }
    for(var i=0;i<carts.length;i++){
      if(carts[i].goods_id==this.data.gid){
        carts[i].buyNum=this.data.buyNum;
      }
    }
    wx.setStorageSync('carts', carts);
    this.buyNumFn();
  },

  //点击蒙版确定
  addCartOK(){
    console.log(this.data.goodDetailDatas);
    var goods=this.data.goodDetailDatas
    goods.isSelect=true
    goods.buyNum=this.data.buyNum
    // console.log(goods);
    // console.log(this.data.gid);
    var gid=this.data.gid  //gid为点击加入购物车确定按钮时的id
    var cartDatas=wx.getStorageSync('carts') || []
    console.log(cartDatas);
    if(cartDatas.length>0){
      //如果购物车中存在当前数据
       for(var key in cartDatas){  //key指的时索引
         if(cartDatas[key].goods_id==gid){
          cartDatas[key].buyNum=this.data.buyNum  //如果你购物车中有相同的商品，那么就让原有商品数量加上你想要的数量
          try{
            wx.setStorageSync('carts',cartDatas)
            wx.showToast({
              title: '添加成功',
              icon:"success",
              duration:1000
            })
            this.setData({
              showMask:false
            })
          }catch(err){
            wx.showToast({
              title: '添加失败',
              icon:"error",
              duration:2000
            })
          }
          return;
         }
         //购物车中没有当前数据，并且购物车中已经存在数据
       }
         cartDatas.unshift(goods)
    }else{
      cartDatas.unshift(goods)
      this.setData({
        showMask:false
      })
    }
      wx.setStorageSync('carts',cartDatas)
  },
})