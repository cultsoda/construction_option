# Phase 5-6 작업 가이드 (Gemini용)

> 이 문서는 Phase 5와 Phase 6를 Gemini로 진행하기 위한 상세 가이드입니다.

---

## 📋 현재 상태 (Phase 4 완료)

### 완료된 작업

- ✅ Phase 0: 백업 및 폴더 구조 생성
- ✅ Phase 1: 공통 컴포넌트 추출 (DeviceFrame, ModuleSidebar)
- ✅ Phase 2: 샘플 데이터 분리 (6개 데이터 파일)
- ✅ Phase 3: M01 카테고리 분리 (6개 인증 모듈)
- ✅ Phase 4: M02 카테고리 분리 (11개 옵션 모듈)

### 생성된 파일 (11개):

1. M02-1-Depth1.tsx - 1Depth 옵션 선택 (107줄)
2. M02-2-Depth2.tsx - 2Depth 복합 옵션 선택 (350줄)
3. M02-3-Depth3.tsx - 3Depth 계층 구조 (94줄)
4. M02-4-Depth1Link.tsx - 1Depth 연동 로직 (114줄)
5. M02-5-MultiSelect.tsx - 다중 선택 기능 (92줄)
6. M02-6-DefaultValue.tsx - 기본값 설정 (82줄)
7. M02-7-PriceDisplay.tsx - 가격 표시 (79줄)
8. M02-8-RealTimeCalc.tsx - 실시간 금액 계산 (110줄)
9. M02-9-Exclusive.tsx - 배타적 선택 로직 (124줄)
10. M02-10-MinusOption.tsx - 마이너스 옵션 UI (140줄)
11. M02-11-Dependency.tsx - 필수 연관 선택 (162줄)

### 현재 파일 상태

- **파일 위치**: `/Users/olim/work/construction_option/components/prototype-viewer.tsx`
- **현재 줄 수**: 3494줄 (원본 5700줄에서 2206줄 감소, -38.7%)
- **생성된 모듈 파일**: 25개
  - `/components/prototype-viewer/components/` - 2개 (DeviceFrame, ModuleSidebar)
  - `/components/prototype-viewer/data/` - 6개 (샘플 데이터)
  - `/components/prototype-viewer/modules/m01-auth/` - 6개 (인증 모듈)
  - `/components/prototype-viewer/modules/m02-options/` - 11개 (옵션 모듈)

---

## 🎯 Phase 5: M03-M05 카테고리 분리 (19개 모듈)

### Phase 5 목표

M03, M04, M05 카테고리의 총 19개 모듈을 별도 파일로 분리

### M03: 공간/네비게이션 (5개 모듈)

**폴더**: `/components/prototype-viewer/modules/m03-space/`

1. **M03-2**: 위치 버튼 네비게이션

   - 파일명: `M03-2-SpaceNav.tsx`
   - 기능: 공간별 버튼 네비게이션 (거실, 주방, 침실 등)
   - Props: `deviceView`, `m03_2_currentSpace`, `setM03_2_CurrentSpace`, `sampleSpaceData`

2. **M03-3**: 탭 네비게이션

   - 파일명: `M03-3-TabNav.tsx`
   - 기능: 탭 방식의 공간 네비게이션
   - Props: `deviceView`, `m03_3_activeTab`, `setM03_3_ActiveTab`, `sampleSpaceData`

3. **M03-4**: 드롭다운 네비게이션

   - 파일명: `M03-4-DropdownNav.tsx`
   - 기능: 드롭다운 방식의 공간 선택
   - Props: `deviceView`, `m03_4_selected`, `setM03_4_Selected`, `sampleSpaceData`

4. **M03-5**: 슬라이더 네비게이션

   - 파일명: `M03-5-SliderNav.tsx`
   - 기능: 슬라이더 방식의 공간 탐색
   - Props: `deviceView`, `isMobile`, `m03_5_currentIndex`, `setM03_5_CurrentIndex`, `sampleSpaceData`

