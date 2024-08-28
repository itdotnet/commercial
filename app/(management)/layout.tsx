import AdminPanelLayout from "./_components/admin-panel/admin-panel-layout";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
