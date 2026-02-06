/**
 * M02-5: 다중 선택 기능
 * 최대 선택 개수 제한이 있는 다중 선택
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_5_MultiSelectProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  multiSelection: string[]
  setMultiSelection: (ids: string[]) => void
}

export function M02_5_MultiSelect({
  deviceView,
  sampleOptionData,
  multiSelection,
  setMultiSelection,
}: M02_5_MultiSelectProps) {
  const maxSelection = 3

  const handleMultiToggle = (optionId: string) => {
    if (multiSelection.includes(optionId)) {
      setMultiSelection(multiSelection.filter((id) => id !== optionId))
    } else {
      if (multiSelection.length < maxSelection) {
        setMultiSelection([...multiSelection, optionId])
      } else {
        alert(`최대 ${maxSelection}개까지 선택 가능합니다`)
      }
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">다중 선택 기능</h2>
          <Badge variant="secondary" className="px-3 py-1">
            선택됨: {multiSelection.length}/{maxSelection}
          </Badge>
        </div>

        <div className="space-y-3">
          {sampleOptionData.depth2Options.slice(0, 5).map((option) => {
            const isSelected = multiSelection.includes(option.id)
            const isDisabled =
              !isSelected && multiSelection.length >= maxSelection

            return (
              <div
                key={option.id}
                onClick={() => !isDisabled && handleMultiToggle(option.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : isDisabled
                    ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isSelected}
                      disabled={isDisabled}
                      className="h-5 w-5"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {option.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    +{(option.price / 10000).toLocaleString()}만원
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {multiSelection.length >= maxSelection && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm">
            <p className="font-semibold text-orange-900 mb-1">⚠️ 선택 제한</p>
            <p className="text-orange-800">
              최대 {maxSelection}개까지 선택 가능합니다. 다른 옵션을 선택하려면
              기존 선택을 해제하세요.
            </p>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
