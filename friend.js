// pages/friend/friend.js

const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    my_id: "b17ee42c636b5314007380a6448e7085",
    datalist: [
      [{
        'id': 'dfhsdkjhfkj',
        'name': '没妈妈yk',
        'intro': 'intro0',
        'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
      }, {
        'id': 'asdfasfasdfsd',
        'name': 'girl1',
        'intro': 'intro1',
        'friend_tag': ['1_tag1', '1_tag2', '1_tag3']
      }, {
        'id': 'asfsdfsdfsdf',
        'name': 'boy0',
        'intro': 'intro0',
        'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
      }], 
      [{
        'id': 'sadassfdsfweq',
        'name': 'boy0',
        'intro': 'intro0',
        'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
      }]
    ],
    friendlist: [{
      'id': 'sadasfsdf',
      'name': 'girl0',
      'intro': 'intro0',
      'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
    }, {
      'id': 'asfdsfsdtr',
      'name': 'girl1',
      'intro': 'intro1',
      'friend_tag': ['1_tag1', '1_tag2', '1_tag3']
    }]
  },
  update() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    let my_tag=[]
    this.data.datalist[1] = []

    db.collection('friends').doc(app.globalData.my_id)
    .get({
      success: function(res) {
          my_tag = JSON.parse(JSON.stringify(res.data.friend_tag));   
        }
    })
    // setTimeout(function(){
    //   db.collection('friends')
    //     .aggregate()
    //     .project({
    //       friend_tag: $.setIntersection('读书')
    //     })
    //     .end()
    // },500)
    setTimeout(function(){
      // console.log(my_tag)
      // console.log(my_tag.length)
      for(var i=0;i<my_tag.length;++i){
        // console.log(my_tag[i])
        db.collection('friends').where({
          _id:_.neq(app.globalData.my_id),
          friend_tag: _.all([my_tag[i]])
        })
        .get({
          success: function(res) {
            if(res.data.length==1) {
              var friend= {
                'id': res.data.id,
                'name': res.data.name,
                'intro': res.data.intro,
                'friend_tag': res.data.friend_tag
              }
              this.data.datalist[1].push(friend)
              // console.log(friend)
            }
            else{
              for(var j=0;j<res.data.length;++j) {
                console.log(res.data[j])
                var friend= {
                  'id': res.data[j].id,
                  'name': res.data[j].name,
                  'intro': res.data[j].intro,
                  'friend_tag': res.data[j].friend_tag
                }
                this.data.datalist[1].push(friend)
                console.log(this.data.datalist[1])
              }
            }
          }
        })
      }
    },500)

    // setTimeout(function(){
    //   console.log(this.data.datalist[1])
    // },1000)
  },
  recommend() {
    this.update()
    // console.log(this.data.my_id)
    this.setData({
      friendlist: this.data.datalist[0],
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
    })
  },
  recent() {
    this.update()
    this.setData({
      friendlist: this.data.datalist[1],
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2bgc: "#f0f9f6",
      nav2color: "#588c7e",
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})