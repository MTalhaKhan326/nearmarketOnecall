import { useEffect } from "react";
import { Helmet } from "react-helmet";

function GalleriaGoogleAnalytics() {
  return (
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-YQDMRWN5YP"></script>
      <script type="text/javascript">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YQDMRWN5YP');
        `}
      </script>
    </Helmet>
  )
}

export default GalleriaGoogleAnalytics;