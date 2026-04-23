import "leaflet/dist/leaflet.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "Vast Flow",
  description: "Traffic monitoring system",
  manifest: "/manifest.json",
};