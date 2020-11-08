// pages/category/category.js
let app=getApp()
let{
  requestApi
}=require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:"",
    getLeftData:[],
    getRightData:[],
    cid:0,
    imageOne:[],
    height:0,
    goId:"",
    heightArr:[]
  },
  changeCid(e){
    console.log(e.currentTarget.dataset.cid);
    this.setData({
  cid:e.currentTarget.dataset.cid
  })
      console.log(this.data.cid);
  },
  async getLeftData(){
    let result=await requestApi("https://x.dscmall.cn/api/catalog/list")
    console.log(result.data.data);
    this.setData({
      getLeftData :result.data.data
    })
  },
  async getRightData(){
    let result858=await requestApi("https://x.dscmall.cn/api/catalog/list/858")
    console.log(result858.data.data);

    let result6=await requestApi("https://x.dscmall.cn/api/catalog/list/6")
    console.log(result6.data.data);
    
    let result8=await requestApi("https://x.dscmall.cn/api/catalog/list/8")
    console.log(result8.data.data);

    let result3=await requestApi("https://x.dscmall.cn/api/catalog/list/3")
    console.log(result3.data.data);

    let result4=await requestApi("https://x.dscmall.cn/api/catalog/list/4")
    console.log(result4.data.data);

    let result5=await requestApi("https://x.dscmall.cn/api/catalog/list/5")
    console.log(result5.data.data);

    let result860=await requestApi("https://x.dscmall.cn/api/catalog/list/860")
    console.log(result860.data.data);
    let arrResult=[]
    arrResult.push(result858.data.data)
    arrResult.push(result6.data.data)
    arrResult.push(result8.data.data)
    arrResult.push(result3.data.data)
    arrResult.push(result4.data.data)
    arrResult.push(result5.data.data)
    arrResult.push(result860.data.data)
    console.log(arrResult);
    this.setData({
      getRightData:arrResult
    })
    if(arrResult.length==this.data.getLeftData.length){
      this.isScroll()
    }
  },
  changeLeft(e){
      console.log(e.currentTarget.dataset.cid);
      let id=e.currentTarget.dataset.cid
      let index=e.currentTarget.dataset.index 
      this.setData({
        cid:index,
        goId:id
        
      })
  },
  isScroll(){
    let leftLen=this.data.getLeftData.length
    let heightArr=[]

    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        this.setData({
          height:result.windowHeight*(750/result.windowWidth)-88-app.globalData.navbarHeight
        })
      },
    })
    //创建一个对象--查询节点信息的对象
    for(var i=0;i<leftLen;i++){
      let query=wx.createSelectorQuery().in(this)
      let aId="#a"+i
      query.select(aId).boundingClientRect()
      query.exec((res)=>{
        console.log(res[0].top);
        let top=res[0].top
        heightArr.push(top)
        this.setData({
          heightArr:heightArr
        })
      })
    }
  },
  scrollPage(e){
    let scrollTop=e.detail.scrollTop  //滚动条滚动的距离
    console.log(e.detail.scrollTop);
    let scrollArr=this.data.heightArr  //数组中的值为每一块内容距离顶部的距离

    //scrollArr数组中的每一个值和scrollTop进行比较
    for(var i=0;i<scrollArr.length;i++){

      //第一个选中的时候
        if(scrollTop>=0&&scrollTop<scrollArr[1]-scrollArr[0]){
          this.setData({
            cid:0
          })
        }else if(scrollTop>=scrollArr[i]-scrollArr[0]&&scrollTop<scrollArr[i+1]-scrollArr[0]){
          this.setData({
            cid:i
          })
        }else if(scrollTop>=scrollArr[scrollArr.length-1]-scrollArr[0]){
            this.setData({
                cid:scrollArr.length-1
            })
        }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH:app.globalData.navbarHeight
    })
    this.getLeftData()
    this.getRightData()

    
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