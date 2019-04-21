// pages/guideDetail/youxiu.js
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
    var school_name = wx.getStorageSync('school')

    var that = this
    var info = wx.getStorageSync('Info')
    console.log(info)
    // var dabian = wx.getStorageSync('dabianInfo')
      //  console.log(geshi)
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/getLunwenBook?school='+school_name,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },

        success: function (res) {
          that.setData({
            info:info,
            guidelist: res.data,
            // word_img: JSON.parse(res.data.word_img)
          })
          console.log(res.data)
          // console.log(JSON.parse(res.data[0].word_img))
          // console.log(res.data)
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