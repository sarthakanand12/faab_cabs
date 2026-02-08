"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServerAction } from "zsa-react";
import { logoutAction } from "@/lib/actions/auth";
import { AdminSession } from "@/lib/auth";
import { toast } from "sonner";

interface AdminHeaderProps {
  session: AdminSession;
}

export function AdminHeader({ session }: AdminHeaderProps) {
  const router = useRouter();
  const { execute: logout } = useServerAction(logoutAction);

  const handleLogout = async () => {
    const [result, error] = await logout();
    if (error) {
      toast.error("Failed to logout");
      return;
    }
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">FAAB Cabs Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Access: {session.access}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
