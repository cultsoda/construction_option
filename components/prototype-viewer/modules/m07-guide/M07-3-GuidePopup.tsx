/**
 * M07-3: 가이드 팝업
 * 최초 진입 시 보여주는 가이드 팝업 기능
 */

import React, { useState, useEffect } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { HelpCircle, Home, Check, FileText, RefreshCw } from 'lucide-react'

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

  // Auto-open popup on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setM07_3_showPopup(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [setM07_3_showPopup])

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative bg-slate-50 overflow-hidden">
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-bold text-foreground mb-2">
            가이드 팝업
          </h2>
          <p className="text-sm text-muted-foreground">
            최초 접속 시 표시되는 사용 가이드 팝업을 설정합니다.
          </p>
        </div>

        {/* 배경 더미 컨텐츠 (Blurred) */}
        <div className="flex-1 opacity-40 blur-[2px] pointer-events-none select-none">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="h-4 w-1/3 bg-slate-200 rounded mb-3" />
                <div className="flex gap-2">
                  <div className="h-20 w-20 bg-slate-100 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Re-open Button (항상 표시) */}
        <div className="absolute bottom-6 right-6 z-10">
          <Button 
            onClick={() => {
              setM07_3_currentPage(0)
              setM07_3_showPopup(true)
            }}
            className="shadow-lg rounded-full h-12 w-12 p-0"
            title="가이드 다시 보기"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>

        {/* Guide Popup Overlay */}
        {m07_3_showPopup && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-md mx-4 shadow-2xl animate-in zoom-in-95 border-0 ring-1 ring-white/20">
              <CardHeader className="relative pb-2">
                <button
                  onClick={() => setM07_3_showPopup(false)}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1"
                >
                  ✕
                </button>
                <div className="text-center pt-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 transform hover:scale-110">
                    {m07_3_currentPage === 0 && <HelpCircle className="h-8 w-8 text-primary animate-in zoom-in" />}
                    {m07_3_currentPage === 1 && <Home className="h-8 w-8 text-primary animate-in zoom-in" />}
                    {m07_3_currentPage === 2 && <Check className="h-8 w-8 text-primary animate-in zoom-in" />}
                    {m07_3_currentPage === 3 && <FileText className="h-8 w-8 text-primary animate-in zoom-in" />}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {popupPages[m07_3_currentPage].title}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-2 font-normal">
                    Step {m07_3_currentPage + 1} / {popupPages.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center text-slate-600 text-sm leading-relaxed px-4">
                  {popupPages[m07_3_currentPage].content}
                </p>

                {/* Indicators */}
                <div className="flex items-center justify-center gap-2">
                  {popupPages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === m07_3_currentPage
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Checkbox
                      id="dont-show"
                      checked={m07_3_dontShowAgain}
                      onCheckedChange={(checked) =>
                        setM07_3_dontShowAgain(checked as boolean)
                      }
                    />
                    <label htmlFor="dont-show" className="text-slate-500 cursor-pointer select-none">
                      다시 보지 않기
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 h-11"
                      onClick={() => {
                        if (m07_3_currentPage > 0) {
                          setM07_3_currentPage(m07_3_currentPage - 1)
                        } else {
                          setM07_3_showPopup(false)
                        }
                      }}
                    >
                      {m07_3_currentPage === 0 ? "닫기" : "이전"}
                    </Button>
                    <Button
                      className="flex-[2] h-11 bg-primary hover:bg-primary/90"
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
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
