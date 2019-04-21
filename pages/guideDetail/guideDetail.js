// pages/guideDetail/guideDetail.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guidelist: [],
  },
  //点击查看图片详情
  viewBookDetail: function (e) {
    var imgArr = []
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < this.data.word_img.length; i++) {
      imgArr.push('http://xubeixyz123.com/LunWen/main/' + this.data.word_img[i])
    }
    this.setData({
      imgArr: imgArr
    })
    console.log(imgArr)
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    var info= wx.getStorageSync('Info')
    var school_name = wx.getStorageSync('school')
    if (info == '格式'||info=='答辩') {
      //  console.log(info)
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/getword?word_type='+info+'&&school='+school_name,
        method: 'GET',  
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },
        
        success: function(res) {
          
            that.setData({
              guidelist: res.data,
              word_img: JSON.parse(res.data.word_img)
            })
          console.log(res.data)
        }
      })
    }
  
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})