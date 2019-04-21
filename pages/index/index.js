var util = require("../../utils/util.js")
Page({
  data: {
    list: [],
    pageNum: 1, // 设置加载的第几次，默认是第一次
    isFirstLoad: true, // 用于判断List数组是不是空数组，默认true，空的数组
    hasMore: false, // “加载更多”
    time: util.formatTime(new Date()),

    //轮播
    imgUrls: [
      '../../images/list1.jpg',
      '../../images/list2.jpg',
      '../../images/list3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },


  toSearch:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  // 上拉加载
  onReachBottom(e) {
    let that = this;
    if (that.data.hasMore) {
      that.setData({
        pageNum: that.data.pageNum + 1, // 每次触发上拉事件，把pageNum+1
        isFirstLoad: false // 触发到上拉事件，把isFirstLoad设为为false
      });

      that.loadData();
    }
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let newwords = [{ message: '从天而降', viewid: '-1', time: util.formatTime(new Date), greeting: 'hello' }].concat(this.data.words);
    setTimeout(() => {
      this.setData({
        words: newwords
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000)
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    var school_name = wx.getStorageSync('school')
    // console.log(school_name)

    var that = this
    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/data/newlunwen?school=' + school_name,
      method: 'get',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete() {
        wx.hideLoading();
      },

      success: function (res) {
        that.setData({
          list: res.data
        })
        console.log(res.data)
      }

    })
  },
  onLoad: function(res) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    var school_name = wx.getStorageSync('school')
    // console.log(school_name)

    var that = this
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/data/newlunwen?school=' +school_name, 
        method: 'get',
        data: {

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },

        success: function(res) {
          that.setData({
            list: res.data
          })
          console.log(res.data)
        }

      })
  },
  onShow:function(e){
    this.onLoad();
  }

})