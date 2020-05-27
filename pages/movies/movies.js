// pages/movies/movies.js
const app = getApp();
let util = require('../../utils/util.js')
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow:true,//页面显示
    searchPanelShow:false,//搜索页面隐藏
    searchResult:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=1&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=1&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=1&count=3';
    // 向豆瓣服务器发送请求
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250');
  },

  // 更多
  onMoreTap(e) {
    let category = e.currentTarget.dataset.category;//点击获取电影类型
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  // 电影详情
  onMovieTap(e){
    let movieId=e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url:'movie-detail/movie-detail?id='+movieId
    })
  },
  //请求函数
  getMovieListData(url, setKey, categoryTitle) {//让这个函数接受一个url,将这个url传到请求中
    let that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/xml'
      },
      success(res) {
        that.processDoubanData(res.data, setKey, categoryTitle)
      },
      fail() {
        console.log('fail')
      },
    })
  },
  onCannelImgTap(){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      searchResult:''
    })
  },
  onBindFocus(){
  this.setData({
    containerShow:false,
    searchPanelShow:true
  });
  },
  bindConfirm(e){
    let text=e.detail.value;
    let searchUrl=app.globalData.doubanBase+'/v2/movie/search?q='+text;
    this.getMovieListData(searchUrl,'searchResult','');
  },
  //用来接收数据和传递数据
  processDoubanData(moviesDouban, setKey, categoryTitle) {
    let movies = [];
    for (let idx in moviesDouban.subjects) {//遍历豆瓣访问到的subjects
      let subject = moviesDouban.subjects[idx];//subjects数组对应的每条数据
      let title = subject.title;//标题
      if (title.length >= 6) {//标题的长度大于6时截取前六个
        title = title.substring(0, 6) + '...';
      }
      let temp = {
        title: title,//标题
        average: subject.rating.average,//评分
        coverageUrl: subject.images.large,//图片
        movieId: subject.id,//跳转电影详情页
        stars: util.convertToStartsArray(subject.rating.stars)
      }
      movies.push(temp)//将temp里的值传入到movies数组里
    }
    let readyData = {};
    readyData[setKey] = {
      categoryTitle: categoryTitle,//电影分类标题
      movies: movies//电影展示内容信息
    }
    this.setData(readyData)//获取的movies的值更新到data里然后加载在wxml,movies在模板里
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