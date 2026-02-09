/**
 * M02-7: 옵션별 가격 표시
 * 각 옵션의 가격을 표시하는 UI
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_7_PriceDisplayProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
}

export function M02_7_PriceDisplay({
  deviceView,
  sampleOptionData,
}: M02_7_PriceDisplayProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            옵션별 가격 표시
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 각 옵션의 가격을 명확하게 표시하며, 마이너스 옵션도 구분됩니다
          </p>
        </div>

        <div className="space-y-4">
          {sampleOptionData.depth2Options.map((option) => (
            <div
              key={option.id}
              className="p-5 border-2 border-border rounded-xl hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {option.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {option.category}
                    </Badge>
                  </div>
                  {option.description && (
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>

                <div className="text-right ml-4">
                  <div
                    className={`text-2xl font-bold ${
                      option.price < 0 ? 'text-red-600' : 'text-primary'
                    }`}
                  >
                    {option.price < 0 ? '' : '+'}
                    {(option.price / 10000).toLocaleString()}만원
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">VAT 포함</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <p className="font-semibold text-blue-900 mb-2">💰 가격 표시 형식</p>
          <ul className="text-blue-800 space-y-1 list-disc list-inside">
            <li>
              <strong>추가 비용</strong>: +2,000만원 (파란색)
            </li>
            <li>
              <strong>기본 포함</strong>: 0원 또는 &quot;기본&quot; 표시
            </li>
            <li>
              <strong>마이너스 옵션</strong>: -500만원 (빨간색)
            </li>
          </ul>
        </div>
      </div>
    </DeviceFrame>
  )
}
