/**
 * M06-4: 타입 정보 표시
 * 화면 내 평형/타입 정보 표시 위치를 설정하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Layout, X } from 'lucide-react'

interface M06_4_TypeInfoProps {
  deviceView: DeviceView
  m06_4_typePos: string
  setM06_4_typePos: (pos: string) => void
}

export function M06_4_TypeInfo({
  deviceView,
  m06_4_typePos,
  setM06_4_typePos
}: M06_4_TypeInfoProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 bg-slate-100">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            타입 정보 표시
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 평형/타입 정보를 화면의 원하는 위치에 표시할 수 있습니다
          </p>
        </div>

        {/* 위치 선택 */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-lg border shadow-sm">
          {[
            { id: "top", name: "상단 고정", icon: Layout },
            { id: "sidebar", name: "사이드바", icon: Layout },
            { id: "none", name: "표시 안함", icon: X },
          ].map((pos) => {
            const Icon = pos.icon;
            return (
              <button
                key={pos.id}
                onClick={() => setM06_4_typePos(pos.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  m06_4_typePos === pos.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {pos.name}
              </button>
            );
          })}
        </div>

        {/* 레이아웃 시뮬레이션 */}
        <div className="flex-1 bg-white border border-slate-300 rounded-xl overflow-hidden flex flex-col relative shadow-md">
          {/* 상단바 */}
          <div className="h-12 bg-slate-800 flex items-center justify-between px-4 text-white">
            <span className="font-bold">LOGO</span>
            {m06_4_typePos === "top" && (
              <div className="bg-white/20 px-3 py-1 rounded text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <span className="font-bold">84A Type</span>
                <span className="w-px h-3 bg-white/30" />
                <span>101-1001</span>
              </div>
            )}
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>

          <div className="flex-1 flex">
            {/* 사이드바 */}
            {m06_4_typePos === "sidebar" && (
              <div className="w-32 bg-slate-50 border-r border-slate-200 p-4 animate-in slide-in-from-left-10">
                <div className="mb-4 p-2 bg-white border rounded shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Contract Info
                  </p>
                  <p className="font-bold text-slate-900">84A Type</p>
                  <p className="text-xs text-slate-700">101-1001</p>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-20 bg-slate-200 rounded" />
                  <div className="h-2 w-16 bg-slate-200 rounded" />
                  <div className="h-2 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            )}

            {/* 메인 컨텐츠 */}
            <div className="flex-1 p-6 bg-white relative">
              <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300">
                Content Area
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                <div className="h-4 w-1/2 bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
