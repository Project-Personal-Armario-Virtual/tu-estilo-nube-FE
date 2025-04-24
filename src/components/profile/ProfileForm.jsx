"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import api from "@/services/api"

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().optional(),
})

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      bio: "",
    },
  })


  useEffect(() => {
    api.get("/profile/me")
      .then((res) => {
        const { displayName, bio } = res.data
        const user = JSON.parse(localStorage.getItem("user"))

        form.reset({
          displayName: displayName || "",
          email: user?.email || "",
          bio: bio || "",
        })

        console.log("✅ Perfil cargado:", res.data)
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar el perfil.",
        })
      })
      .finally(() => setLoading(false))
  }, [])


  const onSubmit = async (values) => {
    try {
      await api.put("/profile", {
        displayName: values.displayName,
        bio: values.bio,
      })

      toast({
        title: "Perfil actualizado",
        description: "Los cambios se guardaron correctamente.",
      })

      setIsEditing(false)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "Ocurrió un problema al guardar los cambios.",
      })
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Información del perfil</h2>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Editar perfil
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" {...field} disabled readOnly />
                </FormControl>
                <FormDescription>Este campo no se puede modificar.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografía</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos sobre ti y tu estilo..."
                    className="resize-none"
                    {...field}
                    disabled={!isEditing}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Este texto se mostrará en tu perfil público.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
