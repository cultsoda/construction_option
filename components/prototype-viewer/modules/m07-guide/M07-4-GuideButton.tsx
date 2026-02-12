import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { HelpCircle, X } from 'lucide-react'

interface M07_4_GuideButtonProps {
  deviceView: DeviceView
}

const dummyOptions = [
  { id: 1, name: '주방 가구장', desc: '주방의 수납 공간을 확장하는 옵션입니다.' },
  { id: 2, name: '시스템 에어컨', desc: '천장형 에어컨을 설치하여 공간 활용도를 높입니다.' },
  { id: 3, name: '현관 중문', desc: '소음 차단 및 단열 효과가 뛰어난 3연동 중문입니다.' },
]

export function M07_4_GuideButton({
  deviceView,
}: M07_4_GuideButtonProps) {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 bg-slate-50 relative" onClick={() => setActiveTooltip(null)}>
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-bold text-foreground mb-2">
            가이드 버튼
          </h2>
          <p className="text-sm text-muted-foreground">
            각 옵션 옆의 도움말 버튼을 눌러 상세 설명을 확인해보세요.
          </p>
        </div>

        {/* 메인 컨텐츠 (옵션 리스트) */}
        <div className="flex-1 space-y-4">
          {dummyOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-4 bg-white border border-border rounded-xl flex items-center justify-between shadow-sm relative transition-all duration-200 ${
                activeTooltip === option.id ? 'z-20 border-primary/50' : 'z-0'
              }`}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
            >
              <span className="font-medium text-slate-700">{option.name}</span>
              
              {/* 도움말 아이콘 (항상 표시) */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveTooltip(activeTooltip === option.id ? null : option.id)
                  }}
                  className={`p-2 rounded-full transition-all duration-200 hover:bg-slate-100 ${
                    activeTooltip === option.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                </button>

                {/* 툴팁 (활성화 시 표시) - z-index 높임 */}
                {activeTooltip === option.id && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl z-50 animate-in zoom-in-95 slide-in-from-top-2 origin-top-right">
                    <div className="absolute top-[-6px] right-3 w-3 h-3 bg-slate-800 rotate-45" />
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-sm text-white">{option.name}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTooltip(null)
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-slate-300 leading-snug">{option.desc}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  )
}

