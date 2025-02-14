package org.project.pack.classes;

public class Methods {
	public static String sortMainCategory(Long mCId) {
		if(mCId == 1)return "핸드메이드";
		if(mCId == 2)return "쿠킹";
		if(mCId == 3)return "드로잉";
		if(mCId == 4)return "플라워 · 가드닝";
		if(mCId == 5)return "음악";
		if(mCId == 6)return "요가 · 필라테스";
		if(mCId == 7)return "뷰티";
		if(mCId == 8)return "반려동물";
		if(mCId == 9)return "레져 · 스포츠";
		else return "체험";
	}
	public static String sortSubCategory(Long sCId) {
		if(sCId == 1)return "캔들 · 디퓨저";
		if(sCId == 2)return "향수";
		if(sCId == 3)return "비누·배쓰밤";
		if(sCId == 4)return "액세서리";
		if(sCId == 5)return "가죽";
		if(sCId == 6)return "베이킹";
		if(sCId == 7)return "요리";
		if(sCId == 8)return "떡 · 앙금";
		if(sCId == 9)return "디저트·음료";
		if(sCId == 10)return "커피·바리스타";
		if(sCId == 11)return "소묘";
		if(sCId == 12)return "펜화";
		if(sCId == 13)return "캘리그라피";
		if(sCId == 14)return "수채화";
		if(sCId == 15)return "동양화";
		if(sCId == 16)return "피아노";
		if(sCId == 17)return "우쿠렐레";
		if(sCId == 18)return "보컬";
		if(sCId == 19)return "작사 · 작곡";
		if(sCId == 20)return "프로듀싱";
		if(sCId == 21)return "피트니스";
		if(sCId == 22)return "실내 운동";
		if(sCId == 23)return "야외 운동";
		if(sCId == 24)return "댄스";
		if(sCId == 25)return "레저";
		if(sCId == 26)return "메이크업";
		if(sCId == 27)return "헤어";
		if(sCId == 28)return "네일아트";
		if(sCId == 29)return "타투";
		if(sCId == 30)return "셀프케어";
		if(sCId == 31)return "펫 푸드";
		if(sCId == 32)return "펫 에티켓";
		if(sCId == 33)return "펫 악세사리";
		if(sCId == 34)return "펫 미용";
		if(sCId == 35)return "기타 클래스";
		if(sCId == 36)return "실내 운동";
		if(sCId == 37)return "야외 운동";
		if(sCId == 38)return "댄스";
		if(sCId == 39)return "레저";
		else return "기타 스포츠";
	}
	
	public static Double cutBelow(Double data) {
		return Math.round(data*10) / 10.0;
	}
	
	public static String sortDifficulty(Integer difficulty) {
		if(difficulty.toString().isEmpty())return "";
		if(difficulty == 1)return "입문";
		if(difficulty == 2)return "중급";
		else return "고급";
	}
	
	public static String sortDuration(Integer duration) {
		if(duration.toString().isEmpty()) return "";
		return duration/60 + "시간";
	}
	
	
}
