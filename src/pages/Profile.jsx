// src/pages/Profile.jsx
import React from "react"
import Navbar from "@/components/Navbar"
import { ProfileForm } from "@/components/profile/ProfileForm"
import  ThemeToggle  from "@/components/ThemeToggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LogOut, Key, Bell, Shield } from "lucide-react"

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-text/70">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Password
                    </h3>
                    <p className="text-sm text-text/70">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-text/70">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-text/70">Choose between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </h3>
                    <p className="text-sm text-text/70">Manage email and push notifications</p>
                  </div>
                  <Button variant="outline">Configure</Button>
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
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