5. **M03-6**: 아코디언 네비게이션
   - 파일명: `M03-6-AccordionNav.tsx`
   - 기능: 아코디언 방식의 공간별 옵션 표시
   - Props: `deviceView`, `m03_6_expandedSpace`, `setM03_6_ExpandedSpace`, `sampleSpaceData`, `sampleOptionData`

### M04: 견적 기능 (7개 모듈)

**폴더**: `/components/prototype-viewer/modules/m04-quote/`

1. **M04-1**: 견적서 다운로드

   - 파일명: `M04-1-QuoteDownload.tsx`
   - 기능: PDF 견적서 다운로드
   - Props: `deviceView`, `sampleOptionData`, `sampleQuoteData`

2. **M04-2**: 이메일 전송

   - 파일명: `M04-2-EmailSend.tsx`
   - 기능: 견적서 이메일 전송
   - Props: `deviceView`, `emailData`, `setEmailData`, `handleEmailSend`

3. **M04-3**: 인쇄 최적화

   - 파일명: `M04-3-PrintOptimize.tsx`
   - 기능: 견적서 인쇄용 포맷팅
   - Props: `deviceView`, `sampleQuoteData`

4. **M04-4**: 비교 견적

   - 파일명: `M04-4-QuoteCompare.tsx`
   - 기능: 여러 견적서 비교
   - Props: `deviceView`, `isMobile`, `sampleQuoteData`

5. **M04-5**: 견적 요약

   - 파일명: `M04-5-QuoteSummary.tsx`
   - 기능: 선택 옵션 요약 표시
   - Props: `deviceView`, `selected1Depth`, `calc2Depth`, `sampleOptionData`

6. **M04-6**: 견적 히스토리

   - 파일명: `M04-6-QuoteHistory.tsx`
   - 기능: 이전 견적 조회 및 복원
   - Props: `deviceView`, `sampleHistoryData`

7. **M04-7**: 견적 공유
   - 파일명: `M04-7-QuoteShare.tsx`
   - 기능: 견적서 URL 공유
   - Props: `deviceView`, `shareUrl`, `handleShare`

### M05: 데이터 저장/전송 (7개 모듈)

**폴더**: `/components/prototype-viewer/modules/m05-data/`

1. **M05-1**: 로컬 저장

   - 파일명: `M05-1-LocalSave.tsx`
   - 기능: LocalStorage에 선택 사항 저장
   - Props: `deviceView`, `handleLocalSave`

2. **M05-2**: 자동 저장

   - 파일명: `M05-2-AutoSave.tsx`
   - 기능: 자동 저장 설정 및 상태 표시
   - Props: `deviceView`, `autoSaveEnabled`, `setAutoSaveEnabled`, `lastSaved`

3. **M05-3**: API 전송

   - 파일명: `M05-3-ApiSend.tsx`
   - 기능: 선택 데이터를 API로 전송
   - Props: `deviceView`, `handleApiSubmit`, `apiStatus`

4. **M05-4**: 데이터 불러오기

   - 파일명: `M05-4-DataLoad.tsx`
   - 기능: 저장된 데이터 불러오기
   - Props: `deviceView`, `handleDataLoad`, `savedData`

5. **M05-5**: 데이터 초기화

   - 파일명: `M05-5-DataReset.tsx`
   - 기능: 모든 선택 사항 초기화
   - Props: `deviceView`, `handleReset`, `showResetConfirm`, `setShowResetConfirm`

6. **M05-6**: 임시 저장

   - 파일명: `M05-6-TempSave.tsx`
   - 기능: 임시 저장 및 복원
   - Props: `deviceView`, `tempData`, `handleTempSave`, `handleTempLoad`

7. **M05-7**: 데이터 내보내기
   - 파일명: `M05-7-DataExport.tsx`
   - 기능: JSON/CSV 형식으로 데이터 내보내기
   - Props: `deviceView`, `exportFormat`, `setExportFormat`, `handleExport`

