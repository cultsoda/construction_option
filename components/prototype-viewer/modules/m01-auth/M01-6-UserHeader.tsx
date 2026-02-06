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
      <div className="flex flex-col h-full">
        {/* 상단 고정 헤더 */}
        <div className="sticky top-0 z-10 bg-white border-b-2 border-border shadow-sm">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-primary">LOGO</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Badge variant="secondary" className="px-3 py-1">
                  홍길동
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  84A타입
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  101동 1001호
                </Badge>
              </div>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground underline">
              정보 수정
            </button>
          </div>
        </div>

        {/* 본문 컨텐츠 */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              옵션 선택 화면
            </h2>
            <p className="text-muted-foreground mb-8">
              상단에 입력하신 정보가 항상 표시됩니다.
            </p>

            {/* 예시 컨텐츠 */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-6 border-2 border-border rounded-lg bg-muted/20"
                >
                  <p className="font-semibold text-foreground mb-2">
                    옵션 카테고리 {i}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    옵션 선택 내용이 여기에 표시됩니다.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
