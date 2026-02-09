/**
 * M06-3: 폰트 적용
 * 시스템 폰트를 변경하고 미리보는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Check } from 'lucide-react'

interface M06_3_FontProps {
  deviceView: DeviceView
  m06_3_font: string
  setM06_3_font: (font: string) => void
}

const fontFamilies = [
  { id: 'sans', name: '기본 고딕 (Pretendard)', class: 'font-sans' },
  { id: 'serif', name: '명조체 (Noto Serif)', class: 'font-serif' },
  { id: 'mono', name: '고정폭 (JetBrains Mono)', class: 'font-mono' }
]

export function M06_3_Font({
  deviceView,
  m06_3_font,
  setM06_3_font
}: M06_3_FontProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            폰트 적용
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 시스템에 적용되는 폰트를 변경하고 미리보기로 확인할 수 있습니다
          </p>
        </div>

        {/* 폰트 선택 */}
        <div className="space-y-3 mb-8">
          {fontFamilies.map((font) => (
            <div
              key={font.id}
              onClick={() => setM06_3_font(font.id)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                m06_3_font === font.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">{font.name}</span>
                {m06_3_font === font.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className={`text-lg ${font.class}`}>
                아름다운 주거 공간, 더샵
              </p>
            </div>
          ))}
        </div>

        {/* 미리보기 텍스트 */}
        <div
          className={`flex-1 p-6 bg-slate-50 rounded-xl border border-border ${
            fontFamilies.find((f) => f.id === m06_3_font)?.class
          }`}
        >
          <h3 className="text-2xl font-bold mb-4">Sample Text</h3>
          <p className="leading-relaxed text-slate-700">
            모든 것은 변한다. 하지만 원칙은 변하지 않는다. 우리는 공간의
            가치를 넘어 삶의 가치를 만듭니다. The quick brown fox jumps
            over the lazy dog. 1234567890
          </p>
        </div>
      </div>
    </DeviceFrame>
  )
}
