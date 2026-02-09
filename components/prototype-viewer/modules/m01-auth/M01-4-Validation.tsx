/**
 * M01-4: 정보 검증
 * 실시간/제출시 검증 기능이 포함된 고객 정보 입력 화면
 */

import React from "react";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeviceFrame } from "../../components/DeviceFrame";
import { DeviceView } from "../../types";

interface M01_4_ValidationProps {
  deviceView: DeviceView;
  formData: {
    name: string;
    phone: string;
    type: string;
    unit: string;
  };
  setFormData: (data: any) => void;
  conditions: {
    validationType: string;
    [key: string]: any; // 이 줄을 추가하여 다른 속성들이 들어오는 것을 허용합니다.
  };
  submitAttempted: boolean;
  setSubmitAttempted: (value: boolean) => void;
  showSubmitSuccess: boolean;
  setShowSubmitSuccess: (value: boolean) => void;
}

export function M01_4_Validation({
  deviceView,
  formData,
  setFormData,
  conditions,
  submitAttempted,
  setSubmitAttempted,
  showSubmitSuccess,
  setShowSubmitSuccess,
}: M01_4_ValidationProps) {
  // Validation logic
  const validateName = (value: string) => {
    if (!value) return "이름을 입력해주세요";
    if (value.length < 2) return "이름을 2자 이상 입력해주세요";
    return "";
  };

  const validatePhone = (value: string) => {
    if (!value) return "전화번호를 입력해주세요";
    const numbersOnly = value.replace(/[^0-9]/g, "");
    if (!/^[0-9]*$/.test(value)) return "숫자만 입력 가능합니다";
    if (numbersOnly.length !== 11) return "11자리를 입력해주세요";
    return "";
  };

  const validateType = (value: string) => {
    if (!value) return "타입을 선택해주세요";
    return "";
  };

  const validateUnit = (value: string) => {
    if (!value) return "동/호수를 입력해주세요";
    return "";
  };

  const isRealtime = conditions.validationType === "실시간";
  const nameError =
    isRealtime || submitAttempted ? validateName(formData.name) : "";
  const phoneError =
    isRealtime || submitAttempted ? validatePhone(formData.phone) : "";
  const typeError =
    isRealtime || submitAttempted ? validateType(formData.type) : "";
  const unitError =
    isRealtime || submitAttempted ? validateUnit(formData.unit) : "";

  const hasErrors = !!(nameError || phoneError || typeError || unitError);
  const allFieldsFilled =
    formData.name && formData.phone && formData.type && formData.unit;

  const handleSubmit = () => {
    console.log("[v0] Form submit attempted");
    setSubmitAttempted(true);

    if (!hasErrors && allFieldsFilled) {
      console.log("[v0] Form validation passed");
      setShowSubmitSuccess(true);
      setTimeout(() => setShowSubmitSuccess(false), 3000);
    } else {
      console.log("[v0] Form validation failed");
    }
  };

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">정보 검증</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 입력한 정보를 실시간 또는 제출 시점에 검증하여 오류를 방지합니다
          </p>
        </div>

        {/* Error Summary for 제출시 validation */}
        {!isRealtime && submitAttempted && hasErrors && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-900 mb-2">
              다음 항목을 확인해주세요:
            </p>
            <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
              {nameError && <li>{nameError}</li>}
              {phoneError && <li>{phoneError}</li>}
              {typeError && <li>{typeError}</li>}
              {unitError && <li>{unitError}</li>}
            </ul>
          </div>
        )}

        {/* Success Message */}
        {showSubmitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-center gap-3">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-900">
              입력이 완료되었습니다
            </p>
          </div>
        )}

        <div className="space-y-4 w-full max-w-md mx-auto flex-1">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              이름 *
            </label>
            <div className="relative">
              <Input
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setSubmitAttempted(false);
                }}
                className={`h-12 ${
                  nameError
                    ? "border-red-500 bg-red-50"
                    : formData.name && !nameError
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
                placeholder="이름 입력"
              />
              {formData.name && !nameError && (
                <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
              )}
            </div>
            {nameError && isRealtime && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {nameError}
              </p>
            )}
            {formData.name && !nameError && isRealtime && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Check className="h-3 w-3" />
                유효한 이름입니다
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              전화번호 *
            </label>
            <div className="relative">
              <Input
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  setSubmitAttempted(false);
                }}
                className={`h-12 ${
                  phoneError
                    ? "border-red-500 bg-red-50"
                    : formData.phone && !phoneError
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
                placeholder="010-1234-5678"
              />
              {formData.phone && !phoneError && (
                <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
              )}
            </div>
            {phoneError && isRealtime && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {phoneError}
              </p>
            )}
            {formData.phone && !phoneError && isRealtime && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Check className="h-3 w-3" />
                유효한 전화번호입니다
              </p>
            )}
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              타입 *
            </label>
            <select
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
                setSubmitAttempted(false);
              }}
              className={`w-full h-12 border-2 rounded-lg px-3 bg-white ${
                typeError
                  ? "border-red-500 bg-red-50"
                  : formData.type && !typeError
                  ? "border-green-500 bg-green-50"
                  : "border-border"
              }`}
            >
              <option value="">선택하세요</option>
              <option value="84A">84A타입</option>
              <option value="84B">84B타입</option>
              <option value="108">108타입</option>
            </select>
            {typeError && isRealtime && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {typeError}
              </p>
            )}
          </div>

          {/* Unit Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              동/호수 *
            </label>
            <div className="relative">
              <Input
                value={formData.unit}
                onChange={(e) => {
                  setFormData({ ...formData, unit: e.target.value });
                  setSubmitAttempted(false);
                }}
                className={`h-12 ${
                  unitError
                    ? "border-red-500 bg-red-50"
                    : formData.unit && !unitError
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
                placeholder="101동 1001호"
              />
              {formData.unit && !unitError && (
                <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
              )}
            </div>
            {unitError && isRealtime && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="h-3 w-3" />
                {unitError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 pb-8">
            <button
              onClick={handleSubmit}
              disabled={isRealtime && (hasErrors || !allFieldsFilled)}
              className={`w-full h-14 rounded-lg flex items-center justify-center transition-all ${
                isRealtime && (hasErrors || !allFieldsFilled)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 cursor-pointer"
              }`}
            >
              <span className="font-semibold text-lg">입력 완료</span>
            </button>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}
