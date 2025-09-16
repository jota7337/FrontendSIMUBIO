import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

function EspeciesForm({ initialData = {}, onChange, fields = [], zodSchema }) {
    console.log("Información recibida en EspeciesForm (initialData):", initialData)

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
        defaultValues: initialData,
    })

    useEffect(() => {
        Object.entries(initialData).forEach(([key, value]) => {
            setValue(key, value)
        })
    }, [initialData, setValue])

    useEffect(() => {
        const subscription = watch((values) => {
            if (onChange) onChange(values)
        })
        return () => subscription.unsubscribe()
    }, [watch, onChange])

    const onSubmit = (data) => {
        console.log("Datos válidos:", data)
        if (onChange) onChange(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ label, name, type, options }) => (
                <div key={name} className="flex flex-col">
                    <label className={labelCon}>{label}</label>
                    {type === "select" ? (
                        <select className={InputCon} {...register(name)}>
                            <option value="">Seleccione una opción</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input type="text" className={InputCon} {...register(name)} />
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
