/**
 * M02-9: 배타적 선택 로직
 * excludes 속성을 가진 옵션들의 배타적 선택
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_9_ExclusiveProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  exclusiveSelection: string[]
  setExclusiveSelection: (ids: string[]) => void
}

export function M02_9_Exclusive({
  deviceView,
  sampleOptionData,
  exclusiveSelection,
  setExclusiveSelection,
}: M02_9_ExclusiveProps) {
  const handleExclusiveToggle = (optionId: string) => {
    const option = sampleOptionData.depth2Options.find(
      (opt) => opt.id === optionId
    )
    if (!option) return

    const isSelected = exclusiveSelection.includes(optionId)

    if (isSelected) {
      setExclusiveSelection(exclusiveSelection.filter((id) => id !== optionId))
    } else {
      if (option.excludes) {
        const conflictOption = option.excludes.find((id) =>
          exclusiveSelection.includes(id)
        )
        if (conflictOption) {
          const conflictName = sampleOptionData.depth2Options.find(
            (opt) => opt.id === conflictOption
          )?.name
          alert(
            `"${conflictName}"와 함께 선택할 수 없습니다. 먼저 해당 옵션을 해제하세요.`
          )
          return
        }
      }
      setExclusiveSelection([...exclusiveSelection, optionId])
    }
  }

  const exclusiveOptions = sampleOptionData.depth2Options.filter(
    (opt) => opt.excludes
  )

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          배타적 선택 로직
        </h2>

        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="font-semibold text-purple-900 mb-1">
            🔀 배타적 선택 (Exclusion)
          </p>
          <p className="text-sm text-purple-800">
            특정 옵션들은 서로 함께 선택할 수 없습니다. 예: 냉장고장 ↔
            김치냉장고장
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 border-2 border-purple-200 rounded-xl bg-purple-50/30">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              냉장고장 선택 (둘 중 하나만 선택 가능)
            </h3>
            <div className="space-y-2">
              {exclusiveOptions.map((option) => {
                const isSelected = exclusiveSelection.includes(option.id)
                const isBlocked = option.excludes?.some((id) =>
                  exclusiveSelection.includes(id)
                )

                return (
                  <div
                    key={option.id}
                    onClick={() =>
                      !isBlocked && handleExclusiveToggle(option.id)
                    }
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : isBlocked
                        ? 'border-red-300 bg-red-50 opacity-60 cursor-not-allowed'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isSelected}
                          disabled={isBlocked}
                          className="h-5 w-5"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            {option.name}
                          </p>
                          {isBlocked && (
                            <p className="text-xs text-red-600 mt-1">
                              ⚠️ 다른 옵션과 함께 선택 불가
                            </p>
                          )}
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
          </div>
        </div>

        {exclusiveSelection.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">✓ 현재 선택</p>
            <div className="flex flex-wrap gap-2">
              {exclusiveSelection.map((id) => {
                const option = sampleOptionData.depth2Options.find(
                  (opt) => opt.id === id
                )
                return (
                  <Badge key={id} variant="default" className="px-3 py-1">
                    {option?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
