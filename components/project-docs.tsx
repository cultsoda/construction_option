/**
 * ProjectDocs - 프로젝트 기획서 및 소개
 * 시스템 빌더의 목적, 기능, 프로세스를 설명하는 문서형 컴포넌트
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  FileText, 
  Target, 
  Layout, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MonitorPlay,
  Settings
} from 'lucide-react'

export function ProjectDocs() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12 pb-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 border-primary text-primary">
          Project Overview
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          옵션 시스템 빌더 <span className="text-primary">(Builder)</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          복잡한 아파트 옵션 계약 시스템을 체크리스트 하나로 구축하고, <br/>
          실시간 프로토타입으로 즉시 검증하는 올인원 솔루션
        </p>
      </div>

      <Separator />

      {/* 1. 개요 & 목적 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">기획 배경 및 목적</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">😫 기존의 문제점</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-600">
              <p>• 현장마다 옵션 조건(배타선택, 연동 등)이 달라 매번 새로 개발해야 함.</p>
              <p>• 엑셀 기반의 수기 관리는 휴먼 에러 발생 위험이 높음.</p>
              <p>• 개발 기간이 길어(3~6개월) 분양 일정에 맞추기 빠듯함.</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-primary">🚀 빌더의 솔루션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-800 font-medium">
              <p>• 체크리스트 답변만으로 필요한 기능 모듈을 자동 조립.</p>
              <p>• 검증된 표준 모듈(M01~M08)을 사용하여 안정성 확보.</p>
              <p>• 실시간 프로토타입 제공으로 기획/개발 간 커뮤니케이션 비용 절감.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. 핵심 프로세스 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">핵심 프로세스 (Workflow)</h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 hidden md:block" />
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Step 1', desc: '체크리스트 작성', icon: FileText, sub: '현장 요구사항 입력' },
              { title: 'Step 2', desc: '모듈 자동 분석', icon: Settings, sub: '필요 기능 도출' },
              { title: 'Step 3', desc: '프로토타입 검증', icon: MonitorPlay, sub: 'UI/UX 시뮬레이션' },
              { title: 'Step 4', desc: '시스템 배포', icon: Layout, sub: '실 서비스 생성' },
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-600">
                  <step.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="mb-2">{step.title}</Badge>
                <h3 className="font-bold text-lg mb-1">{step.desc}</h3>
                <p className="text-xs text-muted-foreground">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 주요 기능 모듈 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <Layout className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">제공 기능 모듈</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 'M01', name: '인증/접근', desc: 'SSO 연동, 정보 입력 폼' },
            { id: 'M02', name: '옵션 선택', desc: 'N-Depth 구조, 배타적 선택, 연동 로직' },
            { id: 'M03', name: '공간 뷰어', desc: '3D/평면도 뷰어, 위치 하이라이트' },
            { id: 'M04', name: '견적/계약', desc: '실시간 견적서, 전자 계약, PDF 저장' },
            { id: 'M05', name: '데이터 관리', desc: '제출 제한, 이력 관리, API 연동' },
            { id: 'M06', name: 'UI 테마', desc: '브랜드 로고, 컬러, 폰트 커스터마이징' },
            { id: 'M07', name: '가이드 [Admin]', desc: '팝업 가이드, 코치마크 도움말' },
            { id: 'M08', name: '관리자 [Admin]', desc: '대시보드, 데이터 조회 및 엑셀 다운로드' },
          ].map((mod) => (
            <div key={mod.id} className="flex gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-bold text-sm">
                {mod.id}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  {mod.name}
                  {mod.name.includes('[Admin]') && <Badge variant="outline" className="text-[10px] h-4 px-1">Admin</Badge>}
                </h4>
                <p className="text-sm text-slate-500 mt-1">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 기대 효과 */}
      <section className="bg-slate-900 text-white p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
          <h2 className="text-2xl font-bold">기대 효과</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-green-400">Time Saving</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              기존 수개월 소요되던 구축 기간을 획기적으로 단축하여, 급박한 분양 일정에도 유연하게 대응 가능합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-blue-400">Quality Standard</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              검증된 표준 UI/UX 모듈을 사용하여, 모든 현장에서 일정 수준 이상의 고품질 사용자 경험을 제공합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-purple-400">Flexibility</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              다양한 옵션 구조와 판매 정책을 코딩 없이 체크리스트 설정만으로 유연하게 적용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
