import { SidebarProvider, Sidebar, SidebarTrigger } from "./components/ui/sidebar"

function App() {
    return (
        <SidebarProvider>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">
                    <SidebarTrigger />
                    <h1>Main Content</h1>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default App