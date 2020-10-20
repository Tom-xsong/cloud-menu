// pages/recipeDetail/recipeDetail.js
import {getById,add,get,del, update} from "../../utils/db"
const db = wx.cloud.database(); //拿到数据库的引用
const _ = db.command
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:{},
    isLike:false,
    id : ''
    

  },
  share(){
  	wx.showToast({
      title: "功能维护中",
      icon: "none"
    })
  },

 async setLike(){
    var bool = !this.data.isLike
   
    if(bool){
      var obj = this.data.menu
      obj.follows += 1
      this.setData({
        isLike:bool,
        menu:obj
      })
    
    var  follows = {}
    follows.menuid = this.data.menu._id
    let result = await add("follow",follows)
    var id = this.data.id
    let result1 = await update("menu",id,{follows:_.inc(1)})

    


    }else{
      var obj = this.data.menu
      obj.follows -= 1
      this.setData({
        isLike:bool,
        menu:obj
      })
      
      var menuid = this.data.menu._id
      let _openid = wx.getStorageSync("openid")
      let result2 = await get("follow",{_openid,menuid})
      var _id = result2.data[0]._id
      let result3 = await del("follow",_id)


      var id = this.data.id
      let result4 = await update("menu",id,{follows:_.inc(-1)})


    
       

   
    }

   


  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let result = await getById("menu",options.id)
    this.data.id = options.id
    var _openid = wx.getStorageSync("openid")
    let result1 = await get("follow",{_openid})
    var bool =  result1.data.some(item=>{
      return item.menuid == options.id
    })
    
    


    this.setData({
      menu:result.data,
      isLike:bool

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