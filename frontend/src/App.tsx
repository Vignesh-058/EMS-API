import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Employees from '@/pages/Employees';
import Departments from '@/pages/Departments';
import DepartmentDetails from '@/pages/Departments/DepartmentDetails';
import Attendance from '@/pages/Attendance/Attendance';
import Payroll from '@/pages/Payroll/Payroll';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/components/common/theme-provider';
import { DashboardLayout, AuthLayout, MainLayout } from '@/layouts';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ems-theme">
      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/employees" replace />} />
          </Route>

          {/* Auth Layout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Dashboard Layout Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<DepartmentDetails />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
