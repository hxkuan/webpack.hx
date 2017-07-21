import Tool from './Tool';
export default class Require{

  static login(paramdate,funcs){
    this.httpRequire(root_domain+'h5/hunterplan/login.htm','GET',paramdate,funcs);
  }

  static createMerchant(paramdate,funcs){
    this.httpRequire(root_domain+'gatewayWeb.htm?command=h5_create_merchant','POST',paramdate,funcs);
  }

  static httpRequire(url,method,p_data,funcs){
     console.log('url:'+url);
    Tool.loading('请稍后');
    $.ajax({
      type: method,
      dataType: 'json',
      url: url,
      data: p_data,
      timeout: 60 * 1000,
      cache: false,

      xhrFields:{withCredentials: true},
      crossDomain : true,

      success: function (data) {
        if (data.result.errorCode=='-1'){
          sessionStorage.isLogin=false;
          //临时如此。。
          window.history.back();
        }
        if (funcs.successFunc){
          funcs.successFunc(data);
        }else {
          Tool.hideLoading();
        }
      },
      error:function (data) {
        if (funcs.errorFunc){funcs.errorFunc(data);}
        else {Tool.hideLoading('','网络连接失败');}

      }
    });
  }

 /* ajaxRequest(ajaxOption, showProgress) {
    var deferred = $.Deferred(); // 新建一个Deferred对象
    ajaxOption.dataType = 'json';
    ajaxOption.cache = false;
    ajaxOption.url = ajaxOption.url ? ajaxOption.url : getRequestUrl(ajaxOption.command,ajaxOption.pre);
    ajaxOption.method = requestMethod;
    ajaxOption.beforeSend = function (request) {
      request.setRequestHeader("X-App-Info", window.faclity);
    };
    ///////////////////////自带cookie设置/////////////////////////////////////
    ajaxOption.xhrFields = {withCredentials: true};
    ajaxOption.crossDomain = "true";
    //////////////////////////////////////////////////////////
    if (showProgress) {
      coverModule.showCover();
    }
    if (ajaxOption.ajaxSuccess) {
      ajaxOption.success = ajaxOption.ajaxSuccess;
    } else if (ajaxOption.success) {
      var success = ajaxOption.success;
      ajaxOption.success = function (resData) {
        try {
          if (resData.result.success) {
            if (resData.data) {
              success(resData.data);
            } else {
              success();
            }
            deferred.resolve();
          } else if (resData.result.errorCode == "-1") {
            let btns = [{
              text: "确定",
              style: alertModule.btnType.success,
              click: function () {
                let currentUrl = encodeURI(window.location.href);
                redirectPage(window.UrlLocation.loginPageLocation + "?redirectURL=" + currentUrl);
              }
            }];
            alertModule.confirm(alertModule.statusType.error, "", sessionInvalid, btns);
          } else {
            if (ajaxOption.failure) {
              ajaxOption.failure(resData.result);
            } else {
              alertModule.confirm(alertModule.statusType.error, "重要提示", resData.result.errorMsg);
            }
          }
        }
        catch (e) {
          console.log(e.toString());
          alertModule.confirm(alertModule.statusType.error, "重要提示", "程序异常");
          deferred.reject();
        }
      };
    }
    if (!ajaxOption.error) {
      ajaxOption.error = function (XMLHttpRequest, textStatus) {
        alertModule.confirm(alertModule.statusType.error, "重要提示", errorStatus[textStatus]);
      }
    }
    if (!ajaxOption.complete) {
      ajaxOption.complete = function () {
        if (showProgress) {
          coverModule.hideCover();
        }
      }
    }
    $.ajax(ajaxOption);
    return deferred.promise();
  }*/

}
