import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'

interface StructureType {
  id: string
  name: string
  description: string
  model: string
}

interface M03_5_SliderNavProps {
  deviceView: DeviceView
  m03_5_structureType: string
  setM03_5_structureType: (type: string) => void
  structureTypes: StructureType[]
}

export function M03_5_SliderNav({
  deviceView,
  m03_5_structureType,
  setM03_5_structureType,
  structureTypes,
}: M03_5_SliderNavProps) {
  
  const renderStructure = (typeId: string) => {
    switch (typeId) {
      case 'basic':
        return (
          <div className="relative w-64 h-48 bg-white border-4 border-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-1/2 h-full border-r-4 border-slate-800 bg-blue-100/50 flex items-center justify-center text-slate-500 font-bold">거실</div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b-4 border-slate-800 bg-green-100/50 flex items-center justify-center text-slate-500 font-bold">침실1</div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100/50 flex items-center justify-center text-slate-500 font-bold">주방</div>
          </div>
        )
      case 'expanded':
        return (
          <div className="relative w-64 h-48 bg-white border-4 border-slate-800 rounded-lg shadow-lg overflow-hidden">
            {/* 확장된 거실 */}
            <div className="absolute top-0 left-0 w-2/3 h-full border-r-4 border-slate-800 bg-blue-200/50 flex items-center justify-center text-slate-600 font-bold">거실 (확장)</div>
            <div className="absolute top-0 right-0 w-1/3 h-1/2 border-b-4 border-slate-800 bg-green-100/50 flex items-center justify-center text-slate-500 font-bold">침실1</div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-yellow-100/50 flex items-center justify-center text-slate-500 font-bold">주방</div>
          </div>
        )
      case 'alpharoom':
        return (
          <div className="relative w-64 h-48 bg-white border-4 border-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-1/2 h-full border-r-4 border-slate-800 bg-blue-100/50 flex items-center justify-center text-slate-500 font-bold">거실</div>
            <div className="absolute top-0 right-0 w-1/2 h-1/3 border-b-4 border-slate-800 bg-green-100/50 flex items-center justify-center text-slate-500 font-bold">침실1</div>
            {/* 알파룸 추가 */}
            <div className="absolute top-1/3 right-0 w-1/2 h-1/3 border-b-4 border-slate-800 bg-purple-100/50 flex items-center justify-center text-purple-600 font-bold">알파룸</div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-yellow-100/50 flex items-center justify-center text-slate-500 font-bold">주방</div>
          </div>
        )
      default:
        return <div className="text-slate-400">구조물 미리보기 없음</div>
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            구조물 동적 교체
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 평면 타입에 따라 3D 모델이 동적으로 교체되어 표시됩니다
          </p>
        </div>

        {/* 구조물 선택 */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {structureTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setM03_5_structureType(type.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                m03_5_structureType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{type.name}</span>
                {m03_5_structureType === type.id && <Badge>적용중</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">
                {type.description}
              </p>
            </button>
          ))}
        </div>

        {/* 뷰어 시뮬레이션 */}
        <div className="flex-1 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden p-8 transition-all duration-500">
          {renderStructure(m03_5_structureType)}
          
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm">
              Model: {structureTypes.find((t) => t.id === m03_5_structureType)?.model}
            </Badge>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
