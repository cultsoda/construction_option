import { create } from 'zustand'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ChecklistAnswers = {
  // Section 1: 시스템 연동
  q1_1: boolean  // IdP 연동 (구 q1)
  q1_2: boolean  // 건설사 시스템 데이터 연동 (구 q2)
  q1_3: string[] // 주고받는 데이터 (구 q3)

  // Section 2: 인증/접근 관리
  q2_1: boolean  // 별도 로그인 필요 (구 q4)
  q2_2: string[] // 접근 정보 (구 q5)
  q2_3: boolean  // 유효성 체크 (구 q6)
  q2_4: string   // 수정 방법 (구 q7)

  // Section 3: 옵션 구조
  q3_1: string   // 옵션 Depth (구 q8)
  q3_2: string   // 1Depth 영향 (구 q9)
  q3_3: string   // 옵션 선택 방식 (구 q10)
  q3_4: string   // 옵션 기본값 (구 q11)
  q3_5: boolean  // [신규] 상호 배타 조건
  q3_6: boolean  // [신규] 마이너스 옵션
  q3_7: boolean  // [신규] 필수 연관 조건

  // Section 4: 공간 네비게이션
  q4_1: string[] // 공간 이동 방법 (구 q12)
  q4_2: boolean  // 자동 이동 (구 q13)
  q4_3: boolean  // 위치 표시 (구 q14)

  // Section 5: 견적 기능
  q5_1: string   // 견적 확인 버튼 동작 (구 q15)
  q5_2: string[] // 이동 버튼 (구 q16)
  q5_3: boolean  // 최종 견적서 수정 (구 q17)
  q5_4: string[] // 견적서 다운로드 형식 (구 q18)

  // Section 6: 데이터 저장
  q6_1: string   // 저장 위치 (구 q19)
  q6_2: string   // 제출 횟수 제한 (구 q20)
  q6_3: string   // 재제출 데이터 처리 (구 q21)
  q6_4: boolean  // 이력 추적 (구 q22)

  // Section 7: UI 커스터마이징
  q7_1: string[] // 커스터마이징 요소 (구 q23)
  q7_2: string   // 타입 정보 표시 위치 (구 q24)
  q7_3: string[] // 필수 버튼 (구 q25)

  // Section 8: 가이드/도움말
  q8_1: string[] // 가이드 제공 방식 (구 q26)
  q8_2: string   // 가이드 단계 (구 q27)
  q8_3: string[] // 가이드 접근 방법 (구 q28)

  // Section 9: 기타 정책 & 관리 기능
  q9_1: string[] // 오류 대응 (구 q29)
  q9_2: string[] // 컨펌 팝업 액션 (구 q30)
  q9_3: boolean  // 관리자 페이지 필요 (구 q31)
  q9_4: boolean  // 검색/조회 (구 q32)
}

export type TabType = 'checklist' | 'modules' | 'prototype'

// ============================================================================
// STORE STATE & ACTIONS
// ============================================================================

interface AppState {
  // State
  checklistAnswers: ChecklistAnswers
  selectedModules: string[]
  activeTab: TabType

