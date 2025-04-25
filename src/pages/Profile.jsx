import React from "react"

import { ProfileForm } from "@/components/profile/ProfileForm"
import ChangePasswordForm from "@/components/profile/ChangePasswordForm"
import ThemeToggle from "@/components/ThemeToggle"
import DeleteAccountButton from "@/components/profile/DeleteAccountButton"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import authService from "@/services/authService"

export default function Profile() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    authService.logout()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-text/70">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Información de cuenta */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>

            {/* Seguridad */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChangePasswordForm />
              </CardContent>
            </Card>
          </div>

          {/* Preferencias y acciones */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-text/70">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>

                <DeleteAccountButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
