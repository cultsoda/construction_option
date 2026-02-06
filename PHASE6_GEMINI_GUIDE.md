# Phase 6 구현 가이드 (Gemini용)

## 프로젝트 개요

이 프로젝트는 건설 옵션 선택 시스템의 대규모 리팩토링 작업입니다. 거대한 모놀리식 컴포넌트(`prototype-viewer.tsx`)를 모듈화된 구조로 분해하여 유지보수성과 확장성을 높이는 것이 목표입니다.

**기술 스택:**
- Next.js 16
- React 19
- TypeScript
- shadcn/ui 컴포넌트 라이브러리
- Tailwind CSS

## 전체 프로젝트 진행 현황

### ✅ 완료된 단계 (Phase 0-5)

#### Phase 0: 백업 및 폴더 구조 생성
- 원본 파일 백업 완료
- 모듈 폴더 구조 생성 완료

#### Phase 1: 공통 컴포넌트 추출
- `DeviceFrame` 컴포넌트 분리
- 위치: `/components/prototype-viewer/components/DeviceFrame.tsx`
- 기능: 디바이스 뷰 (mobile/tablet/desktop) 프레임 렌더링

#### Phase 2: 샘플 데이터 분리
- 모든 샘플 데이터를 별도 파일로 분리
- 위치: `/components/prototype-viewer/data/sampleData.ts`
- 포함 내용: spaceData, highlightAreas, structureTypes, optionCategories, selectedOptionsSummary 등

#### Phase 3: M01 카테고리 분리 (15개 모듈)
- 폴더: `/components/prototype-viewer/modules/m01-viewer/`
- 모듈: M01-1부터 M01-15까지
- 내용: 3D 뷰어 기본 기능 (줌, 회전, 패닝, 스냅샷 등)

#### Phase 4: M02 카테고리 분리
- 폴더: `/components/prototype-viewer/modules/m02-interaction/`
- 모듈: 옵션 선택 UI (버튼, 드롭다운, 슬라이더, 체크박스 등)

#### Phase 5: M03-M05 카테고리 분리 (19개 모듈) ✅ **방금 완료**
- **M03 - Space Navigation (5개 모듈)**
  - M03-2: 공간 네비게이션 버튼
  - M03-3: 옵션 선택 시 자동 이동
  - M03-4: 위치 하이라이트 표시
  - M03-5: 구조물 동적 교체

- **M04 - Quote/Estimate (7개 모듈)**
  - M04-1: 견적서 다운로드 (M04-3와 통합)
  - M04-2: 옵션 요약 표시
  - M04-4: 견적서 내 옵션 수정
  - M04-5: 다음/이전 버튼 네비게이션
  - M04-6: PDF 다운로드
  - M04-7: Excel 다운로드

- **M05 - Data Management (7개 모듈)**
  - M05-1: 구글 시트 연동
  - M05-2: 자체 DB 저장
  - M05-3: 건설사 API 전송
  - M05-4: N회 제출 허용
  - M05-5: 1회 제출 제한
  - M05-6: 제출 이력 관리
  - M05-7: 제출 확인 팝업

### 📊 현재까지의 성과

**파일 분할:**
- 원본 파일: `3473 lines` → 현재 파일: `2383 lines`
- **감소량: 1090 lines (31.4% 감소)**
- **생성된 모듈 파일: 34개**

**코드 구조 개선:**
- 거대한 switch-case 블록을 개별 컴포넌트로 분리
- Props를 통한 명확한 데이터 흐름
- TypeScript 인터페이스로 타입 안정성 확보
- 재사용 가능한 모듈화 구조

---

## 🎯 Phase 6: 당신의 임무 (M06-M08 카테고리 분리)

Phase 6는 나머지 M06, M07, M08 카테고리의 모듈들을 분리하는 작업입니다.

### M06: Branding (브랜딩) 모듈들
건설사/브랜드 관련 UI 커스터마이징 기능

### M07: Communication (커뮤니케이션) 모듈들
사용자 소통 관련 기능 (채팅, 알림, 이메일 등)

### M08: Analytics (분석) 모듈들
사용자 행동 분석 및 리포팅 기능

---

## 📋 Phase 6 구현 절차

