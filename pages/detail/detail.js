// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    state:false
  },
  rankLunwen: function (option) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var school_name = wx.getStorageSync('school')
    var selectname = wx.getStorageSync('name')
    var state=true
    var that = this
    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/rankLunwen?sele_name='+selectname+'&&school='+school_name,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(option) {
        that.setData({
          list: option.data,
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