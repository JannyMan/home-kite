// app.js
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js')
var qqmapsdk
App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-5gj0ixgo33b138e2"
    })
    wx.cloud.callFunction({
      name: 'getOpenId'
    }).then(res => {
      let { openid } = res.result
      this.globalData.openid = openid
      wx.setStorageSync('openid', openid)
    })
    qqmapsdk = new QQMapWX({
      key: 'PM3BZ-V4ULJ-MDVFM-KXSTG-BHBP3-27F2H'
    })
  },
  getLocation(success, fail){
    wx.getLocation({
      isHighAccuracy: true,
      success: function(res){
        console.log(res)
        let {latitude, longitude} = res
        // 30.723658,114.245071
        // r: 30.723298,114.245933 l: 30.723707,114.241531 t: 30.724858,114.246491 b: 30.721887,114.241813
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: function(data){
            console.log({...data.result, ...res})
            typeof success === 'function' && success({...data.result, ...res})
          }
        })
      }
    })
  },
  globalData: {
    openid: '',
    happyNewYaer: null,
    startTime: {},
    safeAreaInsetBottom: 0,
    isWxAttention: '',   //是否关注(10:未关注 20:已关注)
    systemInfo: {},
    shareInfo: () => false,
    navBarHeight: 46,
    userInfo: null,
    wxEnv: '',
    isIPX: false,  //判断是否是刘海屏幕  isIPX?'88px':'64px'
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],//获取状态栏高度
    recommend: {}
  },
})