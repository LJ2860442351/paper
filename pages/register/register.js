Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuehao:'',
    password:'',
    rePassword:'',
    school:'',
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: [],
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },
  //获取输入的学校
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that = this
    var adapterSource = []
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    wx.request({
      url: 'http://119.29.166.254:9090/api/university/getByUniversityName?name=' + prefix,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          adapterSource: res.data,
        })
        for (var i = 0; i < res.data.length; i++) {
          adapterSource.push(res.data[i].name);
        }
        that.setData({
          adapterSource: adapterSource
        })
        
      }

    })
    console.log(adapterSource)
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          newSource.push(e)
        }
      })
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
    }
  },
  itemtap: function (e) {
    this.setData({
      inputValue: e.target.id,
      bindSource: [],
      school: e.target.id
    })
    // console.log(e.target.id)
  },


  // 获取输入账号
  xuehaoInput: function (e) {
    this.setData({
      xuehao: e.detail.value
    })
  },


  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  rePasswordInput: function(e){
   this.setData({
     rePassword:e.detail.value
   }) 
  },


  returnBack:function(){
    wx.navigateBack({
      url:'../../register/register'
    })
  },

  // 登录
  register: function (e) {
    var that=this
    var xuehao=this.data.xuehao
    var school=this.data.school

    var password=this.data.password
    var rePassword=this.data.password
    
    if (this.data.xuehao.length == 0 || this.data.password.length == 0||school=='') {
      wx.showToast({
        width: '200rpx',
        title: '用户名、学校、密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }else if (this.data.password!==this.data.rePassword){
      wx.showToast({
        title: '两次密码不一致',
        icon:'warn'
      })

    }else if (this.data.xuehao !== "" && this.data.password !== ""&&this.data.rePassword !==""&&school!=="") {
      wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/getConsumer?school'+school,
        method:'POST',
        data:{
          school:school,
          consumer_unionid:xuehao,
          password:password
        },  
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        complete() {
          wx.hideLoading();
        },
        success: (res) => {
          if (res.data == '该学校已停止服务!') {
            wx.showToast({
              title: '该学校已停止服务!',
              icon: 'none'
            })
          } else if (res.data =="此用户已注册"){
            wx.showToast({
              title: '此用户已注册',
            })
          }else{
            wx.showToast({
              title: '注册成功',
            })
          }
         
          console.log(res)
        },
        // success: function (res) {
        //   that.setData({
        //     consumer_unionid: xuehao,
        //     password:password
        //   })
        //   // console.log(password)
        // }
      })
      // console.log(that.data)



      //这里修改成跳转的页面
      // wx.showToast({
      //   title: '注册成功',
      //   icon: 'success',
      //   duration: 4000,
      //   //跳转不能用，记得修改
      //   success: function () {
      //     wx.navigateTo({
      //       url: '/pages/login/login',
      //     })
      //   }
      // })

    } else {
      wx.showToast({
        title: '注册失败',
        icon: 'none',
        duration: 2000
      })
    }
    // console.log(xuehao)
    // console.log(password)
    // console.log(rePassword)
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