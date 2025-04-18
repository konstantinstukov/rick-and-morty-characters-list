import { renderHook } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { describe, it, vi, Mock, beforeEach, expect } from "vitest";
import { useUrlParams } from "./useUrlParams";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("useUrlParams", () => {
  let mockPush: Mock;
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    mockPush = vi.fn();
    mockSearchParams = new URLSearchParams();

    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (usePathname as Mock).mockReturnValue("/test");
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  it("should get a specific parameter", () => {
    mockSearchParams.set("page", "2");

    const { result } = renderHook(() => useUrlParams());

    expect(result.current.getParam("page")).toBe("2");
    expect(result.current.getParam("test")).toBe("");
  });

  it("should get all parameters", () => {
    mockSearchParams.set("page", "1");
    mockSearchParams.set("name", "Rick");
    mockSearchParams.set("status", "alive");

    const { result } = renderHook(() => useUrlParams());

    expect(result.current.getParams()).toEqual({
      page: "1",
      name: "Rick",
      status: "alive",
    });
  });

  it("should set parameters to new", () => {
    const { result } = renderHook(() => useUrlParams());

    result.current.setParams({ name: "Rick", gender: "Male" });

    expect(mockPush).toHaveBeenCalledWith("/test?name=Rick&gender=Male");
  });

  it("should delete parameters if value is undefined or empty", () => {
    mockSearchParams.set("status", "Dead");
    mockSearchParams.set("page", "2");

    const { result } = renderHook(() => useUrlParams());

    result.current.setParams({ page: "", status: "Dead" });

    expect(mockPush).toHaveBeenCalledWith("/test?status=Dead");
  });
});
