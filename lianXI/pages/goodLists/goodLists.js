// pages/goodLists/goodLists.js
let{
  requestApi
} = require("../../utils/request.js");
// const { threadId } = require("worker_threads");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodListDatas:[],
    zonghe2:0,
    aid:0,
    flag:true,
    zongheDatas:[{
      id:0,
      title:"综合"
    },
    {
      id:1,
      title:"新品 "
    },
    {
      id:2,
      title:"销量"
    },
    {
      id:3,
      title:"价格"
    },
    {
      id:4,
      title:"筛选"
    },]
  },

 
  async zonghe1Fn(e){
    console.log(e.currentTarget.dataset.aid);
    this.setData({
      aid:e.currentTarget.dataset.aid
    })

    if(this.data.aid==0){
      let result=await requestApi("https://x.dscmall.cn/api/catalog/goodslist",{
        cat_id: this.data.zonghe2,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "goods_id",
      order: "desc",
      self: 0,
      },"post")
      console.log(result);
      this.setData({
        goodListDatas:result.data.data
      })
    }else if(this.data.aid==1){
      let result=await requestApi("https://x.dscmall.cn/api/catalog/goodslist",{
        cat_id: this.data.zonghe2,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "last_update",
      order: "desc",
      self: 0,
      },"post")
      console.log(result);
      this.setData({
        goodListDatas:result.data.data
      })
    }else if(this.data.aid==2){
      let result=await requestApi("https://x.dscmall.cn/api/catalog/goodslist",{
        cat_id: this.data.zonghe2,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "sales_volume",
      order: "desc",
      self: 0,
      },"post")
      console.log(result);
      this.setData({
        goodListDatas:result.data.data
      })
    }else{
      let result=await requestApi("https://x.dscmall.cn/api/catalog/goodslist",{
        cat_id: this.data.zonghe2,
      warehouse_id: 0,
      area_id: 0,
      min:"",
      max: "",
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "shop_price",
      order: "desc",
      self: 0,
      },"post")
      console.log(result);
      this.setData({
        goodListDatas:result.data.data
      })
    }
  },
   async getGoodLists(cat_id,min,max,){
    let result=await requestApi("https://x.dscmall.cn/api/catalog/goodslist",{
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      min: min,
      max: max,
    goods_num: 0,
    size: 10,
    page: 1,
    sort: "goods_id",
    order: "desc",
    self: 0,
    },"post")
    console.log(result);
    this.setData({
      goodListDatas:result.data.data
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.getGoodLists(options.cat_id,"","")
      this.setData({
          zonghe2:options.cat_id
      })
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