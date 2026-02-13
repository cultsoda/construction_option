/**
 * ProjectDocs - 프로젝트 기획서 및 소개
 * 시스템 빌더의 목적, 기능, 프로세스를 설명하는 문서형 컴포넌트
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText, Target, Layout, Zap, CheckCircle2, ArrowRight,
  MonitorPlay, Settings, HelpCircle, Server, Box, ShieldCheck, MousePointerClick,
  Layers, FileSpreadsheet, GitBranch, UserCheck, UserCog, BarChart3, FileSearch, Edit, Share2
} from 'lucide-react'
export function ProjectDocs() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
          <FileText className="h-4 w-4" />
          Project Overview
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900">
          옵션 시스템 빌더 <span className="text-primary">(Builder)</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          복잡한 아파트 옵션 계약 시스템을 <strong>체크리스트 기반으로 자동 생성</strong>하고,<br className="hidden sm:block" />
          <strong>실시간 프로토타입</strong>으로 즉시 검증하는 올인원(All-in-One) 솔루션입니다.
        </p>
      </div>

      <Separator />

      {/* 1. 개요 (Overview) */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 shadow-sm">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">1. 기획 배경 및 목적</h2>
            <p className="text-slate-500">왜 이 시스템이 필요한가?</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-slate-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                😫 기존의 문제점 (Pain Points)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>파편화된 요구사항:</strong> 현장마다 옵션 구조, 판매 정책(배타/필수/연동), UI 요구사항이 제각각이라 매번 커스텀 개발이 필요합니다.</li>
                <li><strong>높은 비용과 시간:</strong> 단순 반복적인 개발 업무에 많은 리소스가 투입되며, 구축 기간(3~6개월)이 길어 급박한 분양 일정을 맞추기 어렵습니다.</li>
                <li><strong>품질 관리의 어려움:</strong> 촉박한 일정으로 인해 테스트가 부족하고, 현장별로 코드 품질의 편차가 발생합니다.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                🚀 빌더의 솔루션 (Solution)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-800 text-sm leading-relaxed font-medium">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>모듈형 아키텍처:</strong> 검증된 표준 기능 모듈(M01~M08)을 미리 개발해두고 조립하는 방식을 채택합니다.</li>
                <li><strong>No-Code 설정:</strong> 개발 지식이 없는 관리자도 체크리스트 답변만으로 시스템을 구성할 수 있습니다.</li>
                <li><strong>즉시 시각화:</strong> 설정 즉시 동작하는 프로토타입을 통해 기획-개발 간 커뮤니케이션 비용을 제로화합니다.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. 핵심 기능 (Core Features) */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-xl text-green-600 shadow-sm">
            <Box className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">2. 핵심 기능 모듈 (Features)</h2>
            <p className="text-slate-500">어떤 기능들을 제공하는가?</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'M01', name: '인증/접근 관리', icon: ShieldCheck, items: ['SSO 연동 (SP/IdP)', '고객 정보 입력 폼', '입력값 유효성 검증'] },
            { id: 'M02', name: '옵션 구조/선택', icon: Layers, items: ['N-Depth 계층 구조', '다중/배타적 선택 로직', '필수 연동 조건 처리'] },
            { id: 'M03', name: '공간 뷰어', icon: Layout, items: ['3D/평면도 뷰어', '공간 이동 네비게이션', '선택 위치 하이라이트'] },
            { id: 'M04', name: '견적/계약', icon: FileSpreadsheet, items: ['실시간 견적 산출', '최종 계약서 생성', 'PDF/Excel 다운로드'] },
            { id: 'M05', name: '데이터 관리', icon: Server, items: ['제출 횟수 제한(1회/N회)', '이력 관리 및 조회', 'API/DB 연동'] },
            { id: 'M06', name: 'UI 커스터마이징', icon: Settings, items: ['브랜드 로고/컬러 적용', '폰트/레이아웃 변경'] },
            { id: 'M07', name: '가이드 [Admin]', icon: HelpCircle, items: ['초기 팝업 가이드', '화면 내 코치마크', '도움말 툴팁'] },
            { id: 'M08', name: '관리자 [Admin]', icon: MonitorPlay, items: ['현황 대시보드', '데이터 검색/필터링', '옵션 가격 관리'] },
          ].map((mod) => (
            <div key={mod.id} className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <mod.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400">{mod.id}</div>
                  <div className="font-bold text-slate-900">{mod.name}</div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {mod.items.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2-1. 모듈 자동 생성 로직 (Logic) */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shadow-sm">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">2-1. 모듈 자동 생성 로직 (Logic)</h2>
            <p className="text-slate-500">체크리스트 답변에 따라 어떤 모듈이 활성화되는가?</p>
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold w-1/4">질문 (Question)</th>
                  <th className="px-6 py-3 font-semibold w-1/4">답변 (Answer)</th>
                  <th className="px-6 py-3 font-semibold w-1/4">생성 모듈 (Module)</th>
                  <th className="px-6 py-3 font-semibold w-1/4">설명 (Note)</th>
                </tr>
              </thead>
                            <tbody className="divide-y divide-slate-100">
                              {/* Q1 시스템 연동 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={2}>Q1. 시스템 연동</td>
                                <td className="px-6 py-4 text-slate-600">IdP 연동 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M01-1</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">건설사 SSO 로그인</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">데이터 연동 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-3</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">건설사 API 전송</td>
                              </tr>
                              
                              {/* Q2 인증/접근 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={4}>Q2. 인증/접근</td>
                                <td className="px-6 py-4 text-slate-600">로그인 = Y (IdP=N)</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M01-2</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">자체 로그인 시스템</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">로그인 = N (정보입력 O)</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M01-3</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">고객 정보 입력 폼</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">유효성 체크 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M01-4</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">입력 정보 유효성 검증</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">(Always)</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M01-6</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">입력 정보 상단 표시 (필수)</td>
                              </tr>
              
                              {/* Q3 옵션 구조 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={7}>Q3. 옵션 구조</td>
                                <td className="px-6 py-4 text-slate-600">(Always)</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-1</Badge>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-6</Badge>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-7</Badge>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-8</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">1Depth, 기본값, 가격, 계산 (필수)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">Depth ≥ 2</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-2</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">2Depth 옵션 UI</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">Depth = 3</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-3</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">3Depth 옵션 UI</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">1Depth 영향 = Y / 구조물 변경</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-4</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M03-5</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">옵션 연동 + 공간 구조 변경</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">다중 선택 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-5</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">다중 선택 기능 활성화</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">배타 / 마이너스 = Y</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-9</Badge>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-10</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">특수 로직 (배타선택, 마이너스옵션)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">필수 연관 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">M02-11</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">필수 연관 선택 가이드</td>
                              </tr>
              
                              {/* Q4 공간 네비게이션 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={2}>Q4. 공간 네비게이션</td>
                                <td className="px-6 py-4 text-slate-600">(Always)</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M03-1</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">3D 뷰어 기본 (필수)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">이동 = 위치 버튼 / 자동 / 표시</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M03-2</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M03-3</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M03-4</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">네비게이션 및 하이라이트</td>
                              </tr>
              
                              {/* Q5 견적 기능 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={3}>Q5. 견적 기능</td>
                                <td className="px-6 py-4 text-slate-600">(Always)</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-1</Badge>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-2</Badge>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-3</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">견적서 팝업, 요약, 최종화면 (필수)</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">수정 / 이동 = Y</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1">
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-4</Badge>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-5</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">견적 수정 및 단계 이동</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">다운로드 = PDF or Excel</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">M04-6</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">통합 파일 다운로드 모듈</td>
                              </tr>
              
                              {/* Q6 데이터 저장 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900" rowSpan={3}>Q6. 데이터 저장</td>
                                <td className="px-6 py-4 text-slate-600">저장 위치</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-1</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-2</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-3</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">구글 시트 / 자체 DB / 건설사 API</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">제출 횟수</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1">
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-4</Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-5</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">N회 제출 / 1회 제한</td>
                              </tr>
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 text-slate-600">이력 추적 = Y</td>
                                <td className="px-6 py-4"><Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">M05-6</Badge></td>
                                <td className="px-6 py-4 text-slate-500 text-xs">제출 이력 관리</td>
                              </tr>
              
                              {/* Q7 UI 커스터마이징 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900">Q7. UI 커스터마이징</td>
                                <td className="px-6 py-4 text-slate-600">요소 선택 (로고, 컬러 등)</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">M06-1</Badge>
                                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">M06-2</Badge>
                                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">M06-3</Badge>
                                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">M06-4</Badge>
                                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">M06-5</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">브랜드 아이덴티티 적용 모듈</td>
                              </tr>
              
                              {/* Q8 가이드 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900">Q8. 가이드/도움말</td>
                                <td className="px-6 py-4 text-slate-600">제공 방식 / 접근 방법</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">M07-1</Badge>
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">M07-2</Badge>
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">M07-3</Badge>
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">M07-4</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">이미지/영상, 팝업/버튼 가이드</td>
                              </tr>
              
                              {/* Q9 관리 기능 */}
                              <tr className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-900">Q9. 관리 기능</td>
                                <td className="px-6 py-4 text-slate-600">관리자 페이지 = Y</td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">M08-1</Badge>
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">M08-2</Badge>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">대시보드, 데이터 검색/조회</td>
                              </tr>
                            </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 프로세스 (Workflow) */}
      <section className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600 shadow-sm">
            <GitBranch className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">3. 전체 프로세스 (Workflow)</h2>
            <p className="text-slate-500">시스템은 어떻게 동작하는가?</p>
          </div>
        </div>

        {/* 3-1. Builder Flow */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-slate-900">Step 3-1</Badge>
            <h3 className="text-xl font-bold text-slate-800">옵션 시스템 빌더 플로우 (Builder User)</h3>
          </div>
          <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200">
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-6 right-6 h-0.5 bg-slate-200 -z-10 hidden md:block" />
            
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { title: '요구사항 분석', desc: '체크리스트 작성', icon: FileText },
                { title: '자동 설계', desc: '모듈 분석/추천', icon: Zap },
                { title: '상세 설정', desc: '모듈 확인/커스텀', icon: Settings },
                { title: '검증', desc: '프로토타입 시연', icon: MonitorPlay },
                { title: '배포', desc: '실 서비스 생성', icon: Server },
              ].map((step, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-500 shadow-sm z-10">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                  {i < 4 && (
                    <div className="absolute top-9 -right-3 text-slate-300 md:block hidden">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-2. User Flow */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary">Step 3-2</Badge>
            <h3 className="text-xl font-bold text-slate-800">옵션 시스템 사용자 플로우 (End User)</h3>
          </div>
          <div className="relative p-6 bg-primary/5 rounded-2xl border border-primary/10">
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-6 right-6 h-0.5 bg-primary/20 -z-10 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: '접근 및 인증', desc: 'SSO / 정보 입력', icon: UserCheck },
                { title: '옵션 탐색', desc: '공간별 옵션 선택', icon: MousePointerClick },
                { title: '견적 및 계약', desc: '최종 내역 확인', icon: FileSpreadsheet },
                { title: '완료', desc: '제출 및 이력 조회', icon: CheckCircle2 },
              ].map((step, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-primary/20 shadow-sm flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary shadow-sm z-10">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                  {i < 3 && (
                    <div className="absolute top-9 -right-3 text-primary/30 md:block hidden">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-3. Admin Flow */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-orange-500 hover:bg-orange-600">Step 3-3</Badge>
            <h3 className="text-xl font-bold text-slate-800">옵션 시스템 관리자 플로우 (Admin User)</h3>
          </div>
          <div className="relative p-6 bg-orange-50 rounded-2xl border border-orange-100">
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-6 right-6 h-0.5 bg-orange-200 -z-10 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: '관리자 로그인', desc: 'Admin 계정 접속', icon: UserCog },
                { title: '현황 모니터링', desc: '대시보드 확인', icon: BarChart3 },
                { title: '데이터 관리', desc: '검색 및 다운로드', icon: FileSearch },
                { title: '옵션 관리', desc: '가격/정보 수정', icon: Edit },
              ].map((step, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3 text-orange-600 shadow-sm z-10">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                  {i < 3 && (
                    <div className="absolute top-9 -right-3 text-orange-300 md:block hidden">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 기대 효과 (Expected Effects) */}
      <section className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="h-8 w-8 text-yellow-400" />
          <h2 className="text-2xl font-bold">4. 도입 기대 효과</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-700">
          <div className="space-y-3 pt-4 md:pt-0 px-4">
            <h3 className="font-bold text-lg text-green-400 flex items-center gap-2">
              <span className="text-2xl">⚡️</span> Speed & Cost
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              기존 수개월 소요되던 구축 기간을 <strong>수일 내로 단축</strong>하여, 급박한 분양 일정에도 유연하게 대응하고 개발 비용을 절감합니다.
            </p>
          </div>
          <div className="space-y-3 pt-4 md:pt-0 px-4">
            <h3 className="font-bold text-lg text-blue-400 flex items-center gap-2">
              <span className="text-2xl">💎</span> Quality UX
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              검증된 <strong>표준 UI/UX 모듈</strong>을 사용하여, 모든 현장에서 일정 수준 이상의 고품질 사용자 경험을 균일하게 제공합니다.
            </p>
          </div>
          <div className="space-y-3 pt-4 md:pt-0 px-4">
            <h3 className="font-bold text-lg text-purple-400 flex items-center gap-2">
              <span className="text-2xl">🧩</span> Flexibility
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              다양한 옵션 구조와 판매 정책을 <strong>코딩 없이(No-Code)</strong> 체크리스트 설정만으로 유연하게 적용 및 변경할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
