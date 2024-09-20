import React, { useEffect } from 'react';
import zmp from 'zmp-sdk';

const ZaloRedirect = () => {
  useEffect(() => {
    const openZaloWebview = () => {
      if (typeof zmp !== 'undefined' && zmp.openWebview) {
        zmp.openWebview({
          url: 'https://www.dungthitnhungnuocqua.com/#/booking',
          success: () => {
            console.log('Webview opened successfully');
          },
          fail: (error) => {
            console.error('Failed to open webview:', error);
            console.log(`Error Code: ${error.code}`);
            console.log(`Error Message: ${error.message}`);
            console.log(`API Endpoint: ${error.api}`);
            console.log(`Error Details: ${error.detail}`);

            window.location.href = 'https://www.dungthitnhungnuocqua.com/#/booking';
          }
        });
      } else {
        window.location.href = 'https://www.dungthitnhungnuocqua.com/#/booking';
      }
    };

    openZaloWebview();
  }, []);

  return <div>Đang chuyển hướng... </div>;
};

export default ZaloRedirect;
