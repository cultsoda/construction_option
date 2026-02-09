/**
 * M05-2: 자동 저장 (자체 DB 저장)
 * 선택 데이터를 자체 DB에 저장하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Check, RefreshCw, Database as DatabaseIcon } from 'lucide-react'

interface SaveResult {
  id: string
  timestamp: string
  size: string
}

interface M05_2_AutoSaveProps {
  deviceView: DeviceView
  m05_2_isSaving: boolean
  setM05_2_isSaving: (saving: boolean) => void
  m05_2_saveResult: SaveResult | null
  setM05_2_saveResult: (result: SaveResult | null) => void
}

export function M05_2_AutoSave({
  deviceView,
  m05_2_isSaving,
  setM05_2_isSaving,
  m05_2_saveResult,
  setM05_2_saveResult,
}: M05_2_AutoSaveProps) {
  const handleSaveToDB = () => {
    setM05_2_isSaving(true)
    setTimeout(() => {
      setM05_2_isSaving(false)
      setM05_2_saveResult({
        id: 'QUOTE-2024-001',
        timestamp: new Date().toLocaleString(),
        size: '2.4KB',
      })
    }, 2000)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            자체 DB 저장
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 옵션 데이터를 자체 데이터베이스에 저장할 수 있습니다
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-sm p-4 bg-slate-900 rounded-lg font-mono text-xs text-green-400 overflow-hidden shadow-lg">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <pre>
              {JSON.stringify(
                {
                  user: 'hong_gildong',
                  options: ['opt1-1', 'opt2-1', 'opt3-1'],
                  total: 7500000,
                  version: '1.0.0',
                },
                null,
                2
              )}
            </pre>
          </div>

          {m05_2_saveResult ? (
            <div className="w-full max-w-sm p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-bold text-green-900 mb-1">저장 완료</p>
              <p className="text-sm text-green-800 mb-2">
                데이터가 안전하게 저장되었습니다.
              </p>
              <div className="text-xs text-green-700 bg-green-100/50 p-2 rounded">
                ID: {m05_2_saveResult.id}
                <br />
                Time: {m05_2_saveResult.timestamp}
              </div>
            </div>
          ) : (
            <button
              onClick={handleSaveToDB}
              disabled={m05_2_isSaving}
              className="w-full max-w-sm h-14 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {m05_2_isSaving ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <DatabaseIcon className="h-5 w-5" />
                  자체 DB에 저장
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
