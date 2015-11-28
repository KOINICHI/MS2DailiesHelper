var Main = angular.module('ArikkariHelper', []);

Main.controller('ArikkariHelperCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.QuestNPC = ['알리야르','마요르','고다르'];
	$scope.QuestCategory = ['전투', '생활', '모험'];
	$scope.Status = {0:'notstarted', 1:'ongoing', 2:'cleared'};
	
	$scope.Postfixes = ['형 몬스터 처치하기', ' 처치하기', ' 클리어하기', ' 몬스터 공격하기', '', '', ' 구해오기', '', '', ' 입장하기'];	
	
	$scope.Quests = [];
	$scope.Maps = [];
	$http.get('http://koinichi.github.io/MS2DailiesHelper/maps.json').success( function (res) {
		$scope.Maps = res;
		for (var map in $scope.Maps) {
			$scope.Maps[map].quests = [];
		}
	});
	
	$http.get('http://koinichi.github.io/MS2DailiesHelper/quests.json').success( function (res) {
		while ($scope.Maps.length == 0) ;
		$scope.Quests = res;
		for (i=0; i<$scope.Quests.length; i++) {
			var status = getCookie($scope.Quests[i].id);
			if (status == 0 || status == 'notstarted') { $scope.Quests[i].status = 0; }
			if (status == 1 || status == 'ongoing') {
				$scope.Quests[i].status = 1;
				for (j=0; j<$scope.Quests[i].map.length; j++) {
					$scope.Maps[$scope.Quests[i].map[j]].quests.push($scope.Quests[i].desc);
				}
			}
			if (status == 2 || status == 'cleared') { $scope.Quests[i].status = 2; }
		}
	});
	
	$scope.Quests.sort( function(a, b) {
		return ((a.key != b.key) ? 0 : (a.key > b.key ? 1 : -1));
	});
	
	$scope.init = function () {
		if (getCookie('visited') < 3) {
			$scope.currentScreen = 3;
			setCookie('visited', '2', 365);
		}
        else {
			$scope.currentScreen = 0;
        }
	}
	
	$scope.currentScreen = 0;
	$scope.viewMap = function(e) {
		$scope.currentScreen = 1;
	}
	
	
	$scope.keydownHandler = function(e) {
		if (e.keyCode == 27) { // ESC
			$scope.currentScreen = 0;
		}
		if (e.keyCode == 87) { // W
			if ($scope.currentScreen == 1) {
				$scope.currentScreen = 0;
			}
			else {
				$scope.currentScreen = 1;
			}
		}
		if (e.keyCode == 72) { // H
			if ($scope.currentScreen == 2) {
				$scope.currentScreen = 0;
			}
			else {
				$scope.currentScreen = 2;
			}
		}
	}
	
	$scope.startQuest = function(e) {
        e.stopPropagation();
		var id = parseInt(e.target.attributes['name'].value)
		for (i=0; i<$scope.Quests.length; i++) {
			if ($scope.Quests[i].id == id) {
				$scope.Quests[i].status = 1;
				setCookie(id, '1', 365);
				for (j=0; j<$scope.Quests[i].map.length; j++) {
					$scope.Maps[$scope.Quests[i].map[j]].quests.push($scope.Quests[i].desc);
				}
			}
		}
	};
	$scope.clearQuest = function(e) {
        e.stopPropagation();
		var id = parseInt(e.target.attributes['name'].value)
		for (i=0; i<$scope.Quests.length; i++) {
			if ($scope.Quests[i].id == id) {
				if ($scope.Quests[i].status == 2) {
					$scope.Quests[i].status = 1;
					setCookie(id, '1', 365);
				}
				else if ($scope.Quests[i].status == 1) {
					$scope.Quests[i].status = 2;
					setCookie(id, '2', 365);
				}
				break;
			}
		}
	};
	$scope.confirmClearAll = true;
    $scope.clearAllQuests = function(e) {
		if ($scope.confirmClearAll) {
            e.currentTarget.innerHTML = '진짜로?';
        	$scope.confirmClearAll = false;    
        }
        else {
		    for (i=0; i<$scope.Quests.length; i++) {
                if ($scope.Quests[i].status == 1) {
                    $scope.Quests[i].status = 2;
                    setCookie($scope.Quests[i].id, '2', 365);
                }
            }
            e.target.innerHTML = '모든 퀘스트 완료하기';
        	$scope.confirmClearAll = true;
        }
    };
	$scope.confirmRemoveAll = true;
    $scope.removeClearedQuests = function(e) {
		if ($scope.confirmRemoveAll) {
            e.currentTarget.innerHTML = '진짜로?';
        	$scope.confirmRemoveAll = false;    
        }
        else {
		    for (i=0; i<$scope.Quests.length; i++) {
                if ($scope.Quests[i].status == 2) {
                    $scope.Quests[i].status = 0;
                    setCookie($scope.Quests[i].id, '0', 365);
                }
            }
            e.target.innerHTML = '완료한 퀘스트 정리하기';
        	$scope.confirmRemoveAll = true;
        }
    };
	
	
	
}]);

Main.filter('listFilter', [function() {
	return function(list, word) {
		if (word == undefined) {
			word = "";
		}
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].desc.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);

Main.filter('myquestFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == '1' || list[i].status == '2') {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);

Main.filter('ongoingFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == 1) {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);

Main.filter('clearedFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == 2) {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);

Main.filter('notstartedFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == 0) {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);


Main.filter('ongoingMapFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == 1) {
				for (j=0; j<list[i].map.length; j++) {
					if (ret.indexOf(list[i].map[j]) < 0) {
						ret.push(list[i].map[j]);
					}
				}
			}
		}
		return ret
	};
}]);


String.prototype.getHashCode = function() {
	var hash = 0;
	for (i=0; i<this.length; i++) {
		hash = ((hash<<5) - hash + this.charCodeAt(i)) % 0x7fffffff;
	}
	return hash ;
}
String.prototype.getTail = function() {
	return (this.charCodeAt(0)-44032) % 28;
}

String.prototype.truncate = function(l) {
	return (this.length > l) ? '...' + this.substring(this.length-l,this.length) : this;
};