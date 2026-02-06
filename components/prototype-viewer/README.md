# Prototype Viewer - 폴더 구조

> 리팩토링 진행 중 (Phase 4 완료)

## 📁 폴더 구조

```
prototype-viewer/
├── types.ts                    # 공통 타입 정의
│
├── modules/                    # 모듈 컴포넌트 (43개)
│   ├── m01-auth/              # M01: 인증/접근 관리 (6개) ✅
│   │   ├── M01-1-SsoLogin.tsx
│   │   ├── M01-2-Login.tsx
│   │   ├── M01-3-UserInfo.tsx
│   │   ├── M01-4-Validation.tsx
│   │   ├── M01-5-ConfirmInfo.tsx
│   │   └── M01-6-UserHeader.tsx
│   ├── m02-options/           # M02: 옵션 구조 및 선택 (11개) ✅
│   ├── m03-space/             # M03: 공간/네비게이션 (5개)
│   ├── m04-quote/             # M04: 견적 기능 (7개)
│   ├── m05-data/              # M05: 데이터 저장/전송 (7개)
│   ├── m06-ui/                # M06: UI 커스터마이징 (5개)
│   ├── m07-guide/             # M07: 가이드/도움말 (4개)
│   └── m08-admin/             # M08: 관리 기능 (3개)
│
├── data/                       # 샘플 데이터
│   ├── sample-options.ts      # M02 옵션 데이터
│   ├── sample-spaces.ts       # M03 공간 데이터
│   ├── sample-quotes.ts       # M04 견적 데이터
│   ├── sample-history.ts      # M05 히스토리 데이터
│   ├── sample-videos.ts       # M07 가이드 데이터
│   └── sample-submissions.ts  # M08 관리 데이터
│
└── components/                 # 공통 UI 컴포넌트
    ├── DeviceFrame.tsx        # 디바이스 프레임
    └── ModuleSidebar.tsx      # 모듈 사이드바
```

## 🎯 리팩토링 목표

1. **한 파일 = 한 모듈** (100줄 이내)
2. **카테고리별 폴더 구분** (찾기 쉽게)
3. **초보자도 쉽게 수정/추가** 가능
4. **실수로 다른 모듈 건드릴 위험 제거**

## 📝 진행 상황

- [x] **Phase 0**: 백업 & 폴더 구조 생성 ✅
- [x] **Phase 1**: 공통 컴포넌트 추출 ✅
- [x] **Phase 2**: 샘플 데이터 분리 ✅
- [x] **Phase 3**: M01 카테고리 분리 ✅
- [x] **Phase 4**: M02 카테고리 분리 ✅
- [ ] **Phase 5**: M03-M05 카테고리 분리
- [ ] **Phase 6**: M06-M08 카테고리 분리
- [ ] **Phase 7**: 최종 정리 & 문서화

## 🔄 백업

원본 파일은 다음 위치에 백업되어 있습니다:
- `/components/prototype-viewer.tsx.backup` (227KB)

문제 발생 시 백업 파일로 복구 가능합니다.

## 📅 작업 일자

- Phase 0 완료: 2026-02-06
- Phase 1 완료: 2026-02-06 (파일 크기: 5700 → 5608줄, -92줄)
- Phase 2 완료: 2026-02-06 (파일 크기: 5608 → 5295줄, -313줄)
- Phase 3 완료: 2026-02-06 (파일 크기: 5295 → 4788줄, -507줄)
- Phase 4 완료: 2026-02-06 (파일 크기: 4788 → 3494줄, -1294줄)

## 📊 진행 통계

- **총 감소**: 2206줄 (5700 → 3494줄, -38.7%)
- **생성된 파일**: 25개 (components 2개 + data 6개 + m01-auth 6개 + m02-options 11개)
- **다음 목표**: M03-M08 카테고리 분리 (Phase 5-6)
