import React, { useState } from 'react';
import { FileText, RefreshCw, Globe, Moon, Sun } from 'lucide-react';
import TranslationForm from './components/TranslationForm';
import FileConverter from './components/FileConverter';

function App() {
  const [activeTab, setActiveTab] = useState('translate');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 w-full max-w-2xl transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">翻译 & 文件转换工具</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'translate' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} rounded-l-lg focus:outline-none transition-colors duration-300`}
            onClick={() => setActiveTab('translate')}
          >
            <Globe className="inline-block mr-2" size={20} />
            翻译
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'convert' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} rounded-r-lg focus:outline-none transition-colors duration-300`}
            onClick={() => setActiveTab('convert')}
          >
            <RefreshCw className="inline-block mr-2" size={20} />
            转换
          </button>
        </div>
        
        {activeTab === 'translate' ? (
          <TranslationForm darkMode={darkMode} />
        ) : (
          <FileConverter darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}

export default App;