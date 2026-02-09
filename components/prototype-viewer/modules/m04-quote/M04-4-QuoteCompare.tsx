/**
 * M04-4: 비교 견적 (견적서 내 옵션 수정)
 * 견적서에서 옵션을 직접 수정할 수 있는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { RefreshCw, FileText, Check } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface QuoteOption {
  name: string
  category: string
  price: number
  id?: string
}

interface M04_4_QuoteCompareProps {
  deviceView: DeviceView
  m04_4_quoteOptions: QuoteOption[]
  setM04_4_quoteOptions: (options: QuoteOption[]) => void
  m04_4_isEditing: boolean
  setM04_4_isEditing: (editing: boolean) => void
}

const replacementOptions = [
  { id: 'opt-a', name: '고급형 바닥재', price: 1000000, category: '마감재' },
  { id: 'opt-b', name: '기본형 바닥재', price: 0, category: '마감재' },
  { id: 'opt-c', name: '강화유리 파티션', price: 500000, category: '욕실' },
  { id: 'opt-d', name: '거실 확장 (변경)', price: 6000000, category: '1Depth' },
  { id: 'opt-e', name: '주방 가구장 (변경)', price: 2500000, category: '주방' },
]

export function M04_4_QuoteCompare({
  deviceView,
  m04_4_quoteOptions: initialQuoteOptions,
  setM04_4_quoteOptions: setInitialQuoteOptions,
}: M04_4_QuoteCompareProps) {
  // 로컬 상태로 편집 중인 옵션 관리
  const [editingOptions, setEditingOptions] = useState<QuoteOption[]>(initialQuoteOptions)
  const [isEditingMode, setIsEditingMode] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  const handleEditClick = (index: number) => {
    setIsEditingMode(true)
    setEditingIndex(index)
  }

  const handleSaveEdit = () => {
    setInitialQuoteOptions(editingOptions)
    setIsEditingMode(false)
    setEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setEditingOptions(initialQuoteOptions)
    setIsEditingMode(false)
    setEditingIndex(null)
  }

  const handleChangeOption = (index: number, newOptionId: string) => {
    const newOptions = [...editingOptions]
    const selectedReplacement = replacementOptions.find(opt => opt.id === newOptionId)

    if (selectedReplacement) {
      newOptions[index] = {
        name: selectedReplacement.name,
        category: selectedReplacement.category,
        price: selectedReplacement.price,
        id: selectedReplacement.id
      }
      setEditingOptions(newOptions)
    }
  }

  const currentTotal = editingOptions.reduce((acc, cur) => acc + cur.price, 0)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            견적서 내 옵션 수정
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 견적서 화면에서 직접 옵션을 변경하고 수정할 수 있습니다
          </p>
        </div>

        <div className="flex-1 bg-white border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="border-b-2 border-border pb-4 mb-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">최종 견적서</h3>
            <span className="text-sm text-muted-foreground">
              No. 2024-001
            </span>
          </div>

          <div className="space-y-4">
            {editingOptions.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-dashed border-border/50"
              >
                <div>
                  {isEditingMode && editingIndex === i ? (
                    <Select
                      value={item.id || ''}
                      onValueChange={(newOptionId) => handleChangeOption(i, newOptionId)}
                    >
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="옵션 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {replacementOptions.map(opt => (
                          <SelectItem key={opt.id} value={opt.id}>
                            {opt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    {(item.price / 10000).toLocaleString()}만원
                  </span>
                  {isEditingMode && editingIndex === i ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="p-1 hover:bg-muted rounded text-green-600"
                      title="선택 완료"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(i)}
                      className={`p-1 hover:bg-muted rounded ${isEditingMode ? 'text-muted-foreground cursor-not-allowed' : 'text-primary'}`}
                      title="옵션 수정"
                      disabled={isEditingMode}
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t-2 border-border flex justify-between items-center">
            <span className="font-bold text-lg">최종 합계</span>
            <span className="font-bold text-2xl text-primary">
              {(currentTotal / 10000).toLocaleString()}
              만원
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleCancelEdit}
            className="flex-1 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors"
            disabled={!isEditingMode && editingOptions === initialQuoteOptions}
          >
            수정 취소
          </button>
          <button
            onClick={handleSaveEdit}
            className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            disabled={!isEditingMode && editingOptions === initialQuoteOptions}
          >
            수정 완료
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}