import React from 'react';
import { Link } from 'react-router-dom';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-white to-pink-50/30 px-6">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-sm border border-pink-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-rose-50 text-rose-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Достъпът е ограничен</h1>
          <p className="text-gray-500 mb-8 text-center">
            Изглежда, че вашият профил все още не е регистриран за достъп до тази част на сайта.
          </p>
          <div className="p-5 bg-gray-50 rounded-2xl text-sm text-gray-600 text-left space-y-3">
            <p className="font-semibold text-gray-800">Какво можете да направите:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Проверете дали сте влезли с правилния имейл</li>
              <li>Свържете се с нас за съдействие</li>
              <li>Опитайте да влезете отново в профила си</li>
            </ul>
          </div>
          <Link to="/" className="block mt-8 text-rose-500 hover:text-rose-600 font-medium transition-colors">
            ← Върни се в началото
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