### Step 1: 현재 상태 확인

```bash
# 프로젝트 디렉토리로 이동
cd /Users/olim/work/construction_option

# M06, M07, M08 케이스 확인
grep -n 'case "M06-\|case "M07-\|case "M08-' components/prototype-viewer.tsx
```

이 명령어로 남아있는 M06, M07, M08 케이스들의 위치를 파악하세요.

### Step 2: 폴더 구조 생성

각 카테고리별로 폴더를 만드세요:

```bash
mkdir -p components/prototype-viewer/modules/m06-branding
mkdir -p components/prototype-viewer/modules/m07-communication
mkdir -p components/prototype-viewer/modules/m08-analytics
```

### Step 3: 모듈 파일 생성 패턴

**파일 명명 규칙:**
- 형식: `M0X-Y-FunctionName.tsx`
- 예: `M06-1-LogoChange.tsx`, `M07-2-NotificationBar.tsx`

**컴포넌트 구조 템플릿:**

```tsx
/**
 * M0X-Y: [모듈 설명 - 한글]
 * [기능 상세 설명]
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
// 필요한 shadcn/ui 컴포넌트 import
// 필요한 lucide-react 아이콘 import

interface M0X_Y_FunctionNameProps {
  deviceView: DeviceView
  // 이 모듈에 필요한 모든 state 변수와 setter를 props로 선언
  // 예: m06_1_logoUrl: string
  // 예: setM06_1_logoUrl: (url: string) => void
}

export function M0X_Y_FunctionName({
  deviceView,
  // ...props
}: M0X_Y_FunctionNameProps) {
  // 내부 핸들러 함수가 있다면 여기에 정의

  return (
    <DeviceFrame deviceView={deviceView}>
      {/* 원래 case 블록의 JSX를 여기에 복사 */}
    </DeviceFrame>
  )
}
```

### Step 4: 각 모듈 추출 작업

각 M06, M07, M08 케이스마다:

1. **케이스 블록 읽기**: `prototype-viewer.tsx`에서 해당 case 블록 전체를 확인
2. **Props 식별**: case 블록에서 사용하는 모든 state 변수 파악
3. **모듈 파일 생성**: 위의 템플릿을 사용하여 새 파일 생성
4. **JSX 이동**: case 블록의 JSX를 새 컴포넌트로 이동
5. **핸들러 이동**: case 블록 내부의 handler 함수들도 컴포넌트 내부로 이동

**예시 - M06-1 추출:**

원본 (prototype-viewer.tsx):
```tsx
case "M06-1":
  const handleLogoChange = () => {
    setM06_1_logoUrl("newlogo.png");
  };

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="p-6">
        <h2>로고 교체</h2>
        <button onClick={handleLogoChange}>로고 변경</button>
        <img src={m06_1_logoUrl} alt="Logo" />
      </div>
    </DeviceFrame>
  );
```

새 파일 (M06-1-LogoChange.tsx):
```tsx
/**
 * M06-1: 로고 교체
 * 건설사 로고를 동적으로 변경하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M06_1_LogoChangeProps {
  deviceView: DeviceView
  m06_1_logoUrl: string
  setM06_1_logoUrl: (url: string) => void
}

export function M06_1_LogoChange({
  deviceView,
  m06_1_logoUrl,
  setM06_1_logoUrl,
}: M06_1_LogoChangeProps) {
  const handleLogoChange = () => {
    setM06_1_logoUrl("newlogo.png");
  };

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="p-6">
        <h2>로고 교체</h2>
        <button onClick={handleLogoChange}>로고 변경</button>
        <img src={m06_1_logoUrl} alt="Logo" />
      </div>
    </DeviceFrame>
  );
}
```

### Step 5: Import 추가

모든 M06, M07, M08 모듈을 생성한 후, `prototype-viewer.tsx` 상단에 import를 추가하세요:

```tsx
// M06 Branding
import { M06_1_LogoChange } from "./prototype-viewer/modules/m06-branding/M06-1-LogoChange";
// ... 나머지 M06 모듈들

// M07 Communication
import { M07_1_ChatWidget } from "./prototype-viewer/modules/m07-communication/M07-1-ChatWidget";
// ... 나머지 M07 모듈들

// M08 Analytics
import { M08_1_UserTracking } from "./prototype-viewer/modules/m08-analytics/M08-1-UserTracking";
// ... 나머지 M08 모듈들
```

