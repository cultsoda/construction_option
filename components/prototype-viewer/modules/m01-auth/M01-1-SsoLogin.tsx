/**
 * M01-1: SSO 로그인
 * 건설사 통합 인증(SSO)을 통한 로그인 화면
 */

import React from 'react'
import { Key } from 'lucide-react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M01_1_SsoLoginProps {
  deviceView: DeviceView
}

export function M01_1_SsoLogin({ deviceView }: M01_1_SsoLoginProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col items-center justify-center min-h-full p-8">
        <div className="text-center max-w-md">
          {/* 로고 */}
          <div className="w-32 h-32 bg-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Key className="h-16 w-16 text-primary" />
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-foreground mb-3">
            옵션 시스템
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            건설사 통합 인증으로 로그인하세요
          </p>

          {/* SSO 로그인 버튼 */}
          <button className="w-full max-w-sm h-14 bg-primary rounded-lg flex items-center justify-center gap-3 text-white font-semibold hover:bg-primary/90 transition-colors mb-4">
            <Key className="h-5 w-5" />
            건설사 SSO 로그인
          </button>

          {/* 안내 메시지 */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-left">
            <p className="font-semibold text-blue-900 mb-1">
              ℹ️ SSO 연동 안내
            </p>
            <ul className="text-blue-800 space-y-1 list-disc list-inside">
              <li>건설사 계정으로 자동 로그인됩니다</li>
              <li>별도의 회원가입이 필요하지 않습니다</li>
              <li>보안 인증은 건설사 시스템을 따릅니다</li>
            </ul>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
