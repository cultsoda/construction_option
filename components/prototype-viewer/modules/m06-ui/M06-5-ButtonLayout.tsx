/**
 * M06-5: 버튼 레이아웃 설정
 * 화면 내 주요 버튼(이전/다음 등)의 배치 방식을 변경하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

interface M06_5_ButtonLayoutProps {
  deviceView: DeviceView
  m06_5_layout: string
  setM06_5_layout: (layout: string) => void
}

const layoutOptions = [
  { id: 'bottom-fixed', name: '하단 고정형', description: '화면 하단에 버튼 고정' },
  { id: 'inline', name: '인라인형', description: '컨텐츠 흐름에 따라 배치' },
  { id: 'floating', name: '플로팅형', description: '우측 하단에 떠있는 버튼' }
]

export function M06_5_ButtonLayout({
  deviceView,
  m06_5_layout,
  setM06_5_layout
}: M06_5_ButtonLayoutProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            버튼 레이아웃 설정
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 주요 버튼(이전/다음 등)의 배치 방식을 선택할 수 있습니다
          </p>
        </div>

        {/* 레이아웃 선택 */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          {layoutOptions.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setM06_5_layout(layout.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                m06_5_layout === layout.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{layout.name}</span>
                {m06_5_layout === layout.id && <Badge>Active</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">
                {layout.description}
              </p>
            </button>
          ))}
        </div>

        {/* 미리보기 화면 */}
        <div className="flex-1 bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden flex flex-col shadow-inner">
          <div className="flex-1 p-4">
            <div className="h-full bg-white rounded-lg border border-slate-200 p-4">
              <div className="h-4 w-1/3 bg-slate-100 rounded mb-2" />
              <div className="h-32 bg-slate-50 rounded mb-4" />
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
            </div>
          </div>

          {/* 버튼 영역 시뮬레이션 */}
          {m06_5_layout === "bottom-fixed" && (
            <div className="p-4 bg-white border-t border-slate-200 flex gap-2 animate-in slide-in-from-bottom-2">
              <button className="flex-1 h-10 border border-slate-300 rounded bg-white text-sm font-medium">
                이전
              </button>
              <button className="flex-1 h-10 bg-slate-900 text-white rounded text-sm font-medium">
                다음 단계
              </button>
            </div>
          )}

          {m06_5_layout === "inline" && (
            <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between animate-in fade-in">
              <button className="px-6 h-10 border border-slate-300 rounded-full bg-white text-sm font-medium shadow-sm">
                ← Prev
              </button>
              <button className="px-6 h-10 bg-slate-900 text-white rounded-full text-sm font-medium shadow-sm">
                Next →
              </button>
            </div>
          )}

          {m06_5_layout === "floating" && (
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center animate-in zoom-in spin-in-12">
              <ArrowRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
