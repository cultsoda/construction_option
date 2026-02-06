/**
 * M04-6: 견적 히스토리 (PDF 다운로드)
 * 견적서를 PDF로 다운로드하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Download } from 'lucide-react'

interface M04_6_QuoteHistoryProps {
  deviceView: DeviceView
}

export function M04_6_QuoteHistory({
  deviceView,
}: M04_6_QuoteHistoryProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Download className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            PDF 다운로드
          </h2>
          <p className="text-muted-foreground mb-8">
            견적서를 PDF 파일로 저장합니다
          </p>
          <div className="h-14 bg-red-600 rounded-lg flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-red-700 transition-colors px-8">
            <Download className="h-5 w-5 mr-2" />
            PDF 다운로드
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
