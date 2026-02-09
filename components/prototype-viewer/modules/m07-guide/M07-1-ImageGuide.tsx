/**
 * M07-1: 이미지 가이드 제작
 * 단계별 이미지 가이드를 제작하고 미리보는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image, Upload, ArrowLeft, ArrowRight, Save } from 'lucide-react'

interface M07_1_ImageGuideProps {
  deviceView: DeviceView
  m07_1_currentStep: number
  setM07_1_currentStep: (step: number) => void
}

const sampleGuideSteps = [
  { id: 1, title: '옵션 선택하기', description: '원하는 옵션을 클릭하여 선택하세요.' },
  { id: 2, title: '상세 정보 확인', description: '옵션의 상세 정보를 확인하세요.' },
  { id: 3, title: '견적 확인하기', description: '선택한 옵션의 견적을 확인하세요.' },
  { id: 4, title: '계약 진행하기', description: '최종 계약을 진행하세요.' }
]

export function M07_1_ImageGuide({
  deviceView,
  m07_1_currentStep,
  setM07_1_currentStep
}: M07_1_ImageGuideProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex h-full">
        {/* 좌측: 스텝 목록 */}
        <div className="w-64 border-r bg-muted/30 p-4 space-y-2">
          <h3 className="font-bold text-sm mb-4">가이드 단계</h3>
          {sampleGuideSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setM07_1_currentStep(index)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                m07_1_currentStep === index
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-white hover:bg-muted"
              }`}
            >
              <div className="font-medium text-sm">{step.title}</div>
            </button>
          ))}
        </div>

        {/* 우측: 스텝 상세 */}
        <div className="flex-1 p-6 space-y-6">
          <div>
            <Badge className="mb-2">
              Step {m07_1_currentStep + 1} / {sampleGuideSteps.length}
            </Badge>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {sampleGuideSteps[m07_1_currentStep].title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              💡 단계별 이미지 가이드를 제작하여 사용자에게 안내할 수 있습니다
            </p>
            <p className="text-sm text-muted-foreground">
              {sampleGuideSteps[m07_1_currentStep].description}
            </p>
          </div>

          {/* 이미지 영역 */}
          <div className="w-full h-64 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Image className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">가이드 이미지 영역</p>
              <p className="text-xs text-slate-400 mt-1">400 x 300px</p>
            </div>
          </div>

          <Button className="w-full gap-2">
            <Upload className="h-4 w-4" />
            이미지 업로드
          </Button>

          {/* 네비게이션 */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() =>
                setM07_1_currentStep(Math.max(0, m07_1_currentStep - 1))
              }
              disabled={m07_1_currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              이전 스텝
            </Button>
            <Button
              onClick={() =>
                setM07_1_currentStep(
                  Math.min(
                    sampleGuideSteps.length - 1,
                    m07_1_currentStep + 1
                  )
                )
              }
              disabled={m07_1_currentStep === sampleGuideSteps.length - 1}
            >
              다음 스텝
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <Button variant="default" className="w-full bg-primary">
            <Save className="h-4 w-4 mr-2" />
            가이드 저장
          </Button>
        </div>
      </div>
    </DeviceFrame>
  )
}
