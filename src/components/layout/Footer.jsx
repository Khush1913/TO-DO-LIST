import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>© {new Date().getFullYear()} Premium To-Do App. Built for productivity.</p>
    </footer>
  );
}
