// 使用require（）方法来接受这个.js文件
var postsData=require('../../data/posts-data.js')

Page({
    // 页面初始数据
    data: {
        // date: 'Nov 18 2019',
        // title: '正是下虾肥蟹壮时',

        //    单向数据绑定（目前只能做单向数据绑定），不能自动改变
        // 双向数据绑定
    },
    // process: function () {
    //     var date = 'Nov 18 2019';
    //     var date_ele = document.getElementById("id");
    //     date_ele.text = date;
        // 网页版
        // 小程序不允许操作Dom
        // 数据优先  angular.js
        // 数据绑定
    // },

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        // options为页面跳转所带来的参数
        this.setData({
            posts_key:postsData.postList
        })//es6写法直接为posts_content
        console.log('onLode')
    },
    onPostTap:function(event){
        // event框架所给的一个事件对象
        // currentTarget:当前鼠标所点击的属性
        // dataset:所有自定义属性的集合
        var postId=event.currentTarget.dataset.postid;//点击postId就可以获取postId的值     
        console.log('点击的id为'+postId);
        wx.navigateTo({
            url:'post-detail/post-detail?id='+postId
        })
    },
    onSwiperTap:function(event){
        console.log(event); 
        var postId=event.target.dataset.postid;
        wx.navigateTo({
            url:'post-detail/post-detail?id='+postId
        })
    }
})