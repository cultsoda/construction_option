/**
 * M04-7: 견적 공유 (Excel 다운로드)
 * 견적서를 Excel로 다운로드하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Download } from 'lucide-react'

interface M04_7_QuoteShareProps {
  deviceView: DeviceView
}

export function M04_7_QuoteShare({
  deviceView,
}: M04_7_QuoteShareProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Download className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Excel 다운로드
          </h2>
          <p className="text-muted-foreground mb-8">
            견적서를 Excel 파일로 저장합니다
          </p>
          <div className="h-14 bg-green-600 rounded-lg flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-green-700 transition-colors px-8">
            <Download className="h-5 w-5 mr-2" />
            Excel 다운로드
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
