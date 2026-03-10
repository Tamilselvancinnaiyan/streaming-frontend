import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

// Metadata is handled in a separate way for client components or kept in server components.
// Since I need styled-jsx in the body for global styles, I'll move those to globals.css instead
// and keep layout.tsx as a server component if possible, or move styled-jsx out.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="layout-container">
          <Sidebar />
          <div className="main-wrapper">
            <Navbar />
            <main className="content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
