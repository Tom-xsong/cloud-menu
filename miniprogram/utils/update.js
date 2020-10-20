async function multiUpload(tempFilePaths) {
	var arr = [] //定义一个数组
	tempFilePaths.forEach(async item => {
		var nowtime = new Date().getTime() //定义文件名称
		var ext = item.split(".").pop() //获取文件扩展名

		//把promise对象push到数组里面去
		var promise = wx.cloud.uploadFile({
			cloudPath: nowtime + "." + ext,
			filePath: item,

		})
		arr.push(promise)
	})

	//所有上传都完成，返回一个结果
	return await Promise.all(arr);
}

export {
	multiUpload
}
