//将接口封装防止暴露在全局环境中
var baidu = {
	//初始化
	init: function() {
	  this.ready();
      this.bind();
      this.iflogin();
	},
	bind: function() {
		var ob = this;
		//我的标题选项
		ob.mySelection = $("#main-nav li");
		ob.mySelection.each(function(index) {
			$(this).click(function() {
				ob.titleSelect(index,this);
			});
		});
		//我的导航
		ob.myNav = $("#s-content-title");
		ob.myNav.click(function() {
			ob.navCollapse(this);
		});
		//更多产品
		ob.moreProduct = $("#more");
		ob.moreProduct2 = $("#s_bdbri");
		ob.moreProduct.mouseover(function() {
			ob.moreProduct2.slideDown("fast", "linear");
		});
		ob.moreProduct2.mouseover(function() {
			ob.moreProduct2.show();
		});
		ob.moreProduct2.mouseleave(function() {
			ob.moreProduct2.hide();
		});
		ob.top = $('#top_feed');
		//回到顶部
		ob.top.click(function() {
			ob.toTop();
		});
		ob.search=$("#search");
		ob.search.focus(function(){
			ob.addBorder();
		});
		ob.search.blur(function(){
			ob.removeBorder();
		});
		ob.sp1=$("#sp1");
		ob.sp1.mouseover(function(){
			ob.border(this);
		});
		ob.sp1.mouseleave(function(){
			ob.borderChange(this);
		});
	},
	//我的导航折叠
	navCollapse:function(ob){
			$(ob).toggleClass("s-mblock-up");
			$("#s-content-center").toggle();
	},
	//回到顶部
	toTop:function(){
		$('html,body').animate({
				scrollTop: '0px'
		}, 500);
	},
	//选择标题
	titleSelect:function(index,ob){
		$("#main-nav li.on").removeClass("on");
		$(ob).addClass("on");
		if (index == 0) {
			$("#s-content-1").show().siblings().hide();
		} else if (index == 1) {
			$("#s-content-2").show().siblings().hide();
		} else if (index == 2) {
			$("#s-content-3").show().siblings().hide();
		} else if (index == 3) {
			$("#s-content-4").show().siblings().hide();
		} else if (index == 4) {
			$("#s-content-5").show().siblings().hide();
		}
	},
	//进入页面判断用户是否登录
	iflogin:function(){
		/*页面加载时文本框获得焦点End*/
		var username = $.cookie("username");
		var ischeck = $.cookie("check");
		/*判断是否选中自动登录*/
		if (!$.cookie('check')) {
			$("#loginStyle").attr("disabled", true);
			$("#logo1").show();
			$("#logo2").hide();
			$("#s-wrap").hide();
			$("#nav-left").hide();
			$("#s-top-wrap").hide();
		} else {
			$("#loginStyle").attr("disabled", false);
			$("#logo2").show();
			$("#logo1").hide();
			$("#s-wrap").show();
			$("#nav-left").show();
			$("#s-top-wrap").show();
			$("#lb").html(username);
			$("#lb").mouseover(function() {
				$("#tooltip1").show();
			});
			$("#tooltip1").mouseleave(function() {
				$("#tooltip1").hide();
			});
		}
	},
	ready:function(){
		$("#search").blur();
		$("#search").focus();
		$("#s-content-1").show().siblings().hide();
		$("#main-nav li:first-child").addClass("on");
	    $(window).scroll(function(event) {
			if ($("body").scrollTop() > 100) {
				/*到顶部距离大于100px出现回到顶部*/
				$("#top_feed").css("visibility", "visible");
			} else {
				$("#top_feed").css("visibility", "hidden");
			}
			if ($("body").scrollTop() > 200) {
				/*到顶部距离大于200px出现顶部搜索框*/
				$("#s-top-wrap").css("visibility", "visible");
			} else {
				$("#s-top-wrap").css("visibility", "hidden");
			}
	    });
	},
	//添加搜索边框
	addBorder:function(){
		$("#sp1").removeClass("hoverBorder");
		$("#sp1").addClass("changeBorder");
	},
	//去除搜索边框
	removeBorder:function(){
		$("#sp1").removeClass("changeBorder");
	},
	border:function(ob){
		$(ob).addClass("hoverBorder");
	},
	borderChange:function(ob){
		$(ob).removeClass("hoverBorder");
	}
}
var log={
	init:function(){
		this.bind();
		this.draggable();
	},
	bind:function(){
		var ob=this;
		//关闭登录窗口
		ob.close=$("#close-btn");
		ob.close.click(function(){
			ob.closeDialog();
		});
		//清楚登录输入框
		ob.clear=$("#clear-btn1");
		ob.clear.click(function(){
			ob.clearText();
		});
		//显示登录dialog
		ob.show=$("#lb");
		ob.show.click(function(){
			ob.showDialog();
		});
		//分类显示
		ob.classify=$("#classify");
		ob.classify.click(function(){
			ob.classi();
		});
		//返利
		ob.cashback=$("#cashback");
		ob.cashback.click(function(){
			ob.cash();
		});
		//登录
		ob.login=$("#login-btn");
		ob.login.click(function(){
			ob.loginBaidu();
		});
		//登出
		ob.logout=$("#logout-btn");
		ob.logout.click(function(){
			ob.logoutBaidu();
		});
	},
	showDialog:function(){
		$("#dialog").show();
		/*自动填入用户名密码*/
		if ($.cookie("username") && $.cookie("password")) {
			$("#input-username").val($.cookie("username"));
			$("#input-password").val($.cookie("password"));
		}
	},
	closeDialog:function(){
		$("#dialog").hide();
	},
	clearText:function(){
		$("#input-username").val("");
		$("#input-username").focus();
	},
	draggable:function(){
		$("#dialog").draggable();
	},
	classi:function(){
		$("#classify-icon").toggleClass("classed");
	},
	cash:function(){
		$("#cashback-icon").toggleClass("classed");
	},
	loginBaidu:function() {
		var username = $("#input-username").val();
		var password = $("#input-password").val();
		/*验证登录名密码*/
		if (username == "admin" && password == "admin") {
			$.cookie("username", username);
			$.cookie("password", password);
			$("#lb").html(username);
			if ($('#pass-checkbox').is(':checked')) {
				$.cookie("check", "checked");
			}
			$("#dialog").hide();
			$("#loginStyle").attr("disabled", false);
			$("#logo2").show();
			$("#logo1").hide();
			$("#s-wrap").show();
			$("#nav-left").show();
			$("#s-top-wrap").show();
			$("#lb").html(username);
			$("#lb").mouseover(function() {
				$("#tooltip1").show();
			});
			$("#tooltip1").mouseleave(function() {
				$("#tooltip1").hide();
			});
		} else {
			alert("用户名或密码错误");
		}
	},
	logoutBaidu:function(){
		$.cookie('check', '', {
			expires: -1
		});
		location.reload();
	}
}
baidu.init();
log.init();