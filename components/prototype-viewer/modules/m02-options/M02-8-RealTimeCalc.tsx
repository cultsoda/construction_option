/**
 * M02-8: 실시간 금액 계산
 * 선택한 옵션들의 총액을 실시간으로 계산
 */

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView, OptionData } from '../../types'

interface M02_8_RealTimeCalcProps {
  deviceView: DeviceView
  sampleOptionData: OptionData
  calc1Depth: string
  setCalc1Depth: (id: string) => void
  calc2Depth: string[]
  setCalc2Depth: (ids: string[]) => void
}

export function M02_8_RealTimeCalc({
  deviceView,
  sampleOptionData,
  calc1Depth,
  setCalc1Depth,
  calc2Depth,
  setCalc2Depth,
}: M02_8_RealTimeCalcProps) {
  const totalAmount = (() => {
    let total = 0

    const depth1Option = sampleOptionData.depth1Options.find(
      (opt) => opt.id === calc1Depth
    )
    if (depth1Option) total += depth1Option.price

    calc2Depth.forEach((id) => {
      const depth2Option = sampleOptionData.depth2Options.find(
        (opt) => opt.id === id
      )
      if (depth2Option) total += depth2Option.price
    })

    return total
  })()

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            실시간 금액 계산
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 선택한 옵션들의 총액이 실시간으로 계산되어 화면에 표시됩니다
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">평면 타입</h3>
          <div className="flex gap-2">
            {sampleOptionData.depth1Options.map((option) => (
              <button
                key={option.id}
                onClick={() => setCalc1Depth(option.id)}
                className={`flex-1 p-3 border-2 rounded-lg font-medium ${
                  calc1Depth === option.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-border'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">세부 옵션</h3>
          <div className="space-y-2">
            {sampleOptionData.depth2Options.slice(0, 4).map((option) => {
              const isSelected = calc2Depth.includes(option.id)
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    if (isSelected) {
                      setCalc2Depth(calc2Depth.filter((id) => id !== option.id))
                    } else {
                      setCalc2Depth([...calc2Depth, option.id])
                    }
                  }}
                  className={`p-3 border-2 rounded-lg cursor-pointer flex items-center justify-between ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={isSelected} className="h-4 w-4" />
                    <span className="text-sm font-medium">{option.name}</span>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      option.price < 0 ? 'text-red-600' : 'text-primary'
                    }`}
                  >
                    {option.price < 0 ? '' : '+'}
                    {(option.price / 10000).toLocaleString()}만원
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t-2 border-border">
          <div className="flex items-center justify-between p-5 bg-primary/10 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">선택 옵션 총액</p>
              <p className="text-xs text-muted-foreground">VAT 포함</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary transition-all duration-300">
                {(totalAmount / 10000).toLocaleString()}
                <span className="text-xl ml-1">만원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
