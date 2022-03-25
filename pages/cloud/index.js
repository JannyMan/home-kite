// pages/index/index.js
// 数据库初始化
const cloud = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  addData(){
    let userDb = cloud.collection("user")
    userDb.add({
      data: {
        name: '江林',
        sex: 1,
        age: 31,
        avatarUrl: '',
        address: '湖北省武汉市盘龙城经济开发区宋岗一路万润橄榄城',
        lat: 30.723372,
        lng: 114.24463,
        profession: 'web前端工程师',
        workingYears: 7,
        university: '武汉商贸职业学院'
      },
      success(res){
        console.log('添加成功', res)
      },
      fail(res){
        console.log('添加失败' + res)
      }
    })
  },

  // 备忘录
  getCalendar(){
    wx.navigateTo({
      url: '/calendar/pages/list/index'
    })
  },

  searchData(){
    console.log('查询数据')
    // todoDb.doc('5b049cc8621985400e5179723bec8adc').get().then(res => {
    //   console.log(res)
    // })
    // todoDb.where({
    //   _openid: 'oj4AR5azfmtw3_gtdK1PVtgg1RVk'
    // }).get().then(res => {
    //   console.log(res)
    // })
    todoDb.get().then(res => {
      console.log(res)
    })
  },

  cloudFun(){
    wx.cloud.callFunction({
      name: 'user',
      data: {
        a: 2,
        b: 3
      }
    }).then(res => {
      console.log(res)
    })
  },

  getData(){
    console.log('获取数据')
    wx.cloud.callFunction({
      name: 'getdata',
      data: {
        a: 6,
        b: 7
      }
    }).then(res => {
      console.log(res)
    })
  },

  upLoad(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed']
    }).then(res => {
      let {tempFilePaths} = res
      console.log(res)
      console.log(tempFilePaths)
      for(let i = 0; i < tempFilePaths.length; i++){
        wx.cloud.uploadFile({
          cloudPath: 'logo1.png',
          filePath: tempFilePaths[i]
        }).then(res => {
          console.log(res)
          let {fileID} = res
          this.setData({
            fileID
          })
        }).catch(res => {
          console.log(res)
        })
      }
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