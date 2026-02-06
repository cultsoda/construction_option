/**
 * M05-5: 데이터 초기화 (1회 제출 제한)
 * 1회만 제출 가능한 견적서 제출 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { FileText, Check } from 'lucide-react'

interface M05_5_DataResetProps {
  deviceView: DeviceView
  m05_5_hasSubmitted: boolean
  setM05_5_hasSubmitted: (submitted: boolean) => void
}

export function M05_5_DataReset({
  deviceView,
  m05_5_hasSubmitted,
  setM05_5_hasSubmitted,
}: M05_5_DataResetProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          1회 제출 제한
        </h2>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {m05_5_hasSubmitted ? (
            <div className="animate-in zoom-in-50">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <FileText className="h-10 w-10 text-slate-400" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full border-4 border-white">
                  <Check className="h-5 w-5" strokeWidth={4} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                제출 완료됨
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-6">
                이미 견적서를 제출하셨습니다. <br />
                추가 제출이나 수정은 불가능합니다.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block text-left min-w-[280px]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">제출번호</span>
                  <span className="font-mono font-bold">
                    REQ-2024-001
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">제출시각</span>
                  <span className="font-medium">2024.02.05 15:42</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                견적서 제출
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                최종 견적서를 제출합니다. <br />
                <span className="text-red-500 font-bold">
                  제출 후에는 수정이 불가능
                </span>
                하니 신중하게 결정해주세요.
              </p>
              <button
                onClick={() => setM05_5_hasSubmitted(true)}
                className="w-full max-w-xs h-14 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                최종 제출하기 (1회 한정)
              </button>
            </div>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
