//存放主要交互逻辑的 js 代码
var handler = {
    //封装相关 ajax 的 url
    URL: {
        goodsBuy: function (goodsId) {
            return '/beauty_ssm/goods/' + goodsId + '/buy';
        }
    },
    //验证手机号
    validatePhone: function (phone) {
        if(phone && phone.length == 11 && !isNaN(phone)){
            return true; // 直接判断对象会看对象是否为空，空就是 undefine 就是 false; isNaN 非数字返回 true
        }else{
            return false;
        }
    },
    //详情页秒杀逻辑
    goods:{
        //详情页初始化
        init:function (params) {
            //在 cookie 中查找手机号
            var userPhone = $.cookie('userPhone');
            //验证手机号
            if(!handler.validatePhone(userPhone)){
                //绑定手机 控制输出
                var loginModal = $('#loginModal');
                loginModal.modal({
                    show:true, //显示弹出框
                    backdrop:'static', //禁止位置关闭
                    keyboard: false //关闭键盘事件
                });
                $('#loginBtn').click(function () {
                    var inputPhone = $('#userPhone').val();
                    if(handler.validatePhone(inputPhone)){
                        //电话写入 cookie （7天过期）
                        $.cookie('userPhone', inputPhone, {expires:7});
                        //验证通过  刷新页面
                        window.location.reload();
                    }else{
                        $('#userPhoneMessage').hide().html('<label class="label label-danger">手机号错误!</label>').show(300);
                    }
                });
            }
        }
    },
    goodsBuy:function (goodsId) {
        //执行购买请求

        $.post(handler.URL.goodsBuy(goodsId),{},function (result) {
            if(result && result['success']){
                alert("购买成功！")
                window.location.reload();
            }else{
                alert(result['error'])
            }
        });
    },
}









