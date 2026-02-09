import React, { useState } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Input } from '@/components/ui/input' // Input 컴포넌트 import

interface M01_3_UserInfoProps {
  deviceView: DeviceView
}

export function M01_3_UserInfo({ deviceView }: M01_3_UserInfoProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    unit: '',
    contractNumber: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = '이름을 입력해주세요'
    if (!formData.phone) newErrors.phone = '전화번호를 입력해주세요'
    if (!formData.type) newErrors.type = '타입을 선택해주세요'
    if (!formData.unit) newErrors.unit = '동/호수를 입력해주세요'
    return newErrors
  }

  const handleSubmit = () => {
    const findErrors = validate()
    if (Object.keys(findErrors).length > 0) {
      setErrors(findErrors)
      setIsSubmitted(false)
    } else {
      setErrors({})
      setIsSubmitted(true)
      // 실제로는 여기에 다음 단계로 넘어가는 로직 또는 데이터 저장 로직이 들어갑니다.
      // alert('정보 입력이 완료되었습니다!')
    }
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="text-center mb-8 mt-4">
          <div className="w-20 h-20 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">LOGO</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            옵션 선택을 위한 정보 입력
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            💡 옵션 선택을 시작하기 위해 필요한 정보를 입력합니다
          </p>
          <p className="text-sm text-muted-foreground">
            이름, 전화번호, 타입, 동/호수를 입력해주세요
          </p>
        </div>

        <div className="space-y-4 w-full max-w-md mx-auto flex-1">
          {isSubmitted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-in fade-in">
              <Check className="h-5 w-5 text-green-600" />
              <p className="text-sm font-semibold text-green-900">
                정보 입력이 완료되었습니다!
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              이름 *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="이름을 입력하세요"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              전화번호 *
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="전화번호를 입력하세요"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              타입 *
            </label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full h-12 border-2 rounded-lg px-3 bg-white ${
                  errors.type ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">선택하세요</option>
                <option value="84A">84A타입</option>
                <option value="84B">84B타입</option>
                <option value="108">108타입</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.type && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.type}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              동/호수 *
            </label>
            <Input
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="동/호수를 입력하세요"
              className={errors.unit ? 'border-red-500' : ''}
            />
            {errors.unit && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.unit}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              계약번호
            </label>
            <Input
              value={formData.contractNumber}
              onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
              placeholder="계약번호 (선택 사항)"
            />
          </div>

          <div className="pt-6 pb-8">
            <button
              onClick={handleSubmit}
              className="w-full h-14 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <span className="text-white font-semibold text-lg">
                입력 완료
              </span>
            </button>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
