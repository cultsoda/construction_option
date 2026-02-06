/**
 * M04-2: 이메일 전송 (옵션 요약 표시)
 * 선택한 옵션을 요약하여 표시하고 이메일로 전송
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'

interface OptionSummary {
  name: string
  category: string
  price: number
}

interface M04_2_EmailSendProps {
  deviceView: DeviceView
  selectedOptionsSummary: OptionSummary[]
}

export function M04_2_EmailSend({
  deviceView,
  selectedOptionsSummary,
}: M04_2_EmailSendProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          옵션 요약 표시
        </h2>

        <div className="flex-1 space-y-4">
          {selectedOptionsSummary.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border-2 border-border rounded-xl bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {item.name}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">
                  +{(item.price / 10000).toLocaleString()}만원
                </p>
                <button className="text-xs text-red-500 hover:underline">
                  제거
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-slate-900 text-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="opacity-70">
              총 {selectedOptionsSummary.length}개 옵션
            </span>
            <span className="text-2xl font-bold">
              {(
                selectedOptionsSummary.reduce(
                  (acc, cur) => acc + cur.price,
                  0
                ) / 10000
              ).toLocaleString()}
              만원
            </span>
          </div>
          <button className="w-full py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors">
            견적서 보기
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}
