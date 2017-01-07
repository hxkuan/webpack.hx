export default class Tool{
  static loadPage(){
    var $body = $('body');
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load',function() {
      setTimeout(function() {
        $iframe.off('load').remove();
      }, 0);
    }).appendTo($body);
  }

  static toastShow(mes,dus,func){

    $.mytoast({
      title: mes
    });
    setTimeout(function () {
      //关闭缓冲效果
      $.mytoast("hide");
      func&&func();
    }, dus?dus:3000);
  }

  static loading(mes){
    $.myloading({
      title:mes
    });

  }

  static hideLoading(func,errMes,dus){
    if (errMes){
      $.myloading({
        title:errMes
      });

      setTimeout(function () {
        //关闭缓冲效果
        $.myloading("hide");
      }, dus?dus:1000);
    }else {
      $.myloading("hide");
    }

    func&&func();
  }




  //用于一次性的数据传输
  static setPushData(obj){
    if (obj==null)return;
    let str = JSON.stringify(obj);
    sessionStorage.obj_setpushdata = str;
  }
  static getPushData(){
    let str = sessionStorage.obj_setpushdata;
    if (str==null)return {};
    return JSON.parse(str);
  }
}
