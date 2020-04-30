// 支持下拉刷新-上拉加载的组件
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    refresherEnable:{
      type: Boolean,
      value: true
    },
    refresherType: {
      type: String,
      value: 'default',
    },
    loadType: {
      type: String,
      value: 'default',
    },
    pullText: {
      type: String,
      value: '下拉刷新',
    },
    releaseText: {
      type: String,
      value: '松开立即刷新',
    },
    loadingText: {
      type: String,
      value: '正在刷新',
    },
    loadmoreText: {
      type: String,
      value: '加载中',
    },
    nomoreText: {
      type: String,
      value: '没有更多数据',
    },
    pullDownHeight: {
      type: Number,
      value: 60,
    },
    refreshing: {
      type: Boolean,
      value: false,
      observer: '_onRefreshFinished',
    },
    scrollY: {
      type: Boolean,
      value: true
    },
    nomore: {
      type: Boolean,
      value: false,
    },
    showLoading:{
      type: Boolean,
      value: true,
    },
    scrollToView:{
      type:String,
      value:''
    },
    scrollWithAnimation:{
      type: Boolean,
      value: false,
    },
    enableBackToTop:{
      type: Boolean,
      value: false
    }
  },
  data: {
    pullState: 0,
    lastScrollEnd: 0,
    scrollTop: 0,
    isLoadMore: false,
    moveY: -60
  },
  attached() {
    this.setData({
      endY: -this.properties.pullDownHeight
    })
  },
  methods: {
    //滚动事件
    _onScroll: function (e) {
      this.triggerEvent('scroll', e);
    },
    //被下拉
    _onPulling: function (e) {
      let y = e.detail.dy
      if (y < this.properties.pullDownHeight) {
        this.setData({
          pullState: 0
        })
      } else {
        this.setData({
          pullState: 1
        })
      }
      this.triggerEvent('onpulling',this.data.pullState);
    },
    //滚动到顶部
    _onScrollTop: function (e){
      this.triggerEvent('scrolltoupper', e);
    },
    //下拉刷新关闭了
    _onClose: function (e) {
      this.triggerEvent('onrefreshclose', e);
    },
    //下拉刷新执行
    _onRefresh: function (e) {
      this.setData({
        pullState: 2
      })
      this.triggerEvent('onrefresh', e);
    },
    //滚动到底部
    _onLoadmore: function (e) {
      this.triggerEvent('scrolltolower', e)
      if (!this.properties.nomore && !this.properties.refreshing) {
        this.triggerEvent('loadmore', e);
      }
    },
  },
})