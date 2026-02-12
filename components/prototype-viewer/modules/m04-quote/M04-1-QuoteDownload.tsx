import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { FileText, X, Image as ImageIcon } from 'lucide-react'

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
    { name: '엔지니어드 스톤', category: '주방', price: 1500000 },
    { name: '현관 중문', category: '현관', price: 800000 },
  ],
  conditions = {
    showImages: true,
    groupByCategory: true,
    showPrice: true,
  },
}: M04_1_QuoteDownloadProps) {
  const [isOpen, setIsOpen] = useState(false)

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
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            견적서 팝업
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 버튼을 클릭하여 상세 견적서를 팝업으로 확인합니다
          </p>
        </div>

        {/* 메인 화면: 견적서 보기 버튼 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <p className="text-center text-muted-foreground mb-8">
            선택하신 옵션에 대한<br />상세 견적서를 확인하세요.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full max-w-xs h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="h-5 w-5" />
            견적서 보기
          </button>
        </div>

        {/* 팝업 모달 */}
        {isOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
            <div className="w-full h-[90%] sm:h-[80%] sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
              
              {/* 팝업 헤더 */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold text-lg">상세 견적서</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* 팝업 내용 (스크롤) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* 고객 정보 */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-700">홍길동 님</span>
                    <Badge variant="outline" className="bg-white">계약자</Badge>
                  </div>
                  <p className="text-xs text-slate-500">101동 1001호 (84A타입)</p>
                </div>

                {/* 옵션 목록 */}
                <div className="space-y-4">
                  {Object.entries(groupedOptions).map(([category, options]) => (
                    <div key={category}>
                      {conditions.groupByCategory && (
                        <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-1 h-4 bg-primary rounded-full"/>
                          {category}
                        </h4>
                      )}
                      
                      <div className="space-y-2">
                        {options.map((item, i) => (
                          <div key={i} className="flex gap-3 p-3 border rounded-lg hover:border-primary/30 transition-colors bg-white">
                            {conditions.showImages && (
                              <div className="w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center shrink-0">
                                <ImageIcon className="h-6 w-6 text-slate-300" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              {!conditions.groupByCategory && (
                                <p className="text-xs text-slate-400">{item.category}</p>
                              )}
                              {conditions.showPrice && (
                                <p className="text-sm font-bold text-primary mt-1">
                                  {item.price.toLocaleString()}원
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 팝업 푸터 (총액) */}
              {conditions.showPrice && (
                <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-slate-500">총 합계금액</span>
                    <span className="text-2xl font-bold text-primary">
                      {(totalPrice / 10000).toLocaleString()}
                      <span className="text-sm text-slate-600 font-normal ml-1">만원</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full h-12 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
                  >
                    확인 완료
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
