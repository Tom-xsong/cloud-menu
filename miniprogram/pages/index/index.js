import {get ,update, getById} from "../../utils/db"
const db = wx.cloud.database()

Page({
  data:{
    menuList:[],
    key:'',
    pageSize: 4,
    page: 0
  },

 async toDetail(e){
    var id = e.currentTarget.id
    let result = await getById("menu",id)
     console.log(result)
     var views = result.data.views + 1
    let result1 =await update("menu",id,{views})

    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+id
    })

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
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?key='+key,
    })
  },

  toType(){
    wx.navigateTo({
      url: '/pages/typelist/typelist',
    })

  },

  toHot(){
    wx.navigateTo({
      url: '/pages/hot/hot',
    })

  },

  

 async onLoad(){
  


  },



  async onShow(){
    this.data.page = 0
    let result1 =await db.collection("menu").where({}).orderBy("addTime","desc").limit(4).get()
      this.setData({
        menuList:result1.data
      })

   

  },
  onReachBottom() {
    this.data.page += 1;
		var pageSize = this.data.pageSize;
		this.getList(this.data.page, pageSize)
  },

  async getList(page, pageSize) {
    var result = await db.collection("menu").orderBy("addTime","desc").skip(page * pageSize).limit(this.data.pageSize).get()
    console.log(result)
    if(result.data.length == 0 ){
      this.setData({
        show:true
      })
    }
		this.setData({
      menuList: this.data.menuList.concat(result.data)
    })
	},
	
	


  
})