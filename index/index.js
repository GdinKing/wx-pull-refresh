const app = getApp()

Page({
  data: {
    isRefreshing: false,//是否下拉刷新状态
    isFinish: false,//是否加载完全部数据
    dataList: [],
    pageNum: 1 // 页码
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中'
    })
    this.loadData(true)
  },
  //加载数据
  loadData: function(isRefresh) {
    let arr = []
    setTimeout(() => {
      for (let i = 1; i <= 10; i++) {
        arr.push({
          id: i,
          name: '第' + this.data.pageNum + '页 第' + i + '条'
        })
      }
      if (isRefresh) {
        this.setData({
          dataList: arr
        })
      } else {
        this.setData({
          dataList: this.data.dataList.concat(arr)
        })
      }
      this.setData({
        isRefreshing: false,//关闭下拉刷新
        isFinish: this.data.dataList.length > 20 //全部加载完毕
      })
      wx.hideLoading();
    }, 2000);
  },
  onRefresh: function () {
    this.setData({
      pageNum: 1
    })
    this.loadData(true)
  },
  onLoadMore: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.loadData(false)
  },
  onPulling:function(e){
    //e.detail == 0 下拉状态， e.detail == 1下拉到极限，松开触发刷新
    console.log(e);

  }
})