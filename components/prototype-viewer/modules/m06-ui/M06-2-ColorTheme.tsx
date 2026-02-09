/**
 * M06-2: 컬러 테마 설정
 * 시스템 전반의 컬러 테마를 변경하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface M06_2_ColorThemeProps {
  deviceView: DeviceView
  m06_2_color: string
  setM06_2_color: (color: string) => void
}

const themeColors = [
  { id: 'blue', name: '블루', color: '#2563EB' },
  { id: 'green', name: '그린', color: '#16A34A' },
  { id: 'purple', name: '퍼플', color: '#9333EA' },
  { id: 'orange', name: '오렌지', color: '#EA580C' }
]

export function M06_2_ColorTheme({
  deviceView,
  m06_2_color,
  setM06_2_color
}: M06_2_ColorThemeProps) {
  const currentColor = themeColors.find(c => c.id === m06_2_color)?.color

  return (
    <DeviceFrame deviceView={deviceView}>
      <div
        className="flex flex-col min-h-full p-6"
        style={{
          // @ts-ignore
          "--primary": currentColor,
        }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            컬러 테마 설정
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 시스템 전반의 컬러 테마를 변경하여 브랜드 아이덴티티를 적용합니다
          </p>
        </div>

        {/* 테마 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {themeColors.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setM06_2_color(theme.id)}
              className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${
                m06_2_color === theme.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full shadow-sm"
                style={{ backgroundColor: theme.color }}
              />
              <span className="text-sm font-medium">{theme.name}</span>
            </button>
          ))}
        </div>

        {/* 미리보기 컴포넌트들 */}
        <div className="flex-1 space-y-6 p-6 bg-slate-50 rounded-xl border border-border">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Preview
          </h3>

          <Button className="w-full bg-[var(--primary)] hover:opacity-90 text-white">
            Primary Button
          </Button>

          <div className="flex gap-2">
            <Badge className="bg-[var(--primary)] text-white">
              Badge
            </Badge>
            <Badge
              variant="outline"
              className="text-[var(--primary)] border-[var(--primary)]"
            >
              Outline
            </Badge>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
            <p className="font-bold text-[var(--primary)]">강조 텍스트</p>
            <p className="text-sm text-slate-600">
              테마 색상이 적용된 컴포넌트 예시입니다.
            </p>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
