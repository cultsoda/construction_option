📋 단계별 리팩토링 계획

---

🎯 Phase 0: 사전 준비 (백업 & 구조 설계)

목표: 안전한 백업 + 폴더 구조 생성

작업 내용:

- ✅ 현재 파일 백업
- ✅ 새 폴더 구조 생성
- ✅ 공통 타입 정의 파일 생성  


생성할 것:  
 components/prototype-viewer/  
 ├─ types.ts # 공통 타입  
 ├─ modules/ # 빈 폴더들  
 │ ├─ m01-auth/  
 │ ├─ m02-options/  
 │ ├─ m03-space/  
 │ ├─ m04-quote/  
 │ ├─ m05-data/  
 │ ├─ m06-ui/  
 │ ├─ m07-guide/  
 │ └─ m08-admin/  
 ├─ data/ # 빈 폴더  
 └─ components/ # 빈 폴더

예상 시간: 5분  
 위험도: 없음 (기존 코드 변경 없음)

---

🎯 Phase 1: 공통 컴포넌트 추출

목표: Wrapper, DeviceFrame 같은 공통 코드 분리

작업 내용:

- ModuleWrapper.tsx 생성 (현재 Wrapper 컴포넌트)
- DeviceFrame.tsx 생성 (디바이스 시뮬레이션)
- ModuleSidebar.tsx 생성 (LNB)  


생성할 파일:  
 components/prototype-viewer/  
 └─ components/  
 ├─ ModuleWrapper.tsx # 기존 Wrapper 이동  
 ├─ DeviceFrame.tsx # 디바이스 프레임  
 └─ ModuleSidebar.tsx # LNB 사이드바

변경할 파일:

- prototype-viewer.tsx (import 추가)  


테스트 방법: 빌드 성공 + 화면 정상 작동 확인

예상 시간: 10분  
 위험도: 낮음 (기존 로직 변경 없음)

---

🎯 Phase 2: 샘플 데이터 분리

목표: sampleOptionData 등 모든 샘플 데이터를 별도 파일로

작업 내용:

- 모든 샘플 데이터 추출
- data/ 폴더로 이동  


생성할 파일:  
 components/prototype-viewer/  
 └─ data/  
 ├─ sample-options.ts # M02용  
 ├─ sample-spaces.ts # M03용  
 ├─ sample-quotes.ts # M04용  
 ├─ sample-history.ts # M05용  
 ├─ sample-videos.ts # M07용  
 └─ sample-submissions.ts # M08용

변경할 파일:

- prototype-viewer.tsx (import 추가)  


테스트 방법: 빌드 성공 + 모든 모듈 데이터 정상 표시

예상 시간: 10분  
 위험도: 낮음

---

🎯 Phase 3: M01 카테고리 분리 (시범)

목표: 가장 간단한 M01 6개 모듈 분리 (패턴 확립)

작업 내용:

- M01-1 ~ M01-6 각각 별도 파일로 추출
- module-registry.ts 생성  


생성할 파일:  
 components/prototype-viewer/  
 ├─ module-registry.ts # 모듈 등록부  
 └─ modules/  
 └─ m01-auth/  
 ├─ M01-1-SSO.tsx  
 ├─ M01-2-Login.tsx  
 ├─ M01-3-InputForm.tsx  
 ├─ M01-4-Validation.tsx  
 ├─ M01-5-Reenter.tsx  
 └─ M01-6-HeaderDisplay.tsx

변경할 파일:

- prototype-viewer.tsx (M01 케이스들 → registry 조회로 변경)  


테스트 방법: M01 카테고리 6개 모듈 정상 작동

예상 시간: 15분  
 위험도: 중간 (switch/case 로직 변경)

---

🎯 Phase 4: M02 카테고리 분리

목표: M02 11개 모듈 분리 (가장 복잡한 카테고리)

작업 내용:

- M02-1 ~ M02-11 각각 별도 파일로
- useState 로직 각 파일로 이동  


