// pages/wifi/index.js
// 数据库初始化
const cloud = wx.cloud.database()
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowAddress: {},
    localtionArr: [],
    localtion: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wifiDb = cloud.collection("wifi")
    wifiDb.get().then(res => {
      console.log(res)
      app.getLocation(data => {
        let {adcode} = data.ad_info
        console.log(data.ad_info.adcode)
        
        let x = data.location
        
        res.data.forEach(v => {
          if(adcode == v.adcode){
            this.setData({
              nowAddress: v
            })
          }
        })
        this.setData({
          localtionArr: res.data,
          localtion: data
        })
      })
    })
  },

  startWifi(){
    let that = this
    wx.showLoading({
      title: '正在连接',
    })
    wx.startWifi({
      success: () => {
        that.connectWifi()
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '连接失败',
          icon: 'error'
        })
      }
    })
  },
  connectWifi(){
    wx.connectWifi({
      SSID: this.data.nowAddress.wifiName,
      password: this.data.nowAddress.password,
      success: (res) => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '连接成功',
        })
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '连接失败',
          icon: 'error'
        })
      }
    })
  },


  setClipboardData(){
    wx.setClipboardData({
      data: this.data.nowAddress.password,
      success(res){
        wx.getClipboardData({
          success: (res) => {
            wx.showToast({
              title: '复制成功'
            })
          },
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