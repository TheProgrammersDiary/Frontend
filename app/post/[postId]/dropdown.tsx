import React, { useEffect, useState } from 'react';
import { postUrl } from '../../../next.config';

export default function Dropdown({ postId, onValueChanged }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [postVersions, setPostVersions] = useState(null);
  const formatDate = (postedDate) => {
    const date = new Date(postedDate);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
    return formattedDate;
  };

  const padZero = (value) => (value < 10 ? `0${value}` : value);

  const valueChanged = (item) => {
    setSelectedValue(item);
    onValueChanged(item.version);
    setIsOpen(false);
  };

  useEffect(() => {
    if (postVersions && postVersions.length > 0 && !selectedValue) {
      valueChanged(postVersions[postVersions.length - 1]);
    }
  }, [postVersions]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPostVersions = async () => {
      try {
        const response = await fetch(
          `${postUrl}/posts/${postId}/version`,
          { method: 'GET', credentials: 'omit' }
        );
        const versions = await response.json();
        setPostVersions(versions);
      } catch (error) {
        console.error('Error fetching post versions:', error);
      }
    };

    fetchPostVersions();
  }, [postId]);

  return (
    <div className="w-full relative inline-block text-left">
      {selectedValue &&
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {formatDate(selectedValue.datePosted)}
        </button>
      }
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {postVersions.map((item) => (
              <a
                key={item.version}
                href="#"
                className={`block px-4 py-2 text-sm ${selectedValue === item ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                onClick={() => valueChanged(item)}
                role="menuitem"
              >
                {formatDate(item.datePosted)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};