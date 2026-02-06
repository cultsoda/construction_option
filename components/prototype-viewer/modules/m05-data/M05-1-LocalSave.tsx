/**
 * M05-1: 로컬 저장 (구글 시트 연동)
 * 선택 데이터를 구글 시트에 저장하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M05_1_LocalSaveProps {
  deviceView: DeviceView
}

export function M05_1_LocalSave({
  deviceView,
}: M05_1_LocalSaveProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex items-center justify-center h-full p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            구글 시트 연동
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-900 mb-2">
                ✓ 연동 완료
              </p>
              <p className="text-xs text-green-700">
                데이터가 구글 시트에 자동으로 저장됩니다
              </p>
            </div>
            <div className="border-2 border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                시트 정보
              </p>
              <p className="text-xs text-muted-foreground">
                문서명: 옵션_선택_데이터_2024
              </p>
              <p className="text-xs text-muted-foreground">
                마지막 업데이트: 2024-01-15
              </p>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
