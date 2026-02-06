/**
 * M07-4: 가이드 버튼
 * 언제든지 접근 가능한 가이드 버튼 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { HelpCircle, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface M07_4_GuideButtonProps {
  deviceView: DeviceView
  m07_4_showGuide: boolean
  setM07_4_showGuide: (show: boolean) => void
}

export function M07_4_GuideButton({
  deviceView,
  m07_4_showGuide,
  setM07_4_showGuide
}: M07_4_GuideButtonProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <h2 className="text-xl font-bold text-foreground mb-6">
          가이드 버튼
        </h2>

        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 relative">
          <div className="absolute top-4 right-4">
            <div className="relative">
              <button
                onClick={() => setM07_4_showGuide(!m07_4_showGuide)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  m07_4_showGuide
                    ? "bg-primary text-white rotate-180"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {m07_4_showGuide ? (
                  <X className="h-5 w-5" />
                ) : (
                  <HelpCircle className="h-5 w-5" />
                )}
              </button>

              {/* Tooltip / Guide Content */}
              {m07_4_showGuide && (
                <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-4 animate-in fade-in slide-in-from-top-2 z-20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold shrink-0">
                      TIP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        도움말
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        옵션명 우측의{" "}
                        <Badge
                          variant="outline"
                          className="text-[10px] py-0 px-1 mx-1"
                        >
                          ?
                        </Badge>{" "}
                        아이콘을 클릭하면 상세 정보를 볼 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <button className="text-xs text-primary font-medium hover:underline w-full text-center">
                      자세한 가이드 보기 →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 flex items-center justify-center h-full text-slate-400 text-sm">
            화면 컨텐츠 영역
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