생성할 파일:  
 components/prototype-viewer/  
 └─ modules/  
 └─ m02-options/  
 ├─ M02-1-Depth1UI.tsx  
 ├─ M02-2-Depth2UI.tsx  
 ├─ ...  
 └─ M02-11-RequiredDeps.tsx

테스트 방법: M02 카테고리 11개 모듈 정상 작동

예상 시간: 20분  
 위험도: 중간

---

🎯 Phase 5: M03-M05 카테고리 분리

목표: M03(5개) + M04(7개) + M05(7개) = 19개 모듈 분리

생성할 파일:  
 components/prototype-viewer/  
 └─ modules/  
 ├─ m03-space/  
 │ ├─ M03-1-3DViewer.tsx  
 │ └─ ... (5개)  
 ├─ m04-quote/  
 │ ├─ M04-1-Popup.tsx  
 │ └─ ... (7개)  
 └─ m05-data/  
 ├─ M05-1-GoogleSheet.tsx  
 └─ ... (7개)

테스트 방법: 각 카테고리 모듈 정상 작동

예상 시간: 25분  
 위험도: 중간

---

🎯 Phase 6: M06-M08 카테고리 분리

목표: M06(5개) + M07(4개) + M08(3개) = 12개 모듈 분리

생성할 파일:  
 components/prototype-viewer/  
 └─ modules/  
 ├─ m06-ui/  
 │ ├─ M06-1-Logo.tsx  
 │ └─ ... (5개)  
 ├─ m07-guide/  
 │ ├─ M07-1-ImageGuide.tsx  
 │ └─ ... (4개)  
 └─ m08-admin/  
 ├─ M08-1-Dashboard.tsx  
 └─ ... (3개)

테스트 방법: 모든 43개 모듈 정상 작동

예상 시간: 20분  
 위험도: 낮음 (패턴 확립됨)

---

🎯 Phase 7: 최종 정리 & 문서화

목표: 기존 파일 정리 + 사용 가이드 작성

작업 내용:

- prototype-viewer.tsx 최종 정리 (300줄 이하로)
- README.md 작성 (새 모듈 추가 방법)
- 불필요한 코드 제거  


생성할 파일:  
 components/prototype-viewer/  
 └─ README.md # 사용 가이드

테스트 방법: 전체 빌드 + 모든 기능 최종 확인

예상 시간: 10분  
 위험도: 없음

---

📊 전체 요약  
 ┌───────┬────────────────────┬──────────────────┬────────┬───────────┐  
 │ Phase │ 작업 내용 │ 예상 시간 │ 위험도 │ 파일 변경 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 0 │ 백업 & 폴더 구조 │ 5분 │ 없음 │ 0개 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 1 │ 공통 컴포넌트 추출 │ 10분 │ 낮음 │ 3개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 2 │ 샘플 데이터 분리 │ 10분 │ 낮음 │ 6개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 3 │ M01 분리 (시범) │ 15분 │ 중간 │ 7개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 4 │ M02 분리 │ 20분 │ 중간 │ 11개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 5 │ M03-M05 분리 │ 25분 │ 중간 │ 19개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 6 │ M06-M08 분리 │ 20분 │ 낮음 │ 12개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 7 │ 최종 정리 & 문서화 │ 10분 │ 없음 │ 1개 생성 │  
 ├───────┼────────────────────┼──────────────────┼────────┼───────────┤  
 │ 합계 │ │ 115분 (약 2시간) │ │ 59개 생성 │  
 └───────┴────────────────────┴──────────────────┴────────┴───────────┘

---

🎯 중요 원칙

각 Phase마다:

1. ✅ 빌드 테스트 필수
2. ✅ 기능 동작 확인
3. ✅ 문제 발생 시 이전 Phase로 롤백 가능
4. ✅ 한 Phase씩 커밋 (Git 사용 시)  


진행 방식:

- 한 Phase 완료 → 사용자 확인 → 다음 Phase
- 문제 발생 시 즉시 중단 & 해결
