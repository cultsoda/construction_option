/**
 * M01-6: 사용자 정보 헤더
 * 화면 상단에 고정 표시되는 사용자 정보 헤더
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M01_6_UserHeaderProps {
  deviceView: DeviceView
}

export function M01_6_UserHeader({ deviceView }: M01_6_UserHeaderProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col h-full bg-slate-50">
        {/* 상단 고정 헤더 (강조됨) */}
        <div className="sticky top-0 z-20 bg-white border-b-4 border-primary shadow-lg transition-all duration-500 animate-in slide-in-from-top-4">
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1 rounded-b-lg font-bold shadow-md z-[-1]">
            ⬇️ 고정된 사용자 정보 헤더
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-primary">LOGO</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="default" className="px-3 py-1 bg-slate-800 hover:bg-slate-800">
                  홍길동
                </Badge>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <span className="font-medium text-slate-700">84A타입</span>
                <span className="text-slate-400">|</span>
                <span className="font-medium text-slate-700">101동 1001호</span>
              </div>
            </div>
            <button className="text-xs text-slate-500 hover:text-primary underline decoration-dashed underline-offset-4">
              정보 수정
            </button>
          </div>
        </div>

        {/* 본문 컨텐츠 (흐림 처리) */}
        <div className="flex-1 p-8 overflow-auto relative">
          {/* 오버레이 텍스트 */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="bg-slate-900/80 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md text-sm font-medium animate-bounce">
              ↕️ 스크롤해보세요! 헤더는 고정됩니다.
            </div>
          </div>

          <div className="max-w-2xl mx-auto opacity-40 blur-[1px] select-none grayscale-[30%] transition-all duration-500">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              옵션 선택 화면
            </h2>
            
            {/* 예시 컨텐츠 */}
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-white"
                >
                  <div className="h-6 w-1/3 bg-slate-200 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
