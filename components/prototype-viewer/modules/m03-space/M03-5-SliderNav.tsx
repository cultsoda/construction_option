/**
 * M03-5: 슬라이더 네비게이션 (구조물 동적 교체)
 * 평면 타입별 구조물을 동적으로 교체하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'

interface StructureType {
  id: string
  name: string
  description: string
  model: string
}

interface M03_5_SliderNavProps {
  deviceView: DeviceView
  m03_5_structureType: string
  setM03_5_structureType: (type: string) => void
  structureTypes: StructureType[]
}

export function M03_5_SliderNav({
  deviceView,
  m03_5_structureType,
  setM03_5_structureType,
  structureTypes,
}: M03_5_SliderNavProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          구조물 동적 교체
        </h2>

        {/* 구조물 선택 */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {structureTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setM03_5_structureType(type.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                m03_5_structureType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{type.name}</span>
                {m03_5_structureType === type.id && <Badge>적용중</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">
                {type.description}
              </p>
            </button>
          ))}
        </div>

        {/* 뷰어 시뮬레이션 */}
        <div className="flex-1 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4 transition-all duration-500 transform hover:scale-110">
              {m03_5_structureType === 'basic'
                ? '🏠'
                : m03_5_structureType === 'expanded'
                ? '🏰'
                : '🏢'}
            </div>
            <p className="font-mono text-sm opacity-70">
              Loading model:{' '}
              {
                structureTypes.find((t) => t.id === m03_5_structureType)
                  ?.model
              }
            </p>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
