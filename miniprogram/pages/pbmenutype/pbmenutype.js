// pages/pbmenutype/pbmenutype.js
import {add,get,del,update} from "../../utils/db"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addShow:false,
    updateShow:false,
    value:"",
    menuTypeList:[],
    id:"",
    value2:""
  },

  addShow(){
    this.setData({
      addShow:true
    })
  },
  updateShow(e){
    var id = e.currentTarget.id
    var name = e.currentTarget.dataset.name
    this.data.id = id
    this.setData({
      updateShow:true,
      value2:name

    })

    
  },
  addInput(e){
  var value =e.detail.value
  this.data.value = value
  
  },



  async add(){
    var typeName = this.data.value
    var result = await add("menuType",{typeName})
    this.data.value = ''
    this.setData({
      addShow:false
    })
    
    

    let list  = await get("menuType")
    this.setData({
      menuTypeList:list.data

    })
  },

 async  menuEdit(){
    var typeName = this.data.value2
    var id = this.data.id
      console.log(typeName)
    var resuit = await update("menuType",id,{typeName})
    var  list  = await get("menuType")
    this.setData({
      menuTypeList:list.data,
      
    })
    this.setData({
      value2:"",
      updateShow:false
    })

 
  },

  delete(e){
  var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      async success (res) {
        if (res.confirm) {
          var id = e.currentTarget.id
          await del("menuType",id)
          let list  = await  get("menuType")
          that.setData({
            menuTypeList:list.data
          })
    
        } else if (res.cancel) {
          
        }
      }
    })
    
    
     
  
         
   
    
    
    
  

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
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