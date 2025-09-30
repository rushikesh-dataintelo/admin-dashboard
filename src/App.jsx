import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 p-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;