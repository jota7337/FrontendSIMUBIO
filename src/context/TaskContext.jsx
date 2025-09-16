import { createContext, useContext, useState } from "react"
import { supabase } from "../supabase/client"

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error("useTasks must be used within a TaskContextProvider")

    return context
}

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [adding, setAdding] = useState(false)

    const getTasks = async () => {
        // Obtener el usuario autenticado
        const { data: userData, error: userError } = await supabase.auth.getUser()
        const user = userData?.user // Asegurarse de que userData no sea null o undefined
        console.log(user)

        if (userError) {
            console.error("Error al obtener el usuario:", userError.message)
            return
        }

        if (!user) {
            console.log("El usuario no está autenticado")
            return
        }

        // Consultar las tareas del usuario autenticado
        const { data: tasksData, error: tasksError } = await supabase
            .from("tasks")
            .select()
            .eq("userId", user.id) // Filtrar por userId
            .eq("done", false) // Filtrar por tareas no completadas
            .order("id", { ascending: true }) // Ordenar por id en orden ascendente

        if (tasksError) {
            console.error("Error al obtener las tareas:", tasksError.message)
            return
        }

        setTasks(tasksData) // Actualizar el estado con las tareas obtenidas
        console.log("Tareas obtenidas:", tasksData)
    }

    const createTask = async (taskName) => {
        setAdding(true)
        try {
            // Obtener el usuario autenticado
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser()
            if (userError) {
                console.error("Error al obtener el usuario:", userError.message)
                return
            }

            if (!user) {
                console.error("El usuario no está autenticado")
                return
            }

            // Insertar la tarea en la tabla y devolver las filas insertadas
            const { data, error } = await supabase
                .from("tasks")
                .insert({
                    name: taskName,
                    userId: user.id, // Usar el ID del usuario autenticado
                })
                .select() // Asegurarse de que las filas insertadas sean devueltas

            if (error) {
                throw error
            }

            // Actualizar el estado con la nueva tarea
            if (Array.isArray(data)) {
                setTasks([...tasks, ...data]) // Agregar las nuevas tareas al estado
            } else {
                console.error("La respuesta de Supabase no es un array:", data)
            }

            console.log("Tarea creada:", data)
        } catch (error) {
            console.error("Error al crear la tarea:", error.message)
        } finally {
            setAdding(false)
        }
    }

    return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding }}>{children}</TaskContext.Provider>
}
