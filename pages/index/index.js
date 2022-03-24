let cloud = wx.cloud.database()
var app = getApp()
let statusBarHeight = app.globalData.statusBarHeight
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: []
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   * add by kyle 增加load options 获取用户打开页面时的参数
   */
  onLoad: function () {
    cloud.collection('user').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        userInfo: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getUserower() {
    // 是否显示助力活动
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userDb = cloud
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