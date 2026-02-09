/**
 * M03-3: 탭 네비게이션 (옵션 선택 시 자동 이동)
 * 옵션을 선택하면 해당 공간으로 자동 이동하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Check } from 'lucide-react'

interface SpaceData {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface M03_3_TabNavProps {
  deviceView: DeviceView
  m03_3_selectedOption: string
  setM03_3_selectedOption: (option: string) => void
  m03_3_isMoving: boolean
  setM03_3_isMoving: (moving: boolean) => void
  m03_3_targetSpace: string
  setM03_3_targetSpace: (space: string) => void
  optionSpaceMapping: Record<string, string>
  sampleSpaceData: SpaceData[]
}

export function M03_3_TabNav({
  deviceView,
  m03_3_selectedOption,
  setM03_3_selectedOption,
  m03_3_isMoving,
  setM03_3_isMoving,
  m03_3_targetSpace,
  setM03_3_targetSpace,
  optionSpaceMapping,
  sampleSpaceData,
}: M03_3_TabNavProps) {
  const handleOptionSelect = (optionName: string) => {
    if (m03_3_isMoving) return
    setM03_3_selectedOption(optionName)
    setM03_3_isMoving(true)
    setM03_3_targetSpace(optionSpaceMapping[optionName])

    // 이동 시뮬레이션
    setTimeout(() => {
      setM03_3_isMoving(false)
    }, 1500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            옵션 선택 시 자동 이동
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 옵션을 선택하면 3D 뷰어가 해당 공간으로 자동 이동합니다
          </p>
        </div>

        {/* 옵션 선택 */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-foreground mb-2">
            옵션을 선택해보세요
          </p>
          {Object.keys(optionSpaceMapping).map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                m03_3_selectedOption === option
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{option}</span>
                <Badge variant="outline" className="text-xs">
                  {
                    sampleSpaceData.find(
                      (s) => s.id === optionSpaceMapping[option]
                    )?.name
                  }
                </Badge>
              </div>
            </button>
          ))}
        </div>

        {/* 뷰어 상태 */}
        <div className="flex-1 bg-muted/20 rounded-xl border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
          {m03_3_isMoving ? (
            <div className="text-center animate-pulse">
              <RefreshCw className="h-8 w-8 text-primary mx-auto mb-2 animate-spin" />
              <p className="font-semibold text-primary">
                {
                  sampleSpaceData.find((s) => s.id === m03_3_targetSpace)
                    ?.name
                }
                (으)로 이동 중...
              </p>
            </div>
          ) : m03_3_selectedOption ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">
                {
                  sampleSpaceData.find((s) => s.id === m03_3_targetSpace)
                    ?.name
                }
              </p>
              <p className="text-muted-foreground">위치로 이동 완료</p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              옵션을 선택하면 카메라가 자동으로 이동합니다
            </p>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
