/**
 * Created by lglong on 2017-10-12.
 */
angular.module('orderApp',['ng','ngRoute','ngAnimate'])
		.controller('startCtrl',['$scope',function($scope){
			$scope.myheight=window.innerHeight+"px";

		}])
		.controller('mainCtrl',['$scope','$http',function($scope,$http){
			$scope.dish=[];
			$scope.addmore=true;
			$scope.isLoading=true;
			$scope.searching=false;
			//页面加载后第一次向服务器请求数据
			$http.get('data/dish_listbypage.php').success(function(data){
				validDate(data);
			});
			//加载更多按钮函数
			$scope.load=loadDatas;
			function loadDatas(){
				$scope.isLoading=true;
				//如果处在搜索状态,清空搜索model数据,dish数组,搜索状态
				if($scope.searching){
					$scope.dish=[];
					$scope.searching=false;
					$scope.addmore=true;
					$scope.keywd='';
				}
				$http.get("data/dish_listbypage.php?start="+$scope.dish.length).success(function(data){
					validDate(data);
				});
			}
			//监听modle数据keywd的改变,根据输入内容请求数据
			$scope.$watch('keywd',function(){
				//console.log($scope.keywd);
				if($scope.keywd){
					$http({
						method:'post',
						url:'data/dish_listbykw.php',
						data:{keywd:$scope.keywd},
						headers:{'Content-Type': 'application/x-www-form-urlencoded'},
						//将数据转换成url编码
						transformRequest: function (data) {
							return $.param(data);
						}
					}).then(function successCallback(response){
						if(response.data.length){
							$scope.dish=response.data;
							$scope.searching=true;
						}
					});
				}else{
					$scope.searching&&loadDatas();
				}
			});
			//验证返回的数据
			function validDate(data){
				if(data.length>0){
					$scope.dish=$scope.dish.concat(data);
					if(data.length<5){
						$scope.addmore=false;
					}
				}else{
					$scope.addmore=false;
				}
				$scope.isLoading=false;
			}
		}])
		.controller('detailCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
			$http({
				method:'post',
				url:'data/dish_listbydid.php',
				data:{did:$routeParams.did},
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (data) {
					return $.param(data);
				}
			}).then(function successCallback(response){
				$scope.details=response.data;
			});

		}])
		.controller('orderCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
			$scope.orderstate=false;
			$scope.submit=function(){
				$scope.datas='{' +
						'"phone":'+$scope.phone+', ' +
						'"did": '+$routeParams.did+', ' +
						'"user_name":\"'+$scope.user_name+'\", ' +
						'"sex": '+$scope.sex+', ' +
						'"addr":\"'+$scope.addr+'\"}';
				//console.log($scope.data);

				$http({
					method:'post',
					url:'data/order_add.php',
					data:{order:$scope.datas},
					headers:{'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: function (data) {
						return $.param(data);
					}
				}).then(function successCallback(response){
					if(response.data.status=="success"){
						$scope.orderstate=true;
						$scope.order_num=response.data.order_num;
					}
				});

			}
		}])
		.controller('myorderCtrl',['$scope','$http',function($scope,$http){
			$scope.orders=[];
			$http({
				method:'post',
				url:'data/dish_listbyphone.php',
				data:{phone:13705054321},
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (data) {
					return $.param(data);
				}
			}).then(function successCallback(response){
				if(response.data.length){
					$scope.orders=response.data;
				}
			});
		}])

		.config(function($routeProvider){
			$routeProvider.when('/start',{
			templateUrl:'tpl/start.html',
			controller:'startCtrl'
		}).when('/main',{
			templateUrl:'tpl/main.html',
			controller:'mainCtrl'
				//添加路由参数:一个或多个 /:n  |  /:n/:i
		}).when('/detail/:did',{
			templateUrl:'tpl/detail.html',
			controller:'detailCtrl'
		}).when('/myorder',{
			templateUrl:'tpl/myorder.html',
			controller:'myorderCtrl'
		}).when('/order/:did',{
			templateUrl:'tpl/order.html',
			controller:'orderCtrl'
		}).otherwise({
			redirectTo:'/start'
		});
	});
	setTimeout(function(){
		//
	},1000);
	window.onresize=function(){
			console.log("sfs");
				document.getElementById("startpage").style.height=window.innerHeight+"px";
		}


+function ($) {
	'use strict';
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('requires jQuery version 1.9.1 or higher')
	}
}(jQuery);


