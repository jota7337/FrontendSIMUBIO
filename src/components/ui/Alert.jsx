import PropTypes from "prop-types"

const baseClasses = "w-full flex gap-3 items-start rounded-lg p-4 shadow-md border relative"
const variants = {
    success: "bg-green-50 border-green-300 text-green-800",
    error: "bg-red-50 border-red-300 text-red-800",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    info: "bg-blue-50 border-blue-300 text-blue-800",
}

export function Alert({ variant = "info", title, children, onClose, className = "" }) {
    return (
        <div className={`${baseClasses} ${variants[variant]} ${className}`}>
            <div className="flex-1">
                {title && <div className="font-semibold mb-1">{title}</div>}
                <div className="text-sm leading-relaxed">{children}</div>
            </div>
            {onClose && (
                <button
                    aria-label="Cerrar"
                    onClick={onClose}
                    className="text-inherit/70 hover:text-inherit absolute top-2 right-2"
                ></button>
            )}
        </div>
    )
}

Alert.propTypes = {
    variant: PropTypes.oneOf(["success", "error", "warning", "info"]),
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func,
    className: PropTypes.string,
}

export default Alert
