/**
 * M07-3: 가이드 팝업
 * 최초 진입 시 보여주는 가이드 팝업 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { HelpCircle, Home, Check, FileText } from 'lucide-react'

interface M07_3_GuidePopupProps {
  deviceView: DeviceView
  m07_3_showPopup: boolean
  setM07_3_showPopup: (show: boolean) => void
}

const popupPages = [
  { title: '환영합니다', content: '옵션 선택 시스템에 오신 것을 환영합니다.' },
  { title: '타입 선택', content: '원하시는 주택 타입을 선택해주세요.' },
  { title: '옵션 선택', content: '라이프스타일에 맞는 옵션을 골라보세요.' },
  { title: '계약 진행', content: '선택한 옵션으로 계약을 진행합니다.' }
]

export function M07_3_GuidePopup({
  deviceView,
  m07_3_showPopup,
  setM07_3_showPopup
}: M07_3_GuidePopupProps) {
  const [m07_3_currentPage, setM07_3_currentPage] = useState(0)
  const [m07_3_dontShowAgain, setM07_3_dontShowAgain] = useState(false)

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <h2 className="text-xl font-bold text-foreground mb-6">
          가이드 팝업
        </h2>

        <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          메인 화면 컨텐츠가 여기에 표시됩니다.
        </div>

        {/* Guide Popup Overlay */}
        {m07_3_showPopup ? (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-md mx-4 shadow-2xl animate-in zoom-in-95">
              <CardHeader className="relative pb-2">
                <button
                  onClick={() => setM07_3_showPopup(false)}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    {m07_3_currentPage + 1} / {popupPages.length}
                  </Badge>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    {m07_3_currentPage === 0 && (
                      <HelpCircle className="h-8 w-8 text-primary" />
                    )}
                    {m07_3_currentPage === 1 && (
                      <Home className="h-8 w-8 text-primary" />
                    )}
                    {m07_3_currentPage === 2 && (
                      <Check className="h-8 w-8 text-primary" />
                    )}
                    {m07_3_currentPage === 3 && (
                      <FileText className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    {popupPages[m07_3_currentPage].title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  {popupPages[m07_3_currentPage].content}
                </p>

                <div className="flex items-center justify-center gap-2 py-2">
                  {popupPages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === m07_3_currentPage
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={m07_3_dontShowAgain}
                    onCheckedChange={(checked) =>
                      setM07_3_dontShowAgain(checked as boolean)
                    }
                  />
                  <label className="text-muted-foreground">
                    다시 보지 않기
                  </label>
                </div>

                <div className="flex gap-2">
                  {m07_3_currentPage > 0 && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        setM07_3_currentPage(m07_3_currentPage - 1)
                      }
                    >
                      이전
                    </Button>
                  )}
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (m07_3_currentPage < popupPages.length - 1) {
                        setM07_3_currentPage(m07_3_currentPage + 1);
                      } else {
                        setM07_3_showPopup(false);
                        setM07_3_currentPage(0);
                      }
                    }}
                  >
                    {m07_3_currentPage < popupPages.length - 1
                      ? "다음"
                      : "시작하기"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <button
            onClick={() => setM07_3_showPopup(true)}
            className="absolute bottom-6 right-6 px-4 py-2 bg-slate-800 text-white rounded-full text-sm font-medium shadow-lg hover:bg-slate-700 transition-all"
          >
            팝업 다시 보기
          </button>
        )}
      </div>
    </DeviceFrame>
  )
}
