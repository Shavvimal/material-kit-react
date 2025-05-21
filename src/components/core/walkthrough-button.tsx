'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useWalkthrough, WalkthroughProvider, type FlowError } from '@sammy-labs/walkthroughs';

import walkthroughData from '@/data/walkthrough';

const devData = walkthroughData;

// API key and configuration
const SAMMY_API_KEY = process.env.NEXT_PUBLIC_SAMMY_API_KEY;
const SAMMY_ORG_ID = process.env.NEXT_PUBLIC_SAMMY_ORG_ID;
const BASE_URL = process.env.NEXT_PUBLIC_SAMMY_BASE_URL || 'http://localhost:8000';

/**
 * 2) This is your client‐side function to generate a token.
 * It's done fully in the extension environment (still just fetch).
 */
async function generateToken(): Promise<string | null> {
  if (!SAMMY_API_KEY) {
    console.error('No PLASMO_PUBLIC_SAMMY_API_KEY found. Please set it in .env.');
    return null;
  }

  if (!SAMMY_ORG_ID) {
    console.error('No PLASMO_PUBLIC_ORG_ID found. Please set it in .env.');
    return null;
  }

  // Prepare the request body
  const authRequest = {
    org_id: SAMMY_ORG_ID,
    user_data: {
      user_id: '00000000-0000-0000-0000-000013200001',
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@example.com',
    },
  };

  try {
    const resp = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SAMMY_API_KEY}`,
      },
      body: JSON.stringify(authRequest),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Failed to get token:', errorText);
      return null;
    }

    const data = await resp.json();
    console.log('Got dev token from Sammy:', data.token?.slice(0, 8), '...');
    return data.token;
  } catch (err) {
    console.error('Error fetching dev token:', err);
    return null;
  }
}

// Help icon component
const HelpOutlineIcon = () => (
  <SvgIcon>
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </SvgIcon>
);

// Main Dev Overlay component
function DevOverlay({ token, onError }: { token: string; onError: (err: any) => void }): React.JSX.Element {
  const walkthroughConfig = useMemo(() => ({}), []);

  const { stop, isActive, startWithData } = useWalkthrough({
    checkQueryOnMount: true, // automatically check the URL param
    onError: (err: FlowError) => {
      console.error('Walkthrough Error @ Injected Script:', err);
    },
    waitTime: 2000, // Wait 2s after mount before auto-start
    config: walkthroughConfig, // this will now inherit from the parent provider
    disableRedirects: false, // Changed to false to allow redirects
    fallbackTimeout: 15000, // 15 seconds before using fallback element
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <Fab
        color="primary"
        onClick={() => startWithData(devData)}
        aria-label="open walkthrough panel"
        sx={{
          width: 56,
          height: 56,
          boxShadow:
            '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        }}
      >
        <HelpOutlineIcon />
      </Fab>
    </Box>
  );
}

// The top-level component that provides the WalkthroughProvider
export function WalkthroughButtonWithProvider(): React.JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateToken().then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  // Show nothing while loading or if missing requirements
  if (loading || !token) {
    // Simple loading indicator while getting token
    if (loading) {
      return (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Fab
            color="default"
            disabled
            aria-label="loading"
            sx={{
              width: 56,
              height: 56,
            }}
          >
            <HelpOutlineIcon />
          </Fab>
        </Box>
      );
    }

    // Error state
    if (!token) {
      return (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Fab
            color="error"
            onClick={() => alert('Failed to get token. Please check your API keys.')}
            aria-label="error"
            sx={{
              width: 56,
              height: 56,
            }}
          >
            <SvgIcon>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </SvgIcon>
          </Fab>
        </Box>
      );
    }

    return <></>;
  }

  // Sample logo URL - replace with your actual logo URL
  const logoUrl = 'https://cdn.sammylabs.com/00af2909-a09d-4972-b15f-6d13e7185acc/assets/deel-logo.png';

  return (
    <WalkthroughProvider
      token={token}
      baseUrl={BASE_URL}
      logoUrl={logoUrl}
      locationChangeEvents={false}
      locationChangePollInterval={500}
      locationChangeDebug={true}
      onTokenExpired={() => {
        console.log('Token expired—fetching again');
        generateToken().then(setToken);
      }}
      onWalkthroughEvent={(event: any) => {
        // Format the event based on type for better readability
        const timestamp = new Date().toISOString();

        switch (event.event_type) {
          case 'start':
            console.log(`[${timestamp}] CLIENT: 🚀 WALKTHROUGH START: Flow ID ${event.flow_id}`);
            break;
          case 'step':
            console.log(`[${timestamp}] CLIENT: 👣 WALKTHROUGH STEP: ${event.step_number || 'N/A'}`);
            break;
          case 'finish':
            console.log(`[${timestamp}] CLIENT: ✅ WALKTHROUGH FINISHED`);
            break;
          case 'abandon':
            console.log(`[${timestamp}] CLIENT: ❌ WALKTHROUGH ABANDONED at step ${event.step_number || 'N/A'}`);
            break;
          case 'redirect':
            console.log(`[${timestamp}] CLIENT: 🔄 WALKTHROUGH REDIRECT at step ${event.step_number || 'N/A'}`);
            break;
          case 'fallback':
            console.log(`[${timestamp}] CLIENT: ⚠️ WALKTHROUGH FALLBACK at step ${event.step_number || 'N/A'}`);
            break;
          default:
            console.log(`[${timestamp}] CLIENT: WALKTHROUGH EVENT:`, event);
        }
      }}
      onError={(err: any) => console.warn('WalkthroughProvider error:', err)}
      driverConfig={{ overlayOpacity: 0.5 }}
      config={{
        debug: false,
        overrideDomainUrl: typeof window !== 'undefined' ? window.location.origin : '',
        askInput: false,
      }}
    >
      <DevOverlay token={token} onError={(err: any) => console.error('DevOverlay error:', err)} />
    </WalkthroughProvider>
  );
}
