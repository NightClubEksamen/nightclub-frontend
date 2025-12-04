
import "./globals.css";
import Nav from "../app/components/Nav";


export const metadata = {
  title: "Night club",
  description: "Night club website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav/>
        {children}
      </body>
    </html>
  );
}
