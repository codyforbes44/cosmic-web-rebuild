
import React from 'react';
import { ZephelInterface } from '@/components/zephel/ZephelInterface';
import { ZephelPageLayout, ZephelInitializer } from '@/components/zephel/page';

const U2014 = () => {
  return (
    <ZephelPageLayout>
      <ZephelInitializer>
        <ZephelInterface userId="architect_001" />
      </ZephelInitializer>
    </ZephelPageLayout>
  );
};

export default U2014;
