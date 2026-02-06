/**
 * M03-4: 드롭다운 네비게이션 (위치 하이라이트 표시)
 * 특정 영역을 선택하면 3D 뷰어에서 하이라이트로 표시
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface SpaceData {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface HighlightArea {
  id: string
  name: string
  space: string
  color: string
}

interface M03_4_DropdownNavProps {
  deviceView: DeviceView
  m03_4_highlightedAreas: string[]
  setM03_4_highlightedAreas: (areas: string[]) => void
  highlightAreas: HighlightArea[]
  sampleSpaceData: SpaceData[]
}

export function M03_4_DropdownNav({
  deviceView,
  m03_4_highlightedAreas,
  setM03_4_highlightedAreas,
  highlightAreas,
  sampleSpaceData,
}: M03_4_DropdownNavProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          위치 하이라이트 표시
        </h2>

        <div className="space-y-6">
          {highlightAreas.map((area) => {
            const isHighlighted = m03_4_highlightedAreas.includes(area.id)
            return (
              <div
                key={area.id}
                className="p-4 border-2 rounded-xl border-border bg-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isHighlighted}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setM03_4_highlightedAreas([
                            ...m03_4_highlightedAreas,
                            area.id,
                          ])
                        } else {
                          setM03_4_highlightedAreas(
                            m03_4_highlightedAreas.filter(
                              (id) => id !== area.id
                            )
                          )
                        }
                      }}
                    />
                    <span className="font-semibold">{area.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {
                      sampleSpaceData.find((s) => s.id === area.space)
                        ?.name
                    }
                  </Badge>
                </div>

                {/* 시각적 표현 */}
                <div
                  className={`h-24 rounded-lg flex items-center justify-center transition-all ${
                    isHighlighted
                      ? `bg-${area.color}-100 border-2 border-${area.color}-500`
                      : 'bg-muted/30 border-2 border-transparent'
                  }`}
                  style={{
                    borderColor: isHighlighted ? area.color : undefined,
                    backgroundColor: isHighlighted
                      ? `var(--${area.color}-100)`
                      : undefined,
                  }}
                >
                  {isHighlighted ? (
                    <span
                      className="font-bold"
                      style={{ color: area.color }}
                    >
                      ✨ 하이라이트 적용됨
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      선택 시 하이라이트 표시
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DeviceFrame>
  )
}
