import React from 'react';
import BaseLayout from '../../components/BaseLayout';

export default function WelcomePage() {
  return (
    <BaseLayout>
      <div >
        <h1 className="text-4xl font-bold text-black mb-4">
          Welcome to TARA Dashboard
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          This is your main content area. The header and footer are sticky, and the sidebar
          appears on mouse hover near the left edge or by clicking the menu button.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
          <div className="bg-white-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors">
            <h3 className="text-xl font-semibold text-black mb-2">Feature One</h3>
            <p className="text-gray-400">Description of your first feature goes here.</p>
          </div>
        </div>

        {/* <div className="mt-12 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur border border-indigo-800/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
          <p className="text-gray-300 mb-4">
            The layout is fully responsive and includes:
          </p>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Sticky transparent header at the top</li>
            <li>✓ Sticky footer at the bottom</li>
            <li>✓ Animated sidebar that opens on hover or click</li>
            <li>✓ Full viewport height layout</li>
            <li>✓ Modern glassmorphism effects</li>
          </ul>
        </div> */}
      </div>
    </BaseLayout>
  );
}