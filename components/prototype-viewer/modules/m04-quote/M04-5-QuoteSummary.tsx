/**
 * M04-5: 견적 요약 (다음/이전 버튼)
 * 단계별로 옵션을 선택하며 진행할 수 있는 네비게이션
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { ArrowLeft, ArrowRight, Home, Utensils, Bed, Bath, Layout } from 'lucide-react'

interface OptionCategory {
  id: number
  name: string
  description: string
}

interface M04_5_QuoteSummaryProps {
  deviceView: DeviceView
  m04_5_currentCategory: number
  setM04_5_currentCategory: (index: number) => void
  optionCategories: OptionCategory[]
}

export function M04_5_QuoteSummary({
  deviceView,
  m04_5_currentCategory,
  setM04_5_currentCategory,
  optionCategories,
}: M04_5_QuoteSummaryProps) {
  const contentData = [
    {
      title: "평면 타입 선택",
      description: "원하시는 주거 공간의 레이아웃을 선택하세요.",
      icon: Home,
      content: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">확장형</span>
          </div>
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">기본형</span>
          </div>
        </div>
      )
    },
    {
      title: "주방 옵션 선택",
      description: "주방 가구와 가전 옵션을 선택합니다.",
      icon: Utensils,
      content: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">아일랜드</span>
          </div>
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">식기세척기</span>
          </div>
        </div>
      )
    },
    {
      title: "침실 옵션 선택",
      description: "침실 붙박이장 및 조명 옵션을 선택합니다.",
      icon: Bed,
      content: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">붙박이장</span>
          </div>
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">간접 조명</span>
          </div>
        </div>
      )
    },
    {
      title: "욕실 옵션 선택",
      description: "욕실 타일 및 수전 옵션을 선택합니다.",
      icon: Bath,
      content: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">고급 타일</span>
          </div>
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">매립형 수전</span>
          </div>
        </div>
      )
    },
    {
      title: "마감재 옵션 선택",
      description: "바닥재 및 벽지 마감 옵션을 선택합니다.",
      icon: Layout,
      content: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">강마루</span>
          </div>
          <div className="p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center h-24">
            <span className="text-lg font-medium text-foreground">실크 벽지</span>
          </div>
        </div>
      )
    },
  ];

  // 안전하게 인덱스 접근 (범위 초과 방지)
  const safeIndex = Math.min(Math.max(0, m04_5_currentCategory), contentData.length - 1);
  const currentContent = contentData[safeIndex];
  const Icon = currentContent.icon;

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            다음/이전 버튼
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 옵션 카테고리별로 단계적으로 탐색하며 견적을 작성할 수 있습니다
          </p>
        </div>

        {/* 진행 상태 바 */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>진행률</span>
            <span>
              {safeIndex + 1} / {optionCategories.length}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((safeIndex + 1) / optionCategories.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 현재 단계 컨텐츠 */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-muted/10 border-2 border-border rounded-xl mb-8 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentContent.title}
            </h3>
            <p className="text-muted-foreground">
              {currentContent.description}
            </p>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center">
            {currentContent.content}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={() =>
              setM04_5_currentCategory(Math.max(0, safeIndex - 1))
            }
            disabled={safeIndex === 0}
            className={`flex-1 h-14 flex items-center justify-center gap-2 rounded-lg font-semibold border-2 transition-all ${
              safeIndex === 0
                ? "border-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "border-border hover:bg-muted text-foreground"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            이전 단계
          </button>

          <button
            onClick={() =>
              setM04_5_currentCategory(
                Math.min(
                  optionCategories.length - 1,
                  safeIndex + 1
                )
              )
            }
            className="flex-1 h-14 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {safeIndex === optionCategories.length - 1
              ? "견적서 보기"
              : "다음 단계"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}