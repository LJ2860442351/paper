// pages/guideDetail/youxiuInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //点击查看图片详情
  viewBookDetail: function (e) {
    var imgArr = []
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < this.data.thumb.length; i++) {
      imgArr.push('http://xubeixyz123.com/LunWen/main/' + this.data.thumb[i])
    }
    this.setData({
      imgArr: imgArr
    })
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
  onLoad: function (options) {
    var school_name = wx.getStorageSync('school')

    // console.log(options)
    var that = this
    var getId = options.id
    console.log(options.id)
    wx.showToast({
      title: ' 正在加载中.....',
      icon: "loading"
    }),

      wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/bookInfo?id=' + options.id+'&&school='+school_name, //仅为示例，并非真实的接口地址
        method: 'get',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },

        success: function (options) {
          that.setData({
            post: options.data,
            thumb: JSON.parse(options.data.thumb_img)
          })
          // var currentBook = wx.setStorageSync('id', options.data)
          //  console.log(wx.getStorageSync('id'))
          console.log(options.data)
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