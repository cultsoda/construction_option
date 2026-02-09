/**
 * M02-1: 1Depth 옵션 선택
 * 평면 타입 등 1단계 옵션을 선택하는 화면
 */

import React from 'react'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionItem } from '../../types'

interface M02_1_Depth1Props {
  deviceView: DeviceView
  sampleOptionData: {
    depth1Options: OptionItem[]
  }
  selected1Depth: string
  setSelected1Depth: (id: string) => void
}

export function M02_1_Depth1({
  deviceView,
  sampleOptionData,
  selected1Depth,
  setSelected1Depth,
}: M02_1_Depth1Props) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            1Depth 옵션 선택
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 평면 타입 등 최상위 옵션을 선택하는 화면입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleOptionData.depth1Options.map((option) => {
            const isSelected = selected1Depth === option.id
            return (
              <div
                key={option.id}
                onClick={() => setSelected1Depth(option.id)}
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {/* 이미지 */}
                <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>

                {/* 옵션명 */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {option.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {option.description}
                </p>

                {/* 가격 */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xl font-bold ${
                      option.price === 0
                        ? 'text-muted-foreground'
                        : 'text-primary'
                    }`}
                  >
                    {option.price === 0
                      ? '기본'
                      : `+${(option.price / 10000).toLocaleString()}만원`}
                  </span>
                  {option.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      기본
                    </Badge>
                  )}
                </div>

                {/* 선택 표시 */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <p className="font-semibold text-blue-900 mb-1">📋 1Depth 옵션</p>
          <p className="text-blue-800">
            평면 타입을 선택하세요. 선택한 타입에 따라 하위 옵션이 달라집니다.
          </p>
        </div>
      </div>
    </DeviceFrame>
  )
}
