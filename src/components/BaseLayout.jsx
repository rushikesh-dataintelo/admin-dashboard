import Header from "./Header/Header";
import Footer from "./footer/Footer";

export default function BaseLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            <Header />
            <main className="flex-1 w-full fixed p-6 pt-24">
                {children}
            </main>
            <Footer />
        </div >
    );
}
