import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getReferences } from "../../../apis/reference"

function EspeciesForm({ initialData = {}, onChange, fields = [], zodSchema }) {
    // Normalizar initialData: null -> ""
    const normalizedInitialData = Object.fromEntries(
        Object.entries(initialData).map(([key, value]) => [key, value == null ? "" : value])
    )
    const labelCon = "text-gray-600 text-sm mb-1"
    const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(zodSchema),
        defaultValues: normalizedInitialData,
    })
    const [referencias, setReferencias] = useState([])

    useEffect(() => {
        Object.entries(normalizedInitialData).forEach(([key, value]) => {
            setValue(key, value)
        })
    }, [normalizedInitialData, setValue])

    useEffect(() => {
        const subscription = watch((values) => {
            if (onChange) onChange(values)
        })
        return () => subscription.unsubscribe()
    }, [watch, onChange])

    const onSubmit = (data) => {
        if (onChange) onChange(data)
    }
    const loadReferencias = async () => {
        if (referencias.length === 0) {
            try {
                const data = await getReferences()
                setReferencias(data)
            } catch (error) {
                console.error("Error cargando referencias:", error)
            }
        }
    }

    const showHelp = (help, label) => {
        const message = help || `Información: ${label}`
        // Simple alert for now; can be replaced with a tooltip/modal later
        alert(message)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ label, name, type, options, help }) => (
                <div key={name} className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label className={labelCon}>{label}</label>
                        <button
                            type="button"
                            onClick={() => showHelp(help, label)}
                            className="ml-2 text-gray-500 hover:text-gray-800"
                            aria-label={`Ayuda ${label}`}
                        >
                            {/* Info icon (small svg) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-3a1 1 0 10-2 0v1a1 1 0 102 0V7zm1 4a1 1 0 10-2 0v3a1 1 0 102 0v-3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    {type === "select" ? (
                        name === "reference_by" ? (
                            <select className={InputCon} onFocus={loadReferencias} {...register(name)}>
                                <option value="">Seleccione una opción</option>
                                {referencias.map((ref) => (
                                    <option key={ref.id} value={ref.id}>
                                        {ref.referencia}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select className={InputCon} {...register(name)}>
                                <option value="">Seleccione una opción</option>
                                {options &&
                                    options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                            </select>
                        )
                    ) : type === "textarea" ? (
                        <textarea className={InputCon} rows="4" {...register(name)} />
                    ) : (
                        <input type={type || "text"} className={InputCon} {...register(name)} />
                    )}
                    {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
                </div>
            ))}

            <div className="col-span-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Validar
                </button>
            </div>
        </form>
    )
}

export default EspeciesForm

EspeciesForm.propTypes = {
    initialData: PropTypes.object,
    onChange: PropTypes.func,
    fields: PropTypes.array,
    zodSchema: PropTypes.any,
}
