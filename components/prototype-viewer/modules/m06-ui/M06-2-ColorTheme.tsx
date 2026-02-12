/**
 * M06-2: 컬러 테마 설정
 * 시스템 전반의 컬러 테마를 변경하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Bell } from 'lucide-react'

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
        <div className="flex-1 space-y-6 p-6 bg-slate-50 rounded-xl border border-border overflow-y-auto">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Buttons & Badges
          </h3>
          
          <div className="space-y-3">
            <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] hover:brightness-90 text-white transition-all">
              Primary Button
            </Button>
            
            <div className="flex gap-2">
              <Badge className="bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:brightness-90 transition-all cursor-pointer">
                Primary Badge
              </Badge>
              <Badge
                variant="outline"
                className="text-[var(--primary)] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all cursor-pointer"
              >
                Outline Badge
              </Badge>
            </div>
          </div>

          <div className="h-px bg-slate-200 my-4" />

          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Form Elements
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Input Focus</label>
              <Input 
                defaultValue="포커스 시 테두리 색상 확인" 
                className="focus-visible:ring-[var(--primary)] border-slate-300"
              />
            </div>

            <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-slate-200">
              <div 
                className="h-4 w-4 rounded border border-[var(--primary)] bg-[var(--primary)] flex items-center justify-center text-white"
              >
                <Check className="h-3 w-3" />
              </div>
              <label className="text-sm font-medium leading-none">
                체크박스 (Selected)
              </label>
            </div>
          </div>

          <div className="h-px bg-slate-200 my-4" />

          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Navigation & Cards
          </h3>

          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-slate-200/50">
              <TabsTrigger 
                value="tab1" 
                className="data-[state=active]:bg-white data-[state=active]:text-[var(--primary)] data-[state=active]:shadow-sm"
              >
                Active Tab
              </TabsTrigger>
              <TabsTrigger value="tab2">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="p-4 bg-white rounded-lg border-l-4 border-[var(--primary)] shadow-sm flex gap-3">
            <div className="p-2 bg-[var(--primary)]/10 rounded-full h-fit">
              <Bell className="h-4 w-4 text-[var(--primary)]" />
            </div>
            <div>
              <p className="font-bold text-[var(--primary)] text-sm">강조 메시지</p>
              <p className="text-xs text-slate-500 mt-1">
                아이콘과 텍스트 색상이 테마를 따릅니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
