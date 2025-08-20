import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";


const dataBar = [
  { name: "Certified Road Project", value: 2197 },
  { name: "Certified Build Project", value: 3197 },
  { name: "Urban Project", value: 5188 },
  { name: "Rural Project", value: 2188 },
];

const dataPie = [
  { name: "Northern East Precinct", value: 35 },
  { name: "Central East Precinct", value: 25 },
  { name: "Capital Region Precinct", value: 20 },
  { name: "Other Precincts", value: 20 },
];

export default function Dashboard() {
  return (
    
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard de Especies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">Especies</h2>
            <p className="text-4xl font-bold text-blue-600">20,960</p>
          </div>
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">Aprobadas</h2>
            <p className="text-4xl font-bold text-green-600">16,248</p>
          </div>
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Registro de Especies</h2>
            <BarChart width={300} height={200} data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Tipos de Especies</h2>
            <PieChart width={300} height={200}>
              <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          </div>
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">Otros Datos</h2>
            <p className="text-4xl font-bold text-yellow-600">6%</p>
          </div>
          <div className="p-6 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">Más Datos</h2>
            <p className="text-4xl font-bold text-red-600">-8%</p>
          </div>
        </div>
      </div>
  
  );
}
