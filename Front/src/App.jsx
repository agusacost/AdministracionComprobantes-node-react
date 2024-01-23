import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage.jsx";
import ClientePage from "./pages/ClientePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { TicketProvider } from "./context/TicketContext.jsx";
import Footer from "./components/Footer.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import TicketFormPage from "./pages/TicketFormPage.jsx";
import FindTicketPage from "./pages/FindTicketPage.jsx"

import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import FindTicketSerie from "./pages/FindTicketSerie.jsx";
import { FindTicketService } from "./pages/FindTicketService.jsx";

function app() {
  return (
    <AuthProvider>
      <TicketProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/solicitud" element={<ClientePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/add-tickets" element={<TicketFormPage />} />
              <Route path="/tickets/:id" element={<TicketFormPage />} />
              <Route path="/ticketdni" element={<FindTicketPage />} />
              <Route path="/ticketserie" element={<FindTicketSerie/>}/>
              <Route path="/ticketservice" element={<FindTicketService/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </TicketProvider>
    </AuthProvider>
  );
}

export default app;
