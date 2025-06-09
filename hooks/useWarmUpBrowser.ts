import React from 'react';
import * as WebBrowser from "expo-web-browser";

// Hook to warm up and cool down the browser for OAuth flows
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the browser to improve UX
    // https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowserwarmupasyncbrowserpackagename
    void WebBrowser.warmUpAsync();
    return () => {
      // Cool down the browser when the component unmounts
      // https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowsercooldownasyncbrowserpackagename
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