---

## 🎯 Phase 6: M06-M08 카테고리 분리 (12개 모듈)

### Phase 6 목표

M06, M07, M08 카테고리의 총 12개 모듈을 별도 파일로 분리

### M06: UI 커스터마이징 (5개 모듈)

**폴더**: `/components/prototype-viewer/modules/m06-ui/`

1. **M06-1**: 테마 설정

   - 파일명: `M06-1-ThemeConfig.tsx`
   - 기능: 색상 테마 변경 (라이트/다크 모드)
   - Props: `deviceView`, `currentTheme`, `setCurrentTheme`

2. **M06-2**: 글꼴 크기

   - 파일명: `M06-2-FontSize.tsx`
   - 기능: 글꼴 크기 조절
   - Props: `deviceView`, `fontSize`, `setFontSize`

3. **M06-3**: 레이아웃 전환

   - 파일명: `M06-3-LayoutSwitch.tsx`
   - 기능: 그리드/리스트 레이아웃 전환
   - Props: `deviceView`, `layoutMode`, `setLayoutMode`, `sampleOptionData`

4. **M06-4**: 언어 설정

   - 파일명: `M06-4-LanguageConfig.tsx`
   - 기능: 다국어 설정 (한국어/영어)
   - Props: `deviceView`, `currentLanguage`, `setCurrentLanguage`

5. **M06-5**: 접근성 옵션
   - 파일명: `M06-5-Accessibility.tsx`
   - 기능: 고대비 모드, 큰 터치 영역 등
   - Props: `deviceView`, `accessibilityMode`, `setAccessibilityMode`

### M07: 가이드/도움말 (4개 모듈)

**폴더**: `/components/prototype-viewer/modules/m07-guide/`

1. **M07-1**: 튜토리얼

   - 파일명: `M07-1-Tutorial.tsx`
   - 기능: 단계별 사용 가이드
   - Props: `deviceView`, `tutorialStep`, `setTutorialStep`, `showTutorial`, `setShowTutorial`

2. **M07-2**: 툴팁 가이드

   - 파일명: `M07-2-TooltipGuide.tsx`
   - 기능: 각 요소별 툴팁 표시
   - Props: `deviceView`, `tooltipEnabled`, `setTooltipEnabled`

3. **M07-3**: FAQ

   - 파일명: `M07-3-FAQ.tsx`
   - 기능: 자주 묻는 질문
   - Props: `deviceView`, `faqData`

4. **M07-4**: 비디오 가이드
   - 파일명: `M07-4-VideoGuide.tsx`
   - 기능: 사용법 동영상 재생
   - Props: `deviceView`, `sampleVideoData`, `selectedVideo`, `setSelectedVideo`

### M08: 관리 기능 (3개 모듈)

**폴더**: `/components/prototype-viewer/modules/m08-admin/`

1. **M08-1**: 제출 내역

   - 파일명: `M08-1-SubmissionHistory.tsx`
   - 기능: 제출된 견적 내역 조회
   - Props: `deviceView`, `isMobile`, `sampleSubmissionData`

2. **M08-2**: 통계 대시보드

   - 파일명: `M08-2-StatsDashboard.tsx`
   - 기능: 옵션 선택 통계 및 차트
   - Props: `deviceView`, `statsData`

3. **M08-3**: 로그 뷰어
   - 파일명: `M08-3-LogViewer.tsx`
   - 기능: 사용자 행동 로그 조회
   - Props: `deviceView`, `logData`, `logFilter`, `setLogFilter`

---

## 📝 작업 절차 (단계별 가이드)

### 1단계: 모듈 위치 확인

각 Phase 시작 전에 `grep` 명령어로 모듈 위치를 확인합니다:

