import { useEffect, useState } from "react"
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { getReferences } from "../apis/reference"
import { getEspecieByReferenceUser } from "../apis/Especie"
import logo from "../../public/universidad.png"

export default function Dashboard() {
    const [referenceStats, setReferenceStats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const references = await getReferences()
            const stats = []
            for (const ref of references) {
                const especies = await getEspecieByReferenceUser(ref.id)
                stats.push({
                    referencia: ref.referencia,
                    cantidad: especies.length,
                    aprobadas: especies.filter((e) => e.estado === 1).length,
                })
            }
            setReferenceStats(stats)
            setLoading(false)
        }
        fetchData()
    }, [])

    const dataBar = referenceStats.map((r) => ({ name: r.referencia, value: r.cantidad }))
    const dataPie = referenceStats.map((r) => ({ name: r.referencia, value: r.aprobadas }))

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-green-50">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 border border-green-300">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt="Logo Universidad El Bosque"
                            className="h-16 w-16 rounded-full border-2 border-green-700 bg-yellow-300"
                        />
                        <div>
                            <h1 className="text-3xl font-extrabold text-green-800 tracking-tight">Dashboard </h1>
                        </div>
                    </div>
                    <span className="px-4 py-2 rounded-full bg-yellow-400 text-green-900 font-bold shadow">Especies</span>
                </div>

                {!loading && (
                    <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center shadow">
                            <span className="text-2xl font-bold text-green-800">
                                {referenceStats.reduce((acc, r) => acc + r.cantidad, 0)}
                            </span>
                            <span className="text-sm text-green-700 font-semibold mt-2">Total de Especies</span>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex flex-col items-center shadow">
                            <span className="text-2xl font-bold text-yellow-700">
                                {referenceStats.reduce((acc, r) => acc + r.aprobadas, 0)}
                            </span>
                            <span className="text-sm text-yellow-700 font-semibold mt-2">Total Aprobadas</span>
                        </div>
                        <div className="bg-green-100 border border-green-300 rounded-xl p-6 flex flex-col items-center shadow">
                            <span className="text-2xl font-bold text-green-900">
                                {referenceStats.length > 0
                                    ? (
                                          (referenceStats.reduce((acc, r) => acc + r.aprobadas, 0) /
                                              referenceStats.reduce((acc, r) => acc + r.cantidad, 0)) *
                                          100
                                      ).toFixed(1)
                                    : 0}
                                %
                            </span>
                            <span className="text-sm text-green-800 font-semibold mt-2">% de Aprobación</span>
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className="text-center text-green-700 font-bold text-xl py-12">Cargando datos...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-green-800 mb-2">Resumen por Referencia</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {referenceStats.map((ref, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-green-200 bg-green-50 shadow flex flex-col items-center"
                                    >
                                        <h3 className="text-lg font-bold text-green-700 mb-1">{ref.referencia}</h3>
                                        <p className="text-3xl font-extrabold text-green-900">{ref.cantidad}</p>
                                        <span className="text-sm font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded mt-2">
                                            Aprobadas: {ref.aprobadas}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <div className="bg-white rounded-xl border border-yellow-200 shadow p-4">
                                <h2 className="text-lg font-bold text-yellow-700 mb-2 text-center">
                                    Registro de Especies por colección
                                </h2>
                                <BarChart width={350} height={220} data={dataBar}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#2e7d32" />
                                    <YAxis stroke="#2e7d32" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#43a047" />
                                </BarChart>
                            </div>
                            <div className="bg-white rounded-xl border border-green-200 shadow p-4">
                                <h2 className="text-lg font-bold text-green-700 mb-2 text-center">
                                    Especies Aprobadas por Referencia
                                </h2>
                                <PieChart width={350} height={220}>
                                    <Pie
                                        data={dataPie}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#fbc02d"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
