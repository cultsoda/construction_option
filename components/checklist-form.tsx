'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppStore, ChecklistAnswers } from '@/store/useAppStore'

export function ChecklistForm({ onNavigateToModules }: { onNavigateToModules: () => void }) {
  const formData = useAppStore((state) => state.checklistAnswers)
  const setAnswer = useAppStore((state) => state.setAnswer)
  const calculateRequiredModules = useAppStore((state) => state.calculateRequiredModules)
  const resetChecklist = useAppStore((state) => state.resetChecklist)

  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  })

  const toggleSection = (section: number) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleReset = () => {
    resetChecklist()
  }

  const handleCheckboxChange = (question: keyof ChecklistAnswers, value: string) => {
    const currentValues = formData[question] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    setAnswer(question, newValues)
  }

  const handleModulesClick = () => {
    calculateRequiredModules()
    onNavigateToModules()
  }

  return (
    <TooltipProvider>
      <div className="pb-32">
        <div className="space-y-6">
          {/* Section 1: 시스템 연동 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(1)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  1. 시스템 연동
                </CardTitle>
                {expandedSections[1] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[1] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q1-1 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q1_1" className="text-base font-medium">
                    Q1-1. 건설사 IdP와 연동하는가?
                  </Label>
                  <Switch
                    id="q1_1"
                    checked={formData.q1_1}
                    onCheckedChange={(checked) => setAnswer('q1_1', checked)}
                  />
                </div>

                {/* Q1-2 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q1_2" className="text-base font-medium">
                    Q1-2. 건설사 시스템과 데이터를 주고받는가?
                  </Label>
                  <Switch
                    id="q1_2"
                    checked={formData.q1_2}
                    onCheckedChange={(checked) => setAnswer('q1_2', checked)}
                  />
                </div>

                {/* Q1-3 - Conditional */}
                {formData.q1_2 && (
                  <div className="ml-6 space-y-3 border-l-2 border-primary/30 pl-6">
                    <Label className="text-base font-medium">Q1-3. 주고받는 데이터는?</Label>
                    <div className="space-y-2">
                      {['고객정보', '견적정보', '옵션정보', '계약정보'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`q1_3-${option}`}
                            checked={formData.q1_3.includes(option)}
                            onCheckedChange={() => handleCheckboxChange('q1_3', option)}
                          />
                          <Label htmlFor={`q1_3-${option}`} className="text-sm font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Section 2: 인증/접근 관리 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(2)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  2. 인증/접근 관리
                </CardTitle>
                {expandedSections[2] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[2] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q2-1 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q2_1" className="text-base font-medium">
                    Q2-1. 별도 로그인 페이지가 필요한가?
                  </Label>
                  <Switch
                    id="q2_1"
                    checked={formData.q2_1}
                    onCheckedChange={(checked) => setAnswer('q2_1', checked)}
                  />
                </div>

                {/* Q2-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q2-2. 시스템 접근을 위해 입력받을 정보는?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['이름', '전화번호', '타입', '동호수', '계약번호', '기타'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q2_2-${option}`}
                          checked={formData.q2_2.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q2_2', option)}
                        />
                        <Label htmlFor={`q2_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q2-3 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q2_3" className="text-base font-medium">
                    Q2-3. 입력 정보의 유효성을 체크하는가?
                  </Label>
                  <Switch
                    id="q2_3"
                    checked={formData.q2_3}
                    onCheckedChange={(checked) => setAnswer('q2_3', checked)}
                  />
                </div>

                {/* Q2-4 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q2-4. 잘못 입력한 경우 수정 방법은?
                  </Label>
                  <RadioGroup value={formData.q2_4} onValueChange={(value) => setAnswer('q2_4', value)}>
                    {['새로고침', '수정 버튼', '불가'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q2_4-${option}`} />
                        <Label htmlFor={`q2_4-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 3: 옵션 구조 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(3)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  3. 옵션 구조
                </CardTitle>
                {expandedSections[3] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[3] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q3-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q3-1. 옵션은 몇 Depth인가?</Label>
                  <RadioGroup value={formData.q3_1} onValueChange={(value) => setAnswer('q3_1', value)}>
                    {['1', '2', '3'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q3_1-${option}`} />
                        <Label htmlFor={`q3_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q3-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q3-2. 1Depth 옵션 선택 시 영향은?
                  </Label>
                  <RadioGroup value={formData.q3_2} onValueChange={(value) => setAnswer('q3_2', value)}>
                    {['구조물 변경', '하위 옵션 변경', '없음'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q3_2-${option}`} />
                        <Label htmlFor={`q3_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q3-3 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q3-3. 옵션 선택 방식은?</Label>
                  <RadioGroup value={formData.q3_3} onValueChange={(value) => setAnswer('q3_3', value)}>
                    {['단일 선택만', '다중 선택 가능', '혼합'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q3_3-${option}`} />
                        <Label htmlFor={`q3_3-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q3-4 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q3-4. 옵션의 기본값은?</Label>
                  <RadioGroup value={formData.q3_4} onValueChange={(value) => setAnswer('q3_4', value)}>
                    {['미선택', '기본옵션', '이전 선택값 유지'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q3_4-${option}`} />
                        <Label htmlFor={`q3_4-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q3-5 [NEW] */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="q3_5" className="text-base font-medium">
                      Q3-5. 옵션 간 상호 배타(Exclusion) 조건이 있는가?
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>예: '냉장고장'을 선택하면 '김치냉장고장'은 선택할 수 없도록 막는 경우</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Switch
                    id="q3_5"
                    checked={formData.q3_5}
                    onCheckedChange={(checked) => setAnswer('q3_5', checked)}
                  />
                </div>

                {/* Q3-6 [NEW] */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q3_6" className="text-base font-medium">
                    Q3-6. 마이너스 옵션(기본 품목 제외 시 가격 차감)이 있는가?
                  </Label>
                  <Switch
                    id="q3_6"
                    checked={formData.q3_6}
                    onCheckedChange={(checked) => setAnswer('q3_6', checked)}
                  />
                </div>

                {/* Q3-7 [NEW] */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="q3_7" className="text-base font-medium">
                      Q3-7. 필수 연관(Dependency) 옵션이 있는가?
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>예: '식기세척기'를 선택하려면 '주방 가구장'을 반드시 먼저 선택해야 하는 경우</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Switch
                    id="q3_7"
                    checked={formData.q3_7}
                    onCheckedChange={(checked) => setAnswer('q3_7', checked)}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 4: 공간 네비게이션 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(4)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  4. 공간 네비게이션
                </CardTitle>
                {expandedSections[4] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[4] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q4-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q4-1. 공간 이동 방법은?</Label>
                  <div className="space-y-2">
                    {['위치 버튼', '옵션 선택 시 자동', '화살표'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q4_1-${option}`}
                          checked={formData.q4_1.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q4_1', option)}
                        />
                        <Label htmlFor={`q4_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q4-2 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q4_2" className="text-base font-medium">
                    Q4-2. 옵션 선택 시 공간 자동 이동하는가?
                  </Label>
                  <Switch
                    id="q4_2"
                    checked={formData.q4_2}
                    onCheckedChange={(checked) => setAnswer('q4_2', checked)}
                  />
                </div>

                {/* Q4-3 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q4_3" className="text-base font-medium">
                    Q4-3. 옵션 적용 위치를 표시하는가?
                  </Label>
                  <Switch
                    id="q4_3"
                    checked={formData.q4_3}
                    onCheckedChange={(checked) => setAnswer('q4_3', checked)}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 5: 견적 기능 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(5)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  5. 견적 기능
                </CardTitle>
                {expandedSections[5] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[5] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q5-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q5-1. 견적 확인 버튼의 동작은?
                  </Label>
                  <RadioGroup value={formData.q5_1} onValueChange={(value) => setAnswer('q5_1', value)}>
                    {['다음 옵션 이동', '전체 견적서', '개별 확인'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q5_1-${option}`} />
                        <Label htmlFor={`q5_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q5-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q5-2. 옵션 간 이동 버튼은?</Label>
                  <div className="space-y-2">
                    {['다음/이전', '견적확인', '없음'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q5_2-${option}`}
                          checked={formData.q5_2.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q5_2', option)}
                        />
                        <Label htmlFor={`q5_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q5-3 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q5_3" className="text-base font-medium">
                    Q5-3. 최종 견적서에서 옵션 수정이 가능한가?
                  </Label>
                  <Switch
                    id="q5_3"
                    checked={formData.q5_3}
                    onCheckedChange={(checked) => setAnswer('q5_3', checked)}
                  />
                </div>

                {/* Q5-4 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q5-4. 견적서 다운로드 형식은?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['PDF', 'Excel', '이미지', '불가'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q5_4-${option}`}
                          checked={formData.q5_4.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q5_4', option)}
                        />
                        <Label htmlFor={`q5_4-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 6: 데이터 저장 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(6)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  6. 데이터 저장
                </CardTitle>
                {expandedSections[6] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[6] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q6-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q6-1. 견적 데이터 저장 위치는?
                  </Label>
                  <RadioGroup value={formData.q6_1} onValueChange={(value) => setAnswer('q6_1', value)}>
                    {['구글 시트', '건설사 DB', '자체 DB'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q6_1-${option}`} />
                        <Label htmlFor={`q6_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q6-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q6-2. 견적서 제출 횟수 제한은?
                  </Label>
                  <RadioGroup value={formData.q6_2} onValueChange={(value) => setAnswer('q6_2', value)}>
                    {['1회', 'N회', '무제한'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q6_2-${option}`} />
                        <Label htmlFor={`q6_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q6-3 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q6-3. 재제출 시 데이터 처리는?
                  </Label>
                  <RadioGroup value={formData.q6_3} onValueChange={(value) => setAnswer('q6_3', value)}>
                    {['추가(append)', '업데이트', '버전 관리'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q6_3-${option}`} />
                        <Label htmlFor={`q6_3-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q6-4 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q6_4" className="text-base font-medium">
                    Q6-4. 재제출 시 이력을 추적하는가?
                  </Label>
                  <Switch
                    id="q6_4"
                    checked={formData.q6_4}
                    onCheckedChange={(checked) => setAnswer('q6_4', checked)}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 7: UI 커스터마이징 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(7)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  7. UI 커스터마이징
                </CardTitle>
                {expandedSections[7] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[7] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q7-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q7-1. 건설사별 커스터마이징 요소는?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['로고', '컬러', '폰트', '전체 디자인'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q7_1-${option}`}
                          checked={formData.q7_1.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q7_1', option)}
                        />
                        <Label htmlFor={`q7_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q7-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q7-2. 타입(평형) 정보 표시 위치는?
                  </Label>
                  <RadioGroup value={formData.q7_2} onValueChange={(value) => setAnswer('q7_2', value)}>
                    {['상단 고정', '사이드바', '없음'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q7_2-${option}`} />
                        <Label htmlFor={`q7_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Q7-3 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q7-3. 필수 버튼 구성은?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['견적서', '가이드', '초기화', '기타'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q7_3-${option}`}
                          checked={formData.q7_3.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q7_3', option)}
                        />
                        <Label htmlFor={`q7_3-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 8: 가이드/도움말 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(8)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  8. 가이드/도움말
                </CardTitle>
                {expandedSections[8] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[8] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q8-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q8-1. 사용 가이드 제공 방식은?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['이미지 캡쳐', '영상', '텍스트', '없음'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q8_1-${option}`}
                          checked={formData.q8_1.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q8_1', option)}
                        />
                        <Label htmlFor={`q8_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q8-2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="q8_2" className="text-base font-medium">
                      Q8-2. 가이드는 몇 단계인가?
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>숫자를 입력하세요 (예: 5)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="q8_2"
                    type="number"
                    placeholder="단계 수 입력"
                    value={formData.q8_2}
                    onChange={(e) => setAnswer('q8_2', e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                {/* Q8-3 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Q8-3. 가이드 접근 방법은?</Label>
                  <div className="space-y-2">
                    {['버튼', '최초 팝업', '툴팁'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q8_3-${option}`}
                          checked={formData.q8_3.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q8_3', option)}
                        />
                        <Label htmlFor={`q8_3-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Section 9: 기타 정책 & 관리 기능 */}
          <Card className="border-2 shadow-md">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(9)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground">
                  9. 기타 정책 & 관리 기능
                </CardTitle>
                {expandedSections[9] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedSections[9] && (
              <CardContent className="space-y-6 pt-6">
                {/* Q9-1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q9-1. 오류 발생 시 대응 방식은?
                  </Label>
                  <div className="space-y-2">
                    {['안내 메시지', '자동 복구', '관리자 알림'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q9_1-${option}`}
                          checked={formData.q9_1.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q9_1', option)}
                        />
                        <Label htmlFor={`q9_1-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q9-2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Q9-2. 컨펌 팝업이 필요한 액션은?
                  </Label>
                  <div className="space-y-2">
                    {['타입 변경', '견적 제출', '옵션 초기화'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`q9_2-${option}`}
                          checked={formData.q9_2.includes(option)}
                          onCheckedChange={() => handleCheckboxChange('q9_2', option)}
                        />
                        <Label htmlFor={`q9_2-${option}`} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q9-3 */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="q9_3" className="text-base font-medium">
                    Q9-3. 관리자 페이지가 필요한가?
                  </Label>
                  <Switch
                    id="q9_3"
                    checked={formData.q9_3}
                    onCheckedChange={(checked) => setAnswer('q9_3', checked)}
                  />
                </div>

                {/* Q9-4 - Conditional */}
                {formData.q9_3 && (
                  <div className="ml-6 space-y-3 border-l-2 border-primary/30 pl-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="q9_4" className="text-base font-medium">
                        Q9-4. 관리자가 견적서를 검색/조회하는가?
                      </Label>
                      <Switch
                        id="q9_4"
                        checked={formData.q9_4}
                        onCheckedChange={(checked) => setAnswer('q9_4', checked)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card shadow-2xl">
          <div className="container mx-auto flex items-center justify-between px-8 py-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="text-base font-semibold bg-transparent"
            >
              선택 초기화
            </Button>
            <Button
              size="lg"
              onClick={handleModulesClick}
              className="text-base font-semibold"
            >
              모듈 확인
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}