var postsData = require('../../../data/posts-data.js')
var app=getApp();//调用到全局变量
Page({
    data: {
        isPlayingMusic: false  //音乐状态默认为false
    },
    onLoad: function (option) {
        var postId = option.id;
        //    console.log(postId)
        this.data.currentPostId = postId;//拿到postId将值放在data中，用来中转再传到onColletionTap事件中
        var postData = postsData.postList[postId];//拿到该数组的postId元素
        console.log(postsData);
        console.log(postData);
        //    this.setData.postData=postData;
        this.setData({
            postData: postData
        });
        // 手动添加缓存  Sync为同步
        // wx.setStorageSync('key', "风暴英雄"),
        // wx.setStorageSync('key', {
        //     game:"风暴英雄",
        //     developer:"暴雪"
        // }),
        // wx.setStorageSync('key1', {
        //     game:"王者荣耀",
        //     developer:"貂蝉"
        // })

        var postsCollected = wx.getStorageSync('posts_Collected');//把所有文章里的缓存状态读取出来
        // console.log(posts_Collected);
        if (postsCollected) {//首先判断这个缓存是否存在
            var postsCollected = postsCollected[postId];//获取到所有的缓存之后，再通过id拿取其中一个
            this.setData({
                collected: postsCollected //对页面中collected进行绑定通过setData将值传给collected
            })
        }
        else {//缓存结构体为空
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected)
        }
        if(app.globalData.g_isPlayingMusic&&app.globalData.g_currentMusicPostId===postId){
            // this.data.isPlayingMusic=true;
            this.setData({
                isPlayingMusic:true
            })
        }
        this.setMusicMonitor();
    },
    setMusicMonitor:function(){
         // 监听音乐播放和暂停
         var that=this;
         wx.onBackgroundAudioPlay(function() {
             that.setData({
             isPlayingMusic:true
             })
             app.globalData.g_isPlayingMusic=true;
             app.globalData.g_currentMusicPostId=that.data.currentPostId;
         });
         wx.onBackgroundAudioPause(function() {
             that.setData({
                 isPlayingMusic:false
                 })
                 app.globalData.g_isPlayingMusic=false;
                 app.globalData.g_currentMusicPostId=null;
         });
         wx.onBackgroundAudioStop(function() {
             that.setData({
                 isPlayingMusic:false
                 })
                 app.globalData.g_isPlayingMusic=false;
                 app.globalData.g_currentMusicPostId=null;
         })
    },

    // onCollectionTap:function(event){
    //var game=wx.getStorageSync('key');//获取缓存的方法
    //     console.log(game)
    // },
    // onShareTap:function(event){
    //wx.removeStorageSync('key');//清除缓存的方法
    // wx.clearStorageSync();//清除所有缓存
    // }

    onColletionTap: function (event) {
        //   通过缓存来获取是否已经被收藏
        var postsCollected = wx.getStorageSync('posts_Collected');
        var postCollected = postsCollected[this.data.currentPostId];//拿到当前文章是否被收藏的变量值
        postCollected = !postCollected;//取反操作，收藏的变成未收藏的，未收藏变收藏
        postsCollected[this.data.currentPostId] = postCollected;//更新变量  
        this.showToast(postsCollected, postCollected);//必须要用this，showModal是page结构体下一个参数的属性
    },
    // showModal: function (postsCollected,postCollected) {
    //     var that=this;
    //     wx.showModal({
    //         title: "收藏",
    //         content: postCollected?"收藏该文章?":"取消收藏该文章?",
    //         showCancel: "true",
    //         cancelText:"取消",
    //         cancelColor: "#333",
    //         confirmText:"确定",
    //         confirmColor:"#405f80",
    //         success: function (res) {
    //             if (res.confirm) {
    //                 wx.setStorageSync('posts_Collected', postsCollected);//整体做更新  更新文章是否收藏的缓存值
    //                 that.setData({
    //                     collected: postCollected
    //                 })
    //             }
    //         }
    //     })
    // },
    showToast: function (postsCollected, postCollected) {
        var that = this;
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_Collected', postsCollected);//整体做更新  更新文章是否收藏的缓存值
        // 更新数据绑定变量，从而实现切换图片
        that.setData({
            collected: postCollected
        });
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消收藏",
            duration: 1000,
            icon: "success"
        })
    },
    onShareTap: function (event) {
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,//将外面的itemList赋值给里面的这个itemList
            itemColor: '#405f80',
            success: function (res) {
                // res.cancel  用户是不是点击了取消按钮
                // res.tapIndex  数组元素的序号，从0开始
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '用户是否取消？' + res.cancel + '现在还无法实现分享功能，什么时候才能支持呢'
                })
            }
        })
    },
    onMusicTap: function (event) {
        var isPlayingMusic = this.data.isPlayingMusic;//获取音乐播放的状态
        var currentPostId=this.data.currentPostId;
        var postData=postsData.postList[currentPostId];
        if (isPlayingMusic) {//条件为真，则暂停播放
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic:false
            });
        }
        else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            this.setData({
                isPlayingMusic:true
            })//音乐启动后则改变音乐播放的状态
        }
    }
})