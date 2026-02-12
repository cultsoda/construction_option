/**
 * M04-2: 이메일 전송 (옵션 요약 표시)
 * 선택한 옵션을 요약하여 표시하고 이메일로 전송
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { Trash2, AlertTriangle } from 'lucide-react'

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
  const [options, setOptions] = useState<OptionSummary[]>(selectedOptionsSummary)
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null)

  const handleRemoveClick = (index: number) => {
    setDeleteTargetIndex(index)
  }

  const confirmRemove = () => {
    if (deleteTargetIndex !== null) {
      setOptions(prev => prev.filter((_, i) => i !== deleteTargetIndex))
      setDeleteTargetIndex(null)
    }
  }

  const cancelRemove = () => {
    setDeleteTargetIndex(null)
  }

  const totalPrice = options.reduce((acc, cur) => acc + cur.price, 0)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            옵션 요약 표시
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 옵션 목록을 요약하여 확인하고 개별 항목을 제거할 수 있습니다
          </p>
        </div>

        {/* 삭제 확인 모달 */}
        {deleteTargetIndex !== null && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  옵션을 제거하시겠습니까?
                </h3>
                <p className="text-sm text-slate-500">
                  선택하신 <span className="font-semibold text-slate-700">"{options[deleteTargetIndex].name}"</span> 항목이 목록에서 삭제됩니다.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={cancelRemove}
                  className="flex-1 h-11 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={confirmRemove}
                  className="flex-1 h-11 bg-red-600 rounded-lg font-medium text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  제거하기
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {options.length > 0 ? (
            options.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-2 border-border rounded-xl bg-white hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      {item.name}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-primary text-sm sm:text-base whitespace-nowrap">
                    +{(item.price / 10000).toLocaleString()}만원
                  </p>
                  <button
                    onClick={() => handleRemoveClick(i)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all opacity-100 sm:opacity-0 group-hover:opacity-100"
                    title="옵션 제거"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <p>선택된 옵션이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <div className="p-5 bg-slate-900 text-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="opacity-70 text-sm">
                총 {options.length}개 옵션
              </span>
              <span className="text-2xl font-bold">
                {(totalPrice / 10000).toLocaleString()}
                <span className="text-lg font-normal ml-1">만원</span>
              </span>
            </div>
            <button className="w-full py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors">
              견적서 보기
            </button>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
