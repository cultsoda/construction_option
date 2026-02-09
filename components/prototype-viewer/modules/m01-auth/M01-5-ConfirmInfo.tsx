/**
 * M01-5: 입력 정보 확인
 * 입력한 고객 정보를 확인하고 수정할 수 있는 화면
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M01_5_ConfirmInfoProps {
  deviceView: DeviceView
  userInfo: {
    name: string
    phone: string
    type: string
    unit: string
  }
  setIsEditing: (value: boolean) => void
}

export function M01_5_ConfirmInfo({
  deviceView,
  userInfo,
  setIsEditing,
}: M01_5_ConfirmInfoProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            입력 정보 확인
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 입력한 고객 정보를 최종 확인하고 필요시 수정할 수 있습니다
          </p>
        </div>

        {/* 입력된 정보 표시 */}
        <div className="space-y-4 max-w-md mx-auto w-full flex-1">
          <div className="p-4 border-2 border-border rounded-lg bg-muted/20">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">이름</span>
                <p className="font-semibold text-foreground mt-1">
                  {userInfo.name}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">전화번호</span>
                <p className="font-semibold text-foreground mt-1">
                  {userInfo.phone}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">타입</span>
                <p className="font-semibold text-foreground mt-1">
                  {userInfo.type}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">동/호수</span>
                <p className="font-semibold text-foreground mt-1">
                  {userInfo.unit}
                </p>
              </div>
            </div>
          </div>

          {/* 수정 안내 */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
            <p className="font-semibold mb-1">⚠️ 정보 수정 방법</p>
            <p>Q2-4 답변에 따라 수정 방법이 결정됩니다:</p>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              <li>&quot;새로고침&quot;: 페이지를 새로고침하여 재입력</li>
              <li>&quot;수정 버튼&quot;: 아래 수정 버튼 클릭</li>
              <li>&quot;불가&quot;: 수정 불가능</li>
            </ul>
          </div>

          {/* 수정 버튼 (Q2-4에 따라 조건부 표시) */}
          <button
            className="w-full h-12 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            onClick={() => setIsEditing(true)}
          >
            정보 수정하기
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}