### Step 6: Case 문 교체

원래의 긴 case 블록을:

```tsx
case "M06-1":
  const handleLogoChange = () => { ... };
  return (
    <DeviceFrame>
      {/* 100줄의 JSX */}
    </DeviceFrame>
  );
```

이렇게 간단하게 교체:

```tsx
case "M06-1":
  return (
    <M06_1_LogoChange
      deviceView={deviceView}
      m06_1_logoUrl={m06_1_logoUrl}
      setM06_1_logoUrl={setM06_1_logoUrl}
    />
  );
```

### Step 7: 빌드 테스트

각 카테고리(M06, M07, M08)를 완료할 때마다 빌드 테스트를 실행하세요:

```bash
npm run build
```

에러가 발생하면:
- TypeScript 타입 에러 확인
- Import 경로 확인
- Props 이름 일치 여부 확인

---

## 🚨 주의사항 및 베스트 프랙티스

### 1. Props 명명 규칙 엄수
- State 변수: `m0X_Y_변수명` (예: `m06_1_logoUrl`)
- Setter 함수: `setM0X_Y_변수명` (예: `setM06_1_logoUrl`)
- 이 패턴을 **절대 변경하지 마세요**

### 2. DeviceFrame 사용
- 모든 모듈은 `<DeviceFrame>` 컴포넌트로 감싸야 합니다
- DeviceFrame은 deviceView props를 받아 mobile/tablet/desktop 레이아웃을 처리합니다

### 3. Import 정리
- 사용하지 않는 import는 제거하세요
- lucide-react 아이콘은 필요한 것만 import
- shadcn/ui 컴포넌트도 사용하는 것만 import

### 4. 중복 케이스 처리
- 만약 동일한 케이스가 여러 번 나온다면 (예: `case "M06-1"` 중복)
- Edit tool에서 `replace_all: true` 옵션 사용

### 5. 타입 안정성
- 모든 Props 인터페이스에 정확한 타입 지정
- `any` 타입 사용 금지
- DeviceView 타입은 `'mobile' | 'tablet' | 'desktop'`

### 6. 코드 스타일 유지
- 원본 JSX의 스타일과 클래스명을 그대로 유지
- 기능 변경 금지 - 단순히 추출만 할 것
- 주석은 한글로 유지

---

## 📁 파일 구조 참고

Phase 5 완료 후 현재 구조:

```
components/
├── prototype-viewer.tsx (2383 lines - 메인 파일)
└── prototype-viewer/
    ├── components/
    │   └── DeviceFrame.tsx
    ├── data/
    │   └── sampleData.ts
    ├── types/
    │   └── index.ts
    └── modules/
        ├── m01-viewer/ (15개 모듈)
        ├── m02-interaction/ (인터랙션 모듈들)
        ├── m03-space/ (5개 모듈)
        ├── m04-quote/ (7개 모듈)
        ├── m05-data/ (7개 모듈)
        ├── m06-branding/ ← Phase 6에서 생성할 폴더
        ├── m07-communication/ ← Phase 6에서 생성할 폴더
        └── m08-analytics/ ← Phase 6에서 생성할 폴더
```

---

## 🛠️ 유용한 명령어

### 남은 케이스 찾기
```bash
grep -n 'case "M06-' components/prototype-viewer.tsx
grep -n 'case "M07-' components/prototype-viewer.tsx
grep -n 'case "M08-' components/prototype-viewer.tsx
```

### 특정 케이스 블록 읽기
```bash
# M06-1 케이스 전체 보기 (라인 번호 기준)
sed -n '시작라인,종료라인p' components/prototype-viewer.tsx
```

### 현재 파일 라인 수 확인
```bash
wc -l components/prototype-viewer.tsx
```

### 생성된 모듈 파일 개수 확인
```bash
find components/prototype-viewer/modules -name "*.tsx" | wc -l
```

---

## ✅ Phase 6 완료 체크리스트

작업을 진행하면서 체크하세요:

