import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Better Together - Relationship Intelligence Platform</title>
        <meta name="description" content="Transform your relationship into your greatest success story through intelligent connection tracking and shared goal achievement." />
        <meta name="keywords" content="relationship, couples, love, goals, tracking, psychology, connection, intimacy, challenges" />
        <meta property="og:title" content="Better Together - Relationship Intelligence Platform" />
        <meta property="og:description" content="Transform your relationship into your greatest success story through intelligent connection tracking and shared goal achievement." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💕</text></svg>" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="/static/styles.css" rel="stylesheet" />
        
        <style>
          {`body { font-family: 'Inter', sans-serif; }`}
        </style>
      </head>
      <body class="antialiased">{children}</body>
    </html>
  )
})
