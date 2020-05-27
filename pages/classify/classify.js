// const ajax = require('../../utils/ajax.js');
// const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyItems: [
            {
                id: '0',
                text: '柜子',
                ishaveChild:true,
                children: [
                    { picture: '../../images/wx.png', textName: '跑步机' },
                    { picture: '', textName: '000000' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ],
            },
            {
                id: '1',
                text: '桌椅',
                ishaveChild:true,
                children: [
                    { picture: '', textName: '' },
                    { picture: '', textName: '1111111' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ]
            },
            {
                id: '2',
                text: '健身器材',
                ishaveChild:true,
                children: [
                    { picture: '', textName: '2222222' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ]
            },
            {
                id: '4',
                text: '床',
                ishaveChild:true,
                children: [
                    { picture: '', textName: '333333' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ]
            },
            {
                id: '5',
                text: '茶几',
                ishaveChild:true,
                children: [
                    { picture: '', textName: '4444444' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ]
            },
            {
                id: '6',
                text: '沙发',
                ishaveChild:true,
                children: [
                    { picture: '', textName: '5555555' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' },
                    { picture: '', textName: '跑步机' }
                ]
            },
            { id: '7', text: '床垫',ishaveChild:false,children:[{}]},
            { id: '8', text: '玻璃',ishaveChild:false,children:[{}]}
        ],
        curNav: 1,
        curIndex: 0
        
    },

    //事件处理函数  
    switchRightTab: function (e) {
        // 获取item项的id，和数组的下标值  
        let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
        // 把点击到的某一项，设为当前index  
        this.setData({
            curNav: id,
            curIndex: index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
    
})