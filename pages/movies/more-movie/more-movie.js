// pages/movies/more-movie/more-movie.js
const app = getApp();
let util = require('../../../utils/util.js')
Page({
  data: {
    movies:{},
    navigateTitle: '',//设置动态加载导航标题，将值动态保存在data路，用于中间传递
    requestUrl:'',
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options的值', options);
    let category = options.category;
    this.data.navigateTitle = category;
    let dataUrl = '';
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },
  onScrollLower(){
    console.log('加载更多');
    let nextUrl=this.data.requestUrl+'?start='+this.data.totalCount+'&count=20';//拼接加载的数据条数
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading();//发起请求的时候出现加载页面
  },
  onPullDownRefresh(){
    let refreshUrl=this.data.requestUrl+'?start=0&count=20';
    this.data.movies={};
    this.data.isEmpty=true;
    this.data.totalCount=0;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData(moviesDouban) {//接受的res是在utils里面传的一个res，
    console.log(moviesDouban);
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
    let totalMovies={};
    // 如果要绑定新加载的数据，那么需要同旧有的数据绑定在一起
    if(!this.data.isEmpty){//movies里数据不为空
      totalMovies=this.data.movies.concat(movies);//将加载出来的数据拼接在一起重新返回给这个变量
    }else{
      totalMovies=movies;//否则将加载后的数据放在新的变量里
      this.data.isEmpty=false;//改变里面的状态
    }
    this.setData({
      movies:totalMovies
    });
    this.data.totalCount+=20;//在数据绑定之前作数据累加
    wx.hideNavigationBarLoading();//在请求加载完之后隐藏加载图标
    wx.stopPullDownRefresh();
  },
  onMovieTap(e){
    console.log('点击跳转',e);
    let movieId=e.currentTarget.dataset.movieId;
    wx.navigateTo({
      url:'../movie-detail/movie-detail?id='+movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle

    })
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