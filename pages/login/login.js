// pages/login/login.js
const app = new getApp();
Page({
  data: {
    xuehaoData: [],
    passwordData: [],
    phone: '',
    password: '',
    school: '',
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource:[],
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that=this
    var adapterSource=[]
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    wx.request({
      url: 'http://119.29.166.254:9090/api/university/getByUniversityName?name='+prefix,
      method:'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          adapterSource: res.data,
        })
        for(var i=0;i<res.data.length;i++){
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
      school:e.target.id
    })
    // console.log(e.target.id)
  },




 
  // //获取输入的学校
  // schoolInput:function(e){
  //   this.setData({
  //     school:e.detail.value
  //   })
  // },

  // 获取输入账号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  toRegister: function() {
    wx.navigateTo({
      url: '../../pages/register/register',
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    var school=this.data.school
    console.log(school)
    wx.setStorageSync('school', school)
    var school_name = wx.getStorageInfoSync('school')


    console.log(school)
    var phone = this.data.phone
    var password = this.data.password
    
    if (this.data.phone.length == 0 || this.data.password.length == 0||school_name=='') {
      wx.showToast({
        width: '200rpx',
        title: '用户名、学校、密码不能为空',
        icon: 'none',
        // duration: 2000
      })
    } else if (this.data.phone !== "" && this.data.password !== "" &&school_name!=="") {
      console.log(phone)
      wx: wx.request({
        url: 'http://xubeixyz123.com/LunWen/main/index.php/Admin/Data/consumerLogin',
        method: 'POST',
        data: {
          school:school,
          consumer_unionid: phone,
          password: password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        complete() {
          wx.hideLoading();
        },
        success: (res) => {
          console.log(res.data)
          if (res.data == '该学校已停止服务!') {
          wx.showToast({
            title: '该学校已停止服务',
          })

          }
          if (res.data == "登录成功") {
            wx.setStorageSync('phone', phone)
            wx.setStorageSync('password', password)
            
            var xuehaoData = wx.getStorageSync('phone');
            var school_name = wx.getStorageSync('school')

            console.log(school_name)

            wx.showToast({
              title: '登录成功',
              icon: 'success',
              // duration: 2000,
              success: function() {
                wx.navigateBack({
                  url: '../../pages/index/index'
                })
              }

            })
          } else if (res.data == "该学校无此服务!"){
            wx.showToast({
              title: '该学校无此服务!',
              icon: 'none',
              // duration: 2000
            })
          }
           else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              // duration: 2000
            })
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '登录失败',
            icon: 'warn'
          })
        }
      })
  
      
      if (phone == "") {
        console.log("学号为空")
      }

    }
    else {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        // duration: 2000
      })

    }

  },

  onLoad: function(res) {
    var that = this
    if (res.xuehaoData == "") {
      console.log('请输入用户名')
    }
  },
})