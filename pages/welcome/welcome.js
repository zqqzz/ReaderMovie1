Page({
    onTap(){
        // wx.navigateTo({
        //     url: '../posts/posts',
        //     success: function(res){
        //         // success
        //         console.log(11111)
        //     },
        //     fail: function() {
        //         // fail
        //     },
        //     complete: function() {
        //         // complete
        //     }
        // })
        wx.redirectTo({
            url: '../posts/posts',//跳转的页面没有返回
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
        })
        console.log('onTap')
    }
})