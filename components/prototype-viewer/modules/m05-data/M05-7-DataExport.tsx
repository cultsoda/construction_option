/**
 * M05-7: 데이터 내보내기 (제출 확인 팝업)
 * 견적서 제출 시 확인 팝업을 표시
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface M05_7_DataExportProps {
  deviceView: DeviceView
  m05_7_showConfirm: boolean
  setM05_7_showConfirm: (show: boolean) => void
  m05_7_isSubmitting: boolean
  setM05_7_isSubmitting: (submitting: boolean) => void
}

export function M05_7_DataExport({
  deviceView,
  m05_7_showConfirm,
  setM05_7_showConfirm,
  m05_7_isSubmitting,
  setM05_7_isSubmitting,
}: M05_7_DataExportProps) {
  const handleConfirmSubmit = () => {
    setM05_7_showConfirm(true)
  }

  const handleFinalSubmit = () => {
    setM05_7_isSubmitting(true)
    setTimeout(() => {
      setM05_7_isSubmitting(false)
      setM05_7_showConfirm(false)
      alert('제출이 완료되었습니다.')
    }, 2000)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            제출 확인 팝업
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 견적서 제출 시 최종 확인 팝업을 표시하여 실수를 방지합니다
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleConfirmSubmit}
            className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:bg-primary/90 hover:scale-105 transition-all"
          >
            견적서 제출하기
          </button>
        </div>

        {/* Confirmation Popup Overlay */}
        {m05_7_showConfirm && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  정말 제출하시겠습니까?
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  제출 후에는 옵션을 수정할 수 없습니다.
                  <br />
                  입력하신 내용을 다시 한번 확인해주세요.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left text-sm border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500">선택 옵션</span>
                    <span className="font-bold">4개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">총 금액</span>
                    <span className="font-bold text-primary">
                      830만원
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setM05_7_showConfirm(false)}
                    disabled={m05_7_isSubmitting}
                    className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={m05_7_isSubmitting}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {m05_7_isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        처리중
                      </>
                    ) : (
                      '확인'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
