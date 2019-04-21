// pages/colletct/collect.js
import listStorage from '../show/show.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    // newList:[],
    listStorage: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var school_name = wx.getStorageSync('school')
    var newList = []
    var that = this
    var consumer_unionid = wx.getStorageSync('phone')
    if (consumer_unionid == "") {
      wx.showToast({
        title: '您还没登录，暂无收藏信息',
        icon: 'none',
        duration: 3000,
      })
    }
    this.setData({
      consumer_unionid: consumer_unionid
    })
    var listStorage = wx.getStorageSync('posts_collected');
    for (var key in listStorage) {
      if (listStorage[key] == true) {
        wx.request({
          url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/lunweninfo?id=' + key+'&&school='+school_name,
          data: {},
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(options) {
            that.setData({
              list: options,
              newList: options.data
            })
            // console.log(options.data)
              newList.push(options.data)
              that.setData({
                newList: newList
              })

          }

        })
      }
    }

    // console.log(newList)

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