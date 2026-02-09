/**
 * M02-2: 2Depth 옵션 선택
 * 패키지/개별 선택, 연동 로직, 멀티셀렉트 등 복합 기능
 */

import React from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DeviceFrame } from "../../components/DeviceFrame";
import { DeviceView } from "../../types";

interface M02_2_Depth2Props {
  deviceView: DeviceView;
  isMobile: boolean;
  selectedPackage: boolean;
  setSelectedPackage: (value: boolean) => void;
  selectedOptions: Record<string, string>; // 부모 파일의 타입과 일치시킵니다.
  setSelectedOptions: (options: any) => void;
  conditions: {
    depthInfluence: boolean;
    multiSelect: boolean;
    [key: string]: any; // conditions에도 다른 설정이 들어올 수 있으므로 추가 권장
  };
  showPackageConfirm: boolean;
  setShowPackageConfirm: (value: boolean) => void;
}

export function M02_2_Depth2({
  deviceView,
  isMobile,
  selectedPackage,
  setSelectedPackage,
  selectedOptions,
  setSelectedOptions,
  conditions,
  showPackageConfirm,
  setShowPackageConfirm,
}: M02_2_Depth2Props) {
  let totalPrice = 0;
  if (selectedPackage) totalPrice += 5000000;

  const doorOptions =
    selectedPackage && conditions.depthInfluence
      ? [
          {
            value: "premium-a",
            label: "프리미엄 A형",
            price: 0,
            included: true,
          },
          { value: "premium-b", label: "프리미엄 B형", price: 300000 },
        ]
      : [
          { value: "standard", label: "일반형", price: 500000 },
          { value: "premium", label: "프리미엄형", price: 800000 },
        ];

  if (selectedOptions.aircon === "partial") totalPrice += 1000000;
  if (selectedOptions.aircon === "full") totalPrice += 2000000;

  const selectedDoorOption = doorOptions.find(
    (opt) => opt.value === selectedOptions.door
  );
  if (selectedDoorOption) totalPrice += selectedDoorOption.price;

  if (selectedOptions.closet === "two") totalPrice += 2000000;
  if (selectedOptions.closet === "three") totalPrice += 3000000;

  const isMultiSelect = conditions.multiSelect;
  const multiClosetSelections = selectedOptions.closet
    ? selectedOptions.closet.split(",")
    : [];
  if (isMultiSelect) {
    totalPrice = 0;
    if (selectedPackage) totalPrice += 5000000;
    if (selectedOptions.aircon === "partial") totalPrice += 1000000;
    if (selectedOptions.aircon === "full") totalPrice += 2000000;
    if (selectedDoorOption) totalPrice += selectedDoorOption.price;
    if (multiClosetSelections.includes("two")) totalPrice += 2000000;
    if (multiClosetSelections.includes("three")) totalPrice += 3000000;
  }

  const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

  const handlePackageToggle = () => {
    if (selectedPackage && conditions.depthInfluence) {
      setShowPackageConfirm(true);
    } else {
      setSelectedPackage(!selectedPackage);
    }
  };

  const confirmPackageRemoval = (confirm: boolean) => {
    if (confirm) {
      setSelectedPackage(false);
      setSelectedOptions({ ...selectedOptions, door: "" });
    }
    setShowPackageConfirm(false);
  };

  const handleClosetChange = (value: string) => {
    if (isMultiSelect) {
      const current = multiClosetSelections;
      const newSelections = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setSelectedOptions({
        ...selectedOptions,
        closet: newSelections.join(","),
      });
    } else {
      setSelectedOptions({ ...selectedOptions, closet: value });
    }
  };

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            2Depth 옵션 선택
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 패키지 선택과 개별 옵션 선택을 함께 제공하며, 선택에 따라 다른 옵션이 연동됩니다
          </p>
        </div>

        {/* Confirmation Modal */}
        {showPackageConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-[inherit]">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
              <h3 className="text-lg font-bold text-foreground mb-3">
                패키지 해제 확인
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                패키지를 해제하시겠습니까? 관련 옵션이 초기화됩니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => confirmPackageRemoval(false)}
                  className="flex-1 h-12 border-2 border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => confirmPackageRemoval(true)}
                  className="flex-1 h-12 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  해제하기
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "grid-cols-2"
          } gap-6 flex-1`}
        >
          {/* LEFT: 1Depth Package Options */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground mb-3">
              [패키지 옵션]
            </h3>

            <div
              onClick={handlePackageToggle}
              role="button"
              tabIndex={0}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                selectedPackage
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Checkbox checked={selectedPackage} className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    프리미엄 가구 패키지
                  </p>
                  <p className="text-sm font-bold text-primary">
                    + 5,000,000원
                  </p>
                  {selectedPackage && conditions.depthInfluence && (
                    <Badge className="mt-2 bg-blue-500 text-white text-xs">
                      패키지 적용됨
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 2Depth Individual Options */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground mb-3">
              [개별 선택]
            </h3>

            {/* 시스템에어컨 */}
            <div className="border-2 border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  시스템에어컨
                </span>
              </div>
              <div className="space-y-2 ml-6">
                {[
                  { value: "", label: "미선택", price: 0 },
                  { value: "partial", label: "거실+침실", price: 1000000 },
                  { value: "full", label: "전체", price: 2000000 },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="aircon"
                      value={option.value}
                      checked={selectedOptions.aircon === option.value}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          aircon: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">
                      {option.label}{" "}
                      {option.price > 0 &&
                        `(+ ${(option.price / 10000).toFixed(0)}만원)`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 현관중문 */}
            <div className="border-2 border-border rounded-lg p-4 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  현관중문
                </span>
              </div>
              <div className="space-y-2 ml-6">
                {doorOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="door"
                      value={option.value}
                      checked={selectedOptions.door === option.value}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          door: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">
                      {option.label}{" "}
                      {option.included
                        ? "(포함)"
                        : option.price > 0
                        ? `(+ ${(option.price / 10000).toFixed(0)}만원)`
                        : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 침실 붙박이장 */}
            <div className="border-2 border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    침실 붙박이장
                  </span>
                </div>
                {isMultiSelect && multiClosetSelections.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    선택됨: {multiClosetSelections.length}개
                  </Badge>
                )}
              </div>
              <div className="space-y-2 ml-6">
                {[
                  { value: "two", label: "2개실", price: 2000000 },
                  { value: "three", label: "3개실", price: 3000000 },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {isMultiSelect ? (
                      <Checkbox
                        checked={multiClosetSelections.includes(option.value)}
                        onCheckedChange={() => handleClosetChange(option.value)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type="radio"
                        name="closet"
                        value={option.value}
                        checked={selectedOptions.closet === option.value}
                        onChange={(e) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            closet: e.target.value,
                          })
                        }
                        className="w-4 h-4"
                      />
                    )}
                    <span className="text-sm text-foreground">
                      {option.label} (+ {(option.price / 10000).toFixed(0)}만원)
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-8 pt-6 border-t-2 border-border pb-8">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              총 옵션 금액:
            </span>
            <span className="text-3xl font-bold text-primary transition-all duration-300">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}
