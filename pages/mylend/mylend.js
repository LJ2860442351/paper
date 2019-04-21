// pages/mylend/mylend.js
Page({
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 100);
    wx.navigateTo({
      url: '../../pages/mylend/mylend',
    })
    wx.showToast({
      title: '更新中....',
      icon:'loading',
      // duration:1000
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    lendlist: []
  },
  
  refresh:function(){
    this.onLoad();
    wx.showToast({
      title: '刷新中....',
      icon: 'loading',
      // duration:1000
    })
    console.log('刷新成功')
  },
  returnBtn: function(event) {
    var id = event.currentTarget.id
    var consumer_unionid = wx.getStorageSync('phone')
    var school_name = wx.getStorageSync('school')

    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Lunwen/finish_return?return_id=' + id+'&&school='+school_name,
      method: 'GET',
      data: {
        consumer_unionid: consumer_unionid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete() {
        wx.hideLoading();
      },
      success: (res) => {
        wx.showToast({
          title: '等待管理员审核，请您及时归还',
          icon:'none',
          // duration:3000
        })
        // console.log(res)
      }
    })
    
  },

  onPullDownRefresh: function () {
   this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var lendlist = []
    var lended = []
    var school_name = wx.getStorageSync('school')
    var consumer_unionid = wx.getStorageSync('phone')
    if (consumer_unionid == "") {
      wx.showToast({
        title: '您还没登录，暂无借阅信息',
        icon: 'none',
        // duration: 3000,
      })


    }
    this.setData({
      consumer_unionid: consumer_unionid
    })
    console.log(consumer_unionid)
    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/userBorrowList?consumer_unionid=' + consumer_unionid,
      method: 'POST',
      data: {
        school:school_name,
        consumer_unionid: consumer_unionid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      complete() {
        wx.hideLoading();
      },
      success: (res) => {

        if (res.data == "用户异常" || res.data == "暂无借书") {
          wx.showToast({
            title: '暂无借书',
          })
        } else {
          var that = this
          this.setData({
            lendlunwen: res.data.borrow,
            borrowReturn: res.data.return
          })
          console.log(res)
          if (res.data.borrow == '暂无借书'&&res.data.return == '无待归还论文') {
            wx.showToast({
              title: '暂无借阅',
              icon: 'none'
            })
            // this.setData({
            //   lendlunwen:"暂无借阅",
            //   borrowReturn:"无待归还论文"
            // })
          }
          if (res.data.borrow !== '暂无借书'&&res.data.return =='无待归还论文'){
            this.setData({
              lendlunwen: res.data.borrow,
            })
          }

        }
        // 0 代表已借阅 1代表待审核  
        console.log(res.data)
      }
    })




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
    this.onLoad();
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