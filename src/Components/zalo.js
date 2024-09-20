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
            // Fallback: mở trong tab mới nếu không thể mở webview
            window.location.href = 'https://www.dungthitnhungnuocqua.com/#/booking';
          }
        });
      } else {
        // Fallback cho môi trường không phải Zalo
        window.location.href = 'https://www.dungthitnhungnuocqua.com/#/booking';
      }
    };

    openZaloWebview();
  }, []);

  return <div>Đang chuyển hướng...</div>;
};

export default ZaloRedirect;