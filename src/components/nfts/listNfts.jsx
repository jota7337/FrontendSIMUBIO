import { useState, useEffect } from "react"

const contractsData = [
    {
        id: 1,
        name: "Token ERC20",
        description: "Contrato inteligente para la gestión de tokens ERC20.",
        address: "0x123...abc",
    },
    {
        id: 2,
        name: "NFT Marketplace",
        description: "Plataforma para la compra y venta de NFTs.",
        address: "0x456...def",
    },
    {
        id: 3,
        name: "DAO Governance",
        description: "Contrato para la gobernanza descentralizada.",
        address: "0x789...ghi",
    },
]

export default function ContractsList() {
    const [contracts, setContracts] = useState([])
    const [selectedContract, setSelectedContract] = useState(null)

    useEffect(() => {
        setContracts(contractsData)
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contratos Inteligentes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contracts.map((contract) => (
                    <div
                        key={contract.id}
                        className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer"
                        onClick={() => {
                            setSelectedContract(contract)
                        }}
                    >
                        <h2 className="text-xl font-semibold">{contract.name}</h2>
                        <p className="text-sm mt-2">{contract.description}</p>
                        <p className="mt-2 text-sm text-gray-400">Dirección: {contract.address}</p>
                    </div>
                ))}
            </div>
            {selectedContract ? (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl w-full">
                        <h2 className="text-2xl font-bold">{selectedContract.name}</h2>
                        <p className="mt-2">{selectedContract.description}</p>
                        <p className="mt-2 text-gray-400">Dirección: {selectedContract.address}</p>
                        <p className="mt-4">{selectedContract.details}</p>
                        <button className="mt-4 bg-red-500 px-4 py-2 rounded" onClick={() => setSelectedContract(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
