/**
 * M01-3: 고객 정보 입력
 * 간단한 고객 정보 입력 화면 (검증 기능 없음)
 */

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M01_3_UserInfoProps {
  deviceView: DeviceView
}

export function M01_3_UserInfo({ deviceView }: M01_3_UserInfoProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="text-center mb-8 mt-4">
          <div className="w-20 h-20 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">LOGO</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            옵션 선택을 위한 정보 입력
          </h2>
          <p className="text-sm text-muted-foreground">
            고객 정보를 입력해주세요
          </p>
        </div>

        <div className="space-y-4 w-full max-w-md mx-auto flex-1">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              이름 *
            </label>
            <div className="h-12 border-2 border-border rounded-lg bg-muted/20"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              전화번호 *
            </label>
            <div className="h-12 border-2 border-border rounded-lg bg-muted/20"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              타입 *
            </label>
            <div className="h-12 border-2 border-border rounded-lg bg-muted/20 flex items-center justify-end px-3">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              동/호수 *
            </label>
            <div className="h-12 border-2 border-border rounded-lg bg-muted/20"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              계약번호
            </label>
            <div className="h-12 border-2 border-border rounded-lg bg-muted/20"></div>
          </div>

          <div className="pt-6 pb-8">
            <div className="h-14 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
              <span className="text-white font-semibold text-lg">
                입력 완료
              </span>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
