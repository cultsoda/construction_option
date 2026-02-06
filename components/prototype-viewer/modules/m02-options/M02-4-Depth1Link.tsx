/**
 * M02-4: 1Depth 연동 로직
 * 1Depth 선택에 따라 2Depth 옵션이 필터링되는 기능
 */

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_4_Depth1LinkProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  main1Depth: string
  setMain1Depth: (id: string) => void
  dependent2Depth: string[]
  setDependent2Depth: (ids: string[]) => void
}

export function M02_4_Depth1Link({
  deviceView,
  sampleOptionData,
  main1Depth,
  setMain1Depth,
  dependent2Depth,
  setDependent2Depth,
}: M02_4_Depth1LinkProps) {
  const available2DepthOptions = sampleOptionData.depth2Options.filter((opt) => {
    if (opt.parent) {
      return opt.parent === main1Depth
    }
    return true
  })

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          1Depth 연동 로직
        </h2>

        <div className="mb-8">
          <h3 className="text-base font-semibold mb-3">평면 타입 선택</h3>
          <div className="grid grid-cols-3 gap-3">
            {sampleOptionData.depth1Options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setMain1Depth(option.id)
                  setDependent2Depth([])
                }}
                className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                  main1Depth === option.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">
            세부 옵션 ({available2DepthOptions.length}개 사용 가능)
          </h3>
          <div className="space-y-2">
            {available2DepthOptions.map((option) => (
              <div
                key={option.id}
                className={`p-4 border-2 rounded-lg ${
                  dependent2Depth.includes(option.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={dependent2Depth.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDependent2Depth([...dependent2Depth, option.id])
                        } else {
                          setDependent2Depth(
                            dependent2Depth.filter((id) => id !== option.id)
                          )
                        }
                      }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">{option.name}</p>
                      <p className="text-xs text-muted-foreground">{option.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    +{(option.price / 10000).toLocaleString()}만원
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
          <p className="font-semibold text-yellow-900 mb-1">⚙️ 1Depth 연동</p>
          <p className="text-yellow-800">
            &quot;확장형&quot;을 선택하면 &quot;주방 가구장&quot; 옵션이 활성화됩니다. 다른 타입을 선택하면 해당 옵션이 숨겨집니다.
          </p>
        </div>
      </div>
    </DeviceFrame>
  )
}
