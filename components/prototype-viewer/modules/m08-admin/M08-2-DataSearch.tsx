/**
 * M08-2: 데이터 검색 기능
 * 제출된 견적 데이터를 검색하고 필터링하는 기능
 */

import React, { useState, useEffect } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Download, Calendar, X, Printer, RefreshCw } from 'lucide-react'
import { subDays, format } from 'date-fns'

interface M08_2_DataSearchProps {
  deviceView: DeviceView
}

// Sample Data
const adminData = [
  { id: 'REQ-001', name: '홍길동1', type: '84A', amount: 15800000, date: '2024-02-05', status: '제출완료' },
  { id: 'REQ-002', name: '홍길동2', type: '59B', amount: 8500000, date: '2024-02-05', status: '임시저장' },
  { id: 'REQ-003', name: '홍길동3', type: '84B', amount: 21000000, date: '2024-02-04', status: '제출완료' },
  { id: 'REQ-004', name: '김철수', type: '101A', amount: 25000000, date: '2024-02-04', status: '제출완료' },
  { id: 'REQ-005', name: '이영희', type: '84A', amount: 16000000, date: '2024-02-03', status: '상담요청' }
]

type DateRangePreset = '7d' | '14d' | '30d' | 'custom'

export function M08_2_DataSearch({ deviceView }: M08_2_DataSearchProps) {
  const [m08_2_searchTerm, setM08_2_searchTerm] = useState('')
  const [m08_2_filterType, setM08_2_filterType] = useState('all')
  const [m08_2_searchResults, setM08_2_searchResults] = useState<any[]>(adminData)
  
  // Date Filter State
  const [dateRange, setDateRange] = useState<DateRangePreset>('7d')
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  // UI State
  const [selectedSubmission, setSelectedSubmission] = useState<typeof adminData[0] | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  // Handle Preset Change
  const handlePresetChange = (preset: DateRangePreset) => {
    setDateRange(preset)
    const today = new Date()
    let start = new Date()

    if (preset === '7d') start = subDays(today, 7)
    else if (preset === '14d') start = subDays(today, 14)
    else if (preset === '30d') start = subDays(today, 30)
    
    if (preset !== 'custom') {
      setStartDate(format(start, 'yyyy-MM-dd'))
      setEndDate(format(today, 'yyyy-MM-dd'))
    }
  }

  const handleSearch = () => {
    let filtered = adminData

    if (m08_2_searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.includes(m08_2_searchTerm) ||
          item.id.includes(m08_2_searchTerm)
      )
    }

    if (m08_2_filterType !== 'all') {
      filtered = filtered.filter((item) => item.type === m08_2_filterType)
    }

    // 날짜 필터링 (문자열 비교로 단순화 - 실제 프로젝트에서는 날짜 객체 비교 필요)
    // 여기서는 데모 데이터의 날짜 포맷이 다양할 수 있으므로 필터링 로직은 생략하거나 단순화합니다.
    // filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate)

    setM08_2_searchResults(filtered)
  }

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      alert("검색된 데이터가 Excel 파일로 다운로드되었습니다.")
    }, 1500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col h-full p-6 space-y-6 relative">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            데이터 검색 기능
          </h2>
          <p className="text-sm text-muted-foreground">
            제출된 견적 데이터를 검색하고 필터링합니다.
          </p>
        </div>

        {/* 검색 영역 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">검색 조건</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  검색어
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="이름, 견적 ID"
                    value={m08_2_searchTerm}
                    onChange={(e) => setM08_2_searchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  타입 필터
                </label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={m08_2_filterType}
                  onChange={(e) => setM08_2_filterType(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="84A">84A</option>
                  <option value="84B">84B</option>
                  <option value="59A">59A</option>
                  <option value="59B">59B</option>
                  <option value="101A">101A</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                조회 기간
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(['7d', '14d', '30d', 'custom'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetChange(preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      dateRange === preset
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {preset === '7d' && '최근 7일'}
                    {preset === '14d' && '최근 14일'}
                    {preset === '30d' && '최근 1개월'}
                    {preset === 'custom' && '직접 설정'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setDateRange('custom')
                    }}
                    className="pl-9"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      setDateRange('custom')
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSearch} className="flex-1 bg-slate-900 hover:bg-slate-800">
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setM08_2_searchTerm("")
                  setM08_2_filterType("all")
                  handlePresetChange('7d')
                  setM08_2_searchResults(adminData)
                }}
              >
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 검색 결과 */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                검색 결과{" "}
                {m08_2_searchResults.length > 0 &&
                  `(${m08_2_searchResults.length}건)`}
              </CardTitle>
              {m08_2_searchResults.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Download className="h-3 w-3" />
                  )}
                  Excel 다운로드
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {m08_2_searchResults.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">
                        견적 ID
                      </th>
                      <th className="text-left p-3 font-semibold">
                        고객명
                      </th>
                      <th className="text-left p-3 font-semibold">
                        타입
                      </th>
                      <th className="text-right p-3 font-semibold">
                        금액
                      </th>
                      <th className="text-left p-3 font-semibold">
                        날짜
                      </th>
                      <th className="text-center p-3 font-semibold">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {m08_2_searchResults.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => setSelectedSubmission(item)}
                      >
                        <td className="p-3 font-medium text-primary">{item.id}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">
                          <Badge variant="outline">{item.type}</Badge>
                        </td>
                        <td className="p-3 text-right font-medium">
                          {item.amount.toLocaleString()}원
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {item.date}
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={item.status === '제출완료' ? 'default' : 'secondary'} className="text-[10px]">
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  검색 결과가 없습니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 견적 상세 보기 모달 */}
        {selectedSubmission && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90%] animate-in zoom-in-95">
              <div className="bg-slate-900 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold mb-1">견적 상세 내역</h3>
                    <p className="text-slate-400 text-xs">{selectedSubmission.id} | {selectedSubmission.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSubmission(null)}
                    className="text-white/70 hover:text-white p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">고객명</span>
                    <span className="font-semibold">{selectedSubmission.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs block mb-1">타입/평형</span>
                    <span className="font-semibold">{selectedSubmission.type}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <h4 className="font-bold text-slate-800 mb-4 text-sm">선택 옵션 목록</h4>
                <div className="space-y-0 text-sm border rounded-lg overflow-hidden">
                  {[
                    { name: '가구 패키지 (프리미엄)', price: 5000000 },
                    { name: '시스템 에어컨 (전실)', price: 2000000 },
                    { name: '주방 엔지니어드 스톤', price: 1500000 },
                    { name: '현관 중문', price: 500000 },
                  ].map((opt, idx) => (
                    <div key={idx} className="flex justify-between p-3 border-b last:border-0 bg-white">
                      <span className="text-slate-600">{opt.name}</span>
                      <span className="font-medium">{(opt.price / 10000).toLocaleString()}만원</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-700">총 견적 금액</span>
                  <span className="text-xl font-bold text-primary">
                    {(selectedSubmission.amount / 10000).toLocaleString()}만원
                  </span>
                </div>
              </div>

              <div className="p-4 border-t bg-white rounded-b-xl flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => alert("인쇄를 시작합니다.")}>
                  <Printer className="h-4 w-4 mr-2" />
                  인쇄
                </Button>
                <Button onClick={() => setSelectedSubmission(null)}>
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}