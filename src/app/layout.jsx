import "./globals.css";
import { TravelFormProvider } from "@/context/AppContext";

export const metadata = {
  title: "Flight search",
  description: "Search flights between Bengaluru, Chennai and Hyderabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TravelFormProvider>{children}</TravelFormProvider>
      </body>
    </html>
  );
}
