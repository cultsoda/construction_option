/**
 * M04-1, M04-3: 견적서 확인 및 다운로드
 * 선택한 옵션의 견적서를 확인하고 다운로드
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M04_1_QuoteDownloadProps {
  deviceView: DeviceView
}

export function M04_1_QuoteDownload({
  deviceView,
}: M04_1_QuoteDownloadProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            견적서 확인
          </h2>
          <button className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="mb-6 pb-4 border-b">
          <p className="text-sm text-muted-foreground">
            84A타입 | 101동 1001호
          </p>
        </div>

        <div className="space-y-4 mb-6 flex-1">
          <p className="text-sm font-semibold text-foreground mb-3">
            [선택한 옵션]
          </p>

          {[
            { name: '프리미엄 가구 패키지', price: '+5,000,000원' },
            { name: '시스템에어컨 - 전체', price: '+2,000,000원' },
            { name: '침실 붙박이장 - 3개실', price: '+3,000,000원' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-border/50"
            >
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-sm font-semibold text-primary">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">
              합계
            </span>
            <span className="text-2xl font-bold text-primary">
              18,640,000원
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-4">
          <div className="h-12 border-2 border-border rounded-lg flex items-center justify-center text-sm font-semibold text-foreground">
            옵션 수정
          </div>
          <div className="h-12 bg-primary rounded-lg flex items-center justify-center text-sm font-semibold text-white">
            견적 확인하기
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
