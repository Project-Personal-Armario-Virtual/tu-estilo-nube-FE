"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import api from "@/services/api"

const schema = z.object({
  currentPassword: z.string().min(6, "Debe tener al menos 6 caracteres"),
  newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
})

export default function ChangePasswordForm() {
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      await api.put("/auth/change-password", values)
      toast({
        title: "Contraseña actualizada",
        description: "Tu nueva contraseña ha sido guardada correctamente.",
      })
      form.reset()
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error al actualizar contraseña",
        description:
          err.response?.data || "Ocurrió un error al cambiar la contraseña.",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-1 md:p-2"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña actual</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="current-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Guardando..." : "Cambiar contraseña"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
