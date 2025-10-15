import { vi } from "vitest"
import "@testing-library/jest-dom"

// Mock <dialog> y showModal/close para jsdom
if (typeof window !== "undefined") {
    window.HTMLDialogElement = class extends HTMLElement {
        showModal = vi.fn()
        close = vi.fn()
    }
}
