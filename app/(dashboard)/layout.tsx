"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { RedirectToSignIn } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useQueries,
  useQuery,
} from "convex/react";
import { PlusIcon, Sidebar, User2Icon } from "lucide-react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Authenticated>
        <SidebarProvider>
          <DashboardSidebar />
          {children}
        </SidebarProvider>
      </Authenticated>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
    </>
  );
}

function DashboardSidebar() {
  const user = useQuery(api.functions.user.get);
  if (!user) {
    return null;
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/friends">
                  <User2Icon />
                  Friends
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
          <SidebarGroup>
            <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
            <SidebarGroupAction>
              <PlusIcon />
              <span className="sr-only">New Direct Message</span>
            </SidebarGroupAction>
          </SidebarGroup>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarGroup>
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
