import "@radix-ui/themes/styles.css";
import "./globals.css";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
