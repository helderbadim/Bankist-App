💰 Bankist — Vanilla JS Banking UI
==================================

A front-end–only banking interface to practice **modern JavaScript** concepts. It simulates basic banking features like login, transactions, transfers, and account closure using **in-memory data only**. Built purely with **HTML, CSS, and vanilla JavaScript**, no backend or persistence.

> ⚠️ For educational purposes only — do **not** use real credentials.

📑 Table of Contents
--------------------

*   [Introduction](#introduction)
    
*   [Features](#features)
    
*   [Demo Accounts](#demo-accounts)
    
*   [Installation](#installation)
    
*   [Usage](#usage)
    
*   [Data Model](#data-model)
    
*   [Core Functions](#core-functions)
    
*   [What I Practiced](#what-i-practiced)
    
*   [Accessibility & i18n](#accessibility--i18n)
    
*   [Known Limitations / Future Ideas](#known-limitations--future-ideas)
    
*   [File Structure](#file-structure)
    
*   [License](#license)
    
*   [Credits](#credits)
    

🧾 Introduction
---------------

This project is designed as a **learning tool** for modern JavaScript, focusing on DOM manipulation, date/time handling, internationalization, and state management. It mimics banking behavior entirely in the browser, with **no persistence** — data resets on page reload.

🧭 Features
-----------

*   🔐 Login with username + PIN (client-side check)
    
*   📄 View movements with **localized dates**
    
*   ↕️ Sort transactions ascending/descending
    
*   💰 Display balance, deposits, withdrawals, and interest
    
*   🔁 Transfer between demo accounts with validations
    
*   💸 Request loans (if deposit ≥ 10% of loan)
    
*   ❌ Close account (session-only removal)
    
*   ⏱️ Auto logout after 2 minutes of inactivity
    

👤 Demo Accounts
----------------

OwnerUsernamePINCurrencyLocaleHélder Costahc1111EURpt-PTAngélica Silvaas2222USDen-US

> Usernames are derived from initials. Example: "Hélder Costa" → "hc".

🛠️ Installation
----------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/your-username/bankist.git  cd bankist   `

Then simply:

*   Open index.html in your browser, or
    
*   Serve with a local server (e.g., **Live Server** in VS Code)
    

> No build tools or bundlers needed — just plain HTML/CSS/JS.

🚀 Usage
--------

1.  Open the app in a browser.
    
2.  Log in using one of the demo credentials above.
    
3.  Test transactions, transfers, loan requests, and account closure.
    
4.  Note the **auto logout** timer and **sorting toggle**.
    

🧱 Data Model
-------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   const account = {    owner: 'Hélder Costa',    username: 'hc',    pin: 1111,    interestRate: 1.2, // %    currency: 'EUR',    locale: 'pt-PT',    movements: [200, -100, ...],    movementsDates: ['2025-08-24T23:36:17.929Z', ...]  };   `

*   movements\[i\] aligns with movementsDates\[i\]
    
*   balance is derived via reduce() and stored in acc.balance
    

🧩 Core Functions
-----------------

FunctionDescriptionformatMovementDate(date, locale)Shows "Today", "Yesterday", or localized dateformatCur(value, locale, currency)Formats values using Intl.NumberFormatdisplayMovements(acc, sort = false)Renders account transactionscalcDisplayBalance(acc)Computes and displays balancecalcDisplaySummary(acc)Displays total deposits, withdrawals, interestcreateUsername(accs)Adds usernames based on initialsupdateUI(acc)Refreshes all UI elementsstartLogOutTimer()Starts/reset 2-min inactivity logout timer

✨ What I Practiced
------------------

*   **Array methods**: map, filter, reduce, sort, find, some, every, etc.
    
*   **Date & Time**: ISO strings, date math, setInterval, countdowns
    
*   **i18n**: Intl.DateTimeFormat, Intl.NumberFormat
    
*   **DOM manipulation**: Templates, form handling, insertAdjacentHTML
    
*   **UX Enhancements**: Countdown timers, optimistic updates, sorting toggle
    
*   **Code organization**: Utility functions and modular event handlers
    

♿ Accessibility & i18n
----------------------

*   Locale-aware **dates** and **currencies**
    
*   Clear input/button labeling
    
*   Potential improvements:
    
    *   ARIA roles and keyboard navigation
        
    *   Improved color contrast
        
    *   Reduced-motion support
        

🔍 Known Limitations / Future Ideas
-----------------------------------

*   ❌ No data persistence (consider localStorage)
    
*   ❌ No backend/API/auth (could add real auth with hashed PINs)
    
*   ⛔ PINs stored in plain-text (demo only!)
    
*   🧪 No unit tests (could add tests for interest, date logic)
    
*   📦 UI could be componentized; consider small state store
    

📁 File Structure
-----------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   /bankist/  │  ├── index.html         # App UI  ├── style.css          # Styling  └── script.js          # App logic (utilities + event handlers)   `

📜 License
----------

**MIT License** — Free to learn and modify.

> ⚠️ If you fork or extend with real user data or backend, remove all demo PINs and sanitize history.

🙌 Credits
----------

Developed as part of Jonas Schmedtmann’s _The Complete JavaScript Course_.Adapted to explore **Intl**, **timers**, and **JavaScript array methods**.
