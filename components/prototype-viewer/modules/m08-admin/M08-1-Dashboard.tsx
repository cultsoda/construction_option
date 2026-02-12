/**
 * M08-1: 관리자 페이지
 * 시스템 통계 및 제출 데이터를 관리하는 대시보드
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserCog, Download, Edit2, Save, X, FileText, FileSpreadsheet, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

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

const initialOptions = [
  { id: 1, name: '시스템 에어컨 (전실)', price: 2000000 },
  { id: 2, name: '빌트인 냉장고', price: 800000 },
  { id: 3, name: '주방 엔지니어드 스톤', price: 1500000 },
  { id: 4, name: '현관 중문', price: 500000 },
]

export function M08_1_Dashboard({
  deviceView
}: M08_1_DashboardProps) {
  const [showOptionSettings, setShowOptionSettings] = useState(false)
  const [options, setOptions] = useState(initialOptions)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [selectedSubmission, setSelectedSubmission] = useState<typeof recentSubmissions[0] | null>(null)
  
  // Export Modal States
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('excel')
  const [isExporting, setIsExporting] = useState(false)

  const handleEditClick = (option: typeof initialOptions[0]) => {
    setEditingId(option.id)
    setEditValue(option.price.toString())
  }

  const handleSaveClick = (id: number) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, price: parseInt(editValue) || 0 } : opt
    ))
    setEditingId(null)
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setShowExportModal(false)
      alert(`전체 데이터가 ${exportFormat.toUpperCase()} 형식으로 다운로드되었습니다.`)
    }, 1500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full bg-slate-100 relative">
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
            <button 
              onClick={() => alert("로그아웃 되었습니다.")}
              className="hover:text-white"
            >
              로그아웃
            </button>
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
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="h-4 w-4" />
              데이터 내보내기
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => setShowOptionSettings(true)}
            >
              <UserCog className="h-4 w-4" />
              옵션 설정
            </Button>
          </div>
        </div>

        {/* 옵션 설정 모달 */}
        {showOptionSettings && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col max-h-[90%] animate-in zoom-in-95">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-xl">
                <h3 className="font-bold text-slate-900">옵션 가격 관리</h3>
                <button 
                  onClick={() => {
                    setShowOptionSettings(false)
                    setEditingId(null)
                  }}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{option.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingId === option.id ? (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              value={editValue} 
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-24 h-8 text-right"
                            />
                            <Button size="sm" onClick={() => handleSaveClick(option.id)} className="h-8 w-8 p-0">
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{(option.price / 10000).toLocaleString()}만원</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditClick(option)}
                              className="h-8 w-8 p-0 text-slate-400 hover:text-primary"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t bg-slate-50 rounded-b-xl text-center">
                <p className="text-xs text-slate-500">가격 수정 후 저장 버튼을 눌러주세요.</p>
              </div>
            </div>
          </div>
        )}

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
                  인쇄
                </Button>
                <Button onClick={() => setSelectedSubmission(null)}>
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 데이터 내보내기 모달 */}
        {showExportModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 rounded-[inherit]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm flex flex-col animate-in zoom-in-95">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-slate-900">데이터 내보내기</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-4">
                  전체 데이터를 파일로 다운로드합니다.<br/>
                  원하는 파일 형식을 선택해주세요.
                </p>
                <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`flex items-center space-x-2 border-2 rounded-lg p-3 cursor-pointer transition-all ${exportFormat === 'excel' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <RadioGroupItem value="excel" id="export-excel" />
                    <Label htmlFor="export-excel" className="flex items-center gap-2 cursor-pointer text-sm">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      Excel
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-2 border-2 rounded-lg p-3 cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <RadioGroupItem value="pdf" id="export-pdf" />
                    <Label htmlFor="export-pdf" className="flex items-center gap-2 cursor-pointer text-sm">
                      <FileText className="h-4 w-4 text-red-500" />
                      PDF
                    </Label>
                  </div>
                </RadioGroup>
                
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`w-full h-12 text-base gap-2 ${
                    exportFormat === 'excel' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      다운로드 시작
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}