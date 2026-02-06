/**
 * M02-10: 마이너스 옵션 UI
 * 가격이 음수인 옵션 (기본 품목 제외 시 할인)
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_10_MinusOptionProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  minusSelection: string[]
  setMinusSelection: (ids: string[]) => void
}

export function M02_10_MinusOption({
  deviceView,
  sampleOptionData,
  minusSelection,
  setMinusSelection,
}: M02_10_MinusOptionProps) {
  const minusOptions = sampleOptionData.depth2Options.filter(
    (opt) => opt.price < 0
  )
  const plusOptions = sampleOptionData.depth2Options
    .filter((opt) => opt.price >= 0)
    .slice(0, 3)

  const calculateTotal = () => {
    let total = 0
    minusSelection.forEach((id) => {
      const option = sampleOptionData.depth2Options.find((opt) => opt.id === id)
      if (option) total += option.price
    })
    return total
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          마이너스 옵션 UI
        </h2>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="font-semibold text-red-900 mb-1">💸 마이너스 옵션</p>
          <p className="text-sm text-red-800">
            기본 제공되는 품목을 제외하고 가격을 차감받을 수 있습니다.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">추가 옵션</h3>
          <div className="space-y-2">
            {plusOptions.map((option) => {
              const isSelected = minusSelection.includes(option.id)
              return (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-lg ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {option.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      +{(option.price / 10000).toLocaleString()}만원
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-red-600">
            차감 옵션 (제외 시 할인)
          </h3>
          <div className="space-y-2">
            {minusOptions.map((option) => {
              const isSelected = minusSelection.includes(option.id)
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    if (isSelected) {
                      setMinusSelection(
                        minusSelection.filter((id) => id !== option.id)
                      )
                    } else {
                      setMinusSelection([...minusSelection, option.id])
                    }
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-red-500 bg-red-50'
                      : 'border-red-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isSelected} className="h-5 w-5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            마이너스
                          </Badge>
                          <span className="font-semibold text-foreground">
                            {option.name}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      {(option.price / 10000).toLocaleString()}만원
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {minusSelection.length > 0 && (
          <div className="mt-auto pt-6 border-t-2 border-border">
            <div className="p-5 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    차감 총액
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    {minusSelection.length}개 품목 제외
                  </p>
                </div>
                <div className="text-3xl font-bold text-red-600">
                  {(calculateTotal() / 10000).toLocaleString()}만원
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
