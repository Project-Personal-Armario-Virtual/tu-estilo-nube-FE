"use client";

import React from "react";

import { ProfileForm } from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ThemeToggle from "@/components/ThemeToggle";
import DeleteAccountButton from "@/components/profile/DeleteAccountButton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";

export default function Profile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Profile & Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div className="md:col-span-2 space-y-6">
          
            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>

         
            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ChangePasswordForm />
              </CardContent>
            </Card>
          </div>

          
          <div className="space-y-6">
   
            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Theme
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose between Light and Dark mode
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>

   
            <Card className="shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>

                <DeleteAccountButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