```bash
# Phase 5 모듈 위치 확인
grep -n 'case "M03-' /Users/olim/work/construction_option/components/prototype-viewer.tsx
grep -n 'case "M04-' /Users/olim/work/construction_option/components/prototype-viewer.tsx
grep -n 'case "M05-' /Users/olim/work/construction_option/components/prototype-viewer.tsx

# Phase 6 모듈 위치 확인
grep -n 'case "M06-' /Users/olim/work/construction_option/components/prototype-viewer.tsx
grep -n 'case "M07-' /Users/olim/work/construction_option/components/prototype-viewer.tsx
grep -n 'case "M08-' /Users/olim/work/construction_option/components/prototype-viewer.tsx
```

### 2단계: 폴더 생성

각 카테고리별로 폴더를 생성합니다:

```bash
# Phase 5 폴더 생성
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m03-space
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m04-quote
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m05-data

# Phase 6 폴더 생성
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m06-ui
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m07-guide
mkdir -p /Users/olim/work/construction_option/components/prototype-viewer/modules/m08-admin
```

### 3단계: 모듈 파일 생성

각 `case` 블록을 읽고, 별도의 컴포넌트 파일로 생성합니다.

**컴포넌트 파일 템플릿**:

```typescript
/**
 * M0X-Y: [모듈 설명]
 * [기능 상세]
 */

import React from "react";
import { DeviceFrame } from "../../components/DeviceFrame";
import { DeviceView } from "../../types";
// 필요한 UI 컴포넌트 import (Badge, Button, Checkbox 등)

interface M0X_Y_ModuleNameProps {
  deviceView: DeviceView;
  // 필요한 props 정의
}

export function M0X_Y_ModuleName({
  deviceView,
}: // props 받기
M0X_Y_ModuleNameProps) {
  // case 블록의 로직을 여기로 이동

  return (
    <DeviceFrame deviceView={deviceView}>
      {/* case 블록의 JSX를 여기로 이동 */}
    </DeviceFrame>
  );
}
```

### 4단계: prototype-viewer.tsx 수정

1. **Import 추가**: 파일 상단에 모듈 import 추가
2. **Case 교체**: 각 `case` 블록을 컴포넌트 호출로 교체

**교체 패턴 예시**:

```typescript
// 기존 (삭제할 코드)
case "M03-2":
  // 100+ 줄의 로직과 JSX
  return (
    <DeviceFrame deviceView={deviceView}>
      {/* ... */}
    </DeviceFrame>
  );

// 새로운 코드 (이것으로 교체)
case "M03-2":
  return (
    <M03_2_SpaceNav
      deviceView={deviceView}
      m03_2_currentSpace={m03_2_currentSpace}
      setM03_2_CurrentSpace={setM03_2_CurrentSpace}
      sampleSpaceData={sampleSpaceData}
    />
  );
```

### 5단계: 빌드 테스트

각 카테고리 완료 후 반드시 빌드를 실행하여 오류를 확인합니다:

```bash
npm run build
```

### 6단계: 파일 크기 확인

작업 전후 파일 크기를 비교합니다:

```bash
wc -l /Users/olim/work/construction_option/components/prototype-viewer.tsx
```

### 7단계: README 업데이트

각 Phase 완료 후 README를 업데이트합니다:

- 체크마크 추가: `- [x] **Phase X**: ...`
- 파일 크기 업데이트
- 생성된 파일 개수 업데이트

---

## ⚠️ 주의사항

### Props 추출 시 주의점

1. **State 변수**: `useState`로 선언된 변수는 모두 props로 전달해야 합니다

   - 예: `selected1Depth`, `setSelected1Depth`

2. **함수**: `case` 블록 내부에 정의된 함수는 컴포넌트 내부로 이동

   - 예: `handleToggle`, `calculateTotal` 등

3. **데이터**: `sampleOptionData`, `sampleSpaceData` 등은 props로 전달

