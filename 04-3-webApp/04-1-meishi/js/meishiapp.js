/**
 * Created by lglong on 2017-10-21.
 */
angular.module('meishi',['ng','ngTouch'])
	.controller('indexCtrl',['$scope',function($scope){
		$scope.jumpTo=function (url,trans){
			//$('#'+id).pagecontainer('change',url,{role:'slide'});
			var trans=trans||'slide';
			$.mobile.changePage(url,{transition:trans,changeHash:false});
		};
		$scope.myheight=window.innerHeight+"px";
		angular.element('body').on('pagebeforeshow', function (event) {
			var scope = angular.element(event.target).scope();
			angular.element(event.target).injector().
			invoke(function ($compile) {
				$compile(angular.element(event.target))(scope);
				scope.$digest();
			})
		});
		$scope.sendId=function(id){
			sessionStorage.setItem("dishid",id);
		};
	}]).controller('startCtrl',['$scope',function($scope){
}]).controller('mainCtrl',['$scope','$http',function($scope,$http){

	$scope.dishList=[];
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
			$scope.dishList=[];
			$scope.searching=false;
			$scope.addmore=true;
			$scope.keywd='';
		}
		$http.get("data/dish_listbypage.php?start="+$scope.dishList.length).success(function(data){
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
					$scope.dishList=response.data;
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
			$scope.dishList=$scope.dishList.concat(data);
			if(data.length<5){
				$scope.addmore=false;
			}
		}else{
			$scope.addmore=false;
		}
		$scope.isLoading=false;
	}
}]).controller('detailCtrl',['$scope','$http',function($scope,$http){
	$http({
		method:'post',
		url:'data/dish_listbydid.php',
		data:{did:sessionStorage.getItem("dishid")},
		headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function (data) {
			return $.param(data);
		}
	}).then(function successCallback(response){
		$scope.details=response.data;
	});
}]).controller('orderCtrl',['$scope','$http',function($scope,$http){
	$scope.orderstate=false;
	$scope.submit=function(){
		$scope.datas='{' +
				'"phone":'+$scope.phone+', ' +
				'"did": '+sessionStorage.getItem("dishid")+', ' +
				'"user_name":\"'+$scope.user_name+'\", ' +
				'"sex": '+$scope.sex+', ' +
				'"addr":\"'+$scope.addr+'\"}';
		//console.log(1313113);
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
				sessionStorage.setItem("phonenum",$scope.phone);

			}
		});

	}
}]).controller('myorderCtrl',['$scope','$http',function($scope,$http){
	$scope.orders=[];
	$http({
		method:'post',
		url:'data/dish_listbyphone.php',
		data:{phone:sessionStorage.getItem("phonenum")},
		headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function (data) {
			return $.param(data);
		}
	}).then(function successCallback(response){
		if(response.data.length){
			$scope.orders=response.data;
		}
	});
}]);