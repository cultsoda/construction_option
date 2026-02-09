/**
 * M03-2: 위치 버튼 네비게이션
 * 공간별 버튼 네비게이션 (거실, 주방, 침실 등)
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface SpaceData {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface M03_2_SpaceNavProps {
  deviceView: DeviceView
  m03_2_currentSpace: string
  setM03_2_currentSpace: (id: string) => void
  sampleSpaceData: SpaceData[]
}

export function M03_2_SpaceNav({
  deviceView,
  m03_2_currentSpace,
  setM03_2_currentSpace,
  sampleSpaceData,
}: M03_2_SpaceNavProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            위치 버튼 네비게이션
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 공간별 버튼을 클릭하여 3D 뷰어에서 해당 위치로 이동할 수 있습니다
          </p>
        </div>

        {/* 공간 버튼 그리드 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {sampleSpaceData.map((space) => {
            const Icon = space.icon
            const isActive = m03_2_currentSpace === space.id
            return (
              <button
                key={space.id}
                onClick={() => setM03_2_currentSpace(space.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{space.name}</span>
              </button>
            )
          })}
        </div>

        {/* 선택된 공간 정보 */}
        <div className="flex-1 bg-muted/20 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground mb-2">
              {
                sampleSpaceData.find((s) => s.id === m03_2_currentSpace)
                  ?.name
              }
            </p>
            <p className="text-muted-foreground">
              3D 뷰어가 이 위치로 이동합니다
            </p>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
