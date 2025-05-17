
import React from 'react';

interface UserInfoFormProps {
  name: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UserInfoForm({ name, email, onChange, onSubmit }: UserInfoFormProps) {
  return (
    <div className="p-4 bg-space-dark-blue">
      <p className="text-gray-300 mb-4">Please provide your information to start the chat:</p>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 mb-1">Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:border-accent focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-accent/80 transition-colors">
          Start Chat
        </button>
      </form>
    </div>
  );
}
