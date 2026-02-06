/**
 * M02-6: 옵션 기본값 설정
 * isDefault: true인 옵션이 자동으로 선택되는 기능
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_6_DefaultValueProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  currentSelection: string
  setCurrentSelection: (id: string) => void
}

export function M02_6_DefaultValue({
  deviceView,
  sampleOptionData,
  currentSelection,
  setCurrentSelection,
}: M02_6_DefaultValueProps) {
  const defaultOption = sampleOptionData.depth1Options.find((opt) => opt.isDefault)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          옵션 기본값 설정
        </h2>

        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-green-900 mb-1">✓ 기본값 설정됨</p>
          <p className="text-sm text-green-800">
            시스템 진입 시 &quot;<strong>{defaultOption?.name}</strong>&quot; 옵션이
            자동으로 선택됩니다.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {sampleOptionData.depth1Options.map((option) => {
            const isSelected = currentSelection === option.id
            return (
              <div
                key={option.id}
                onClick={() => setCurrentSelection(option.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">
                    {option.name}
                  </span>
                  {option.isDefault && (
                    <Badge variant="default" className="text-xs">
                      기본
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-primary font-bold">
                  {option.price === 0
                    ? '기본가'
                    : `+${(option.price / 10000).toLocaleString()}만원`}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <p className="font-semibold text-blue-900 mb-2">
            📋 기본값 설정 방법 (Q3-4 답변 기반)
          </p>
          <ul className="text-blue-800 space-y-1 list-disc list-inside">
            <li>
              <strong>미선택</strong>: 아무것도 선택하지 않은 상태로 시작
            </li>
            <li>
              <strong>기본옵션</strong>: isDefault=true인 옵션 자동 선택 ✅
            </li>
            <li>
              <strong>이전 선택값 유지</strong>: 마지막 선택값을 localStorage에
              저장
            </li>
          </ul>
        </div>
      </div>
    </DeviceFrame>
  )
}
