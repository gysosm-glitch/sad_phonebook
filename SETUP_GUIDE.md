# Sad Phonebook 설정 가이드

이 문서는 Sad Phonebook을 처음부터 설정하는 방법을 설명합니다.

## 1단계: Supabase 프로젝트 생성

### 1.1 Supabase 회원가입 및 로그인
1. [Supabase 웹사이트](https://supabase.com)에 접속
2. GitHub 또는 이메일로 회원가입
3. 로그인

### 1.2 새 프로젝트 생성
1. 대시보드에서 "New Project" 클릭
2. 프로젝트 이름 입력: `sad_phonebook`
3. 데이터베이스 암호 설정 (기억해두세요)
4. 지역 선택 (권장: `ap-northeast-1` (Tokyo))
5. "Create new project" 클릭
6. 프로젝트 생성 대기 (2-3분 소요)

### 1.3 API 키 확인
1. 생성된 프로젝트 대시보드에서 "Settings" → "API" 클릭
2. 다음 정보 복사:
   - **Project URL**: `VITE_SUPABASE_URL`로 사용
   - **anon (public)** 키: `VITE_SUPABASE_ANON_KEY`로 사용

## 2단계: Supabase 테이블 생성

### 2.1 SQL 에디터 접속
1. Supabase 대시보드에서 좌측 메뉴의 "SQL Editor" 클릭
2. "New query" 클릭

### 2.2 contacts 테이블 생성
다음 SQL을 복사하여 SQL 에디터에 붙여넣고 실행합니다:

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3 Row Level Security (RLS) 설정
1. 좌측 메뉴에서 "Authentication" → "Policies" 클릭
2. `contacts` 테이블 선택
3. "New Policy" 클릭
4. 다음과 같이 설정:
   - **Policy name**: `Enable all access`
   - **Target roles**: `public`
   - **Allowed operations**: `SELECT`, `INSERT`, `UPDATE`, `DELETE`
   - **Using expression**: 비워두기
5. "Review" 클릭 후 "Save policy" 클릭

또는 SQL로 설정:
```sql
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access" ON contacts
AS PERMISSIVE FOR ALL
USING (true)
WITH CHECK (true);
```

## 3단계: 로컬 환경 설정

### 3.1 프로젝트 디렉토리에서 .env.local 파일 수정
프로젝트 루트에 `.env.local` 파일이 있으면 다음과 같이 수정합니다:

```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **주의**: `.env.local` 파일을 Git에 커밋하지 마세요!

### 3.2 의존성 설치
```bash
npm install
```

### 3.3 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`에 접속하여 애플리케이션이 정상 작동하는지 확인합니다.

## 4단계: 로컬 테스트

### 4.1 기본 기능 테스트
1. 이름: "김철수", 전화번호: "010-1234-5678" 입력 후 "추가" 클릭
2. 테이블에 데이터가 나타나는지 확인
3. "수정" 버튼으로 연락처 정보 수정
4. "삭제" 버튼으로 연락처 삭제

### 4.2 Supabase 데이터 확인
1. Supabase 대시보드로 이동
2. "Table Editor" → `contacts` 테이블 선택
3. 추가, 수정, 삭제한 데이터가 반영되는지 확인

## 5단계: Vercel 배포

### 5.1 GitHub 리포지토리 생성 (선택사항이지만 권장)
1. [GitHub](https://github.com) 접속
2. 새 리포지토리 생성: `sad_phonebook`
3. 로컬 프로젝트를 GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/sad_phonebook.git
git push -u origin main
```

### 5.2 Vercel 계정 생성
1. [Vercel 웹사이트](https://vercel.com)에 접속
2. GitHub 계정으로 회원가입 및 로그인

### 5.3 프로젝트 배포
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub에서 `sad_phonebook` 리포지토리 선택
3. 프로젝트 이름 확인 (기본값: `sad-phonebook`)
4. "Configure Project" 클릭
5. 환경변수 추가:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Supabase URL
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Supabase Anon Key
6. "Deploy" 클릭
7. 배포 완료 대기 (1-2분)

### 5.4 배포 완료 확인
1. Vercel 대시보드에서 배포 상태 확인
2. "Visit" 버튼으로 배포된 사이트 접속
3. 기능이 정상 작동하는지 확인

## 6단계: Vercel에서 환경변수 수정 (필요시)

### 환경변수 변경 방법
1. Vercel 대시보드에서 프로젝트 선택
2. "Settings" → "Environment Variables" 클릭
3. 필요한 변수 수정 또는 삭제
4. 수정 후 자동으로 새로 배포됨

## 일반적인 문제 해결

### 문제 1: "Missing Supabase URL or ANON_KEY"
**원인**: `.env.local` 파일에 환경변수가 설정되지 않음

**해결방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용이 올바른지 확인
3. 개발 서버를 재시작

### 문제 2: "Failed to fetch data from Supabase"
**원인**: Supabase URL 또는 API 키가 잘못됨

**해결방법**:
1. Supabase 대시보드에서 API 정보 다시 확인
2. `.env.local` 파일의 값을 다시 입력
3. 특수 문자가 포함된 경우 따옴표로 감싸기

### 문제 3: "Table 'contacts' does not exist"
**원인**: Supabase에서 `contacts` 테이블을 생성하지 않음

**해결방법**:
1. Supabase 대시보드의 SQL 에디터에서 테이블 생성 SQL 실행
2. "Table Editor"에서 테이블이 생성되었는지 확인

### 문제 4: "Permission denied" 또는 "RLS policy"
**원인**: Row Level Security 정책이 설정되지 않음

**해결방법**:
1. Supabase 대시보드에서 `contacts` 테이블 선택
2. "Authentication" → "Policies" 확인
3. "Enable all access" 정책이 있는지 확인
4. 없으면 위의 RLS 설정 단계를 따르기

### 문제 5: Vercel 배포 후 환경변수 오류
**원인**: Vercel에서 환경변수를 설정하지 않음

**해결방법**:
1. Vercel 대시보드에서 "Settings" → "Environment Variables" 확인
2. 두 개의 환경변수가 모두 설정되었는지 확인
3. 값이 올바른지 확인
4. 변경 후 다시 배포 (Redeploy)

## 지원되는 환경

- **Node.js**: v14 이상
- **npm**: v6 이상
- **브라우저**: 최신 Chrome, Firefox, Safari, Edge

## 다음 단계

배포가 완료되었습니다! 다음을 시도해보세요:

1. 실제 연락처 데이터 추가
2. 친구/가족과 공유
3. 필요에 따라 UI 커스터마이징
4. 추가 기능 구현 (검색, 필터링 등)

더 자세한 내용은 [README.md](./README.md)를 참고하세요.
