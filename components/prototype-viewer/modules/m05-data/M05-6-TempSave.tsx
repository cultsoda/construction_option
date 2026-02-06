/**
 * M05-6: 임시 저장 (제출 이력 관리)
 * 제출한 견적서 이력을 조회하고 관리
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { FileText, Clock, ChevronRight } from 'lucide-react'

interface HistoryItem {
  id: string
  status: string
  total: number
  date: string
}

interface M05_6_TempSaveProps {
  deviceView: DeviceView
  m05_6_history: HistoryItem[]
}

export function M05_6_TempSave({
  deviceView,
  m05_6_history,
}: M05_6_TempSaveProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          제출 이력 관리
        </h2>

        <div className="flex-1">
          {/* 필터 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold whitespace-nowrap">
              전체
            </button>
            <button className="px-4 py-2 bg-white border border-border text-slate-600 rounded-full text-xs font-medium whitespace-nowrap hover:bg-slate-50">
              이번주
            </button>
            <button className="px-4 py-2 bg-white border border-border text-slate-600 rounded-full text-xs font-medium whitespace-nowrap hover:bg-slate-50">
              제출완료
            </button>
            <button className="px-4 py-2 bg-white border border-border text-slate-600 rounded-full text-xs font-medium whitespace-nowrap hover:bg-slate-50">
              임시저장
            </button>
          </div>

          {/* 이력 리스트 */}
          <div className="space-y-3">
            {m05_6_history.map((item, i) => (
              <div
                key={i}
                className="group p-4 bg-white border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {item.id}
                    </span>
                  </div>
                  <Badge
                    variant={
                      item.status === '제출완료' ? 'default' : 'secondary'
                    }
                    className="text-[10px]"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      총 견적 금액
                    </p>
                    <p className="font-bold text-lg">
                      {(item.total / 10000).toLocaleString()}만원
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-border flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    상세보기 <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex justify-center gap-2">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                p === 1
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent hover:bg-slate-100 text-slate-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </DeviceFrame>
  )
}
