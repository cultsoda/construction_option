/**
 * M07-2: 영상 가이드 제작
 * 영상 가이드를 업로드하고 관리하는 기능
 */

import React from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Video, Upload, Clock } from 'lucide-react'

interface VideoData {
  id: number
  title: string
  duration: string
  uploadDate: string
}

interface M07_2_VideoGuideProps {
  deviceView: DeviceView
  m07_2_selectedVideo: VideoData | null
  setM07_2_selectedVideo: (video: VideoData | null) => void
}

const sampleVideos: VideoData[] = [
  { id: 1, title: '옵션 선택 가이드', duration: '03:45', uploadDate: '2024.02.01' },
  { id: 2, title: '계약 진행 방법', duration: '02:30', uploadDate: '2024.02.02' },
  { id: 3, title: '자주 묻는 질문', duration: '05:15', uploadDate: '2024.02.03' }
]

export function M07_2_VideoGuide({
  deviceView,
  m07_2_selectedVideo,
  setM07_2_selectedVideo
}: M07_2_VideoGuideProps) {
  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col h-full p-6 space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            영상 가이드 제작
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-1">
            💡 영상 파일을 업로드하여 사용자를 위한 가이드를 제공할 수 있습니다
          </p>
          <p className="text-sm text-muted-foreground">
            업로드한 영상을 관리하고 미리보기로 확인합니다
          </p>
        </div>

        {/* 업로드 영역 */}
        <div className="w-full h-48 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
          <Video className="h-12 w-12 text-slate-400 mb-3" />
          <p className="text-sm font-medium text-slate-600 mb-1">
            비디오 파일을 드래그하거나 클릭하세요
          </p>
          <p className="text-xs text-slate-400">
            MP4, MOV, AVI (최대 100MB)
          </p>
          <Button variant="outline" className="mt-4">
            <Upload className="h-4 w-4 mr-2" />
            파일 선택
          </Button>
        </div>

        {/* 업로드된 영상 목록 */}
        <div className="flex-1 border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-2 border-b">
            <h3 className="font-semibold text-sm">업로드된 영상</h3>
          </div>
          <div className="divide-y">
            {sampleVideos.map((video) => (
              <div
                key={video.id}
                className={`p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer ${
                  m07_2_selectedVideo?.id === video.id
                    ? "bg-primary/5 border-l-4 border-l-primary"
                    : ""
                }`}
                onClick={() => setM07_2_selectedVideo(video)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center">
                    <Video className="h-6 w-6 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{video.title}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    미리보기
                  </Button>
                  <Button variant="destructive" size="sm">
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 선택된 영상 프리뷰 */}
        {m07_2_selectedVideo && (
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">영상 플레이어</p>
                  <p className="text-xs opacity-70 mt-1">
                    {m07_2_selectedVideo.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DeviceFrame>
  )
}
