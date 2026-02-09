/**
 * M05-3: API 전송 (건설사 API 전송)
 * 선택 데이터를 건설사 시스템 API로 전송
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Upload, Check } from 'lucide-react'

interface SendResult {
  status: number
  message: string
  timestamp: string
}

interface M05_3_ApiSendProps {
  deviceView: DeviceView
  m05_3_isSending: boolean
  setM05_3_isSending: (sending: boolean) => void
  m05_3_sendResult: SendResult | null
  setM05_3_sendResult: (result: SendResult | null) => void
}

export function M05_3_ApiSend({
  deviceView,
  m05_3_isSending,
  setM05_3_isSending,
  m05_3_sendResult,
  setM05_3_sendResult,
}: M05_3_ApiSendProps) {
  const handleSendToAPI = () => {
    setM05_3_isSending(true)
    setTimeout(() => {
      setM05_3_isSending(false)
      setM05_3_sendResult({
        status: 200,
        message: 'OK',
        timestamp: new Date().toLocaleTimeString(),
      })
    }, 2000)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            건설사 API 전송
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 옵션 데이터를 건설사 시스템 API로 전송합니다
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-700">
                API ENDPOINT
              </span>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                POST
              </Badge>
            </div>
            <code className="text-xs bg-white p-2 rounded border block text-slate-600">
              https://api.construction-company.com/v1/options/submit
            </code>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {m05_3_sendResult ? (
              <div className="text-center animate-in zoom-in-50">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Upload className="h-10 w-10 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Check
                      className="h-4 w-4 text-white"
                      strokeWidth={4}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  전송 완료
                </h3>
                <p className="text-slate-500 mb-4">
                  건설사 시스템으로 데이터가 전송되었습니다.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-mono text-slate-600">
                  <span>Status: {m05_3_sendResult.status}</span>
                  <span className="w-1 h-4 bg-slate-300"></span>
                  <span>Time: {m05_3_sendResult.timestamp}</span>
                </div>
              </div>
            ) : (
              <div className="text-center opacity-50">
                <Upload className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p>전송 대기 중</p>
              </div>
            )}
          </div>

          {!m05_3_sendResult && (
            <button
              onClick={handleSendToAPI}
              disabled={m05_3_isSending}
              className="w-full h-14 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg mt-6 disabled:opacity-70"
            >
              {m05_3_isSending ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  전송 중...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  건설사 API로 전송
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </DeviceFrame>
  )
}
