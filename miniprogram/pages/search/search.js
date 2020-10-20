// pages/search/search.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"",
    keywordArr:[],
    hotList:[]


  },

  inputKey(e){
    this.data.key = e.detail.value
    
  },

  toList(){
    var key = this.data.key
    if (key == "") {
			wx.showToast({
				title: "请输入搜索信息",
				icon: "none"
      })
      
     
    }
    else{
    let arr = wx.getStorageSync("keyword") || [];
		var index = arr.findIndex(item => {
			return item == key
		})

		if (index == -1) {

      if(arr.length==6){
        arr.unshift(key);
        arr.pop()
      }else{
        arr.unshift(key);
        console.log(arr)
      }
			//不存在
		
		} else {
			//存在
			arr.splice(index, 1)
			arr.unshift(key)
		}
    wx.setStorageSync("keyword", arr)
		this.setData({
			keywordArr: arr
		})
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?key='+key,
    })

    }

   
	
    
    
  },

  recentSearch(e) {
		// console.log(e)y
    var key = e.target.dataset.key;
    
  

		wx.navigateTo({
			url: "/pages/recipelist/recipelist?key=" + key
		})

  },
  
  hotSearch(e){
   var id = e.target.id
   wx.navigateTo({
     url: '/pages/recipeDetail/recipeDetail?id='+id,
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var result = await db.collection("menu").orderBy("views", "desc").limit(3).get()
		console.log(result);
		var hotList = result.data.map(item => {
			return {
				_id: item._id,
        menuName: item.menuName,
        
			}
    })
   
   this.setData({
       hotList
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
    let arr = wx.getStorageSync("keyword") || [];
		this.setData({
			keywordArr: arr
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