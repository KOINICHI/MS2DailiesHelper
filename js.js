var Main = angular.module('ArikkariHelper', []);

Main.controller('ArikkariHelperCtrl', ['$scope', function($scope) {
	$scope.QuestNPC = ['알리야르','마요르','고다르'];
	$scope.QuestCategory = ['전투', '생활', '모험'];
	
	
	$scope.Monsters = ['기계','벌레','사물','식물','신수','악마','야수','언데드','요정','인간','정령'];
	$scope.MonstersMap = null;
	$scope.Bosses = ['깡패 바라하','부기콜리','경비대장 차우','데블린 치프','데블린 워리어','둔둔','에피','프랑케네뜨','자이언트 라바아이','자이언트 터틀','그리피나','그리폰','매드오네뜨','마크52 알파','머쉬맘','닉시','레버넌트 좀비','우르자','다크 지란트','마노','바람술사 라펭','소환술사 라툰','스텀피','우르판다','좀비머쉬맘','킹슬라임','레르노스','로로와 무무스','바야르 수문장','분노의 바포메트','알파 터틀','토토와 구구스','페카노스','냉혈한 바포메트','이카르 마드','트라우로스','나인캡 카파','대지의 라바나이트','우르스카','몬테 드 카를로','팬텀 디스트로이어','레르타'];
	$scope.BossesMap = ['앙드레아 가문의 영지','부기콜리 동굴','커닝 인터체인지','로얄로드 북부','로얄로드 북부','커닝 폐기물 처리장','요정 나무 호수','연구센터 지하실','라바아이의 둥지','비치웨이 111','트리니안 가도','차가운 심장','플로라 애비뉴','뉴런 DNS 연구 센터','남의 집','요정 나무 호수','버려진 납골당','굽이치는 협곡','토드하라의 샘물','그리니아 폭포','녹아내린 정원','장미의 성','스위트 밸리','무지개 산','개미굴 입구','신의 샘물방울','퍼플 문 캐슬','바움나무','깎은 절벽 요새','캐슬 리버스','엘루아 강가','붉은 휘파람 절벽','상처입은 협곡','눈꽃 봉우리','아이스 크라운','코로푸푸 절벽','크로노프 철도역','핑크하트의 스위트 캐슬','커넬 에너지 연구소','루디션 카니발','펜토마 사이보그 센터','프로즌 라바홀'];
	$scope.Dungeons = ['루디블 타임홀', '용맹의 시험장', '제1 촬영지', '제2 촬영지', '제3 촬영지', '제4 촬영지', '제5 촬영지', '발록', '피로스 파드', '슈슈와 부부스', '잊혀진 바야르', '마크52 오메가', '캡틴 모크', '파모칸', '파풀라투스', '호루스', '혼돈의 바포메트', '그림자 술사 데보라크', '마크52 베타', '최후의 바야르', '헤모칸'];
	$scope.DungeonsMap = null;
	$scope.BattleObjects = ['불드럼', '광산카트', '오크통', '타이어', '쓰레기통', '가스통', '폐기물드럼통', '토템(던지기)', '독가루포대', '다이나마이트', '폭탄', '닭장', '계란', '병박스', '횃불', '무지개똥', '상한무지개똥', '표지판', '신호등', '전봇대', '토템(휘두르기)', '파이프', '페리온집', '커닝버스', '커닝폰부스', '커닝트럭', '빙하집', '샤워실', '화장실', 'EMP 폭탄', '태엽 폭탄'];
	$scope.BattleObjectsMap = null;
	
	$scope.Housing = ['블루/핑크 스포트라이트, 반짝 미러볼 작동하기','다이나믹 러닝머신 체험하기', '럭셔리 새면대에서 세수하기', '디럭스 샤워 부스에서 샤워하기', '낚시 의자에 앉아보기', '쇼케이스 냉장고 살펴보기', '주황 콤팩트 냉장고 살펴보기', '하얀 콤팩트 냉장고 살펴보기', '하얀 미니 냉장고 살펴보기', '레트로 TV 시청하기', '블랙 슬림 TV 시청하기', '화이트 슬림 TV 시청하기', '야옹 캣타워에서 고양이와 놀기', '사이클론 실내 자전거 체험하기', '눈누비데 좌변기에서 볼 일 보기'];
	$scope.HousingMap = null;
	$scope.Using = ['슬라임 찌꺼기 먹어보기', '황금사과 먹어보기','달콤한 나뭇잎 먹어보기','쉐도우 DNA 먹어보기','빠빠 가루 먹어보기','빠빠 열매 따기/구해오기','뚜삐뚜 젤리 먹어보기','요정수 먹어보기','이블아이의 눈 먹어보기'];
	$scope.UsingMap = ['초록 숲 오솔길','나무꾼의 언덕','엘보의 통나무 굴','쉐도우 게이트','바로타 무역항','카브리엄 분지','우드버리','흰 바위산','개미굴 광장'];
	$scope.Storybook = ['튜닝 모터스 : 지프 에디션','블록 골렘 카탈로그','Ms DECOR : 베드 컬렉션','인테리어 Vol. 1/2/3','Beauty Dr.Jenco & Dicson', '헤어스타일 Vol. 1','알리카르 감옥 브로슈어'];
	$scope.StorybookMap = ['트라이아-홍보 사원 고든','골두스 펜트 하우스','골두스 펜트 하우스','트라이아 도서관','트라이아 도서관', '로제타 뷰티살롱-제인', '알리카르 감옥-카론'];
	
	$scope.LifeOthers = ['트로이 여관에 앉아 있기'];
	$scope.LifeOthersMap = ['트라이아'];
	
	$scope.Actions = ['비행하기', '점프하기', '탈것 타고 이동하기', '달리기', '벽타고 이동하기', '기어가기', '로프에 매달려있기', '물속에 있기', '택시 이용하기', '비석을 때려 부활을 도와주기', '나무 상자 열어보기', '황금 보물 상자 열어보기', '알리카르 감옥의 쓰레기통 뒤지기', '사용하지 않는 장비 분해하기', '망원경 들여다보기', '잃어버린 기억의 숲/달빛누리 숲/바움나무/엘보의 통나무 굴 망원경 들여다보기', '커닝시티/실버스톤 브릿지/스티머 부르크 망원경 들여다보기'];
	$scope.ActionsMap = null;
	$scope.Visiting = ['스페이스 번지 점프','무지개 슬라임 공장', '쿰바왕카의 보물', '때려때려 돈나무', '설눈이의 꿈', '쉐도우 월드', '파이널 서바이버'];
	$scope.VisitingMap = ['','','','','','','짝수 시 35분에 퀸즈타운 (예: 2시 35분)'];
	
	$scope.Postfixes = ['형 몬스터 처치', ' 처치', ' 클리어', ' 몬스터 공격', '', '', ' 구해오기', '', '', ' 입장하기'];
	
	$scope.QuestsType = [[$scope.Monsters, $scope.MonstersMap], [$scope.Bosses, $scope.BossesMap], [$scope.Dungeons, $scope.DungeonsMap], [$scope.BattleObjects, $scope.BattleObjectsMap], [$scope.Housing, $scope.HousingMap], [$scope.Using, $scope.UsingMap], [$scope.Storybook, $scope.StorybookMap], [$scope.LifeOthers, $scope.LifeOthersMap], [$scope.Actions, $scope.ActionsMap], [$scope.Visiting, $scope.VisitingMap]];
	$scope.Quests = [];
	
	for (var type=0; type<$scope.QuestsType.length; type++) {
		var Key = $scope.QuestsType[type][0];
		var Map = $scope.QuestsType[type][1];
		var len = Key.length;
		
		for (var i=0; i<len; i++) {
			var desc = Key[i];
			var map = Map == null ? "" : Map[i];
			var id = type*10000 + i;
			var status = 'notstarted';
			
			if (type == 3) {
				desc += (desc.substring(desc.length-1).hasTail() ? "" : "으") + "로 ";
			}
			desc += $scope.Postfixes[type];
			if (getCookie(id) == 'ongoing') {
				status = 'ongoing';
			}
			
			$scope.Quests.push({
				type    : type ,
				id      : id,
				desc    : desc,
				map     : map,
				status  : status});
		}
	}
	
	$scope.startQuest = function(e) {
		e.stopPropagation();
		var id = parseInt(e.target.attributes['name'].value)
		for (i=0; i<$scope.Quests.length; i++) {
			if ($scope.Quests[i].id == id) {
				$scope.Quests[i].status = 'ongoing';
				setCookie(id, 'ongoing', 365);
				break;
			}
		}
	}
	$scope.clearQuest = function(e) {
		e.stopPropagation();
		var id = parseInt(e.target.attributes['name'].value)
		for (i=0; i<$scope.Quests.length; i++) {
			if ($scope.Quests[i].id == id) {
				if ($scope.Quests[i].status == 'cleared') {
					$scope.Quests[i].status = 'ongoing';
					setCookie(id, 'ongoing', 365);
				}
				else if ($scope.Quests[i].status == 'ongoing') {
					$scope.Quests[i].status = 'cleared';
					setCookie(id, 'notstarted', 365);
				}
				break;
			}
		}
	}
}]);

Main.filter('listFilter', [function() {
	return function(list, word) {
		if (word == undefined) {
			word = "";
		}
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].desc.indexOf(word) >= 0) {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);

Main.filter('clearFilter', [function() {
	return function(list) {
		var ret = [];
		for (i=0; i<list.length; i++) {
			if (list[i].status == 'ongoing' || list[i].status == 'cleared') {
				ret.push(list[i]);
			}
		}
		return ret;
	};
}]);


String.prototype.getHashCode = function() {
	var hash = 0;
	for (i=0; i<this.length; i++) {
		hash = ((hash<<5) - hash + this.charCodeAt(i)) % 0x7fffffff;
	}
	return hash ;
}
String.prototype.hasTail = function() {
	return (this.charCodeAt(0)-44032) % 28 > 0;
}



