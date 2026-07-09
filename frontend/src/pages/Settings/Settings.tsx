import { PageContainer } from "@/layouts/page-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/common/theme-provider"
import { Monitor, Moon, Sun } from "lucide-react"

export default function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <PageContainer
      title="Settings"
      subtitle="Manage your account settings and set e-mail preferences."
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings" },
      ]}
    >
      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b bg-transparent p-0">
          <TabsTrigger 
            value="profile"
            className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="account"
            className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="appearance"
            className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your public profile and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@emspro.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 outline-none">
          <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Account security settings will be configured here.
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all hover:bg-muted ${theme === "light" ? "border-primary bg-muted/50" : "border-border bg-transparent"}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
                    <Sun className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="font-medium">Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all hover:bg-muted ${theme === "dark" ? "border-primary bg-muted/50" : "border-border bg-transparent"}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
                    <Moon className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="font-medium">Dark Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all hover:bg-muted ${theme === "system" ? "border-primary bg-muted/50" : "border-border bg-transparent"}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
                    <Monitor className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="font-medium">System UI</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 outline-none">
          <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Notification preferences will be configured here.
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
