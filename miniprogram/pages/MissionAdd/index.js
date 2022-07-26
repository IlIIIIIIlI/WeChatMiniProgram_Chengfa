Page({
  //保存正在编辑的任务
  data: {
    title: '',
    desc: '',
    
    credit: 0,
    maxCredit: getApp().globalData.maxCredit,
    presetIndex: 0,
    presets: [{
      name:"无预设",
      title:"",
      desc:"",
    },{
      name:"臭嘴 - 傻逼",
      title:"骂了《傻逼》",
      desc:"狠狠罚款 - 10刀， 下面积分也调整",
    },{
      name:"臭嘴 - 傻瓜",
      title:"骂了《傻瓜》",
      desc:"中度罚款 - 5刀， 下面积分也调整",
    },{
      name:"臭嘴 - 蠢蛋",
      title:"骂了《蠢蛋》",
      desc:"中度罚款 - 5刀， 下面积分也调整",
    },{
      name:"臭嘴 - 贱狗",
      title:"骂了《贱狗》",
      desc:"重度罚款 - 15刀， 下面积分也调整",
    },{
      name:"臭嘴 - 分手",
      title:"骂了《分手》",
      desc:"超级重度罚款 - 100刀， 下面积分也调整",
    },{
      name:"臭行为 - 挂电话",
      title:"没说完话挂电话",
      desc:"超级重度罚款 - 100刀， 下面积分也调整",
    }],
    list: getApp().globalData.collectionMissionList,
  },

  //数据输入填写表单
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  onCreditInput(e) {
    this.setData({
      credit: e.detail.value
    })
  },
  onPresetChange(e){
    this.setData({
      presetIndex: e.detail.value,
      title: this.data.presets[e.detail.value].title,
      desc: this.data.presets[e.detail.value].desc,
    })
  },

  //保存任务
  async saveMission() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 12) {
      wx.showToast({
        title: '标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.credit <= 0) {
      wx.showToast({
        title: '一定要有积分',
        icon: 'error',
        duration: 2000
      })
      return
    }else{
        await wx.cloud.callFunction({name: 'addElement', data: this.data}).then(
            () => {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 1000
                })
            }
        )
        setTimeout(function () {
            wx.navigateBack()
        }, 1000)
    }
  },

  // 重置所有表单项
  resetMission() {
    this.setData({
      title: '',
      desc: '',
      credit: 0,
      presetIndex: 0,
      list: getApp().globalData.collectionMissionList,
    })
  }
})