import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Download, Layout, Brush, Type, FileText, LogOut, User, Settings } from 'lucide-react';
import { setFont, setTheme, setTemplate, templates } from '@/store/slices/settingsSlice';
import { RootState } from '@/store/store';
import { useResumeManager } from '@/hooks/useResumeActions';
import { clearUser } from '@/store/slices/userSlice';
import { Link } from 'react-router-dom';
import PrintInstructionsModal from '@/components/common/PrintInstructionsModal';
import { fonts, themeColors } from '@/data/data';

interface TopBarProps {
  onToggleLayout: () => void;
  isLayoutVisible: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleLayout, isLayoutVisible }) => {
  const dispatch = useDispatch();
  const currentFont = useSelector((state: RootState) => state.settings.font);
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const currentTemplate = useSelector((state: RootState) => state.settings.template);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const { updateResumeData } = useResumeManager();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleFontChange = (font: string) => {
    dispatch(setFont(font));
    setShowFontDropdown(false);
  };

  const handleThemeChange = (color: string) => {
    dispatch(setTheme(color));
    setShowThemeDropdown(false);
  };

  const handleTemplateChange = (templateId: string) => {
    dispatch(setTemplate(templateId));
    setShowTemplateDropdown(false);
  };

  const closeAllDropdowns = () => {
    setShowFontDropdown(false);
    setShowThemeDropdown(false);
    setShowTemplateDropdown(false);
    setShowUserDropdown(false);
  };

  const handlePrint = () => {
    setShowPrintModal(false);
    updateResumeData(); // Update resume data before printing
    window.print();
  };

  const handleDownload = () => {
    setShowPrintModal(true);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 no-print"
      ref={dropdownRef}>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            body {
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
              overflow: hidden;
            }

            .resume-container {
              width: 100%;
              height: 100%;
              page-break-inside: avoid;
              overflow: hidden;
            }

            /* Hide UI elements that shouldn't be printed */
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
      <div className="max-w-3xl px-4 flex justify-between items-center h-16 ml-auto mr-10">
        {/* Center buttons */}
        <div className="flex items-center justify-center gap-8">
          {/* Template Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowTemplateDropdown((prev) => !prev);
              }}
              className="flex flex-row items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Template"
            >
              <FileText size={12} />
              <span className="text-sm">Template</span>
            </button>
            {showTemplateDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-56"
                role="menu"
                aria-labelledby="template-menu"
              >
                {templates.map((template) => (
                  <li
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${currentTemplate === template.id ? 'bg-gray-50' : ''}`}
                    role="menuitem"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <div className={`mt-1 text-xs p-2 rounded ${template.personalDetailsStyle.background} ${template.personalDetailsStyle.textColor}`}>
                        Preview
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Font Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowFontDropdown((prev) => !prev);
              }}
              className="flex flex-row items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Font"
            >
              <Type size={12} />
              <span className="text-sm">Font</span>
            </button>
            {showFontDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48"
                role="menu"
                aria-labelledby="font-menu"
              >
                {fonts?.map((font) => (
                  <li
                    key={font}
                    onClick={() => handleFontChange(font)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${currentFont === font ? 'font-bold' : ''}`}
                    role="menuitem"
                  >
                    {font}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowThemeDropdown((prev) => !prev);
              }}
              className="flex flex-row items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Change Theme"
            >
              <Brush size={12} />
              <span className="text-sm">Theme</span>
            </button>
            {showThemeDropdown && (
              <ul
                className="absolute top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48"
                role="menu"
                aria-labelledby="theme-menu"
              >
                {themeColors?.map((color) => (
                  <li
                    key={color.value}
                    onClick={() => handleThemeChange(color.value)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 flex items-center gap-2 ${currentTheme === color.value ? 'font-bold' : ''}`}
                    role="menuitem"
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                    {color.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Layout Button */}
          <button
            onClick={() => {
              closeAllDropdowns();
              onToggleLayout();
            }}
            className={`flex flex-row items-center gap-2 focus:outline-none ${isLayoutVisible ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`}
            aria-label="Toggle Layout"
          >
            <Layout size={12} />
            <span className="text-sm">Layout</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex flex-row items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Download"
          >
            <Download size={12} />
            <span className="text-sm">{loading ? 'Downloading...' : 'Download'}</span>
          </button>
        </div>

        {/* Right corner logout */}
        <div>
          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowUserDropdown((prev) => !prev);
              }}
              className="flex flex-row items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="User Menu"
            >
              <User size={20} />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <ul className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48 z-10">
                <li>
                  <Link to="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                    <User size={18} />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                    <Settings size={18} />
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            )}

          </div>
        </div>
      </div>
      {/* PrintInstructionsModal */}
      <PrintInstructionsModal isOpen={showPrintModal} onClose={() => setShowPrintModal(false)} onPrint={handlePrint} />
    </div>
  );
};

export default TopBar;