  // Actions
  setAnswer: <K extends keyof ChecklistAnswers>(questionId: K, value: ChecklistAnswers[K]) => void
  calculateRequiredModules: () => void
  toggleModule: (moduleCode: string) => void
  setActiveTab: (tab: TabType) => void
  resetChecklist: () => void
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialChecklistAnswers: ChecklistAnswers = {
  q1_1: false,
  q1_2: false,
  q1_3: [],
  q2_1: false,
  q2_2: [],
  q2_3: false,
  q2_4: '',
  q3_1: '',
  q3_2: '',
  q3_3: '',
  q3_4: '',
  q3_5: false,
  q3_6: false,
  q3_7: false,
  q4_1: [],
  q4_2: false,
  q4_3: false,
  q5_1: '',
  q5_2: [],
  q5_3: false,
  q5_4: [],
  q6_1: '',
  q6_2: '',
  q6_3: '',
  q6_4: false,
  q7_1: [],
  q7_2: '',
  q7_3: [],
  q8_1: [],
  q8_2: '',
  q8_3: [],
  q9_1: [],
  q9_2: [],
  q9_3: false,
  q9_4: false,
}

// ============================================================================
// MODULE CALCULATION LOGIC
// ============================================================================

function calculateModulesFromAnswers(answers: ChecklistAnswers): string[] {
  const modules: string[] = []

  // M01: 인증/접근 관리
  // M01-1: IdP 연동 = Y
  if (answers.q1_1) {
    modules.push('M01-1')
  }

  // M01-2: 로그인 필요 = Y && IdP 연동 = N (자체 로그인)
  if (answers.q2_1 && !answers.q1_1) {
    modules.push('M01-2')
  }

  // M01-3: 로그인 불필요 && 정보 입력 필요
  if (!answers.q2_1 && answers.q2_2.length > 0) {
    modules.push('M01-3')
  }

  // M01-4: 정보 입력 필요 && 유효성 체크 = Y
  if (answers.q2_2.length > 0 && answers.q2_3) {
    modules.push('M01-4')
  }

  // M01-5: 정보 입력 필요 (수정 기능)
  if (answers.q2_2.length > 0) {
    modules.push('M01-5')
  }

  // M01-6: Always included (정보 표시)
  modules.push('M01-6')

  // M02: 옵션 구조
  // M02-1: Always included (1Depth는 항상 필요)
  modules.push('M02-1')

  // M02-2: Depth >= 2
  if (answers.q3_1 === '2' || answers.q3_1 === '3') {
    modules.push('M02-2')
  }

  // M02-3: Depth = 3
  if (answers.q3_1 === '3') {
    modules.push('M02-3')
  }

  // M02-4: 1Depth 영향 = '구조물 변경' 또는 '하위 옵션 변경'
  if (answers.q3_2 === '구조물 변경' || answers.q3_2 === '하위 옵션 변경') {
    modules.push('M02-4')
  }

  // M02-5: 옵션 선택 방식 = '다중 선택 가능' 또는 '혼합'
  if (answers.q3_3 === '다중 선택 가능' || answers.q3_3 === '혼합') {
    modules.push('M02-5')
  }

  // M02-6: Always included (기본값 설정)
  modules.push('M02-6')

  // M02-7: Always included (가격 표시)
  modules.push('M02-7')

  // M02-8: Always included (실시간 금액 계산)
  modules.push('M02-8')

  // M02-9: [신규] 배타적 선택 로직
  if (answers.q3_5) {
    modules.push('M02-9')
  }

  // M02-10: [신규] 마이너스 옵션 UI
  if (answers.q3_6) {
    modules.push('M02-10')
  }

  // M02-11: [신규] 필수 연관 선택 가이드
  if (answers.q3_7) {
    modules.push('M02-11')
  }

  // M03: 공간/네비게이션
  // M03-1: Always included (3D 뷰어 기본 - 모든 프로젝트에 3D 뷰어 있다고 가정)
  modules.push('M03-1')

  // M03-2: 공간 이동 방법에 '위치 버튼' 포함
  if (answers.q4_1.includes('위치 버튼')) {
    modules.push('M03-2')
  }

  // M03-3: 자동 이동 = Y
  if (answers.q4_2) {
    modules.push('M03-3')
  }

  // M03-4: 위치 표시 = Y
  if (answers.q4_3) {
    modules.push('M03-4')
  }

  // M03-5: 1Depth 영향 = '구조물 변경' (모델 교체)
  if (answers.q3_2 === '구조물 변경') {
    modules.push('M03-5')
  }

  // M04: 견적 기능
  // M04-1: Always included (견적서 팝업)
  modules.push('M04-1')

  // M04-2: Always included (옵션 요약)
  modules.push('M04-2')

  // M04-3: Always included (최종 견적서)
  modules.push('M04-3')

  // M04-4: 최종 견적서 수정 = Y
  if (answers.q5_3) {
    modules.push('M04-4')
  }

  // M04-5: 이동 버튼에 '다음/이전' 포함
  if (answers.q5_2.includes('다음/이전')) {
    modules.push('M04-5')
  }

  // M04-6: 다운로드 형식에 'PDF' 포함
  if (answers.q5_4.includes('PDF')) {
    modules.push('M04-6')
  }

  // M04-7: 다운로드 형식에 'Excel' 포함
  if (answers.q5_4.includes('Excel')) {
    modules.push('M04-7')
  }

  // M05: 데이터 저장/전송
  // M05-1: 저장 위치 = '구글 시트'
  if (answers.q6_1 === '구글 시트') {
    modules.push('M05-1')
  }

  // M05-2: 저장 위치 = '자체 DB'
  if (answers.q6_1 === '자체 DB') {
    modules.push('M05-2')
  }

  // M05-3: 저장 위치 = '건설사 DB'
  if (answers.q6_1 === '건설사 DB') {
    modules.push('M05-3')
  }

  // M05-4: 제출 횟수 = 'N회' 또는 '무제한'
  if (answers.q6_2 === 'N회' || answers.q6_2 === '무제한') {
    modules.push('M05-4')
  }

  // M05-5: 제출 횟수 = '1회'
  if (answers.q6_2 === '1회') {
    modules.push('M05-5')
  }

  // M05-6: 이력 추적 = Y
  if (answers.q6_4) {
    modules.push('M05-6')
  }

  // M05-7: Always included (제출 확인 팝업)
  modules.push('M05-7')

  // M06: UI 커스터마이징
  // M06-1: 로고 커스터마이징
  if (answers.q7_1.includes('로고')) {
    modules.push('M06-1')
  }

  // M06-2: 컬러 테마 설정
  if (answers.q7_1.includes('컬러')) {
    modules.push('M06-2')
  }

  // M06-3: 폰트 적용
  if (answers.q7_1.includes('폰트')) {
    modules.push('M06-3')
  }

  // M06-4: 타입 정보 표시 (위치가 '없음'이 아닐 때)
  if (answers.q7_2 !== '없음') {
    modules.push('M06-4')
  }

  // M06-5: Always included (버튼 레이아웃 설정)
  modules.push('M06-5')

  // M07: 가이드/도움말
  // M07-1: 가이드 제공 방식에 '이미지 캡쳐' 포함
  if (answers.q8_1.includes('이미지 캡쳐')) {
    modules.push('M07-1')
  }

  // M07-2: 가이드 제공 방식에 '영상' 포함
  if (answers.q8_1.includes('영상')) {
    modules.push('M07-2')
  }

  // M07-3: 가이드 접근 방법에 '최초 팝업' 포함
  if (answers.q8_3.includes('최초 팝업')) {
    modules.push('M07-3')
  }

  // M07-4: 가이드 접근 방법에 '버튼' 포함
  if (answers.q8_3.includes('버튼')) {
    modules.push('M07-4')
  }

  // M08: 관리 기능
  // M08-1: 관리자 페이지 필요 = Y
  if (answers.q9_3) {
    modules.push('M08-1')
  }

  // M08-2: 관리자 페이지 필요 = Y && 검색/조회 = Y
  if (answers.q9_3 && answers.q9_4) {
    modules.push('M08-2')
  }

  // M08-3: 관리자 페이지 필요 = Y
  if (answers.q9_3) {
    modules.push('M08-3')
  }

  return modules
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  checklistAnswers: initialChecklistAnswers,
  selectedModules: [],
  activeTab: 'checklist',

  // Actions
  setAnswer: (questionId, value) => {
    set((state) => ({
      checklistAnswers: {
        ...state.checklistAnswers,
        [questionId]: value,
      },
    }))
  },

  calculateRequiredModules: () => {
    const { checklistAnswers } = get()
    const requiredModules = calculateModulesFromAnswers(checklistAnswers)
    set({ selectedModules: requiredModules })
    console.log('[Store] Calculated required modules:', requiredModules)
  },

  toggleModule: (moduleCode) => {
    set((state) => {
      const isSelected = state.selectedModules.includes(moduleCode)
      const newModules = isSelected
        ? state.selectedModules.filter((m) => m !== moduleCode)
        : [...state.selectedModules, moduleCode]

      console.log('[Store] Toggle module:', moduleCode, '→', !isSelected)
      return { selectedModules: newModules }
    })
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab })
    console.log('[Store] Active tab changed:', tab)
  },

  resetChecklist: () => {
    set({
      checklistAnswers: initialChecklistAnswers,
      selectedModules: [],
    })
    console.log('[Store] Checklist reset')
  },
}))