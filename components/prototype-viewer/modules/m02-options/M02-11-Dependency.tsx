/**
 * M02-11: 필수 연관 선택 가이드
 * requires 속성을 가진 옵션의 종속 관계
 */

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_11_DependencyProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  depSelection: string[]
  setDepSelection: (ids: string[]) => void
}

export function M02_11_Dependency({
  deviceView,
  sampleOptionData,
  depSelection,
  setDepSelection,
}: M02_11_DependencyProps) {
  const handleDepToggle = (optionId: string) => {
    const allOptions = [
      ...sampleOptionData.depth2Options,
      ...sampleOptionData.depth3Options,
    ]
    const option = allOptions.find((opt) => opt.id === optionId)

    if (!option) return

    const isSelected = depSelection.includes(optionId)
    const optWithReq = option as any

    if (isSelected) {
      const dependentOptions = sampleOptionData.depth3Options
        .filter((opt) => (opt as any).requires?.includes(optionId))
        .map((opt) => opt.id)

      setDepSelection(
        depSelection.filter(
          (id) => id !== optionId && !dependentOptions.includes(id)
        )
      )
    } else {
      if (optWithReq.requires && optWithReq.requires.length > 0) {
        const missingRequired = (optWithReq.requires as string[]).filter(
          (reqId) => !depSelection.includes(reqId)
        )
        if (missingRequired.length > 0) {
          const requiredNames = missingRequired
            .map((id) => {
              const req = sampleOptionData.depth2Options.find((o) => o.id === id)
              return req?.name
            })
            .join(', ')
          alert(`먼저 "${requiredNames}"를 선택해야 합니다.`)
          return
        }
      }
      setDepSelection([...depSelection, optionId])
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            필수 연관 선택 가이드
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 일부 옵션은 다른 옵션을 먼저 선택해야만 선택할 수 있습니다
          </p>
        </div>

        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="font-semibold text-indigo-900 mb-1">
            🔗 필수 연관 (Dependency)
          </p>
          <p className="text-sm text-indigo-800">
            일부 옵션은 다른 옵션을 먼저 선택해야 선택할 수 있습니다.
            <br />
            예: 식기세척기 → 주방 가구장 필수
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">기본 옵션</h3>
          <div className="space-y-2">
            {sampleOptionData.depth2Options.slice(0, 1).map((option) => {
              const isSelected = depSelection.includes(option.id)
              return (
                <div
                  key={option.id}
                  onClick={() => handleDepToggle(option.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isSelected} className="h-5 w-5" />
                      <span className="font-semibold text-foreground">
                        {option.name}
                      </span>
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

        <div>
          <h3 className="text-sm font-semibold mb-3">
            추가 옵션 (기본 옵션 필수)
          </h3>
          <div className="space-y-2">
            {sampleOptionData.depth3Options.map((option) => {
              const isSelected = depSelection.includes(option.id)
              const optWithReq = option as any
              const canSelect =
                !optWithReq.requires ||
                optWithReq.requires.every((reqId: string) =>
                  depSelection.includes(reqId)
                )

              return (
                <div
                  key={option.id}
                  onClick={() => canSelect && handleDepToggle(option.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : !canSelect
                      ? 'border-red-300 bg-red-50 opacity-60 cursor-not-allowed'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isSelected}
                        disabled={!canSelect}
                        className="h-5 w-5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          {optWithReq.requires && (
                            <Badge variant="secondary" className="text-xs">
                              종속
                            </Badge>
                          )}
                          <span className="font-semibold text-foreground">
                            {option.name}
                          </span>
                        </div>
                        {!canSelect && (
                          <p className="text-xs text-red-600 mt-1">
                            ⚠️ 기본 옵션을 먼저 선택하세요
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

        {depSelection.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">✓ 현재 선택</p>
            <div className="flex flex-wrap gap-2">
              {depSelection.map((id) => {
                const allOptions = [
                  ...sampleOptionData.depth2Options,
                  ...sampleOptionData.depth3Options,
                ]
                const option = allOptions.find((opt) => opt.id === id)
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
