# 🎨 Chatvas

**AI-powered conversational design tool - Design through conversation**

Chatvas는 AI와 대화하며 UI를 디자인하고, 원하는 프레임워크 코드로 변환해주는 오픈소스 도구입니다.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204-purple)

---

## ✨ 주요 기능

- 🤖 **AI 대화형 디자인**: 자연어로 UI를 요청하고 실시간으로 생성
- 🎯 **다중 프레임워크 지원**: React, Vue, Svelte 중 선택 가능
- 🔄 **반복 수정**: 대화를 이어가며 디자인을 계속 개선
- 👁️ **실시간 미리보기**: 생성된 코드를 즉시 확인
- 📥 **코드 내보내기**: 복사 또는 다운로드로 즉시 사용

---

## 🚀 빠른 시작

### 1. 사전 요구사항

- Node.js 18+ 설치
- Anthropic API Key (Claude API)

### 2. 설치

```bash
# 저장소 클론
git clone https://github.com/junguk03/chatvas.git
cd chatvas

# 의존성 설치
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일에 API 키 추가:

```
ANTHROPIC_API_KEY=your_api_key_here
```

**API 키 발급 방법:**
1. [Anthropic Console](https://console.anthropic.com) 접속
2. 회원가입 / 로그인
3. API Keys 메뉴에서 새 키 생성
4. 키를 복사하여 `.env.local`에 붙여넣기

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

---

## 📖 사용법

### 1️⃣ 프레임워크 선택
React, Vue, Svelte 중 원하는 프레임워크 선택

### 2️⃣ 프롬프트 입력
예시:
- "로그인 페이지 만들어줘, 파란색 테마로"
- "대시보드 레이아웃, 사이드바 포함"
- "랜딩 페이지, 히어로 섹션 + CTA 버튼"

### 3️⃣ 수정 요청
생성된 디자인이 마음에 들지 않으면 대화로 수정:
- "버튼을 더 크게 만들어줘"
- "배경색을 하늘색으로 변경"
- "폰트를 더 크게, 그라데이션 추가"

### 4️⃣ 코드 내보내기
- 📋 **복사**: 클립보드에 복사하여 바로 사용
- 💾 **다운로드**: HTML 파일로 저장

---

## 🏗️ 프로젝트 구조

```
chatvas/
├── app/
│   ├── api/                    # API Routes
│   │   ├── generate/          # 코드 생성 API
│   │   └── refine/            # 코드 수정 API
│   ├── features/
│   │   └── generator/
│   │       ├── components/    # UI 컴포넌트
│   │       └── hooks/         # React Hooks
│   ├── lib/
│   │   ├── claude/           # Claude API 클라이언트
│   │   ├── types/            # TypeScript 타입
│   │   └── utils/            # 유틸리티
│   ├── constants/            # 상수 정의
│   ├── globals.css           # 전역 스타일
│   ├── layout.tsx            # Root Layout
│   └── page.tsx              # 메인 페이지
├── .env.local.example        # 환경 변수 예시
├── package.json
└── tsconfig.json
```

---

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel (권장)

---

## 🌐 배포

### Vercel 배포 (권장)

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 Import
3. 환경 변수 `ANTHROPIC_API_KEY` 설정
4. 배포 완료!

### 다른 플랫폼

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🤝 기여하기

기여는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📧 문의

- GitHub: [@junguk03](https://github.com/junguk03)
- Project Link: [https://github.com/junguk03/chatvas](https://github.com/junguk03/chatvas)

---

## 🙏 감사의 말

- [Anthropic](https://www.anthropic.com) - Claude API 제공
- [Next.js](https://nextjs.org) - 강력한 React 프레임워크
- [Tailwind CSS](https://tailwindcss.com) - 유틸리티 CSS 프레임워크

---

**Made with ❤️ by junguk03**
