import { createContext, useContext, useCallback, useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"

const NotificationsContext = createContext(null)

let idCounter = 0
const nextId = () => ++idCounter

export function NotificationsProvider({ children, autoHide = 4500, max = 5 }) {
    const [toasts, setToasts] = useState([])
    const timers = useRef({})

    const remove = useCallback((id) => {
        setToasts((t) => t.filter((x) => x.id !== id))
        if (timers.current[id]) {
            clearTimeout(timers.current[id])
            delete timers.current[id]
        }
    }, [])

    const push = useCallback(
        (toast) => {
            const id = nextId()
            setToasts((t) => {
                const next = [...t, { id, variant: "info", title: "", ...toast }]
                return next.slice(-max)
            })
            timers.current[id] = setTimeout(() => remove(id), toast.duration || autoHide)
            return id
        },
        [autoHide, max, remove]
    )

    const api = {
        push,
        remove,
        success: (msg, opts = {}) => push({ message: msg, variant: "success", ...opts }),
        error: (msg, opts = {}) => push({ message: msg, variant: "error", ...opts }),
        warning: (msg, opts = {}) => push({ message: msg, variant: "warning", ...opts }),
        info: (msg, opts = {}) => push({ message: msg, variant: "info", ...opts }),
    }

    useEffect(
        () => () => {
            // cleanup unmount
            Object.values(timers.current).forEach(clearTimeout)
        },
        []
    )

    return (
        <NotificationsContext.Provider value={api}>
            {children}
            <div className="fixed z-50 top-4 right-4 space-y-3 w-80">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`rounded-lg shadow-lg border p-4 text-sm backdrop-blur bg-white/90 border-green-200 animate-[fadeIn_.25s_ease]`}
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                                {t.title && <div className="font-semibold mb-0.5 text-green-800">{t.title}</div>}
                                <div className="text-green-900">{t.message}</div>
                            </div>
                            <button onClick={() => remove(t.id)} className="text-green-700 hover:text-green-900">
                                ✕
                            </button>
                        </div>
                        <div
                            className={`mt-2 h-1 rounded bg-gradient-to-r from-green-600 via-yellow-400 to-green-400 animate-[shrink_${(t.duration || autoHide) / 1000}s_linear_forwards]`}
                        ></div>
                    </div>
                ))}
            </div>
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px);} to { opacity:1; transform: translateY(0);} }
        @keyframes shrink { from { width:100%; } to { width:0%; } }
      `}</style>
        </NotificationsContext.Provider>
    )
}

NotificationsProvider.propTypes = {
    children: PropTypes.node,
    autoHide: PropTypes.number,
    max: PropTypes.number,
}

export function useNotifications() {
    const ctx = useContext(NotificationsContext)
    if (!ctx) throw new Error("useNotifications debe usarse dentro de <NotificationsProvider>")
    return ctx
}
