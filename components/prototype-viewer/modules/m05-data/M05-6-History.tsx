/**
 * M05-6: 제출 이력 관리
 * 제출된 견적서 이력을 조회하고 상세 내용을 확인하는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { FileText, Clock, ChevronRight, X, Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HistoryItem {
  id: string
  status: string
  total: number
  date: string
}

interface M05_6_HistoryProps {
  deviceView: DeviceView
  m05_6_history: HistoryItem[]
}

export function M05_6_History({
  deviceView,
  m05_6_history,
}: M05_6_HistoryProps) {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            제출 이력 관리
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 제출 완료된 견적서 이력을 조회합니다. 수정은 불가능합니다.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 이력 리스트 */}
          <div className="space-y-3">
            {m05_6_history.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedItem(item)}
                className="group p-4 bg-white border border-border rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {item.id}
                    </span>
                  </div>
                  <Badge className="bg-slate-800 text-[10px]">
                    제출완료
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

                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상세 보기 모달 */}
        {selectedItem && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm flex flex-col max-h-[90%] animate-in zoom-in-95">
              
              {/* 모달 헤더 */}
              <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-xl">
                <div>
                  <h3 className="font-bold text-slate-900">제출 상세 내역</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedItem.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* 모달 본문 */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* 기본 정보 */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Info</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 block text-xs">제출일시</span>
                      <span className="font-medium">{selectedItem.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">계약자</span>
                      <span className="font-medium">홍길동</span>
                    </div>
                  </div>
                </div>

                {/* 옵션 요약 */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Options</p>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span>가구 패키지 (프리미엄)</span>
                      <span className="text-slate-500">500만원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>시스템 에어컨 (전실)</span>
                      <span className="text-slate-500">200만원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>현관 중문</span>
                      <span className="text-slate-500">80만원</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                      <span>합계</span>
                      <span className="text-primary">{(selectedItem.total / 10000).toLocaleString()}만원</span>
                    </div>
                  </div>
                </div>

                {/* 안내 */}
                <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg flex gap-2 items-start">
                  <div className="mt-0.5">⚠️</div>
                  <p>
                    이미 제출이 완료된 견적서입니다.<br/>
                    내용 수정이 불가능하며, 조회만 가능합니다.
                  </p>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="p-4 border-t flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => alert("인쇄 기능은 준비중입니다.")}>
                  <Printer className="h-4 w-4" />
                  인쇄
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => alert("파일 다운로드가 시작됩니다.")}>
                  <Download className="h-4 w-4" />
                  PDF 저장
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}