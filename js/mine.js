function stopBubble(event) {
  let e = event || window.event;
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

function Run(dom, json, callback) {
  //清除以前的动画
  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    var mark = true; //设置标识
    for (var attr in json) {
      //获取开始位置
      var pos = null;
      //若改变的属性是透明度
      if (attr == "opacity") {
        pos = getStyle(dom, attr) * 100;
      } else {
        //获取样式其它属性（具有px的属性，若没有则用0代替）
        pos = parseInt(getStyle(dom, attr)) || 0;
      }
      //获取目标对象
      var target = json[attr];
      //减速运动
      var speed = (target - pos) * .5;
      //若速度大于0,则向上取整；反之速度小于0，则向下取整
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (pos != target) {
        if (attr == "opacity") {
          dom.style[attr] = (pos + speed) / 100;
        } else {
          dom.style[attr] = pos + speed + "px";
        }
        mark = false;
      }
    }
    if (mark) {
      clearInterval(dom.timer);
      //多个动画执行，改变this的指针
      if (callback) callback.call(dom);
    }
  }, 30);
};

function easeing(dom, tar) {
  clearInterval(dom.timer);
  dom.inter = setInterval(() => {
    let curPos = dom.offsetLeft;
    console.log(curPos + ':' + tar);
    if (curPos > tar) {
      curPos -= 10;
      dom.style.left = curPos + 'px';
    } else {
      clearInterval(dom.timer);
      dom.style.left = tar + 'px';
    }
  }, 30);


}

function $(id) {
  return document.getElementById(id);
};

function runMulti(dom, json, speed, dur) {
  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    for (let attr in json) {
      var pos = parseInt(getStyle(dom, attr));
      if (pos == json[attr]) {
        clearInterval(dom.timer);
      } else {
        dom.style[attr] = pos + speed + "px";
      }
    }
  }, dur);
};

function runSingle(dom, attr, target, speed, dur) {
  clearInterval(dom.timer);
  // timer加在dom上可节省系统资源
  dom.timer = setInterval(function () {
    var pos = parseInt(getStyle(dom, attr));
    if (pos == target) {
      clearInterval(dom.timer);
    } else {
      dom.style[attr] = pos + speed + "px";
    }
  }, dur);
};

function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
};