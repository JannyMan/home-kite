// wxRunData/pages/listImg/index.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

let cloud = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRunData()
    let that = this
  },

  clock(){
    console.log(123)
    let {stepList} = this.data
    let {step, timestamp} = stepList[30]
    if(step && step >= 6000){
      console.log(5669)
      cloud.collection('stepList').add({
        data:{
          timestamp,
          step
        }
      }).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    }
  },

  // 获取微信运动数据
  getRunData(){
    let that = this
    wx.login({
      success(){
        console.log()
        wx.getWeRunData({
          success: (resRun) => {
            console.log(resRun)
            wx.cloud.callFunction({
              name: 'weRun',
              data: {
                weRunData: wx.cloud.CloudID(resRun.cloudID),
                obj: {
                  shareInfo: wx.cloud.CloudID(resRun.cloudID)
                }
              },
              success: (res) => {
                console.log(res)
                let stepList = res.result.event.weRunData.data.stepInfoList
                that.setData({
                  stepList,
                  steps: stepList[30]['step']
                })
                let exs = {}
                exs.onInit = that.initChart
                that.setData({
                  ec: exs
                })
              }
            })
          },
        })
      }
    })
  },

  initChart(canvas, width, height) {
    let date = []
    let step = []
    this.data.stepList.forEach((v, index) => {
      console.log(v)
      if(index > 15){
        // step.unshift(v.step)
        step.unshift(v.step)
        date.unshift(new Date(v.timestamp * 1000).getDate())
      }
    })
    console.log(step)
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
      // title: {
      //   text: '测试下面legend的红色区域不应被裁剪',
      //   left: 'center'
      // },
      // color: ["red", "blue", "lime"],
      // legend: {
      //   data: ['A', 'B', 'C'],
      //   top: 50,
      //   left: 'center',
      //   backgroundColor: 'red',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'value',
        boundaryGap: true,
        data: step,
        // show: false
      },
      yAxis: {
        type: 'category',
        x: 'center',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        data: date,
        // show: false
      },
      series: [{
        name: '',
        type: 'line',
        smooth: false,
        data: step
      }]
    };
  
    chart.setOption(option);
    return chart;
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