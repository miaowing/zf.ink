$(function() {
  var $wechatCode = $('.wechat-code');
  if ($wechatCode[0]) {
    var url = window.location.href;
    var query = 'from=webqr';
    if (location.search) {
      var tag = url + '&' + query;
    } else {
      var tag = url + '?' + query;
    }
    new QRCode($wechatCode[0], tag);
  }
});
