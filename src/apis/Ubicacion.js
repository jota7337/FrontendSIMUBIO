import axios from "axios"

export const getCiudades = async () => {
    try {
        const res = await axios.get("/api/ciudades")
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export const getMunicipios = async () => {
    try {
        const res = await axios.get("/api/municipios")
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export const getDepartamentos = async () => {
    try {
        const res = await axios.get("/api/departamentos")
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}
