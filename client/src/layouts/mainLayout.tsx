import { Sidebar } from "@/layouts/sidebar";
import { Topbar } from "@/layouts/topbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
