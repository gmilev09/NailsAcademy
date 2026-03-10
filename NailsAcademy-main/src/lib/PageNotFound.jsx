import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-black text-rose-100 relative">
          404
          <span className="absolute inset-0 flex items-center justify-center text-4xl text-rose-500 font-bold">
            Упс!
          </span>
        </h1>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Страницата не е намерена
      </h2>
      <p className="text-gray-500 mb-10 max-w-md mx-auto">
        Изглежда, че страницата, която търсите, е променила адреса си или е била изтрита. 
        Не се притеснявайте, маникюрите ни са все така на мястото си!
      </p>
      <Link to="/">
        <Button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-10 py-6 text-lg shadow-lg transition-all">
          Върни се в началото
        </Button>
      </Link>
    </div>
  );
}