4. **조건부 변수**: `case` 블록 내부에서 계산된 변수는 컴포넌트 내부로 이동
   - 예: `const minusOptions = data.filter(...)` 같은 코드

### TypeScript 타입 정의

모든 props는 명시적으로 타입을 정의해야 합니다:

```typescript
interface M0X_Y_ModuleNameProps {
  deviceView: DeviceView;
  sampleData: DataType;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  // 배열 타입
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  // 객체 타입
  config: {
    enabled: boolean;
    value: number;
  };
}
```

### Import 정리

필요한 UI 컴포넌트만 import 합니다:

```typescript
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// 등등...
```

---

## 🔍 검증 체크리스트

각 Phase 완료 후 다음 항목을 확인합니다:

- [ ] 모든 모듈 파일이 생성되었는가?
- [ ] prototype-viewer.tsx에 모든 import가 추가되었는가?
- [ ] 모든 `case` 블록이 컴포넌트 호출로 교체되었는가?
- [ ] `npm run build`가 성공하는가?
- [ ] 파일 크기가 감소했는가?
- [ ] README.md가 업데이트되었는가?
- [ ] 각 컴포넌트에 주석(설명)이 작성되었는가?
- [ ] TypeScript 오류가 없는가?

---

## 📊 예상 결과

### Phase 5 완료 후

- **파일 크기**: 약 2500-2800줄 (현재 3494줄에서 약 700-900줄 감소)
- **생성 파일**: +19개 (총 44개)
- **감소율**: 약 50-51% (원본 대비)

### Phase 6 완료 후

- **파일 크기**: 약 2000-2300줄 (약 500-600줄 추가 감소)
- **생성 파일**: +12개 (총 56개)
- **감소율**: 약 60-65% (원본 대비)

---

## 💡 작업 팁

1. **한 번에 하나씩**: 모듈을 하나씩 완성하고 테스트합니다
2. **빈번한 빌드**: 5-6개 모듈마다 빌드를 실행하여 오류를 조기에 발견합니다
3. **Props 체크**: 각 모듈의 props가 정확한지 확인합니다
4. **주석 작성**: 각 모듈의 기능을 주석으로 명확히 작성합니다
5. **일관성 유지**: 기존 M01, M02 모듈과 동일한 패턴을 따릅니다

---

## 🚀 시작하기

### Gemini에게 전달할 프롬프트

```
안녕하세요! Next.js 프로젝트의 대규모 리팩토링 작업을 진행 중입니다.

현재 /Users/olim/work/construction_option/components/prototype-viewer.tsx 파일 (3494줄)에서
M03-M08 카테고리의 모듈들을 별도 파일로 분리하는 작업이 필요합니다.

Phase 5에서는 M03-M05 (19개 모듈)를, Phase 6에서는 M06-M08 (12개 모듈)를 분리해야 합니다.

위의 PHASE_5_6_GUIDE.md 파일의 지침을 따라서 작업을 진행해 주세요.

먼저 Phase 5부터 시작하겠습니다:
1. grep으로 M03, M04, M05 모듈 위치 확인
2. 폴더 생성
3. 각 모듈을 별도 파일로 생성
4. prototype-viewer.tsx 수정
5. 빌드 테스트
6. README 업데이트

단계별로 진행하면서 각 단계가 완료되면 알려주세요.
```

---

## 📞 문제 발생 시

만약 작업 중 문제가 발생하면:

1. **백업 파일 확인**: `/components/prototype-viewer.tsx.backup` 파일이 존재하는지 확인
2. **빌드 오류**: TypeScript 오류 메시지를 확인하고 props 타입을 점검
3. **Import 오류**: 경로가 올바른지 확인 (`../../components/`, `../../types` 등)
4. **State 관련 오류**: 부모 컴포넌트에서 필요한 state를 props로 전달했는지 확인

---

이 가이드를 참고하여 Phase 5-6를 성공적으로 완료하시기 바랍니다! 🎉
