const db = wx.cloud.database(); //拿到数据库的引用
const _ = db.command
 //查询
 async function get(_collection = "", _where = {}) {
  var result = await db.collection(_collection).where(_where).get()
  return result;
}
//根据id进行查询
async function getById(_collection,_id) {
  return await db.collection(_collection).doc(_id).get()
}


//添加数据
async function add(_collection="",_data={}){
	return await db.collection(_collection).add({
		data:_data
	})
 }


//修改
 async function update(_collection="",_id,_data={}){
	return await db.collection(_collection).doc(_id).update({
    data:_data
  })
 }


// 删除
async function del (_collection,_id){
  return await db.collection(_collection).doc(_id).remove().then(res=>{
     console.log(res)
   })

}

async function dels (_collection,_where={}){
  return await db.collection(_collection).where(_where).remove().then(res=>{
     console.log(res)
   })

}

export {
  get,
  getById,
  add,
  update,
  del,
  dels
}








