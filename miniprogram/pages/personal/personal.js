// pages/personal/personal.js
const app=getApp();
import {get, del,dels} from "../../utils/db"
Page({

  /**
   * 页面的初始数据
   */
  data:{
		userInfo:{},		//用户公开信息
    isLogin:false,		//false 没有登录；  true  登录
    index:0,
    menuTypeList:[],
    menuList:[],
    guanzhu:[]
  },

  toMy(e){
    var id = e.currentTarget.id
      wx.navigateTo({
        url: '/pages/myTypeList/myTypeList?id='+id,
      })
  },

  activeTab(e){
    var index = e.currentTarget.id
     this.setData({
       index
     })

  },
  

  myInfo(e){
   
    if(e.detail.rawData){
      this.setData({
        userInfo:e.detail.userInfo,
        isLogin:true
      })
    }else{
      this.setData({
      
        isLogin:false
      })
    }

  },
  
  pbType(){
    var _openid = wx.getStorageSync("openid")
    if(_openid == "oGGwd5KRR1i5Nbu41CS2TYTRpDwk"){
      wx.navigateTo({
        url: '/pages/pbmenutype/pbmenutype',
      })
    }
   
    
  },
  slideButtonTap(e){
   
  },



  pbmenu(){
    wx.navigateTo({
      url: '/pages/pbmenu/pbmenu',
     
    })

  },

  async delCdlb(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
       async success (res) {
    if (res.confirm) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    var index =  e.currentTarget.dataset.index
    let result = await del("menu",id)
    let arr = that.data.menuList
    arr.splice(index,1)
    that.setData({
      menuList:arr
    })

     let result2 = await dels("follow",{menuid:id})
     
     var arr2 = that.data.guanzhu.filter(item=>{
       return item._id != id
     })
     console.log(arr2)
     that.setData({
       guanzhu:arr2
     })
      
        } else if (res.cancel) {
         
        }
      }
    })
    
   
   
    

   
    
    

  },

  toDetail(e){
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+id,
    })
  },



  /**Load
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    
      if(app.globalData.userInfo!=null){
        var userInfo = app.globalData.userInfo
        this.setData({
          userInfo,
          isLogin:true
        })
      }else{
       
        app.userInfoReadyCallback=res=>{
          this.setData({
            userInfo:res.userInfo,
            isLogin:true
          })
  
        }
  
      }
     

      var _openid = wx.getStorageSync("openid")
    
      let result =await get("menuType",{_openid})
     
      let result2 =await get("menu",{_openid})
     
      
     
     
      this.setData({
        menuTypeList:result.data,
        menuList:result2.data,
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
 async onShow() {
    var _openid = wx.getStorageSync("openid")
    let result3 = await get("follow",{_openid})
      var arrLike = []
      result3.data.forEach(item=>{
        arrLike.push(item.menuid)
      })
     
      let result4 = await get("menu")
      
      var followArr = result4.data.filter(item=>{
        return arrLike.indexOf(item._id)>-1
      })

      var _openid = wx.getStorageSync("openid")
    
      let result =await get("menuType",{_openid})
     
      let result2 =await get("menu",{_openid})
     
      
     
     

       
      this.setData({
        menuTypeList:result.data,
        menuList:result2.data,
        guanzhu:followArr
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})