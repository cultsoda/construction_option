/**
 * M08-1: 관리자 페이지
 * 시스템 통계 및 제출 데이터를 관리하는 대시보드
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserCog, Download } from 'lucide-react'

interface M08_1_DashboardProps {
  deviceView: DeviceView
}

// Sample Data for Dashboard
const m08_1_stats = {
  totalSubmissions: 1234,
  todaySubmissions: 42,
  averageAmount: 18500000,
  topOption: '시스템 에어컨'
}

const recentSubmissions = [
  { id: 'REQ-001', name: '홍길동1', type: '84A', amount: 15800000, date: '10분 전', status: '제출완료' },
  { id: 'REQ-002', name: '홍길동2', type: '59B', amount: 8500000, date: '30분 전', status: '임시저장' },
  { id: 'REQ-003', name: '홍길동3', type: '84B', amount: 21000000, date: '1시간 전', status: '제출완료' }
]

export function M08_1_Dashboard({
  deviceView
}: M08_1_DashboardProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full bg-slate-100">
        {/* 관리자 헤더 */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <UserCog className="h-6 w-6" />
            <div>
              <span className="font-bold block">관리자 페이지</span>
              <span className="text-xs text-slate-400">💡 시스템 통계와 제출 데이터를 관리하는 대시보드입니다</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">admin@construction.com</span>
            <button className="hover:text-white">로그아웃</button>
          </div>
        </div>

        {/* 대시보드 컨텐츠 */}
        <div className="p-6 space-y-6 flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">총 견적 제출</p>
              <p className="text-2xl font-bold text-slate-900">
                {m08_1_stats.totalSubmissions}건
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">오늘 접수</p>
              <p className="text-2xl font-bold text-primary">
                {m08_1_stats.todaySubmissions}건
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">평균 견적 금액</p>
            <p className="text-2xl font-bold text-foreground">
              {(m08_1_stats.averageAmount / 10000).toFixed(0)}만원
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">인기 옵션</p>
            <p className="text-lg font-bold text-foreground">
              {m08_1_stats.topOption}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="font-bold text-lg mb-4">최근 활동</h3>
            <div className="space-y-3">
              {recentSubmissions.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm pb-3 border-b border-dashed border-slate-100 last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-slate-500">
                    님이 견적서를 제출했습니다.
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 제출 목록 (상세 테이블) */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-base">최근 제출 내역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">견적 ID</th>
                      <th className="text-left p-3 font-semibold">고객명</th>
                      <th className="text-left p-3 font-semibold">타입</th>
                      <th className="text-right p-3 font-semibold">금액</th>
                      <th className="text-center p-3 font-semibold">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentSubmissions.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30">
                        <td className="p-3 font-medium">{item.id}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">
                          <Badge variant="outline">{item.type}</Badge>
                        </td>
                        <td className="p-3 text-right font-medium">
                          {item.amount.toLocaleString()}원
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="secondary">{item.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 빠른 액션 */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              데이터 내보내기
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <UserCog className="h-4 w-4" />
              옵션 설정
            </Button>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
