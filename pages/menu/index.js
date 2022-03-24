// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let batteryInfo = wx.getBatteryInfoSync()
    console.log(batteryInfo)
    wx.getNetworkType({
      success: (res) => {
        console.log(res)
      }
    })
    wx.getRandomValues({
      length: 6, // 生成 6 个字节长度的随机数,
      success: res => {
        console.log(wx.arrayBufferToBase64(res.randomValues)) // 转换为 base64 字符串后打印
      }
    })
    wx.getLocalIPAddress({
      success(res) {
        console.log(res)
        const localip = res.localip
      }
    })
    // wx.makePhoneCall({
    //   phoneNumber: '18971341156' //仅为示例，并非真实的电话号码
    // })
  },

  connectWifi: function () {
    var that = this;
    //检测手机型号
    wx.getSystemInfo({
      success: function (res) {
        var system = '';
        if (res.platform == 'android') system = parseInt(res.system.substr(8));
        if (res.platform == 'ios') system = parseInt(res.system.substr(4));
        if (res.platform == 'android' && system < 6) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        if (res.platform == 'ios' && system < 11.2) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        //2.初始化 Wi-Fi 模块
        that.startWifi();
      }
    })
  },
  //初始化 Wi-Fi 模块
  startWifi: function () {
    var that = this
    wx.startWifi({
      success: function () {
        //请求成功连接Wifi
        wx.showToast({
          title: '初始化成功',
        })
        that.Connected();
      },
      fail: function (res) {
        wx.showToast({
          title: '接口调用失败',
        })
      }
    })
  },
  Connected: function () {
    var that = this
    wx.connectWifi({
      SSID: 'HXQC.COM',
      password: 'hxqc6666',
      success: function (res) {
        wx.showToast({
          title: 'wifi连接成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'wifi连接失败',
        })
      }
    })
  },
  //使用的参数
  data: {
    accountNumber: '', //Wi-Fi 的SSID，即账号
    bssid: '', //Wi-Fi 的ISSID
    password: '', //Wi-Fi 的密码
  },
  scanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  addPhoneCalendar() {
    wx.addPhoneCalendar({
      startTime: 1644631748,
      title: '添加到日历',
      description: '测试添加到日历事件',
      success: (res) => {
        wx.showToast({
          title: '添加成功',
        })
      }
    })
  },

  chooseContact() {
    wx.chooseContact({
      success: (res) => {
        console.log(res)
      }
    })
  },

  addPhoneContact() {
    wx.addPhoneContact({
      firstName: '江林',
      mobilePhoneNumber: '18971341156',
      success: (res) => {
        console.log(res)
      }
    })
  },

  vibrateShort() {
    wx.vibrateShort({
      type: 'medium',
      success: (res) => {
        console.log(res)
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