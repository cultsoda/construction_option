'use client'

import { useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Key,
  List,
  Navigation,
  Calculator,
  Database,
  Palette,
  HelpCircle,
  Settings,
  ChevronLeft,
  Eye,
  Save,
  ChevronRight,
  Check
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

interface ModulesDisplayProps {
  onNavigateToChecklist: () => void
  onNavigateToPrototype: () => void
}

interface SubModule {
  id: string
  name: string
  type: '필수' | '선택'
  condition?: string
}

export function ModulesDisplay({ onNavigateToChecklist, onNavigateToPrototype }: ModulesDisplayProps) {
  const selectedModules = useAppStore((state) => state.selectedModules)
  const toggleModule = useAppStore((state) => state.toggleModule)

  // Convert array to Set for faster lookups
  const checkedModules = useMemo(() => new Set(selectedModules), [selectedModules])

  const modules = [
    {
      id: 'M01',
      title: '인증/접근 관리',
      icon: Key,
      subModules: [
        { id: 'M01-1', name: '건설사 SSO 연동', type: '선택', condition: 'IdP 연동 = Y' },
        { id: 'M01-2', name: '자체 로그인 시스템', type: '선택', condition: '로그인 = Y, IdP = N' },
        { id: 'M01-3', name: '고객 정보 입력 폼', type: '선택', condition: '로그인 = N' },
        { id: 'M01-4', name: '입력 정보 유효성 검증', type: '선택', condition: '유효성 체크 = Y' },
        { id: 'M01-5', name: '정보 재입력 기능', type: '선택' },
        { id: 'M01-6', name: '입력 정보 상단 표시', type: '필수' },
      ]
    },
    {
      id: 'M02',
      title: '옵션 구조 및 선택',
      icon: List,
      subModules: [
        { id: 'M02-1', name: '1Depth 옵션 UI', type: '필수' },
        { id: 'M02-2', name: '2Depth 옵션 UI', type: '선택', condition: 'Depth ≥ 2' },
        { id: 'M02-3', name: '3Depth 옵션 UI', type: '선택', condition: 'Depth = 3' },
        { id: 'M02-4', name: '1Depth 연동 로직', type: '선택', condition: '1Depth 영향 = Y' },
        { id: 'M02-5', name: '다중 선택 기능', type: '선택', condition: '다중 선택 = Y' },
        { id: 'M02-6', name: '옵션 기본값 설정', type: '필수' },
        { id: 'M02-7', name: '옵션별 가격 표시', type: '필수' },
        { id: 'M02-8', name: '실시간 금액 계산', type: '필수' },
        // [NEW MODULES]
        { id: 'M02-9', name: '배타적 선택 로직', type: '선택', condition: '배타 조건 = Y' },
        { id: 'M02-10', name: '마이너스 옵션 UI', type: '선택', condition: '마이너스 옵션 = Y' },
        { id: 'M02-11', name: '필수 연관 선택 가이드', type: '선택', condition: '필수 연관 = Y' },
      ]
    },
    {
      id: 'M03',
      title: '공간/네비게이션',
      icon: Navigation,
      subModules: [
        { id: 'M03-1', name: '3D 뷰어 기본', type: '필수' },
        { id: 'M03-2', name: '위치 버튼 네비게이션', type: '필수' },
        { id: 'M03-3', name: '옵션 선택 시 자동 이동', type: '선택' },
        { id: 'M03-4', name: '위치 하이라이트 표시', type: '선택' },
        { id: 'M03-5', name: '구조물 동적 교체', type: '선택' },
      ]
    },
    {
      id: 'M04',
      title: '견적 기능',
      icon: Calculator,
      subModules: [
        { id: 'M04-1', name: '견적서 팝업', type: '필수' },
        { id: 'M04-2', name: '옵션 요약 표시', type: '필수' },
        { id: 'M04-3', name: '최종 견적서 화면', type: '필수' },
        { id: 'M04-4', name: '견적서 내 옵션 수정', type: '선택' },
        { id: 'M04-5', name: '다음/이전 버튼', type: '선택' },
        { id: 'M04-6', name: 'PDF 다운로드', type: '선택' },
        { id: 'M04-7', name: 'Excel 다운로드', type: '선택' },
      ]
    },
    {
      id: 'M05',
      title: '데이터 저장/전송',
      icon: Database,
      subModules: [
        { id: 'M05-1', name: '구글 시트 API 연동', type: '선택' },
        { id: 'M05-2', name: '자체 DB 저장', type: '선택' },
        { id: 'M05-3', name: '건설사 API 전송', type: '선택' },
        { id: 'M05-4', name: 'N회 제출 허용', type: '선택' },
        { id: 'M05-5', name: '1회 제출 제한', type: '선택' },
        { id: 'M05-6', name: '제출 이력 관리', type: '선택' },
        { id: 'M05-7', name: '제출 확인 팝업', type: '필수' },
      ]
    },
    {
      id: 'M06',
      title: 'UI 커스터마이징',
      icon: Palette,
      subModules: [
        { id: 'M06-1', name: '로고 교체', type: '필수' },
        { id: 'M06-2', name: '컬러 테마 설정', type: '필수' },
        { id: 'M06-3', name: '폰트 적용', type: '선택' },
        { id: 'M06-4', name: '타입 정보 표시', type: '필수' },
        { id: 'M06-5', name: '버튼 레이아웃 설정', type: '필수' },
      ]
    },
    {
      id: 'M07',
      title: '가이드/도움말',
      icon: HelpCircle,
      subModules: [
        { id: 'M07-1', name: '이미지 가이드 제작', type: '선택' },
        { id: 'M07-2', name: '영상 가이드 제작', type: '선택' },
        { id: 'M07-3', name: '가이드 팝업', type: '선택' },
        { id: 'M07-4', name: '가이드 버튼', type: '선택' },
      ]
    },
    {
      id: 'M08',
      title: '관리 기능',
      icon: Settings,
      subModules: [
        { id: 'M08-1', name: '관리자 페이지', type: '선택' },
        { id: 'M08-2', name: '데이터 검색 기능', type: '선택' },
        { id: 'M08-3', name: 'Excel 일괄 다운로드', type: '선택' },
      ]
    },
  ]

  // Handle checkbox toggle
  const handleToggleModule = (moduleId: string, isRequired: boolean) => {
    if (isRequired) return // Can't uncheck required modules
    toggleModule(moduleId)
  }

  // Handle module name click - navigate to prototype
  const handleModuleClick = (moduleId: string) => {
    console.log('[v0] Module clicked:', moduleId)
    onNavigateToPrototype()
  }

  // Calculate totals based on checked state
  const totalModules = useMemo(() => checkedModules.size, [checkedModules])
  const requiredModules = useMemo(() => {
    return modules.reduce((acc, mod) => 
      acc + mod.subModules.filter(sm => sm.type === '필수' && checkedModules.has(sm.id)).length, 0
    )
  }, [checkedModules])
  
  const optionalModules = useMemo(() => {
    return modules.reduce((acc, mod) => 
      acc + mod.subModules.filter(sm => sm.type === '선택' && checkedModules.has(sm.id)).length, 0
    )
  }, [checkedModules])

  return (
    <div className="space-y-8 pb-24">
      {/* Summary Section */}
      <div className="flex items-center justify-between gap-4">
        <Card className="flex-1 border-2 shadow-md">
          <CardContent className="flex items-center justify-around p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">선택된 모듈</p>
              <p className="text-3xl font-bold text-primary transition-all duration-300">{totalModules}개</p>
              <p className="text-xs text-muted-foreground mt-1">
                필수: {requiredModules}개, 선택: {optionalModules}개
              </p>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">필수 모듈</p>
              <p className="text-3xl font-bold text-secondary transition-all duration-300">{requiredModules}개</p>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">선택 모듈</p>
              <p className="text-3xl font-bold text-foreground/70 transition-all duration-300">{optionalModules}개</p>
            </div>
          </CardContent>
        </Card>
        
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Save className="h-4 w-4" />
          프리셋 저장
        </Button>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = module.icon
          const moduleCount = module.subModules.length
          
          return (
            <Card 
              key={module.id} 
              className="border-2 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/40"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {module.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        총 {moduleCount}개 모듈
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2">
                {module.subModules.map((subModule) => {
                  const isChecked = checkedModules.has(subModule.id)
                  const isRequired = subModule.type === '필수'
                  
                  return (
                    <div 
                      key={subModule.id}
                      className={`flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-all duration-300 ${
                        isChecked ? 'border-primary/40' : 'hover:border-primary/20'
                      }`}
                    >
                      {/* Checkbox or Icon  */}
                      <div 
                        className="flex-shrink-0 mt-0.5 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleModule(subModule.id, isRequired)
                        }}
                      >
                        {isRequired ? (
                          <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-primary bg-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </div>
                        ) : (
                          <Checkbox 
                            checked={isChecked}
                            className="h-5 w-5"
                          />
                        )}
                      </div>
                      
                      {/* Module Info - Clickable */}
                      <div 
                        className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleModuleClick(subModule.id)}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-medium ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {subModule.id}:
                          </span>
                          <span className={`text-sm font-medium ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {subModule.name}
                          </span>
                          <Badge 
                            variant={isRequired ? 'default' : 'outline'}
                            className={`text-xs ${
                              isRequired
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {subModule.type}
                          </Badge>
                        </div>
                        {subModule.condition && (
                          <p className="text-xs text-muted-foreground mt-1">
                            조건: {subModule.condition}
                          </p>
                        )}
                      </div>
                      
                      {/* Preview Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        <ChevronRight 
                          className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" 
                          onClick={() => handleModuleClick(subModule.id)}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={onNavigateToChecklist}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            이전
          </Button>
          
          <Button
            size="lg"
            onClick={onNavigateToPrototype}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            프로토타입 보기
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}