// pages/show/show.js
var likeNum=0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    post: [],
    listStorage:[],
    zanNum:'',
    status:'',
    likeNum: null,
    postData:''
  },
  //借阅论文
  bookTap: function() {
    var xuehaoData = wx.getStorageSync('phone')
    this.setData({
      xuehaoData: xuehaoData
    })
    if(xuehaoData==""){
      wx.showToast({
        title: '您还没登录，去登录吧',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../../pages/lend/lend', //借阅地址
        success: function () {
          title: '借阅渠道'
        }
      })
      wx.showNavigationBarLoading();
      setTimeout(function () {
        wx.hideNavigationBarLoading();
      }, 2000)
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var school_name = wx.getStorageSync('school')

    var zanNum=''
    var currentBook = wx.getStorageSync('id');
    var xuehaoData = wx.getStorageSync('phone')
    this.setData({
      currentBook: currentBook.lunwen_id,
      xuehaoData: xuehaoData
    })

    var that = this
    var getId = options.id
    // console.log(options.id)
    wx.showToast({
        title: ' 正在加载中.....',
        icon: "loading"
    }),

    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/lunweninfo?id=' + options.id + '&&school=' + school_name, //仅为示例，并非真实的接口地址
        method: 'get',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {
          wx.hideLoading();
        },

        success: function(options) {
          that.setData({
            zanNum:options.data.likenum,
            post: options.data,
            thumb: JSON.parse(options.data.thumb_img)
          })
          // console.log(options.data);
           var currentBook=wx.setStorageSync('id', options.data)
          //  console.log(wx.getStorageSync('id'))
          // console.log(options.data)
        }
      })

    //点赞
    this.setData({
      currentId: getId
    });

    //收藏
    this.setData({
      currentPostId: getId
    });
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[getId];
      this.setData({
        collected: postCollected
      });
    } else {
      var postsCollected = {};
      postsCollected[getId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    var listStorage=wx.getStorageSync('posts_collected');
    // console.log(listStorage)
    // 读取所有的文章列表点赞缓存状态
    var cache = wx.getStorageSync('cache_key');
    if (cache) {
      var currentCache = cache[getId];
      this.setData({
        collection: currentCache
      })
    } else {
      var cache = {};
      cache[getId] = false;
      wx.getStorageSync('getId',getId);
      wx.setStorageSync('cache_key', cache);
    } 
    // console.log(wx.getStorageSync('getId'))

    // console.log(wx.getStorageSync('cache_key'))
  },
  //点击查看图片详情
  viewBookDetail:function(e){ 
    var imgArr=[]
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    for(var i=0;i<this.data.thumb.length;i++){
      imgArr.push('http://xubeixyz123.com/LunWen/main/'+this.data.thumb[i])
    }
    this.setData({
      imgArr:imgArr
    })
    wx.previewImage({
      current:imgArr[index],
      urls: imgArr,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(imgArr[index])
    console.log('http://xubeixyz123.com/LunWen/main/'+this.data.thumb)
  },  
  // 点击图片的点赞事件 这里使用的是同步的方式
  toCollect: function (event) {
    var status=''
    var school_name = wx.getStorageSync('school')
    // console.log(school_name)
    var currentBook = wx.getStorageSync('id');
    // console.log(currentBook.likenum)
    var zanNum = currentBook.likenum;
    var cache = wx.getStorageSync('cache_key');
    var currentCache = cache[this.data.currentId];
    

    currentCache = !currentCache;
    cache[this.data.currentId] = currentCache;
    wx.setStorageSync('cache_key', cache);
    this.setData({
      collection: currentCache
    });
    if(currentCache==false){
      this.setData({
        zanNum: zanNum,
        status:0
      })
      // console.log(zanNum)
    }else{
      zanNum++;
      this.setData({
        status:1,
        zanNum: zanNum
      })
      console.log(zanNum)
    }
    wx.request({
      url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/likeClick?id=' + this.data.currentId+'&&action='+this.data.status+'&&school='+school_name,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete() {
        wx.hideLoading();
      },
      success: (res) => {
        console.log(res)
        }
    })
    console.log(this.data.status)
    // 交互反馈
    wx.showToast({
      title: currentCache ? '点赞成功' : '取消点赞',
      icon: 'success',
      duration: 2000
    });

  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: "success"

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