/**
 * M04-7: 견적 공유 (Excel 다운로드)
 * 견적서를 Excel로 다운로드하는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Download, Check, RefreshCw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface M04_7_QuoteShareProps {
  deviceView: DeviceView
  conditions?: {
    includeImages?: boolean
    includeDetails?: boolean
    format?: string
  }
}

export function M04_7_QuoteShare({
  deviceView,
  conditions = {
    includeImages: true,
    includeDetails: true,
    format: 'XLSX',
  },
}: M04_7_QuoteShareProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [localIncludeImages, setLocalIncludeImages] = useState(conditions.includeImages)
  const [localIncludeDetails, setLocalIncludeDetails] = useState(conditions.includeDetails)

  const handleDownload = () => {
    setIsDownloading(true)
    setDownloadComplete(false)

    // 다운로드 시뮬레이션 (2초)
    setTimeout(() => {
      setIsDownloading(false)
      setDownloadComplete(true)

      // 3초 후 완료 메시지 숨김
      setTimeout(() => {
        setDownloadComplete(false)
      }, 3000)
    }, 2000)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col items-center justify-center min-h-full p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              {downloadComplete ? (
                <Check className="h-12 w-12 text-green-600" />
              ) : (
                <Download className="h-12 w-12 text-green-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Excel 다운로드
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              💡 견적서를 Excel 파일로 다운로드하여 편집하거나 공유할 수 있습니다
            </p>
            <p className="text-muted-foreground mb-8">
              파일 형식과 포함 옵션을 선택하세요
            </p>
          </div>

          {/* 다운로드 옵션 */}
          <div className="bg-muted/20 rounded-xl p-4 mb-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              다운로드 옵션
            </h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="excel-include-images"
                checked={localIncludeImages}
                onCheckedChange={(checked) => setLocalIncludeImages(!!checked)}
              />
              <label
                htmlFor="excel-include-images"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                이미지 포함
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="excel-include-details"
                checked={localIncludeDetails}
                onCheckedChange={(checked) => setLocalIncludeDetails(!!checked)}
              />
              <label
                htmlFor="excel-include-details"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                상세 정보 포함
              </label>
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              파일 형식: {conditions.format || 'XLSX'}
            </div>
          </div>

          {/* 다운로드 버튼 */}
          {downloadComplete ? (
            <div className="h-14 bg-green-600 rounded-lg flex items-center justify-center text-white font-semibold px-8">
              <Check className="h-5 w-5 mr-2" />
              다운로드 완료
            </div>
          ) : (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full h-14 bg-green-600 rounded-lg flex items-center justify-center text-white font-semibold hover:bg-green-700 transition-colors px-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  다운로드 중...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Excel 다운로드
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
