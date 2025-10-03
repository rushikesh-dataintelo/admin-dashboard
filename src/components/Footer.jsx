export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800/50">
            <div className=" mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">© {currentYear} Code Mingle. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}