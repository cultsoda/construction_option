/**
 * M02-3: 3Depth 옵션 선택
 * 카테고리 > 세부옵션 > 추가옵션의 3단계 구조
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M02_3_Depth3Props {
  deviceView: DeviceView
  isMobile: boolean
}

export function M02_3_Depth3({ deviceView, isMobile }: M02_3_Depth3Props) {
  const depth = 3

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {depth}Depth 옵션 선택
        </h2>

        <div className="space-y-6 flex-1">
          {/* 1Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              카테고리 선택
            </label>
            <div
              className={`grid ${
                isMobile ? 'grid-cols-1' : 'grid-cols-3'
              } gap-3`}
            >
              {['가구 패키지', '시스템에어컨', '붙박이장'].map((item, i) => (
                <div
                  key={item}
                  className={`h-20 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all ${
                    i === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/20 text-muted-foreground'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 2Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              세부 옵션
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['프리미엄', '스탠다드'].map((item, i) => (
                <div
                  key={item}
                  className={`h-16 rounded-lg border-2 flex items-center justify-center text-sm font-medium ${
                    i === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/20 text-muted-foreground'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 3Depth */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              추가 옵션
            </label>
            <div className="space-y-2">
              {['옵션 A', '옵션 B', '옵션 C'].map((item, i) => (
                <div
                  key={item}
                  className={`h-12 rounded-lg border-2 px-4 flex items-center text-sm font-medium ${
                    i === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/20 text-muted-foreground'
                  }`}
                >
                  <div className="w-5 h-5 rounded border-2 border-current mr-3"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
