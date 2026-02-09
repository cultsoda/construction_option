/**
 * M05-1: 로컬 저장 (구글 시트 연동)
 * 선택 데이터를 구글 시트에 저장하는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, RefreshCw, Link, XCircle } from 'lucide-react'

interface M05_1_LocalSaveProps {
  deviceView: DeviceView
}

export function M05_1_LocalSave({
  deviceView,
}: M05_1_LocalSaveProps) {
  const [isConnected, setIsConnected] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('2024-01-15 14:30')
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/...')

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setLastUpdate(new Date().toLocaleString('ko-KR'))
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setLastUpdate('')
  }

  const handleSync = () => {
    if (!isConnected) return

    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setLastUpdate(new Date().toLocaleString('ko-KR'))
    }, 1500)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            구글 시트 연동
          </h2>

          <div className="space-y-4">
            {/* 연동 상태 */}
            {isConnected ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">
                      연동 완료
                    </p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="text-xs text-green-700 hover:text-green-900 underline"
                  >
                    연결 해제
                  </button>
                </div>
                <p className="text-xs text-green-700">
                  데이터가 구글 시트에 자동으로 저장됩니다
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-slate-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    연동 대기 중
                  </p>
                </div>
                <p className="text-xs text-slate-600">
                  구글 시트와 연동되지 않았습니다
                </p>
              </div>
            )}

            {/* 시트 정보 */}
            <div className="border-2 border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">
                시트 정보
              </p>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  문서 URL
                </label>
                <Input
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  className="text-xs"
                  placeholder="구글 시트 URL을 입력하세요"
                  disabled={isConnected}
                />
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">문서명</span>
                <span className="font-medium">옵션_선택_데이터_2024</span>
              </div>

              {lastUpdate && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">마지막 업데이트</span>
                  <span className="font-medium">{lastUpdate}</span>
                </div>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2">
              {isConnected ? (
                <Button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="flex-1"
                  variant="outline"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      동기화 중...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      수동 동기화
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex-1"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      연동 중...
                    </>
                  ) : (
                    <>
                      <Link className="h-4 w-4 mr-2" />
                      구글 시트 연동
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* 안내 메시지 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-900">
                <strong>💡 Tip:</strong> 연동 후 옵션 선택 시 자동으로 구글 시트에 저장됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
