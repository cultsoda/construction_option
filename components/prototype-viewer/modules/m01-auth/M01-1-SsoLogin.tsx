/**
 * M01-1: SSO 로그인
 * 건설사 통합 인증(SSO)을 통한 로그인 화면
 */

import React, { useState, useEffect } from 'react'
import { Key, Loader2, CheckCircle2, LogOut } from 'lucide-react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface M01_1_SsoLoginProps {
  deviceView: DeviceView
}

export function M01_1_SsoLogin({ deviceView }: M01_1_SsoLoginProps) {
  const [activeTab, setActiveTab] = useState('sp-init')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  // 탭 변경 시 상태 초기화
  useEffect(() => {
    setIsLoading(false)
    setIsLoggedIn(false)
    setLoginMessage('')

    if (activeTab === 'idp-init') {
      // IdP Init 시나리오: 진입 시 자동 로그인 시도
      simulateIdpLogin()
    }
  }, [activeTab])

  const simulateSpLogin = () => {
    alert("건설사 통합 로그인 페이지로 이동합니다.\n(실제 구현 시 외부 IdP 페이지로 리다이렉트됩니다.)")
    setIsLoading(true)
    setLoginMessage('건설사 로그인 페이지에서 인증 중...')
    
    setTimeout(() => {
      setIsLoading(false)
      setIsLoggedIn(true)
      setLoginMessage('로그인 성공!')
    }, 2000)
  }

  const simulateIdpLogin = () => {
    setIsLoading(true)
    setLoginMessage('SSO 토큰 검증 중...')
    
    setTimeout(() => {
      setIsLoading(false)
      setIsLoggedIn(true)
      setLoginMessage('건설사 포털 인증 정보로 자동 로그인되었습니다.')
    }, 2500)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginMessage('')
    if (activeTab === 'idp-init') {
        // IdP Init에서는 로그아웃 후 다시 검증 대기 상태보다는 초기화 상태로
        setActiveTab('sp-init') 
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col h-full bg-slate-50">
        {/* 시나리오 선택 탭 (상단 고정) */}
        <div className="p-4 bg-white border-b sticky top-0 z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sp-init">서비스에서 진입</TabsTrigger>
              <TabsTrigger value="idp-init">포털에서 진입</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-md w-full">
            
            {/* 로고 영역 */}
            <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm border border-slate-100">
              {isLoggedIn ? (
                <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in" />
              ) : isLoading ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              ) : (
                <Key className="h-12 w-12 text-primary" />
              )}
            </div>

            {/* 상태 메시지 */}
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isLoggedIn ? '환영합니다!' : '옵션 시스템'}
            </h2>
            
            <p className="text-sm text-slate-500 mb-8 min-h-[20px]">
              {loginMessage || (activeTab === 'sp-init' ? '서비스 이용을 위해 로그인이 필요합니다.' : '건설사 포털에서 접속 중...')}
            </p>

            {/* 메인 액션 영역 */}
            <div className="space-y-4">
              {isLoggedIn ? (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400">USER INFO</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Authenticated</span>
                    </div>
                    <p className="font-bold text-slate-800">홍길동 님</p>
                    <p className="text-sm text-slate-500">101동 1001호 (84A)</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              ) : (
                activeTab === 'sp-init' && !isLoading && (
                  <Button 
                    className="w-full h-14 text-lg gap-2 shadow-lg hover:shadow-xl transition-all"
                    onClick={simulateSpLogin}
                  >
                    <Key className="h-5 w-5" />
                    건설사 SSO 로그인
                  </Button>
                )
              )}
            </div>

            {/* 안내 메시지 (로그인 전일 때만) */}
            {!isLoggedIn && !isLoading && (
              <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-left">
                <p className="font-semibold text-blue-900 mb-1">
                  ℹ️ {activeTab === 'sp-init' ? 'SP-Init' : 'IdP-Init'} 시나리오
                </p>
                <p className="text-blue-700 leading-relaxed">
                  {activeTab === 'sp-init' 
                    ? '사용자가 옵션 시스템에 직접 접속하여 로그인을 시도하는 경우입니다. SSO 버튼 클릭 시 건설사 인증 페이지로 이동합니다.' 
                    : '사용자가 건설사 홈페이지(포털)에 이미 로그인한 상태에서 옵션 시스템 메뉴를 클릭하여 접속하는 경우입니다. 별도 로그인 없이 자동으로 인증됩니다.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
