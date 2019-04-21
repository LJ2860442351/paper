// pages/lend/lend.js
import post from '../show/show.js'
var lendNum = 0;
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:'',  
  },
  phoneInput:function(e){
    this.setData({
      phoneNumber:e.detail.value
    })
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  DateChange: function (res) {
    this.setData({
      date: res.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },


  lendBtn:function(){
    var school_name = wx.getStorageSync('school')
    var mPattern = /^1[34578]\d{9}$/;
    var phone=this.data.phoneNumber
    if (mPattern.test(phone)==false){
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
      })
    }else{

      var lunwen_id = wx.getStorageSync('id');
      var consumer_unionid = wx.getStorageSync('phone')
      this.setData({
        lunwen_id: lunwen_id.lunwen_id,
        consumer_unionid: consumer_unionid,
        phone: phone
      })
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Consumer/borrowLunwen?school='+school_name,
        method:'POST',
        data:{
          school:school_name,
          lunwen_id: lunwen_id.lunwen_id,
          consumer_unionid: consumer_unionid,
          phone: phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        complete() {
          wx.hideLoading();
        },
        
        success: (res) => {
          console.log(res.data)
          if(res.data == "借阅成功!"){
            wx.showToast({
              title: '借阅成功',
              icon:'success',
              // duration:5000
            })
          } else if (res.data =="该论文已被借阅"){
            wx.showToast({
              title: '该论文已被借阅',
              icon:'none',
              // duration: 5000
            })
          } else if (res.data == "借书已超过上限"){
            wx.showToast({
              title: '借书已超过上限,只能借阅4本哦',
              icon: 'none',
              // duration: 5000
            })
          }else{
            wx.showToast({
              title: '借阅失败',
              icon:'none',
              // duration:5000
            })
          }
        },
      })
      console.log(this.data)
      // console.log(currentBook.lunwen_id)
      // console.log(xuehaoData)
    }



    
    // console.log(currentBook)

    // wx.showToast({
    
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var currentBook=wx.getStorageSync('id');
    var xuehaoData = wx.getStorageSync('phone')
    this.setData({
      currentBook: currentBook.lunwen_id,
      xuehaoData:xuehaoData
    })
    // console.log(currentBook.lunwen_id)
    // console.log(xuehaoData)

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