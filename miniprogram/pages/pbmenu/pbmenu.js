// pages/pbmenu/pbmenu.js
import {get,add} from "../../utils/db"
import {multiUpload} from "../../utils/update"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTypeList:[],
    files:[]


  },

  bindselect(e){
    var tempFilePaths= e.detail.tempFilePaths;
    var files = tempFilePaths.map(item=>{
         return{
           url:item
         }
    })

    this.setData({
      files
    })


  },
  async fbcd(e){
    console.log(e)
    var userInfo = wx.getStorageSync('userInfo')
    var form = {}
   form.menuName = e.detail.value.menuName
   form.desc =  e.detail.value.recipesMake
   form.typeId =  e.detail.value.recipeTypeid
   form.nickName = userInfo.nickName
   form.avatarUrl = userInfo.avatarUrl
   form.addTime = new Date().getTime()
   form.follows = 0;
   form.views = 0;

  
  
    
     
   var files = this.data.files
   var arr = []
   files.forEach(item=>{
     arr.push(item.url)
   })
      var result = await multiUpload(arr)
      console.log(result)
      var imgarr = []
      result.forEach(item=>{
        imgarr.push(item.fileID)
      })
      console.log(imgarr)
      form.fileIds = imgarr
      console.log(form)
      var addResult = await add("menu",form)
      console.log(addResult)
      if(addResult.errMsg=="collection.add:ok"){
        wx.showToast({
          title: '添加成功',
        })
      }

    
  },



  

  /**
   * 生命周期函数--监听页面加载
   */
  async  onLoad (options) {
    let result =await get("menuType")
      this.setData({
        menuTypeList:result.data
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