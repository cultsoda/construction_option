/**
 * DeviceFrame - 디바이스 시뮬레이션 프레임
 *
 * Desktop, Tablet, Mobile 화면을 시뮬레이션하는 프레임 컴포넌트
 */

import React from 'react'
import { DeviceView } from '../types'

interface DeviceFrameProps {
  deviceView: DeviceView
  children: React.ReactNode
}

export function DeviceFrame({ deviceView, children }: DeviceFrameProps) {
  const isMobile = deviceView === 'mobile'
  const isTablet = deviceView === 'tablet'

  // Device frame styles
  const deviceStyles = isMobile
    ? 'w-[375px] h-[90%] border-[8px] border-slate-800 rounded-[3rem]'
    : isTablet
    ? 'w-[768px] h-[90%] border-[12px] border-slate-800 rounded-[2rem]'
    : 'w-full h-full border-none rounded-none'

  const contentContainerStyles = `bg-white shadow-2xl transition-all duration-300 flex-1 w-full h-full relative overflow-y-auto ${
    isMobile || isTablet ? 'w-full' : 'w-full rounded-none'
  }`

  return (
    <div
      className={`flex items-center justify-center h-full w-full p-8 bg-slate-100/50 ${
        !isMobile && !isTablet ? 'p-0' : ''
      }`}
    >
      <div
        className={`${deviceStyles} bg-white shadow-xl flex flex-col transition-all duration-300 relative`}
      >
        {/* Status Bar Mockup for Mobile/Tablet */}
        {(isMobile || isTablet) && (
          <div className="h-6 w-full bg-slate-800 flex items-center justify-between px-6 flex-none z-10">
            <div className="w-16 h-2 bg-slate-700 rounded-full opacity-50" />
          </div>
        )}

        {/* Content Container */}
        <div className={contentContainerStyles}>{children}</div>

        {/* Home Indicator for Mobile */}
        {isMobile && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-10 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
