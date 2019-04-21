Page({
  data: {
    list:[],
    rank: [],
    rankName:[],
    ranklist: [],
    rankLunwen:[],
    activeIndex: 0,
  },
  getName:function(res){
  
    this.setData({
      rankName:res
    })
    var name = res.currentTarget.dataset.name
    wx.setStorageSync('name', name)
  },
  
  onLoad: function(res) {
    var school_name = wx.getStorageSync('school')

    var that = this;
    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/getRank?school='+school_name, //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          rank: res.data.rank,
        })
        console.log(res)
        that.setData({
          ranklist: res.data.sele
        })
      }
    })
  },
  onShow:function(e){
    this.onLoad();
  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id,
    });

  }
  
});