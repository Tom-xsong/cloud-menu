// miniprogram/pages/menuTypeList/menuTypeList.js
import {get ,update, getById} from "../../utils/db"
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:"",
    pageSize: 4,
    page: 0,
    show:false


  },
  async toDetail(e){
    var id = e.currentTarget.id
    let result = await getById("menu",id)
     console.log(result)
     var views = result.data.views + 1
    let result1 =await update("menu",id,{views})
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+id,
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
   this.data.id = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 async onShow() {
  this.data.page = 0
  let result1 =await db.collection("menu").where({typeId:this.data.id}).limit(5).get()
  console.log(result1)
    this.setData({
      list:result1.data
    })
    
    
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
    this.data.page += 1;
		var pageSize = this.data.pageSize;
		this.getList(this.data.page, pageSize)
  },

  async getList(page, pageSize) {
    wx.showLoading()
    var _openid = wx.getStorageSync("openid")
    var result = await db.collection("menu").where({typeId:this.data.id,_openid:_openid}).skip(page * pageSize).limit(this.data.pageSize).get()
    console.log(result)
    if(result.data.length == 0 ){
      this.setData({
        show:true
      })
    }
		this.setData({
      list: this.data.list.concat(result.data),
     
    })
   
	},



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})