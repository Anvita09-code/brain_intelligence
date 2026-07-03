'use client';

import React, { useState } from 'react';
import { 
  Spinner, 
  SpinnerOverlay, 
  PulseRing, 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonTable 
} from '@/components/loaders';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoadersDemoPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const simulateAsyncLoad = () => {
    setIsLoading(true);
    setDataLoaded(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setDataLoaded(true);
    }, 2200);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    if (!showOverlay) {
      setTimeout(() => setShowOverlay(false), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <Typography variant="h3" className="mb-2">Asynchronous Data Loaders &amp; Skeletons</Typography>
        <Typography variant="body1" className="text-industrial-slate">
          Phase 2 — Industrial-grade loading states, spinners, and skeleton placeholders.
        </Typography>
      </div>

      {/* Spinner Variants */}
      <Card className="p-6">
        <Typography variant="h5" className="mb-4">Spinners</Typography>
        
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" />
            <span className="text-xs text-muted">xs</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-muted">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-muted">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-muted">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs text-muted">xl</span>
          </div>
          
          <div className="ml-8 flex items-center gap-4">
            <div>
              <PulseRing size={16} />
            </div>
            <span className="text-xs text-muted">PulseRing</span>
          </div>
        </div>
      </Card>

      {/* Spinner Overlay Demo */}
      <Card className="p-6 relative">
        <Typography variant="h5" className="mb-4">Spinner Overlay</Typography>
        
        <div className="flex items-center gap-4">
          <Button onClick={toggleOverlay} variant="outline">
            Show Overlay (3s)
          </Button>
          <Button onClick={() => setShowOverlay(true)} variant="default">
            Trigger Full Overlay
          </Button>
        </div>

        {showOverlay && (
          <SpinnerOverlay 
            message="Fetching telemetry data..." 
            size="lg" 
            absolute 
          />
        )}
      </Card>

      {/* Skeleton Variants */}
      <Card className="p-6">
        <Typography variant="h5" className="mb-4">Skeleton Components</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Skeleton */}
          <div>
            <Typography variant="subtitle2" className="mb-3">Base Skeleton</Typography>
            <div className="space-y-3">
              <Skeleton width="100%" height={16} />
              <Skeleton width="75%" height={16} />
              <Skeleton width="40%" height={16} />
            </div>
          </div>

          {/* Skeleton Text */}
          <div>
            <Typography variant="subtitle2" className="mb-3">Skeleton Text</Typography>
            <SkeletonText lines={4} />
          </div>

          {/* Skeleton Card */}
          <div>
            <Typography variant="subtitle2" className="mb-3">Skeleton Card</Typography>
            <SkeletonCard />
          </div>

          {/* Skeleton Table */}
          <div>
            <Typography variant="subtitle2" className="mb-3">Skeleton Table</Typography>
            <SkeletonTable rows={4} columns={4} />
          </div>
        </div>
      </Card>

      {/* Real-world Async Loading Pattern */}
      <Card className="p-6">
        <Typography variant="h5" className="mb-4">Real-world Async Loading Pattern</Typography>
        
        <div className="mb-4">
          <Button onClick={simulateAsyncLoad} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load Assets (Simulate API)'}
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Spinner size="md" />
              <span className="text-sm text-muted">Fetching asset inventory...</span>
            </div>
            <SkeletonTable rows={5} columns={5} />
          </div>
        )}

        {!isLoading && dataLoaded && (
          <div className="rounded-lg border border-border p-4 bg-surface">
            <Typography variant="body1">✅ Data loaded successfully. 142 assets returned.</Typography>
            <div className="mt-3 text-sm text-muted">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        )}

        {!isLoading && !dataLoaded && (
          <div className="text-sm text-muted">Click the button above to simulate an asynchronous data fetch.</div>
        )}
      </Card>

      {/* Usage Code Snippets */}
      <Card className="p-6 bg-[#0B0F12]">
        <Typography variant="h5" className="mb-4 text-white">Quick Integration Examples</Typography>
        
        <div className="space-y-4 font-mono text-xs">
          <div>
            <div className="text-accent mb-1">Basic Spinner</div>
            <pre className="bg-deep p-3 rounded text-white overflow-x-auto">{`<Spinner size="lg" />`}</pre>
          </div>
          
          <div>
            <div className="text-accent mb-1">Full Page Loading Overlay</div>
            <pre className="bg-deep p-3 rounded text-white overflow-x-auto">{`<SpinnerOverlay message="Loading dashboard..." absolute />`}</pre>
          </div>
          
          <div>
            <div className="text-accent mb-1">Data Table Skeleton</div>
            <pre className="bg-deep p-3 rounded text-white overflow-x-auto">{`<SkeletonTable rows={8} columns={6} />`}</pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
