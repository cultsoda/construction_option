/**
 * M03-1: 3D 뷰어 기본 (평면도 뷰어)
 * 평면도 확대/축소 및 이동 기능을 제공하는 기본 뷰어
 */

import React, { useState } from "react";
import { DeviceFrame } from "../../components/DeviceFrame";
import { DeviceView } from "../../types";
import { ZoomIn, ZoomOut, Home, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

interface M03_1_3DViewerProps {
  deviceView: DeviceView;
}

export function M03_1_3DViewer({ deviceView }: M03_1_3DViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6 relative">
        <div className="mb-4 z-10">
          <h2 className="text-xl font-bold text-foreground mb-2">
            3D 뷰어 (평면도 모드)
          </h2>
          <p className="text-sm text-muted-foreground">
            평면도를 확대/축소하고 이동하여 공간을 탐색합니다.(디자인 도움 필요)
          </p>
        </div>

        {/* 뷰어 영역 */}
        <div
          className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-xl overflow-hidden relative cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 평면도 시뮬레이션 (간단한 도형) */}
          <div
            className="absolute top-1/2 left-1/2 transition-transform duration-100 ease-out origin-center"
            style={{
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
            }}
          >
            <div className="w-[400px] h-[300px] bg-white border-4 border-slate-800 shadow-xl grid grid-cols-2 grid-rows-2 relative">
              {/* 방 1 */}
              <div className="border-r-4 border-b-4 border-slate-800 bg-blue-50/50 flex items-center justify-center">
                <span className="font-bold text-slate-400">침실 1</span>
              </div>
              {/* 방 2 (거실) */}
              <div className="border-b-4 border-slate-800 bg-yellow-50/50 flex items-center justify-center">
                <span className="font-bold text-slate-400">거실</span>
              </div>
              {/* 방 3 (주방) */}
              <div className="border-r-4 border-slate-800 bg-green-50/50 flex items-center justify-center">
                <span className="font-bold text-slate-400">주방/식당</span>
              </div>
              {/* 방 4 (욕실) */}
              <div className="bg-red-50/50 flex items-center justify-center relative">
                <span className="font-bold text-slate-400">침실 2</span>
                {/* 문 표시 (시각적 디테일) */}
                <div className="absolute top-0 left-0 w-12 h-4 bg-white border-b-4 border-l-4 border-r-4 border-slate-800 rounded-b-full transform -translate-y-1/2 translate-x-2"></div>
              </div>

              {/* 현관 */}
              <div className="absolute bottom-10 right-[-40px] w-[40px] h-[60px] border-4 border-l-0 border-slate-800 bg-slate-200 flex items-center justify-center">
                <span className="text-xs font-bold -rotate-90">현관</span>
              </div>
            </div>
          </div>

          {/* 컨트롤 패널 (Overlay) */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white/90 backdrop-blur shadow-lg p-2 rounded-lg border border-slate-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              title="확대"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="초기화"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              title="축소"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </div>

          {/* 안내 메시지 */}
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none">
            <Move className="h-3 w-3" />
            드래그하여 이동 / 버튼으로 줌
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}
