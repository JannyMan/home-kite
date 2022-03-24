// pages/custom-tab-bar/index.js
const app = getApp()
let isIPX = app.globalData.isIPX
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    zIndex: {
      type: Number,
      value: 1
    },
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    resize: {
      type: Boolean,
      value: true
    },
    showBack: {
      type: Boolean,
      value: false,
    },
    back: {
      type: Function
    },
    navType: {
      type: [String, Number],
      value: '1'
    },
    color: {
      type: String
    },
    title: {
      type: String
    },
    titleStyle: {
      type: String
    },
    url: {
      type: String
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: Boolean,
      value: false,
    },
    type: {
      type: [String, Number],
      value: '1'
    },
    active: {
      type: [String, Number],
      value: '1'
    },
  },
  observers: {
    'backgroundColor': function(res){
      if(res == 'transparent'){
        this.setData({
          showBlank: false
        })
      }
    }
  },
  lifetimes: {
    ready: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        isIphoneX: isIPX
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    // 这里是一些组件内部数据
    isIphoneX: false,
    showBlank: true,
    iphone: app.globalData.systemInfo.brand == 'iPhone' ? true : false
  },
  methods: {
    /**
      * 获取当前 URL 所有 GET 查询参数
      * 入参：要解析的 URL，不传则默认为当前 URL
      * 返回：一个<key, value>参数对象
      */
     getUrlQueryParams(url){
      let queryParam = {}
      if(url && url != ''){
        let param = url.split('?')
        let queryParamArr = []
        if(param.length > 1){
          queryParamArr = param[1].split('&')
        }
        if(queryParamArr.length > 0){
          queryParamArr.forEach(v => {
            let item = v.split('=')
            queryParam[item[0]] = item[1]
          })
        }
      }
      return queryParam
    },
    goPage(){
      let param = this.getUrlQueryParams(this.data.url)
      let blen = Object.getOwnPropertyNames(param).length == 0
      if(this.data.navType == 1){
        if(this.data.url && blen){
          app.bannerToPage(this.data.url)
        }else if(this.data.url && !blen){
          let url = this.data.url.split('?')[0]
          app.bannerToPage(url, param)
        }else{
          app.bannerToPage('/pages/index/index/index')
        }
      }else if(this.data.navType == 2){
        this.triggerEvent('back')
      }


      // console.info('返回：',getCurrentPages().length)
      // if(getCurrentPages().length<2){
        // wx.reLaunch({
        //   url: this.data.url?this.data.url:'/pages/index/index/index',
        // })
      // }else{
      //   wx.navigateBack({
      //     delta: 1,
      //   })
      // }
    },
    changeTab(e){
      this.triggerEvent('changeTab',e.currentTarget.dataset.index)
    }
  }
})