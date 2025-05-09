import React from 'react';
import { Button } from './components/Button';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-primary text-center">CSS Simulator V2</h1>
        <Button variant="primary" className="w-full">소셜 로그인</Button>
        <Button variant="secondary" className="w-full">게스트로 시작</Button>
      </div>
    </div>
  );
}