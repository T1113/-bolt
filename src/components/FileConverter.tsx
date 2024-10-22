import React, { useState } from 'react';
import { FileText, RefreshCw, AlertCircle, Upload } from 'lucide-react';

interface FileConverterProps {
  darkMode: boolean;
}

const FileConverter: React.FC<FileConverterProps> = ({ darkMode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [convertedFileUrl, setConvertedFileUrl] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setError('');
      setConvertedFileUrl('');
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('请选择要转换的文件。');
      return;
    }

    setIsConverting(true);
    setError('');
    setConvertedFileUrl('');

    try {
      // 模拟文件转换过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 创建一个模拟的转换后文件
      const dummyContent = `这是一个模拟的转换后文件内容。
原文件名: ${selectedFile.name}
转换格式: ${outputFormat}
转换时间: ${new Date().toLocaleString()}`;

      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setConvertedFileUrl(url);
    } catch (error) {
      console.error('转换错误:', error);
      setError('文件转换失败。请稍后再试。');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="fileInput" className="block mb-2">选择文件:</label>
        <div className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}>
          <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
            <Upload size={48} className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className="text-sm">{selectedFile ? selectedFile.name : '点击或拖拽文件到此处'}</span>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="outputFormat" className="block mb-2">输出格式:</label>
        <select
          id="outputFormat"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
        >
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
          <option value="txt">TXT</option>
          <option value="jpg">JPG</option>
        </select>
      </div>

      <button
        onClick={handleConvert}
        disabled={isConverting || !selectedFile}
        className={`w-full ${isConverting || !selectedFile ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white py-2 px-4 rounded transition duration-300`}
      >
        {isConverting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            转换中...
          </span>
        ) : (
          <>
            <RefreshCw className="inline-block mr-2" size={20} />
            转换文件
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded flex items-center">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}

      {convertedFileUrl && (
        <div className="mt-4">
          <a
            href={convertedFileUrl}
            download={`converted_file.${outputFormat}`}
            className={`block w-full text-center py-2 px-4 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-300`}
          >
            <FileText className="inline-block mr-2" size={20} />
            下载转换后的文件
          </a>
        </div>
      )}
    </div>
  );
};

export default FileConverter;