import React, { useState, useRef } from 'react'
import Image from 'next/image' // next/image import
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X } from 'lucide-react'

interface M06_1_LogoProps {
  deviceView: DeviceView
  m06_1_logo: string | null
  setM06_1_logo: (logo: string | null) => void
}

export function M06_1_Logo({
  deviceView,
  m06_1_logo,
  setM06_1_logo
}: M06_1_LogoProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      // 실제 파일 업로드 로직 대신, 파일 이름으로 URL을 시뮬레이션
      const simulatedUrl = URL.createObjectURL(file); // 임시 URL 생성

      setImageUrl(simulatedUrl);
      setM06_1_logo(file.name); // 파일 이름을 텍스트 로고 대신 설정
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            로고 교체
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 시스템에 표시되는 로고 이미지를 업로드하여 교체할 수 있습니다
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* 로고 미리보기 */}
          <div className="mb-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              현재 적용된 로고
            </p>
            <div className="w-40 h-40 bg-white border-2 border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden relative">
              {imageUrl ? ( // 이미지 URL이 있으면 이미지 표시
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image src={imageUrl} alt="Uploaded Logo" layout="fill" objectFit="contain" />
                  <button
                    onClick={() => { setImageUrl(null); setM06_1_logo(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : m06_1_logo ? ( // 텍스트 로고가 있으면 텍스트 표시
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {m06_1_logo}
                  </span>
                  <button
                    onClick={() => setM06_1_logo(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : ( // 아무것도 없으면 '로고 없음' 표시
                <span className="text-muted-foreground text-sm">
                  로고 없음
                </span>
              )}
            </div>
          </div>

          {/* 업로드 영역 */}
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-foreground mb-2">
              새 로고 업로드
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="파일을 선택하거나 드래그하세요"
                className="flex-1 cursor-pointer"
                onClick={triggerFileInput}
                value={m06_1_logo || ''} // 파일 이름 표시
                readOnly
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button variant="outline" onClick={triggerFileInput}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * 실제 구현 시 이미지 파일 업로드 기능이 제공됩니다. (예: PNG, JPG)
            </p>
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
