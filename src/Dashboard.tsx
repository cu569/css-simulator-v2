import React from 'react';
import { Card } from './components/Card';
import { Button } from './components/Button';

export function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">테이블 컨디션</h2>
          <p>μ = 0.31</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-2">3분 마스터 루틴</h2>
          <Button variant="primary">시작 ▶</Button>
        </Card>
      </main>
    </div>
  );
}