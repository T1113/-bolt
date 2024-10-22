import React, { useState } from 'react';
import { Globe, AlertCircle, ArrowLeftRight } from 'lucide-react';

interface TranslationFormProps {
  darkMode: boolean;
}

const TranslationForm: React.FC<TranslationFormProps> = ({ darkMode }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulating translation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      const translatedText = `这是一个模拟的翻译结果：\n原文：${inputText}\n从 ${sourceLang} 翻译到 ${targetLang}`;
      setOutputText(translatedText);
    } catch (error) {
      console.error('错误:', error);
      setError('翻译失败。请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="w-5/12">
          <label htmlFor="sourceLang" className="block mb-2">源语言:</label>
          <select
            id="sourceLang"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
          >
            <option value="en">英语</option>
            <option value="zh">中文</option>
            <option value="es">西班牙语</option>
            <option value="fr">法语</option>
            <option value="de">德语</option>
          </select>
        </div>
        <button
          onClick={swapLanguages}
          className={`self-end p-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          <ArrowLeftRight size={20} />
        </button>
        <div className="w-5/12">
          <label htmlFor="targetLang" className="block mb-2">目标语言:</label>
          <select
            id="targetLang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
          >
            <option value="zh">中文</option>
            <option value="en">英语</option>
            <option value="es">西班牙语</option>
            <option value="fr">法语</option>
            <option value="de">德语</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="inputText" className="block mb-2">输入文本:</label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
          rows={4}
        ></textarea>
      </div>

      <button
        onClick={handleTranslate}
        disabled={isLoading || inputText.trim() === ''}
        className={`w-full ${isLoading || inputText.trim() === '' ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-300`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            翻译中...
          </span>
        ) : (
          <>
            <Globe className="inline-block mr-2" size={20} />
            翻译
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded flex items-center">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}

      {outputText && (
        <div className="mt-4">
          <label htmlFor="outputText" className="block mb-2">翻译结果:</label>
          <textarea
            id="outputText"
            value={outputText}
            readOnly
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
            rows={4}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default TranslationForm;