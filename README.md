# Sad Phonebook 📱

웹 기반의 전화번호 관리 애플리케이션입니다. Supabase 데이터베이스와 Vercel 호스팅을 통해 간단하고 직관적인 전화번호 관리 시스템을 제공합니다.

## 주요 기능

- ✅ **전화번호 추가**: 이름과 전화번호를 입력하여 새로운 연락처 추가
- ✅ **전화번호 조회**: 저장된 모든 연락처 목록을 테이블 형식으로 조회
- ✅ **전화번호 수정**: 기존 연락처의 정보를 편집
- ✅ **전화번호 삭제**: 불필요한 연락처 삭제
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 UI

## 기술 스택

- **프론트엔드**: HTML, CSS, Vanilla JavaScript
- **백엔드/데이터베이스**: Supabase (PostgreSQL 기반)
- **빌드 도구**: Vite
- **호스팅**: Vercel

## 설치 및 실행

### 1. 프로젝트 복제
```bash
git clone <repository-url>
cd sad_phonebook
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 Supabase 정보를 입력하세요:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Supabase 테이블 생성
Supabase 대시보드에서 다음 스키마로 `contacts` 테이블을 생성하세요:

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173`에 접속하세요.

### 6. 프로덕션 빌드
```bash
npm run build
```
`dist` 폴더에 빌드된 파일이 생성됩니다.

## Vercel 배포

### 1. Vercel 계정 생성
[Vercel 웹사이트](https://vercel.com)에서 계정을 생성하세요.

### 2. 프로젝트 배포
```bash
npm install -g vercel
vercel
```

### 3. 환경변수 설정
Vercel 대시보드에서 프로젝트 설정으로 이동하여 다음 환경변수를 추가하세요:
- `VITE_SUPABASE_URL`: Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Supabase Anon Key

### 4. 배포 확인
배포 후 제공된 URL로 접속하여 정상 작동하는지 확인하세요.

## 프로젝트 구조

```
sad_phonebook/
├── public/
│   └── index.html           # 메인 HTML 파일
├── src/
│   ├── main.js              # 메인 JavaScript 파일
│   ├── api.js               # CRUD API 함수
│   ├── supabaseClient.js    # Supabase 클라이언트 설정
│   └── styles.css           # 스타일시트
├── .env.local               # 환경변수 (git에 커밋하지 않음)
├── .gitignore               # Git 무시 파일
├── package.json             # 프로젝트 의존성
├── vite.config.js           # Vite 설정
├── vercel.json              # Vercel 설정
└── README.md                # 이 파일
```

## 사용 방법

1. **애플리케이션 접속**: Vercel 배포 URL 또는 로컬 개발 서버에 접속
2. **연락처 추가**:
   - 이름과 전화번호를 입력 폼에 입력
   - "추가" 버튼 클릭
3. **연락처 조회**: 테이블에서 모든 저장된 연락처 확인
4. **연락처 수정**:
   - "수정" 버튼 클릭
   - 입력 폼에 정보가 자동으로 로드됨
   - 정보 변경 후 "수정" 버튼 클릭
5. **연락처 삭제**:
   - "삭제" 버튼 클릭
   - 확인 대화상자에서 "확인" 클릭

## 성공 기준

- ✅ 전화번호 추가 기능 정상 작동
- ✅ 전화번호 수정 기능 정상 작동
- ✅ 전화번호 삭제 기능 정상 작동
- ✅ Supabase와 정상 연동
- ✅ Vercel에서 정상 배포 및 접속 가능

## 문제 해결

### Supabase 연결 오류
- `.env.local` 파일에 올바른 URL과 API 키가 입력되었는지 확인하세요
- Supabase 대시보드에서 API 키를 다시 확인하세요

### Vercel 배포 실패
- `vercel.json` 파일의 설정이 정확한지 확인하세요
- 환경변수가 모두 설정되었는지 확인하세요

### 테이블 조회 오류
- Supabase 대시보드에서 `contacts` 테이블이 생성되었는지 확인하세요
- Row Level Security (RLS) 정책이 모든 사용자 접근을 허용하는지 확인하세요

## 개선 사항

향후 버전에서 다음 기능들을 추가할 수 있습니다:
- 연락처 검색 및 필터링
- 연락처 분류/그룹화
- 프로필 이미지 추가
- 통화 기록 기능
- 사용자 인증 및 로그인
- 데이터 내보내기 (CSV, PDF)

## 라이선스

MIT License

## 문의

문제나 제안사항이 있으면 이슈를 생성해주세요.
