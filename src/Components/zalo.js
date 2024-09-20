import { openWebview } from "zmp-sdk/apis";

export const openUrlInWebview = async () => {
  try {
    await openWebview({
      url: "https://mini.zalo.me/",
      config: {
        style: "bottomSheet",
        leftButton: "back",
      },
    });
    console.log('Webview opened successfully! 🚀');
  } catch (error) {
    // Enhanced error handling
    console.error('Error opening webview:', error.message || 'Unknown error');
    
    // Optionally, notify the user
    alert('Failed to open the webview. Please try again later. 😟');
    
    // You can also log specific details if you want
    console.log(`Error details: ${JSON.stringify(error)}`);
  }
};

// Example usage
// openUrlInWebview(); // Uncomment to execute
