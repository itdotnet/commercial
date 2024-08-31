import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "./_components/admin-panel-layout";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:'Commercial Admin Panel',
  description:''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>{children}</AdminPanelLayout>;
        </ThemeProvider>
      </body>
    </html>
  )
}
