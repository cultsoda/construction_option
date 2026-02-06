/**
 * M01-2: 일반 로그인
 * 아이디/비밀번호 기반 로그인 화면
 */

import React from 'react'
import { Input } from '@/components/ui/input'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'

interface M01_2_LoginProps {
  deviceView: DeviceView
  loginData: { id: string; password: string }
  setLoginData: (data: { id: string; password: string }) => void
  loginError: string
  handleLogin: () => void
}

export function M01_2_Login({
  deviceView,
  loginData,
  setLoginData,
  loginError,
  handleLogin,
}: M01_2_LoginProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col items-center justify-center min-h-full p-8">
        <div className="w-full max-w-md">
          {/* 로고 */}
          <div className="w-20 h-20 bg-primary/10 rounded-xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">LOGO</span>
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-center text-foreground mb-2">
            로그인
          </h2>
          <p className="text-sm text-center text-muted-foreground mb-8">
            옵션 선택을 위해 로그인하세요
          </p>

          {/* 에러 메시지 */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              {loginError}
            </div>
          )}

          {/* 로그인 폼 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                아이디
              </label>
              <Input
                value={loginData.id}
                onChange={(e) =>
                  setLoginData({ ...loginData, id: e.target.value })
                }
                placeholder="아이디를 입력하세요"
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="비밀번호를 입력하세요"
                className="h-12"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full h-14 bg-primary rounded-lg text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              로그인
            </button>

            {/* 추가 링크 */}
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground">아이디 찾기</button>
              <span>|</span>
              <button className="hover:text-foreground">비밀번호 찾기</button>
              <span>|</span>
              <button className="hover:text-foreground">회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
