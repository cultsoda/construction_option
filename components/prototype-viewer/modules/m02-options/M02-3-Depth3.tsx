/**
 * M02-3: 3Depth 옵션 선택
 * 카테고리 > 세부옵션 > 추가옵션의 3단계 구조
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Check } from 'lucide-react'

interface M02_3_Depth3Props {
  deviceView: DeviceView
  isMobile: boolean
  conditions: {
    multiSelect: boolean
    depthInfluence: boolean
    [key: string]: any
  }
}

export function M02_3_Depth3({ deviceView, isMobile, conditions }: M02_3_Depth3Props) {
  const [selectedD1, setSelectedD1] = useState<string>('가구 패키지')
  const [selectedD2, setSelectedD2] = useState<string[]>([])
  const [selectedD3, setSelectedD3] = useState<string[]>([])

  const handleD1Click = (value: string) => {
    setSelectedD1(value)
    if (conditions.depthInfluence) {
      setSelectedD2([])
      setSelectedD3([])
    }
  }

  const handleD2Click = (value: string) => {
    if (conditions.multiSelect) {
      setSelectedD2(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      )
    } else {
      setSelectedD2([value])
    }
    if (conditions.depthInfluence) {
      setSelectedD3([]) // 2Depth 변경 시 3Depth 초기화 (옵션)
    }
  }

  const handleD3Click = (value: string) => {
    if (conditions.multiSelect) {
      setSelectedD3(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      )
    } else {
      setSelectedD3([value])
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            3Depth 옵션 선택
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 카테고리 → 세부 옵션 → 추가 옵션의 3단계 구조로 옵션을 선택합니다
          </p>
        </div>

        <div className="space-y-6 flex-1">
          {/* 1Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              카테고리 선택 (1Depth)
            </label>
            <div
              className={`grid ${
                isMobile ? 'grid-cols-1' : 'grid-cols-3'
              } gap-3`}
            >
              {['가구 패키지', '시스템에어컨', '붙박이장'].map((item) => {
                const isSelected = selectedD1 === item
                return (
                  <div
                    key={item}
                    onClick={() => handleD1Click(item)}
                    className={`h-20 rounded-lg border-2 flex items-center justify-center text-sm font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-border bg-white text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 2Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              세부 옵션 (2Depth)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['프리미엄', '스탠다드'].map((item) => {
                const isSelected = selectedD2.includes(item)
                return (
                  <div
                    key={item}
                    onClick={() => handleD2Click(item)}
                    className={`h-16 rounded-lg border-2 flex items-center justify-center text-sm font-medium cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-white text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item}
                    {isSelected && <Check className="absolute top-2 right-2 h-3 w-3 text-primary" />}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              추가 옵션 (3Depth)
            </label>
            <div className="space-y-2">
              {['옵션 A', '옵션 B', '옵션 C'].map((item) => {
                const isSelected = selectedD3.includes(item)
                return (
                  <div
                    key={item}
                    onClick={() => handleD3Click(item)}
                    className={`h-12 rounded-lg border-2 px-4 flex items-center justify-between text-sm font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-white text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                      }`}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      {item}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
