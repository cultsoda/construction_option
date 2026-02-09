import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, RefreshCw, AlertCircle } from 'lucide-react' // RefreshCw, AlertCircle 추가

interface M08_3_ExcelDownloadProps {
  deviceView: DeviceView
}

interface DownloadRecord {
  date: string
  file: string
  size: string
}

const initialDownloadHistory: DownloadRecord[] = [
  { date: "2024-01-17 14:30", file: "quotes_20240117.xlsx", size: "1.2 MB" },
  { date: "2024-01-16 09:15", file: "quotes_20240116.xlsx", size: "1.1 MB" },
  { date: "2024-01-15 16:45", file: "quotes_20240115.xlsx", size: "980 KB" },
]

export function M08_3_ExcelDownload({ deviceView }: M08_3_ExcelDownloadProps) {
  const [m08_3_isExporting, setM08_3_isExporting] = useState(false)
  const [m08_3_exportProgress, setM08_3_exportProgress] = useState(0)
  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>(initialDownloadHistory)
  const [m08_3_includeOptions, setM08_3_includeOptions] = useState(true)
  const [m08_3_includeCustomerInfo, setM08_3_includeCustomerInfo] = useState(true)

  const handleExport = () => {
    setM08_3_isExporting(true)
    setM08_3_exportProgress(0)

    const interval = setInterval(() => {
      setM08_3_exportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setM08_3_isExporting(false)
          
          const newRecord = {
            date: new Date().toLocaleString('ko-KR', { hour12: false }),
            file: `quotes_${new Date().toJSON().slice(0, 10).replace(/-/g, '')}.xlsx`,
            size: `${(Math.random() * (2.0 - 0.5) + 0.5).toFixed(1)} MB`
          }
          setDownloadHistory((prevHistory) => [newRecord, ...prevHistory])

          alert('다운로드가 완료되었습니다.')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Excel 일괄 다운로드
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 기간의 모든 견적 데이터를 Excel 파일로 일괄 다운로드합니다
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <Card className="w-full max-w-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">데이터 내보내기</h3>
                  <p className="text-xs text-slate-500">
                    선택한 기간의 데이터를 엑셀로 저장합니다.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">
                    기간 설정
                  </label>
                  <select className="w-full h-10 rounded-md border border-slate-300 text-sm px-3 bg-background">
                    <option>이번 달 (2024.02)</option>
                    <option>지난 달 (2024.01)</option>
                    <option>전체 기간</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">
                    포함 항목
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">기본 정보</Badge>
                    <Badge variant="secondary">옵션 내역</Badge>
                    <Badge variant="secondary">결제 정보</Badge>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleExport}
                disabled={m08_3_isExporting}
                className="w-full h-12 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md disabled:opacity-70"
              >
                {m08_3_isExporting ? (
                  `다운로드 중... ${m08_3_exportProgress}%`
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Excel 다운로드
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-slate-400 mt-3">
                * 대량의 데이터 다운로드 시 시간이 소요될 수 있습니다.
              </p>

              {m08_3_isExporting && (
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${m08_3_exportProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    데이터 준비 중...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 최근 다운로드 이력 */}
          <Card className="w-full max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                최근 다운로드 이력
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {downloadHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">{item.file}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{item.size}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DeviceFrame>
  )
}
