//app.js
App({

  onLaunch: function() {
    var school_name = wx.getStorageSync('school')
    if (school_name == "") {
      wx.showToast({
        title: '您还没登录',
        duration: 4000,
        success: function () {
          wx.navigateTo({
            url: './pages/login/login',
          })
        }
      })

    }

    var that = this
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/newlunwen', //仅为示例，并非真实的接口地址
        method: 'get',
        data: [],
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },
        success: function(res) {
          data: res.data
        }
      })


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null,
  },
  onLoad: function(options) {
   
  }


  
})