+function ($) {
	'use strict';

	// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	// ============================================================

	function transitionEnd() {
		var el = document.createElement('bootstrap')

		var transEndEventNames = {
			WebkitTransition : 'webkitTransitionEnd',
			MozTransition    : 'transitionend',
			OTransition      : 'oTransitionEnd otransitionend',
			transition       : 'transitionend'
		}

		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return { end: transEndEventNames[name] }
			}
		}

		return false // explicit for ie8 (  ._.)
	}

	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false
		var $el = this
		$(this).one('bsTransitionEnd', function () { called = true })
		var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
		setTimeout(callback, duration)
		return this
	}

	$(function () {
		$.support.transition = transitionEnd()

		if (!$.support.transition) return

		$.event.special.bsTransitionEnd = {
			bindType: $.support.transition.end,
			delegateType: $.support.transition.end,
			handle: function (e) {
				if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})

}(jQuery);

+function ($) {
	'use strict';

	// COLLAPSE PUBLIC CLASS DEFINITION
	// ================================

	var Collapse = function (element, options) {
		this.$element      = $(element)
		this.options       = $.extend({}, Collapse.DEFAULTS, options)
		this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
				'[data-toggle="collapse"][data-target="#' + element.id + '"]')
		this.transitioning = null

		if (this.options.parent) {
			this.$parent = this.getParent()
		} else {
			this.addAriaAndCollapsedClass(this.$element, this.$trigger)
		}

		if (this.options.toggle) this.toggle()
	}

	Collapse.VERSION  = '3.3.4'

	Collapse.TRANSITION_DURATION = 350

	Collapse.DEFAULTS = {
		toggle: true
	}

	Collapse.prototype.dimension = function () {
		var hasWidth = this.$element.hasClass('width')
		return hasWidth ? 'width' : 'height'
	}

	Collapse.prototype.show = function () {
		if (this.transitioning || this.$element.hasClass('in')) return

		var activesData
		var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

		if (actives && actives.length) {
			activesData = actives.data('bs.collapse')
			if (activesData && activesData.transitioning) return
		}

		var startEvent = $.Event('show.bs.collapse')
		this.$element.trigger(startEvent)
		if (startEvent.isDefaultPrevented()) return

		if (actives && actives.length) {
			Plugin.call(actives, 'hide')
			activesData || actives.data('bs.collapse', null)
		}

		var dimension = this.dimension()

		this.$element
				.removeClass('collapse')
				.addClass('collapsing')[dimension](0)
				.attr('aria-expanded', true)

		this.$trigger
				.removeClass('collapsed')
				.attr('aria-expanded', true)

		this.transitioning = 1

		var complete = function () {
			this.$element
					.removeClass('collapsing')
					.addClass('collapse in')[dimension]('')
			this.transitioning = 0
			this.$element
					.trigger('shown.bs.collapse')
		}

		if (!$.support.transition) return complete.call(this)

		var scrollSize = $.camelCase(['scroll', dimension].join('-'))

		this.$element
				.one('bsTransitionEnd', $.proxy(complete, this))
				.emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	}

	Collapse.prototype.hide = function () {
		if (this.transitioning || !this.$element.hasClass('in')) return

		var startEvent = $.Event('hide.bs.collapse')
		this.$element.trigger(startEvent)
		if (startEvent.isDefaultPrevented()) return

		var dimension = this.dimension()

		this.$element[dimension](this.$element[dimension]())[0].offsetHeight

		this.$element
				.addClass('collapsing')
				.removeClass('collapse in')
				.attr('aria-expanded', false)

		this.$trigger
				.addClass('collapsed')
				.attr('aria-expanded', false)

		this.transitioning = 1

		var complete = function () {
			this.transitioning = 0
			this.$element
					.removeClass('collapsing')
					.addClass('collapse')
					.trigger('hidden.bs.collapse')
		}

		if (!$.support.transition) return complete.call(this)

		this.$element
				[dimension](0)
				.one('bsTransitionEnd', $.proxy(complete, this))
				.emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	}

	Collapse.prototype.toggle = function () {
		this[this.$element.hasClass('in') ? 'hide' : 'show']()
	}

	Collapse.prototype.getParent = function () {
		return $(this.options.parent)
				.find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
				.each($.proxy(function (i, element) {
					var $element = $(element)
					this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
				}, this))
				.end()
	}

	Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
		var isOpen = $element.hasClass('in')

		$element.attr('aria-expanded', isOpen)
		$trigger
				.toggleClass('collapsed', !isOpen)
				.attr('aria-expanded', isOpen)
	}

	function getTargetFromTrigger($trigger) {
		var href
		var target = $trigger.attr('data-target')
				|| (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

		return $(target)
	}


	// COLLAPSE PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.collapse')
			var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
			if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.collapse

	$.fn.collapse             = Plugin
	$.fn.collapse.Constructor = Collapse


	// COLLAPSE NO CONFLICT
	// ====================

	$.fn.collapse.noConflict = function () {
		$.fn.collapse = old
		return this
	}


	// COLLAPSE DATA-API
	// =================

	$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
		var $this   = $(this)

		if (!$this.attr('data-target')) e.preventDefault()

		var $target = getTargetFromTrigger($this)
		var data    = $target.data('bs.collapse')
		var option  = data ? 'toggle' : $this.data()

		Plugin.call($target, option)
	})

}(jQuery);