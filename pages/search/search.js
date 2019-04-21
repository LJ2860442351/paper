Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    search:'',
  },
  searchInput:function(e){
    this.setData({
      search:e.detail.value,
    })
  },
  //搜索
  inputChange: function (e) {
    this.data.inputVal = e.detail.value;

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
  },

  //搜索事件
  formData:function(e){
    var school_name = wx.getStorageSync('school')
    var search=this.data.search
    if(search==""){
      wx.showToast({
        title: '请输入您要搜索的内容....',
        icon:'none'
      })
    }else{
      var that = this
      var formData = e.detail.value

      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/search?keyWords=' + formData.id + '&&school=' + school_name,
        data: formData.id,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          // console.log(res.data)
          that.setData({
            re: res.data,
          })
          if (res.data == "搜索结果为空"){
            wx.showToast({
              title: '暂无此相关数据,请重新输入',
              icon: 'none',
              // duration: 100,
            })
            that.setData({
              re:0
            })
          }else{
            // console.log(res.data)
            wx.showToast({
              title: '搜索中...',
              icon: 'loading',
              duration: 100,
            })
          }
          

        },
        fail: function (res) {
          that.setData({
            re: "没有找到",
            // state:false
          })
        }

      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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