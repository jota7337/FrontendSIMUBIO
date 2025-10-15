import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterAll } from "vitest"
import { useWindowSize } from "../lib/useWindowSize"

describe("useWindowSize", () => {
    const originalInnerWidth = window.innerWidth
    const originalInnerHeight = window.innerHeight

    beforeEach(() => {
        window.innerWidth = 1024
        window.innerHeight = 768
    })

    afterAll(() => {
        window.innerWidth = originalInnerWidth
        window.innerHeight = originalInnerHeight
    })

    it("retorna el tamaño y breakpoint inicial", () => {
        const { result } = renderHook(() => useWindowSize())
        expect(result.current.width).toBe(1024)
        expect(result.current.height).toBe(768)
        expect(result.current.breakpoint).toBe("lg")
    })

    it("actualiza el tamaño y breakpoint al cambiar el tamaño de la ventana", () => {
        const { result } = renderHook(() => useWindowSize())
        act(() => {
            window.innerWidth = 500
            window.innerHeight = 400
            window.dispatchEvent(new Event("resize"))
        })
        expect(result.current.width).toBe(500)
        expect(result.current.height).toBe(400)
        expect(result.current.breakpoint).toBe("xs")
    })

    it("limpia el event listener al desmontar", () => {
        const addSpy = vi.spyOn(window, "addEventListener")
        const removeSpy = vi.spyOn(window, "removeEventListener")
        const { unmount } = renderHook(() => useWindowSize())
        expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function))
        unmount()
        expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function))
        addSpy.mockRestore()
        removeSpy.mockRestore()
    })
})
