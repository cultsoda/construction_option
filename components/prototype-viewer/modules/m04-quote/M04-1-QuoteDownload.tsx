/**
 * M04-1, M04-3: 견적서 확인 및 다운로드
 * 선택한 옵션의 견적서를 확인하고 다운로드
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

interface M04_1_QuoteDownloadProps {
  deviceView: DeviceView
  selectedOptions?: OptionSummary[]
  conditions?: {
    showImages?: boolean
    groupByCategory?: boolean
    showPrice?: boolean
  }
}

export function M04_1_QuoteDownload({
  deviceView,
  selectedOptions = [
    { name: '프리미엄 가구 패키지', category: '가구', price: 5000000 },
    { name: '시스템에어컨 - 전체', category: '냉난방', price: 2000000 },
    { name: '침실 붙박이장 - 3개실', category: '수납', price: 3000000 },
  ],
  conditions = {
    showImages: true,
    groupByCategory: true,
    showPrice: true,
  },
}: M04_1_QuoteDownloadProps) {
  // 카테고리별 그룹핑
  const groupedOptions = React.useMemo(() => {
    if (!conditions.groupByCategory) {
      return { '전체': selectedOptions }
    }

    return selectedOptions.reduce((acc, option) => {
      const category = option.category || '기타'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(option)
      return acc
    }, {} as Record<string, OptionSummary[]>)
  }, [selectedOptions, conditions.groupByCategory])

  // 총 금액 계산
  const totalPrice = selectedOptions.reduce((sum, option) => sum + option.price, 0)
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">
              견적서 확인
            </h2>
            <button className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 옵션 목록과 총 금액을 확인할 수 있는 견적서 화면입니다
          </p>
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

          {Object.entries(groupedOptions).map(([category, options]) => (
            <div key={category} className="space-y-3">
              {conditions.groupByCategory && (
                <div className="flex items-center gap-2 mt-4 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {options.length}개 항목
                  </span>
                </div>
              )}

              {options.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-border/50"
                >
                  <span className="text-sm text-foreground">{item.name}</span>
                  {conditions.showPrice && (
                    <span className="text-sm font-semibold text-primary">
                      +{(item.price / 10000).toLocaleString()}만원
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}

          {selectedOptions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              선택한 옵션이 없습니다.
            </div>
          )}
        </div>

        {conditions.showPrice && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-foreground">
                합계
              </span>
              <span className="text-2xl font-bold text-primary">
                {(totalPrice / 10000).toLocaleString()}만원
              </span>
            </div>
          </div>
        )}

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
