/**
 * M04-6: 견적서 파일 다운로드 (통합)
 * 견적서를 PDF 또는 Excel 형식으로 다운로드하는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Download, RefreshCw, FileText, X, FileSpreadsheet } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface M04_6_FileDownloadProps {
  deviceView: DeviceView
}

export function M04_6_FileDownload({ deviceView }: M04_6_FileDownloadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [fileFormat, setFileFormat] = useState('pdf')
  const [includeImages, setIncludeImages] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)

  const handleDownload = () => {
    setIsDownloading(true)
    
    // 다운로드 시뮬레이션 (1.5초)
    setTimeout(() => {
      setIsDownloading(false)
      setIsOpen(false)
      alert(`${fileFormat.toUpperCase()} 파일이 다운로드되었습니다.`)
    }, 1500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            견적서 파일 다운로드
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 견적서를 PDF 또는 Excel 파일로 저장합니다. 형식을 선택할 수 있습니다.
          </p>
        </div>

        {/* 메인 화면: 다운로드 버튼 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex gap-4 mb-8">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center shadow-sm border border-red-100">
              <FileText className="h-10 w-10 text-red-500" />
              <span className="absolute mt-14 text-[10px] font-bold text-red-400">PDF</span>
            </div>
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm border border-green-100">
              <FileSpreadsheet className="h-10 w-10 text-green-600" />
              <span className="absolute mt-14 text-[10px] font-bold text-green-500">Excel</span>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mb-8">
            작성된 견적서를<br />파일로 저장하여 보관하세요.
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full max-w-xs h-14 text-lg gap-2 bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="h-5 w-5" />
            파일 다운로드
          </Button>
        </div>

        {/* 설정 팝업 모달 */}
        {isOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    다운로드 설정
                  </h3>
                  <p className="text-sm text-slate-500">
                    파일 형식과 옵션을 선택해주세요.
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                {/* 파일 형식 선택 */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900">파일 형식</label>
                  <RadioGroup value={fileFormat} onValueChange={setFileFormat} className="grid grid-cols-2 gap-3">
                    <div className={`flex items-center space-x-2 border-2 rounded-lg p-3 cursor-pointer transition-all ${fileFormat === 'pdf' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <RadioGroupItem value="pdf" id="r-pdf" />
                      <Label htmlFor="r-pdf" className="flex items-center gap-2 cursor-pointer">
                        <FileText className="h-4 w-4 text-red-500" />
                        PDF
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-2 border-2 rounded-lg p-3 cursor-pointer transition-all ${fileFormat === 'excel' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <RadioGroupItem value="excel" id="r-excel" />
                      <Label htmlFor="r-excel" className="flex items-center gap-2 cursor-pointer">
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Excel
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* 포함 옵션 */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900">포함 옵션</label>
                  <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Checkbox
                      id="include-images"
                      checked={includeImages}
                      onCheckedChange={(c) => setIncludeImages(!!c)}
                    />
                    <label
                      htmlFor="include-images"
                      className="text-sm font-medium text-slate-700 cursor-pointer flex-1"
                    >
                      상품 이미지 포함
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Checkbox
                      id="include-details"
                      checked={includeDetails}
                      onCheckedChange={(c) => setIncludeDetails(!!c)}
                    />
                    <label
                      htmlFor="include-details"
                      className="text-sm font-medium text-slate-700 cursor-pointer flex-1"
                    >
                      상세 스펙 정보 포함
                    </label>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`w-full h-12 text-base gap-2 transition-colors ${
                  fileFormat === 'pdf' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {fileFormat === 'pdf' ? 'PDF 다운로드' : 'Excel 다운로드'}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  )
}
