"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import api from "@/services/api"
import authService from "@/services/authService"

export default function DeleteAccountButton() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await api.delete("/profile/me")
            authService.logout()
            toast({
                title: "Cuenta eliminada",
                description: "Tu cuenta ha sido eliminada correctamente.",
            })
            navigate("/login", { replace: true })
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error al eliminar cuenta",
                description: err.response?.data || "Intenta nuevamente más tarde.",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Delete Account
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción eliminará tu cuenta y no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        {loading ? "Eliminando..." : "Sí, eliminar cuenta"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
