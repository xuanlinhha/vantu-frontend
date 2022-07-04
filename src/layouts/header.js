import * as React from 'react'
import { GA_TRACKING_ID } from '../analytics/gtag'
import { Script } from 'gatsby'

export default function Header() {
  return (
    <div>
      <header>
        <title> Văn-Tự </title>
        <link rel='icon' href='/favicon.png' />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </header>
    </div>
  )
}
