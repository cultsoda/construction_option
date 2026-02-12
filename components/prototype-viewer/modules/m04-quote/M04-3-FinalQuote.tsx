/**
 * M04-3: 최종 견적서 화면
 * 옵션 선택 완료 후 최종적으로 내역을 확인하고 제출하는 화면
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, Download, Check, Printer, ChevronLeft, ArrowRight, AlertCircle } from 'lucide-react'

interface OptionDetail {
  id: string
  category: string
  name: string
  spec: string
  price: number
}

interface M04_3_FinalQuoteProps {
  deviceView: DeviceView
}

// 샘플 데이터
const finalOptions: OptionDetail[] = [
  { id: 'OPT-001', category: '가구', name: '프리미엄 주방 패키지', spec: '엔지니어드 스톤 + 하이브리드 쿡탑', price: 5000000 },
  { id: 'OPT-002', category: '냉난방', name: '시스템 에어컨 (전실)', spec: '거실 + 침실1 + 침실2 + 침실3', price: 4500000 },
  { id: 'OPT-003', category: '수납', name: '안방 붙박이장', spec: '슬라이딩 도어형 (고급)', price: 2000000 },
  { id: 'OPT-004', category: '마감', name: '바닥 타일', spec: '포실린 타일 (거실/주방)', price: 1500000 },
]

export function M04_3_FinalQuote({ deviceView }: M04_3_FinalQuoteProps) {
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const totalPrice = finalOptions.reduce((acc, cur) => acc + cur.price, 0)

  const handleSubmitClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmSubmit = () => {
    setShowConfirm(false)
    setIsSubmitting(true)
    setTimeout(() => {
      alert("최종 견적서가 제출되었습니다. 감사합니다.")
      setIsSubmitting(false)
    }, 1500)
  }

  const handleCancelSubmit = () => {
    setShowConfirm(false)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full bg-slate-50 relative">
        
        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  정말 제출하시겠습니까?
                </h3>
                <p className="text-sm text-slate-500">
                  <span className="text-red-600 font-bold">제출 후에는 수정이 불가능합니다.</span><br/>
                  모든 선택 사항을 확인하셨나요?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelSubmit}
                  className="flex-1 h-11 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 h-11 bg-red-600 rounded-lg font-medium text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  최종 제출
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 상단 헤더: 타이틀 & 유틸리티 버튼 */}
        <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">최종 견적 확인</h2>
            <p className="text-xs text-slate-500">Step 5/5</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 h-8">
              <Printer className="h-3 w-3" />
              <span className="hidden sm:inline">인쇄</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 h-8">
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
          </div>
        </div>

        {/* 메인 컨텐츠: 견적서 문서 스타일 */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* 계약 정보 헤더 */}
            <div className="bg-slate-900 text-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">견적서</h3>
                  <p className="text-slate-400 text-sm">Quote #2024-0523-001</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-white border-white/30 bg-white/10 mb-1">
                    작성일: 2024.05.23
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-700 pt-4">
                <div>
                  <p className="text-slate-400 text-xs mb-1">계약자</p>
                  <p className="font-semibold">홍길동 님</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs mb-1">대상 세대</p>
                  <p className="font-semibold">101동 1001호 (84A)</p>
                </div>
              </div>
            </div>

            {/* 옵션 내역 테이블 */}
            <div className="p-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                선택 품목 내역
              </h4>
              
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 font-medium text-slate-500 w-16 hidden sm:table-cell">No.</th>
                      <th className="px-4 py-3 font-medium text-slate-500">품목명 / 상세스펙</th>
                      <th className="px-4 py-3 font-medium text-slate-500 text-right">공급가액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {finalOptions.map((option, index) => (
                      <tr key={option.id}>
                        <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900">{option.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{option.spec}</div>
                          <Badge variant="secondary" className="mt-1.5 text-[10px] px-1.5 py-0 h-5">
                            {option.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-700 align-top pt-3">
                          {option.price.toLocaleString()}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t font-bold">
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-right">합계 금액 (VAT 포함)</td>
                      <td className="px-4 py-4 text-right text-primary text-lg">
                        {totalPrice.toLocaleString()}원
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* 약관 동의 */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(c) => setAgreed(c as boolean)}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      위 견적 내역을 모두 확인하였으며, 이에 동의합니다.
                    </label>
                    <p className="text-xs text-muted-foreground">
                      * 최종 제출 후에는 옵션 변경이 불가능할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 액션 바 */}
        <div className="bg-white border-t p-4 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button variant="outline" className="flex-1 h-12 text-base">
              <ChevronLeft className="h-4 w-4 mr-2" />
              이전 단계
            </Button>
            <Button 
              className="flex-[2] h-12 text-base bg-primary hover:bg-primary/90"
              disabled={!agreed || isSubmitting}
              onClick={handleSubmitClick}
            >
              {isSubmitting ? (
                "제출 중..."
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  최종 제출하기
                </>
              )}
            </Button>
          </div>
        </div>

      </div>
    </DeviceFrame>
  )
}
