/*2015/11/12 --  1月底开放网站暂定域名renderjs.cn*/
(function(Window,Fn){Window._=Fn(Window)})(window,function(W){
'use strict';
var _class={view:{},image:{},audio:{},animate:{},trnView:{}},create,listener,method,uid=0,fn,currentView,_currentView;
fn={
	update:function(){
		_class.canvas.ctx.save();
		_class.canvas.ctx.clearRect(0,0,main.w,main.h);
		_class.canvas.ctx.fillStyle=currentView.color;
		_class.canvas.ctx.fillRect(0,0,main.w,main.h);
		_class.canvas.ctx.restore();
		if(currentView.item.length===0)return;
		for(var i=0;i<currentView.item.length;i++){
			currentView.item[i].render(_class.canvas.ctx);
		}
		currentView.run();
		fn.animate(_class.animate);
	},
	animate:function(arg){
		var nowObj;
		for(var i in arg){
			nowObj = main(i);
			if(nowObj._animate.delay>0){
				nowObj._animate.delay--;
			}else{
				for(var j in nowObj._animate.trn){
					if(nowObj._animate.time>0){
						nowObj[j]+=nowObj._animate.trn[j];
					}else if(nowObj._animate.back){
						nowObj._animate._length--;
						nowObj._animate.trn[j]*=-1;
						if(nowObj._animate._length===0){
							nowObj._animate.back=false;
							nowObj._animate.time=nowObj._animate._time;
							nowObj._animate._length=nowObj._animate._len;
						}
					}else if(nowObj._animate.loop){
						nowObj._animate._length--;
						nowObj[j]=nowObj._animate.start[j];
						if(nowObj._animate._length===0){
							nowObj._animate.time = nowObj._animate._time;
							nowObj._animate._length = nowObj._animate._len;
							if(nowObj._animate._back){
								nowObj._animate.trn[j]*=-1;
								nowObj._animate.back=true;
							}
						}else if(nowObj._animate._back){
							nowObj._animate.trn[j]*=-1;
						}
					}else{
						if(nowObj._animate._back){
							nowObj[j]=nowObj._animate.start[j];
						}else{
							nowObj[j]=nowObj._animate.end[j];
						}
						nowObj._animate._length--;
						if(nowObj._animate._length===0){
							delete _class.animate[i];
							nowObj._animate.callback.call(nowObj);
							nowObj._animate={start:{},end:{},trn:{},_length:0,_len:0};
						}
					}
				}
				nowObj._animate.time--;
			}
		}
	},
	isPC:function(){
		var userAgentInfo=navigator.userAgent;
		var Agents=["Android","iPhone",
				"SymbianOS","Windows Phone",
				"iPad","iPod"];
		var flag=true;
		for(var i=0;i<Agents.length;i++){
			if(userAgentInfo.indexOf(Agents[i])>0){
				flag=false;
				break;
			}
		}
		return flag;
	}
}
create={
	canvas:function(obj){
		this.id=uid++;
		this.dpr=obj.dpr||devicePixelRatio||1;
		this.fps=obj.fps||50;
		this._fps=Math.round(1000/this.fps);
		this.parent=document.getElementById(obj.parent)||document.body;
		if(this.parent==document.body){
			var a = document.createElement('meta');
			a.setAttribute('name','viewport');
			a.setAttribute('content','width=device-width,initial-scale='+
				Math.round(1/this.dpr*100)/100+',user-scalable=no');
			document.head.appendChild(a);
			var b=document.createElement('style');
			b.innerHTML='body,canvas{padding:0;margin:0;}';
			document.head.appendChild(b);
		}
		if(fn.isPC()){
			listener._event=['mousedown','mousemove','mouseup'];
		}else{
			listener._event=['touchstart','touchmove','touchend'];
		}
		var c=document.createElement('canvas');
		this._obj=c;
		this.ctx=c.getContext('2d');
		c.style.position='fixed';
		this.w=main.w=this.parent.scrollWidth;
		this.h=main.h=this.parent.scrollHeight;
		this.parent.appendChild(c);
		c.width=this.w;
		c.height=this.h;
		_class.image._nowView=document.createElement('canvas');
		_class.image._nowView.width=main.w;
		_class.image._nowView.height=main.h;
		_class.trnView.nowView=_class.image._nowView.getContext('2d');
		_class.image._toView=document.createElement('canvas');
		_class.image._toView.width=main.w;
		_class.image._toView.height=main.h;
		_class.trnView.toView=_class.image._toView.getContext('2d');
		_class.image._error=new Image();
		_class.image._error.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAvAgMAAAAKvKsCAAAADFB'+
		'MVEUAAABSUk/39/b///+dPWXIAAAAAXRSTlMAQObYZgAAAIFJREFUKM+t0TEKxDAMBMDl4BpX96T7hBo1eVV6NW72lVEUYhJL'+
		'6bJg0MDaLoRIo8dQgOIp0XfoieUR8jJITmjmp0drQjd86CNZgOsOJCiPLzOEMVeQAB+BhFbAMHoZo6cVokdUoOgJkYB4/vGC9'+
		'eN+gmLgq45bTWf8AEGjjd1csAF0b4dskVBf0wAAAABJRU5ErkJggg==';
		_class.image._error.onload=function(){
			main('view',{id:'loading',color:'#333',item:[{type:'text',id:'_loadtext_',text:'正在加载...',
				x:main.w*.5,y:main.h*.65,color:'#fff'},{type:'arc',id:'_arc_1',r:main.w*.03,x:main.w*.35,
				y:main.h*.45,color:'#ddd'},{type:'arc',id:'_arc_2',r:main.w*.03,x:main.w*.45,y:main.h*.45,
				color:'#ddd'},{type:'arc',id:'_arc_3',r:main.w*.03,x:main.w*.55,y:main.h*.45,color:'#ddd'
				},{type:'arc',id:'_arc_4',r:main.w*.03,x:main.w*.65,y:main.h*.45,color:'#ddd'},{type:'image',
				id:'_nowView',w:main.w,h:main.h,image:'_nowView'}],listener:{init:function(){
				for(var i=1;i<5;i++){main('_arc_'+i).animate({to:{r:main.w*.01},time:400,delay:(100*i),
				back:true,loop:true})}}}
			});
			if(obj.load&&obj.load.loading){
				var loadImgLen=obj.load.loading.image.length;
				obj.load.loading.callback||(obj.load.loading.callback=function(){});
				for(var i=0;i<obj.load.loading.image.length;i++){
					_class.image[obj.load.loading.image[i].id]=new Image();
					_class.image[obj.load.loading.image[i].id].src=
						'./image/'+obj.load.loading.image[i].src;
					_class.image[obj.load.loading.image[i].id].onload=function(){
						loadImgLen--;
						if(loadImgLen===0&&obj.load.loading.view){
							obj.load.loading.view();
							cak();
						}
					}
				}
			}else{
				obj.load&&(obj.load.loading={callback:function(a){
					main('_loadtext_').text=a+'%';
				}})
				cak();
			}
			function cak(){
				currentView=_class.view.loading;
				_currentView=_class.view.loading;
				currentView.listener.init&&currentView.listener.init.call(currentView);
				if(obj.load)method.load(obj.load);
				setInterval(fn.update,_class.canvas._fps);
				listener.bind(_class.canvas._obj);
			}
		}
	},
	view:function(obj){
		var _item=[];
		if(obj.item&&obj.item.length>0){
			for(var i=0;i<obj.item.length;i++){
				switch(obj.item[i].type){
					case 'image':
					_item.push(new create.image(obj.item[i]));
					break;
					case 'rect':
					_item.push(new create.rect(obj.item[i]));
					break;
					case 'arc':
					_item.push(new create.arc(obj.item[i]));
					break;
					case 'text':
					_item.push(new create.text(obj.item[i]));
					break;
					case 'layer':
					_item.push(new create.layer(obj.item[i]));
					break;
				}
			}
		}
		this.id=obj.id||uid;
		this.color=obj.color||'#333';
		this.listener=obj.listener||{};
		this.item=_item;
		this.run=obj.run||function(){};
		this._init=true;
	},
	base:function(obj){
		this.id=obj.id||uid++;
		this.x=obj.x||0;
		this.y=obj.y||0;
		this.hide=obj.hide||false;
		this.scaleX=obj.scaleX||(obj.scaleX===0?0:1);
		this.scaleY=obj.scaleY||(obj.scaleY===0?0:1);
		this.opacity=obj.opacity||(obj.opacity===0?0:1);
		this.rotate=obj.rotate||0;
		this.anchorX=obj.anchorX||0;
		this.anchorY=obj.anchorY||0;
		this.listener=obj.listener||{};
		this._animate={start:{},end:{},trn:{},_length:0,_len:0};
		this._init={};
	},
	info:function(obj){
		this.animate=function(arg){
			if(arg.to&&arg.time){
				for(var i in arg.to){
					this._animate.end[i]=arg.to[i];
					this._animate.start[i]=this[i];
					this._animate.trn[i]=Math.round((arg.to[i]-this[i])*_class.canvas._fps)/arg.time;
					this._animate._length++;
					this._animate._len++;
				}
				this._animate.time=Math.round(arg.time/_class.canvas._fps);
				this._animate._time=Math.round(arg.time/_class.canvas._fps);
				this._animate.loop=arg.loop||false;
				this._animate.delay=Math.round(arg.delay/_class.canvas._fps)||0;
				this._animate.callback=arg.callback||function(){};
				this._animate.back=arg.back||false;
				this._animate._back=arg.back||false;
				_class.animate[this.id]=true;
			}
		}
		this.set=function(obj){
			for(var i in obj){
				this[i]=obj[i];
			}
			return this;
		}
		this.init=function(){
			for(var i in this._init){
				this[i]=this._init[i];
			}
		}
		for(var i in this){
			if(i!='_init'){
				this._init[i]=this[i];
			}
		}
		if(obj.add)obj.add.item.push(this);
	},
	image:function(obj){
		create.base.call(this,obj);
		this.image=obj.image||'_error';
		this.w=obj.w||obj.h*_class.image[this.image].width/_class.image[this.image].height||100;
		this.h=obj.h||this.w*_class.image[this.image].height/_class.image[this.image].width;
		this.ratio=_class.image[this.image].height/_class.image[this.image].width;
		this.type='image';
		this.render=function(ctx){
			if(this.hide)return;
			ctx.save();
			ctx.globalAlpha=this.opacity<=0?0:this.opacity;
			ctx.translate(this.x,this.y);
			ctx.scale(this.scaleX<0?0:this.scaleX,this.scaleY<0?0:this.scaleY);
			ctx.rotate(this.rotate*Math.PI/180);
			ctx.drawImage(_class.image[this.image],-this.anchorX*this.w,
				-this.anchorY*this.h,this.w,this.h);
			ctx.restore();
		}
		create.info.call(this,obj);
	},
	rect:function(obj){
		create.base.call(this,obj);
		this.w=obj.w||0;
		this.h=obj.h||0;
		this.color=obj.color||'#60f';
		this.ratio=this.h/this.w;
		this.render=function(ctx){
			if(this.hide)return;
			ctx.save();
			ctx.fillStyle=this.color;
			ctx.globalAlpha=this.opacity<=0?0:this.opacity;
			ctx.translate(this.x,this.y);
			ctx.scale(this.scaleX<0?0:this.scaleX,this.scaleY<0?0:this.scaleY);
			ctx.rotate(this.rotate*Math.PI/180);
			ctx.fillRect(-this.anchorX*this.w,-this.anchorY*this.h,this.w,this.h);
			ctx.restore();
		}
		create.info.call(this,obj);
	},
	arc:function(obj){
		create.base.call(this,obj);
		this.start=obj.start||0;
		this.end=obj.end||(obj.end==0?0:360);
		this.r=obj.r||50;
		this.color=obj.color||'#ff0';
		this.w=this.r*2;
		this.h=this.r*2;
		this.anchorX=.5;
		this.anchorY=.5;
		this.render=function(ctx){
			if(this.hide)return;
			ctx.save();
			ctx.fillStyle =this.color;
			ctx.globalAlpha=this.opacity<=0?0:this.opacity;
			ctx.translate(this.x,this.y);
			ctx.scale(this.scaleX<0?0:this.scaleX,this.scaleY<0?0:this.scaleY);
			ctx.rotate(this.rotate*Math.PI/180);
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.arc(0,0,this.r,(this.start-90)/180*Math.PI,(this.end-90)/180*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
		create.info.call(this,obj);
	},
	text:function(obj){
		create.base.call(this,obj);
		this.font=obj.font||'microsoft YaHei';
		this.text=obj.text||(obj.text===''?'':'未指定文字内容');
		this.color=obj.color||'#eee';
		this.align=obj.align||'center';
		this.size=obj.size||main.w*.05;
		this.baseline=obj.baseline||'middle';
		this.render=function(ctx){
			if(this.hide)return;
			ctx.save();
			ctx.fillStyle =this.color;
			ctx.globalAlpha=this.opacity<=0?0:this.opacity;
			ctx.font=Math.round(this.size)+'px '+this.font;
			ctx.textBaseline=this.baseline;
			ctx.textAlign=this.align;
			ctx.translate(this.x,this.y);
			ctx.scale(this.scaleX<0?0:this.scaleX,this.scaleY<0?0:this.scaleY);
			ctx.rotate(this.rotate*Math.PI/180);
			ctx.fillText(this.text,0,0);
			ctx.restore();
		}
		create.info.call(this,obj);
	},
	layer:function(obj){
		create.base.call(this,obj);
		this.image=document.createElement('canvas');
		this.image.width=main.w;
		this.image.height=main.h;
		this._ctx=this.image.getContext('2d');
		this.maskX=obj.maskX||0;
		this.maskY=obj.maskY||0;
		this.maskWidth=obj.maskW||(obj.maskW===0?0:main.w);
		this.maskHeight=obj.maskH||(obj.maskH===0?0:main.h);
		var _item=[];
		if(obj.item&&obj.item.length>0){
			for(var i=0;i<obj.item.length;i++){
				switch(obj.item[i].type){
					case 'image':
					_item.push(new create.image(obj.item[i]));
					break;
					case 'rect':
					_item.push(new create.rect(obj.item[i]));
					break;
					case 'arc':
					_item.push(new create.arc(obj.item[i]));
					break;
					case 'text':
					_item.push(new create.text(obj.item[i]));
					break;
				}
			}
		}
		this.item=_item;
		this.render=function(ctx){
			if(this.hide)return;
			this._ctx.clearRect(0,0,main.w,main.h);
			for(var i=0;i<this.item.length;i++){
				this.item[i].render(this._ctx);
			}
			ctx.save();
			ctx.drawImage(this.image,this.maskX,this.maskY,this.maskW,
				this.maskH,this.maskX,this.maskY,this.maskW,this.maskH);
			ctx.restore();
		}
		create.info.call(this,obj);
	}
}
listener={
	_event:null,
	event:{
		x:0,
		y:0,
		moveX:0,
		moveY:0,
		rotate:0,
		scale:0
	},
	_x:0,
	_y:0,
	_rotate:0,
	_scale:0,
	obj:null,
	cas:null,
	bind:function(evObj){
		listener.cas=evObj;
		if(listener._event[0]==='touchstart'){
			listener.cas.addEventListener(listener._event[0],function(event){
				event.preventDefault();
				if(event.targetTouches.length===1){
					listener.event.x=event.targetTouches[0].pageX;
					listener.event.y=event.targetTouches[0].pageY;
					listener.obj=listener.search(currentView,listener.event);
					if(listener.obj){
						listener.obj.listener.start.call(listener.obj,listener.event);
						listener.cas.addEventListener(listener._event[1],listener.move,false);
						listener.cas.addEventListener(listener._event[2],listener.end,false);
					}
				}else if(listener.obj&&event.targetTouches.length===2){
					listener._x=(event.targetTouches[0].pageX+event.targetTouches[1].pageX)/2;
					listener._y=(event.targetTouches[0].pageY+event.targetTouches[1].pageY)/2;
					listener._rotate=Math.atan2(event.targetTouches[1].pageY-
						event.targetTouches[0].pageY,event.targetTouches[1].pageX-
						event.targetTouches[0].pageX)*180/Math.PI;
					listener._scale=Math.sqrt((event.targetTouches[0].pageX-event.targetTouches[1].pageX)*
						(event.targetTouches[0].pageX-event.targetTouches[1].pageX)+
						(event.targetTouches[0].pageY-event.targetTouches[1].pageY)*
						(event.targetTouches[0].pageY-event.targetTouches[1].pageY));
				}else{
					return false;
				}
			},false);
		}else if(listener._event[0]==='mousedown'){
			listener.cas.addEventListener(listener._event[0],function(event){
				event.preventDefault();
				listener.event.x=event.pageX;
				listener.event.y=event.pageY;
				listener.obj=listener.search(currentView,listener.event);
				if(listener.obj){
					listener.obj.listener.start.call(listener.obj,listener.event);
					listener.cas.addEventListener(listener._event[1],listener._move,false);
					listener.cas.addEventListener(listener._event[2],listener._end,false);
				}
			},false);
		}
	},
	move:function(event){
		if(listener.obj.listener.move&&event.targetTouches.length===1){
			listener._rotate=0;
			listener.event.rotate=0;
			listener.event.moveX=event.targetTouches[0].pageX-listener.event.x;
			listener.event.moveY=event.targetTouches[0].pageY-listener.event.y;
			listener.event.x=event.targetTouches[0].pageX;
			listener.event.y=event.targetTouches[0].pageY;
			listener.obj.listener.move.call(listener.obj,listener.event);
		}else if(listener.obj.listener.move&&event.targetTouches.length===2){
			listener.event.moveX=(event.targetTouches[0].pageX+event.targetTouches[1].pageX)/2-listener._x;
			listener.event.moveY=(event.targetTouches[0].pageY+event.targetTouches[1].pageY)/2-listener._y;
			listener._x=(event.targetTouches[0].pageX+event.targetTouches[1].pageX)/2;
			listener._y=(event.targetTouches[0].pageY+event.targetTouches[1].pageY)/2;
			listener.event.rotate=Math.atan2(event.targetTouches[1].pageY-
				event.targetTouches[0].pageY,event.targetTouches[1].pageX-
				event.targetTouches[0].pageX)*180/Math.PI-listener._rotate;
			listener._rotate=Math.atan2(event.targetTouches[1].pageY-
				event.targetTouches[0].pageY,event.targetTouches[1].pageX-
				event.targetTouches[0].pageX)*180/Math.PI;
			listener.event.scale=Math.sqrt((event.targetTouches[0].pageX-event.targetTouches[1].pageX)*
				(event.targetTouches[0].pageX-event.targetTouches[1].pageX)+
				(event.targetTouches[0].pageY-event.targetTouches[1].pageY)*
				(event.targetTouches[0].pageY-event.targetTouches[1].pageY))-listener._scale;
			listener._scale=Math.sqrt((event.targetTouches[0].pageX-event.targetTouches[1].pageX)*
				(event.targetTouches[0].pageX-event.targetTouches[1].pageX)+
				(event.targetTouches[0].pageY-event.targetTouches[1].pageY)*
				(event.targetTouches[0].pageY-event.targetTouches[1].pageY));
			listener.obj.listener.move.call(listener.obj,listener.event);
		}else{
			return false;
		}
	},
	_move:function(event){
		if(listener.obj.listener.move){
			listener.event.moveX=event.pageX-listener.event.x;
			listener.event.moveY=event.pageY-listener.event.y;
			listener.event.x=event.pageX;
			listener.event.y=event.pageY;
			listener.obj.listener.move.call(listener.obj,listener.event);
		}else{
			return false;
		}
	},
	end:function(event){
		if(event.targetTouches.length===0){
			listener.obj.listener.end&&listener.obj.listener.end.call(listener.obj,listener.event);
			listener.event.x=0;
			listener.event.y=0;
			listener.event.moveX=0;
			listener.event.moveY=0;
			listener.obj=null;
			listener.cas.removeEventListener(listener._event[1],listener.move,false);
			listener.cas.removeEventListener(listener._event[2],listener.end,false);
		}else if(event.targetTouches.length===1){
			listener._x=0;
			listener._y=0;
			listener._rotate=0;
			listener.event.rotate=0;
			listener._scale=0;
			listener.event.scale=0;
			listener.event.x=event.targetTouches[0].pageX;
			listener.event.y=event.targetTouches[0].pageY;
		}
	},
	_end:function(event){
		listener.obj.listener.end&&listener.obj.listener.end.call(listener.obj,listener.event);
		listener.event.x=0;
		listener.event.y=0;
		listener.event.moveX=0;
		listener.event.moveY=0;
		listener.obj=null;
		listener.cas.removeEventListener(listener._event[1],listener._move,false);
		listener.cas.removeEventListener(listener._event[2],listener._end,false);
	},
	search:function(view,listener){
		if(view.item.length===0)return null;
		for(var i=(view.item.length-1);i>=0;i--){
			if(!view.item[i].hide&&view.item[i].type!=='layer'&&
				view.item[i].type!=='text'&&view.item[i].listener&&view.item[i].listener.start&&
				(view.item[i].x-view.item[i].w*view.item[i].anchorX)<listener.x&&
				(view.item[i].x+view.item[i].w-view.item[i].w*view.item[i].anchorX)>listener.x&&
				(view.item[i].y-view.item[i].h*view.item[i].anchorY)<listener.y&&
				(view.item[i].y+view.item[i].h-view.item[i].h*view.item[i].anchorY)>listener.y){
				return view.item[i];
			}else if(!view.item[i].hide&&view.item[i].type==='layer'&&view.item[i].item.length>0){
				for(var j=(view.item[i].item[j].length-1);j<=0;j--){
					if(!view.item[i].item[j].hide&&view.item[i].item[j].listener.start&&
						view.item[i].item[j].type!=='text'&&view.item[i].item[j].type!=='layer'&&
						(view.item[i].item[j].x-view.item[i].item[j].w*view.item[i].item[j].anchorX)<listener.x&&
						(view.item[i].item[j].x+view.item[i].item[j].w-view.item[i].item[j].w*view.item[i].item[j].anchorX)>listener.x&&
						(view.item[i].item[j].y-view.item[i].item[j].h*view.item[i].item[j].anchorY)<listener.y&&
						(view.item[i].item[j].y+view.item[i].item[j].h-view.item[i].item[j].h*view.item[i].item[j].anchorY)>listener.y){
						return view.item[i].item[j];
					}
				}
			}
		}
	}
}
method={
	load:function(obj){
		var idx=0,len=0;
		len+=obj.image?obj.image.length:0;
		len+=obj.view?obj.view.length:0;
		if(!obj.view&&!obj.image&&obj.init){
			obj.init();
		}
		if(Object.prototype.toString.call(obj.image)=='[object Array]'){
			for(var i=0;i<obj.image.length;i++){
				var img=new Image();
				img.src='./image/'+obj.image[i].src;
				_class.image[obj.image[i].id]=img;
				img.onload=function(){
					idx++;
					obj.loading.callback(Math.round(idx/len*100));
					if(idx==len){
						obj.init&&obj.init();
					}
				}
			}
		}
		if(Object.prototype.toString.call(obj.audio)=='[object Array]'){
			for(var i=0;i<obj.audio.length;i++){
				var aud=document.createElement('audio');
				aud.src='./audio/'+obj.audio[i].src;
				_class.audio[obj.audio[i].id]=aud;
			}
		}
		if(Object.prototype.toString.call(obj.view)=='[object Array]'){
			for(var i=0;i<obj.view.length;i++){
				var view=document.createElement('script');
				view.src = './view/'+obj.view[i]+'.js';
				document.head.appendChild(view);
				view.onload = function(){
					document.head.removeChild(this);
					idx++;
					obj.loading.callback(Math.round(idx/len*100));
					if(idx==len){
						obj.init&&obj.init();
					}
				}
			}
		}
	},
	check:function(id){
		for(var i=0;i<_currentView.item.length;i++){
			if(_currentView.item[i].id===id){
				return _currentView.item[i];
			}else if(_currentView.item[i].type==='layer'){
				for(var j=0;j<_currentView.item[i].item.length;j++){
					if(_currentView.item[i].item[j].id===id){
						return _currentView.item[i].item[j]
					}
				}
			}
		}
		for(var i in _class.audio){
			if(i===id)return _class.audio[i];
		}
	},
	create:function(_type,_obj){
		switch(_type){
			case 'canvas':return _class[_type]=new create[_type](_obj);
			case 'view':return _class[_type][_obj.id]=new create[_type](_obj);
			case 'image':return new create.image(_obj);
			case 'rect':return new create.rect(_obj);
			case 'arc':return new create.arc(_obj);
			case 'text':return new create.text(_obj);
			case 'layer':return new create.layer(_obj);
		}
	}
}
main.skip=function(toView,trn){
	if(_class.view[toView]){
		main('view',{
			id:'_trn_',color:'#000',item:[{type:'image',id:'_toView',w:main.w,h:main.h,image:'_toView'
			},{type:'image',id:'_nowView',w:main.w,h:main.h,image:'_nowView'}]
		});
		_class.animate={};
		_class.trnView.nowView.save();
		_class.trnView.nowView.clearRect(0,0,main.w,main.h);
		_class.trnView.nowView.fillStyle=currentView.color;
		_class.trnView.nowView.fillRect(0,0,main.w,main.h);
		_class.trnView.nowView.restore();
		for(var i=0;i<currentView.item.length;i++){
			currentView.item[i].render(_class.trnView.nowView);
		}
		var _toView=_class.view[toView];
		_currentView=_class.view[toView];
		if(_currentView._init){
			_currentView._init=false;
			_currentView.listener.init&&_currentView.listener.init.call(_currentView);
		}
		_class.trnView.toView.save();
		_class.trnView.toView.clearRect(0,0,main.w,main.h);
		_class.trnView.toView.fillStyle=_toView.color;
		_class.trnView.toView.fillRect(0,0,main.w,main.h);
		_class.trnView.toView.restore();
		for(var i=0;i<_toView.item.length;i++){
			_toView.item[i].init();
			_toView.item[i].render(_class.trnView.toView);
		}
		_currentView=_class.view._trn_;
		currentView=_class.view._trn_;
	}else{
		return;
	}
	if(trn){
		main.trn[trn](main('_nowView'),main('_toView'),_class.view[toView]);
	}else{
		main.trn.opacity(main('_nowView'),main('_toView'),_class.view[toView]);
	}
}
main.trn={
	opacity:function(now,to,view){
		now.animate({
			to:{opacity:0},
			time:300,
			callback:function(){
				_currentView=view;
				currentView=view;
				view.listener.toggle&&view.listener.toggle.call(view);
			}
		});
	},
	slide:function(now,to,view){
		now.set({
			anchorX:.5,
			x:main.w*.5
		}).animate({
			to:{scaleX:0,scaleY:0},
			time:300
		});
		to.set({y:main.h}).animate({
			to:{y:0},
			time:300,
			callback:function(){
				_currentView=view;
				currentView=view;
				view.listener.toggle&&view.listener.toggle.call(view);
			}
		});
	}
}
function main(){
	var arg=arguments,len=arg.length;
	switch(len){
		case 0:return console.log('Revision:10,Email:azwenn@qq.com');
		case 1:return method.check(arg[0]);
		case 2:return method.create(arg[0],arg[1]);
	}
}
return main;
})