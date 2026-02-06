/**
 * M04-4: 비교 견적 (견적서 내 옵션 수정)
 * 견적서에서 옵션을 직접 수정할 수 있는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { RefreshCw, FileText } from 'lucide-react'

interface QuoteOption {
  name: string
  category: string
  price: number
}

interface M04_4_QuoteCompareProps {
  deviceView: DeviceView
  m04_4_quoteOptions: QuoteOption[]
  setM04_4_quoteOptions: (options: QuoteOption[]) => void
  m04_4_isEditing: boolean
  setM04_4_isEditing: (editing: boolean) => void
}

export function M04_4_QuoteCompare({
  deviceView,
  m04_4_quoteOptions,
  setM04_4_quoteOptions,
  m04_4_isEditing,
  setM04_4_isEditing,
}: M04_4_QuoteCompareProps) {
  const handleOptionEdit = (index: number) => {
    setM04_4_isEditing(true)
    // 실제로는 여기서 모달이나 드롭다운을 띄워 변경
    const newOptions = [...m04_4_quoteOptions]
    if (newOptions[index].name.includes('(수정됨)')) {
      newOptions[index].name = newOptions[index].name.replace(
        ' (수정됨)',
        ''
      )
    } else {
      newOptions[index].name += ' (수정됨)'
    }
    setM04_4_quoteOptions(newOptions)
    setTimeout(() => setM04_4_isEditing(false), 500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          견적서 내 옵션 수정
        </h2>

        <div className="flex-1 bg-white border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="border-b-2 border-border pb-4 mb-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">최종 견적서</h3>
            <span className="text-sm text-muted-foreground">
              No. 2024-001
            </span>
          </div>

          <div className="space-y-4">
            {m04_4_quoteOptions.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-dashed border-border/50"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    {(item.price / 10000).toLocaleString()}만원
                  </span>
                  <button
                    onClick={() => handleOptionEdit(i)}
                    className="p-1 hover:bg-muted rounded text-primary"
                    title="옵션 수정"
                  >
                    {m04_4_isEditing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t-2 border-border flex justify-between items-center">
            <span className="font-bold text-lg">최종 합계</span>
            <span className="font-bold text-2xl text-primary">
              {(
                m04_4_quoteOptions.reduce(
                  (acc, cur) => acc + cur.price,
                  0
                ) / 10000
              ).toLocaleString()}
              만원
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors">
            수정 취소
          </button>
          <button className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            수정 완료
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}
