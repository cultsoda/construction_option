/**
 * M04-5: 견적 요약 (다음/이전 버튼)
 * 단계별로 옵션을 선택하며 진행할 수 있는 네비게이션
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface OptionCategory {
  name: string
  description: string
}

interface M04_5_QuoteSummaryProps {
  deviceView: DeviceView
  m04_5_currentCategory: number
  setM04_5_currentCategory: (index: number) => void
  optionCategories: OptionCategory[]
}

export function M04_5_QuoteSummary({
  deviceView,
  m04_5_currentCategory,
  setM04_5_currentCategory,
  optionCategories,
}: M04_5_QuoteSummaryProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          다음/이전 버튼
        </h2>

        {/* 진행 상태 바 */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>진행률</span>
            <span>
              {m04_5_currentCategory + 1} / {optionCategories.length}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${
                  ((m04_5_currentCategory + 1) /
                    optionCategories.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* 현재 단계 컨텐츠 */}
        <div className="flex-1 flex items-center justify-center p-8 bg-muted/20 border-2 border-dashed border-border rounded-xl mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {optionCategories[m04_5_currentCategory].name}
            </h3>
            <p className="text-muted-foreground">
              {optionCategories[m04_5_currentCategory].description}
            </p>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={() =>
              setM04_5_currentCategory(
                Math.max(0, m04_5_currentCategory - 1)
              )
            }
            disabled={m04_5_currentCategory === 0}
            className={`flex-1 h-14 flex items-center justify-center gap-2 rounded-lg font-semibold border-2 transition-all ${
              m04_5_currentCategory === 0
                ? 'border-muted text-muted-foreground cursor-not-allowed opacity-50'
                : 'border-border hover:bg-muted text-foreground'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            이전 단계
          </button>

          <button
            onClick={() =>
              setM04_5_currentCategory(
                Math.min(
                  optionCategories.length - 1,
                  m04_5_currentCategory + 1
                )
              )
            }
            className="flex-1 h-14 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {m04_5_currentCategory === optionCategories.length - 1
              ? '견적서 보기'
              : '다음 단계'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}
