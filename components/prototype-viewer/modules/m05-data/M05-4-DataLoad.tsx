/**
 * M05-4: 데이터 불러오기 (N회 제출 허용)
 * 제출 횟수를 관리하고 제출 이력을 표시
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { AlertCircle } from 'lucide-react'

interface M05_4_DataLoadProps {
  deviceView: DeviceView
  m05_4_submitCount: number
  setM05_4_submitCount: (count: number | ((prev: number) => number)) => void
  m05_4_maxSubmits: number
}

export function M05_4_DataLoad({
  deviceView,
  m05_4_submitCount,
  setM05_4_submitCount,
  m05_4_maxSubmits,
}: M05_4_DataLoadProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          N회 제출 허용
        </h2>

        <div className="mb-8 text-center">
          <div className="inline-block p-4 rounded-full bg-slate-100 mb-4 relative">
            <div className="text-4xl font-black text-slate-900 w-16 h-16 flex items-center justify-center">
              {m05_4_submitCount}
            </div>
            <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              Max {m05_4_maxSubmits}
            </div>
          </div>
          <p className="font-medium text-slate-600">현재 제출 횟수</p>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">
            제출 이력
          </h3>
          <div className="space-y-3">
            {Array.from({ length: Math.min(3, m05_4_submitCount) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white border border-border rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
                      #{m05_4_submitCount - i}
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        견적서 제출 완료
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2024.02.0{5 - i} 14:30
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">성공</Badge>
                </div>
              )
            )}
            {m05_4_submitCount === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
                제출 이력이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          {m05_4_submitCount >= m05_4_maxSubmits ? (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3 text-red-800">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                제출 한도를 초과했습니다. (최대 {m05_4_maxSubmits}회)
              </p>
            </div>
          ) : (
            <button
              onClick={() => setM05_4_submitCount((prev) => prev + 1)}
              className="w-full h-14 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
            >
              견적서 제출하기 ({m05_4_maxSubmits - m05_4_submitCount}회
              남음)
            </button>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
