<img src="https://github.com/user-attachments/assets/cc0c0a67-c3bc-4209-bc30-fe5f1ba2e7f1" alt="My Image" width="300" />

## 원데이 클래스 탐색 및 개설 플랫폼

이 프로젝트는 취미와 여가활동을 탐색하고, 다양한 원데이 클래스를 개설 및 신청할 수 있는 웹사이트입니다. 

[취미존중 바로가기](https://cmjj.kafolio.kr/login)

---

### 📖 DISCRIPTION

![banner1](https://github.com/user-attachments/assets/f1abc279-3779-4b33-a181-552d0f8a9751)


사용자는 클래스 개설자가 되어 새로운 클래스를 등록하고 신청자를 모집할 수 있으며, 클래스 참여자는 다양한 취미 클래스들을 검색하고 간편하게 신청할 수 있습니다. 

이 플랫폼은 사용자들이 새로운 취미를 발견하고, 일일 클래스를 통해 간단하게 체험할 수 있는 기회를 제공합니다.


<br><br>

#### ⭐ Pages Tree

![image](https://github.com/user-attachments/assets/f122eca6-e4c4-47a7-86a3-a0c2fb54ba73)

<br><br>

#### ⭐ Project Tree

![image](https://github.com/user-attachments/assets/88156000-24be-4c6f-b6ab-0e42c3f669c9)

<br><br>

#### ⭐ ERD

![image](https://github.com/user-attachments/assets/dddb42a5-421f-46bf-9421-6e12de8c3f78)

<br><br>

#### ⭐ Technologies Used
> Language
- JAVA
- TypeScript
- SCSS
- HTML
> API
- Google Maps API
- DropZone CDN
- Swiper CDN
- SummerNote CDN
> Tool
- Eclipse
- Visual Studio Code
- SpringBoot
- Oracle Database, SQL Developer
  
<br><br>

---
### 📖 Pages View

<br>

#### ⭐ 로그인 페이지

![image](https://github.com/user-attachments/assets/8ad730e9-bc53-40a8-b665-a7698016df26)

- 취미 존중 사이트에서 사용되는 로그인 페이지
- 외부 로그인을 사용하여 카카오, 네이버, 구글 로그인이 가능
- 로그인 성공 시 메인 페이지로 이동

<br><br>

#### ⭐ 메인 페이지

https://github.com/user-attachments/assets/8fd16c88-30fa-41f8-a117-c60e67cbc0bd

- 헤더에서 검색 페이지로 이동이 가능, 로그인 상태일 경우 마이페이지, 클래스 등록, 로그아웃이 표시
- 상단 배너를 통해 현재 진행중인 이벤트나 보여주고 싶은 사이트 정보를 표시하기 위해 스와이퍼 방식으로 구현
- 사이트에서 추천하는 원데이 클래스를 표시 한다
- 각 원데이 클래스의 정보와 상세 정보 바로가기 및 위시리스트에 담는 기능을 구현

<br><br>

#### ⭐ 검색 페이지

https://github.com/user-attachments/assets/d355875e-9b0c-43c6-872c-a049edd3b075

- 원데이클래스 검색 기능 구현
- 제목, 지역, 카테고리, 요일, 난이도, 유형, 인원, 소요 시간, 금액을 설정하고 각 조건에 맞게 검색
- 현재 설정한 검색 조건을 초기화 하는 기능 구현
- 최신순(등록일) 가격순, 평점순으로 검색된 내용에 대해 정렬 가능
- 검색되어 하단에 표시된 원데이클래스에 대해 클릭시 상세보기 및 예약페이지로 이동

<br><br>

#### ⭐ 예약 페이지

https://github.com/user-attachments/assets/6006acd4-90d0-4c1a-b70c-19bd759f5909

- 선택된 원데이 클래스에 대한 상세정보와 신청하기 구현
- 게시된 클래스에 대한 이미지, 기본 정보, 클래스 소개, 커리큘럼, 호스트 소개, 위치 정보, 후기 표시
- 클래스 일정에서 날짜, 가격을 선택하고 신청하면 결제 페이지로 이동
- 결제 페이지에서 클래스의 간단한 정보 표시, 신청자 정보 입력, 결제 안내 및 쿠폰, 크레딧 적용 가능
- 최종적으로 결제하기를 클릭 시 신청 완료와 동시에 마이페이지 - 내가 신청한 클래스 에 표시

<br><br>

#### ⭐ 마이 페이지
![image](https://github.com/user-attachments/assets/60e07902-50db-478e-861d-19bb2e4ab97b)

- 게시한 클래스 보유 여부에 따라 게스트 모드, 호스트 모드를 표시
- 모드 전환이 가능 하며 모드에 따라 표시되는 목록이 변경된다
##### - 게스트 모드
- 로그인한 유저에 대한 정보 제공 및 기능 제공
- 프로필 이미지, 닉네임, 전화번호 변경 가능
- 위시 리스트 : 유저가 선택한 위시리스트 표시
- 내가 신청한 클래스 : 신청한 클래스에 대한 상태별 내역 표시
- 쿠폰 : 쿠폰 등록 및 쿠폰 사용 내역 표시
- 크레딧 : 유저가 보요한 크렛과 소멸 예정 크레딧, 적립 또는 사용한 크레딧 내역 표시
- 친구 초대 : Email을 통해 친구 초대 코드 보내기 구현
- 탈퇴하기 : 해당 사이트에 대한 계정 탈퇴 구현
##### - 호스트 모드
- 클래스 관리 : 클래스 관리 페이지로 이동
- 강사님 추천 : 미구현 상태

<br><br>

#### ⭐ 클래스 관리 페이지
![image](https://github.com/user-attachments/assets/e35f8248-118e-4062-a129-fb6e7e772458)

- 게시한 원데이 클래스 리스트 표시
- 새로운 클래스 등록 및 게시한 클래스 수정을 할 수 있게 페이지를 이동

<br><br>

#### ⭐ 클래스 등록 페이지

![슬라이드1](https://github.com/user-attachments/assets/22fa95ba-574a-458b-a203-d97c5aaba9ad)
![슬라이드2](https://github.com/user-attachments/assets/404c3312-9055-4547-98a6-53af2da84e69)

- 새로운 클래스 등록을 위한 페이지
- 클래스 내용 작성을 도와주는 등록가이드 보기 구현
- 호스트 인증(전화번호 인증) 기능 구현
- 클래스 소개 - 제목, 카테고리, 표시할 이미지, 클래스 소개(상세 내용), 커리큘럼, 호스트 소개(이미지, 닉네임, 소개글), 위치 정보, 제공 및 유의사항 작성 기능 구현
- 금액 설정 및 계산 기능 구현
- 각 내용을 작성한 후 등록을 하면 웹 페이지 내에 게시된다

<br><br>

#### ⭐ 수정 페이지

https://github.com/user-attachments/assets/222809f5-632c-4dc0-9092-b5ff5ef9c5a6

- 이미 게시한 원데이 클래스에 대해 수정하기 기능 구현
- 등록 시 입력되었던 정보들을 표시 하고 내용을 변경하고 수정할 경우 수정된 내용으로 웹 페이지 내에 게시된다
- 카테고리는 변경이 불가능하게 구현

<br><br>