### M06 Branding
- [ ] M06 폴더 생성
- [ ] 모든 M06 케이스 파악
- [ ] 각 M06 모듈 파일 생성
- [ ] M06 imports 추가
- [ ] M06 case 문 교체
- [ ] M06 빌드 테스트 통과

### M07 Communication
- [ ] M07 폴더 생성
- [ ] 모든 M07 케이스 파악
- [ ] 각 M07 모듈 파일 생성
- [ ] M07 imports 추가
- [ ] M07 case 문 교체
- [ ] M07 빌드 테스트 통과

### M08 Analytics
- [ ] M08 폴더 생성
- [ ] 모든 M08 케이스 파악
- [ ] 각 M08 모듈 파일 생성
- [ ] M08 imports 추가
- [ ] M08 case 문 교체
- [ ] M08 빌드 테스트 통과

### 최종 확인
- [ ] 전체 빌드 테스트 통과
- [ ] prototype-viewer.tsx 라인 수 확인 (목표: 2000 lines 이하)
- [ ] 모든 imports 정리
- [ ] 사용하지 않는 import 제거

---

## 🎓 학습 포인트 - Phase 5 완료 예시

Phase 5에서 실제로 수행된 작업을 참고하세요:

**M03-2 교체 전 (84 lines):**
```tsx
case "M03-2":
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          공간 버튼 네비게이션
        </h2>
        <div className="space-y-4 mb-6">
          {sampleSpaceData.map((space) => (
            <button
              key={space.id}
              onClick={() => setM03_2_currentSpace(space.id)}
              // ... 더 많은 JSX
            </button>
          ))}
        </div>
        {/* ... 40줄 이상의 JSX */}
      </div>
    </DeviceFrame>
  );
```

**M03-2 교체 후 (7 lines):**
```tsx
case "M03-2":
  return (
    <M03_2_SpaceNav
      deviceView={deviceView}
      m03_2_currentSpace={m03_2_currentSpace}
      setM03_2_currentSpace={setM03_2_currentSpace}
      sampleSpaceData={sampleSpaceData}
    />
  );
```

이것이 당신이 M06, M07, M08에서 반복해야 할 패턴입니다!

---

## 🚀 시작하기

**첫 번째 단계:**
1. M06 케이스들을 찾아보세요: `grep -n 'case "M06-' components/prototype-viewer.tsx`
2. 첫 번째 M06 케이스 블록을 읽어보세요
3. 위의 템플릿을 사용하여 첫 번째 모듈 파일을 생성하세요
4. 하나씩 차근차근 진행하세요

**문제 발생 시:**
- 에러 메시지를 자세히 읽으세요
- 타입 에러는 Props 인터페이스를 다시 확인
- Import 에러는 경로를 다시 확인
- Phase 3, 4, 5의 코드를 참고하세요

---

## 📞 참고 자료

**기존 모듈 예시:**
- M01 모듈: `/components/prototype-viewer/modules/m01-viewer/`
- M02 모듈: `/components/prototype-viewer/modules/m02-interaction/`
- M03 모듈: `/components/prototype-viewer/modules/m03-space/`
- M04 모듈: `/components/prototype-viewer/modules/m04-quote/`
- M05 모듈: `/components/prototype-viewer/modules/m05-data/`

**핵심 파일:**
- 메인 파일: `/components/prototype-viewer.tsx`
- 타입 정의: `/components/prototype-viewer/types/index.ts`
- 샘플 데이터: `/components/prototype-viewer/data/sampleData.ts`

---

## 🎯 목표 달성 지표

Phase 6 완료 후 기대 결과:
- `prototype-viewer.tsx`: **약 2000 lines 이하**
- 총 모듈 파일: **50개 이상**
- 빌드 성공: **npm run build 통과**
- 타입 에러: **0개**

---

## 마지막 조언

이 작업은 **반복적이고 체계적**인 작업입니다.
- 한 번에 하나의 모듈에 집중하세요
- 각 모듈 완료 후 테스트하세요
- 패턴을 익히면 속도가 빨라집니다
- Phase 5의 완료된 코드를 참고하세요

**성공을 기원합니다! 🚀**

---

생성일: 2026-02-06
작성자: Claude Sonnet 4.5 (Phase 5 완료)
대상: Gemini (Phase 6 담당)
