# 🛒 스마트 재고 관리 시스템

React와 Node.js(Express) 기반의 웹 애플리케이션으로, MongoDB를 데이터베이스로 사용합니다. 이 시스템은 효율적인 상품 관리(등록, 수정, 삭제, 상세 보기), 강력한 검색 기능, 그리고 실시간 재고 부족 알림 기능을 제공하여 재고 관리를 최적화합니다.

---

## 📸 미리보기 (배포 링크)

[**스마트 재고 관리 시스템 바로가기**](https://inventory-smart-system.vercel.app/)

---

## 🚀 주요 기능

* **상품 CRUD:** 상품 정보(이름, 설명, 가격, 수량, 카테고리, 공급업체)를 등록, 조회, 수정, 삭제할 수 있습니다.
* **재고 알림:** 재고 수량이 설정된 임계값(기본 10개) 이하인 상품들을 한눈에 확인할 수 있습니다.
* **통합 검색:** 상품명, 카테고리, 설명 등 다양한 기준으로 상품을 쉽게 검색할 수 있습니다.
* **반응형 UI:** React-Bootstrap을 활용하여 직관적이고 반응형 사용자 인터페이스를 제공합니다.

---

## 🛠️ 기술 스택

* **Frontend:** `React.js` (with Vite), `React-Bootstrap`, `Axios`
* **Backend:** `Node.js` (Express.js)
* **Database:** `MongoDB Atlas`

**💡 개발 과정:** 본 프로젝트는 초기 `Java Spring Boot` 기반 백엔드에서 `Node.js (Express.js)` 기반 백엔드로 성공적으로 전환하여 개발되었습니다.

---

## 💾 로컬 환경에서 실행하는 방법

프로젝트를 로컬에서 실행하기 위해서는 다음 단계를 따릅니다.

### 1. 프로젝트 클론

```bash
git clone [당신의 깃허브 저장소 URL]
cd [저장소_이름] # 예: cd Inventory

### 2. .env 파일 설정
프로젝트 루트 (Inventory/) 에 .env 파일을 생성하고 다음 환경 변수를 추가합니다.
# MongoDB Atlas 연결 URI
# MongoDB Atlas 대시보드에서 Clusters -> Connect -> Drivers -> Node.js 에서 연결 문자열을 복사하여 붙여넣으세요.
# <username>과 <password>는 실제 MongoDB 사용자 이름과 비밀번호로 교체해야 합니다.
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.oxfr4eg.mongodb.net/inventory_db?retryWrites=true&w=majority"

# Vercel 프론트엔드 도메인 (CORS 설정을 위해 필요)
# 로컬 개발 시에는 이 값을 사용하지 않습니다.
VERCEL_FRONTEND_URL="https://inventory-smart-system.vercel.app"

### 3. 백엔드 실행
Bash

cd backend
npm install
npm start
Server is running on port 5000 메시지가 뜨면 성공입니다. 
(브라우저에서 http://localhost:5000으로 접속하여 'Welcome to the Inventory Management API!' 메시지를 확인할 수 있습니다.)

### 4. 프론트엔드 실행
새로운 터미널을 열고 프론트엔드 디렉토리로 이동합니다.

Bash

cd frontend
npm install
npm run dev
http://localhost:3000 주소가 뜨면 브라우저에서 접속하여 앱을 확인할 수 있습니다.

제안에 대한 의견
배포 링크: [배포 링크](https://your-vercel-url.vercel.app) 부분을 [스마트 재고 관리 시스템 바로가기](https://inventory-smart-system.vercel.app/) 로 직접 바꿔 넣었습니다.

기술 스택: Java Spring Boot → Node.js 변환을 💡 개발 과정 섹션으로 빼서 설명을 더 추가했습니다.
로컬 실행 방법: .env 파일 설정에 대한 자세한 가이드와 함께 백엔드-프론트엔드를 각각 실행하는 방법을 명확히 구분하여 설명했습니다. 
