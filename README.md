# Security Exception Mind Map

An interactive, browser-based mind map that visualises common security exceptions across six domains: **Authentication**, **Authorization**, **Cryptography**, **Input Validation**, **Network Security**, and **Data Security**.

## Live Demo

Open `index.html` in any modern browser – no build step, no server required.

## Features

- Radial mind map rendered in pure SVG with vanilla JavaScript (zero external dependencies)
- Pan (drag), zoom (scroll wheel / pinch), and reset controls
- Hover tooltips with description and tags for every node
- Click-to-open detail panel for in-depth information
- Dark theme, fully responsive

## Structure

```
index.html   – page shell & accessibility markup
style.css    – dark-theme styles
mindmap.js   – mind map data, layout engine, and interaction logic
```

## Exception Domains

| Domain | Examples |
|---|---|
| Authentication | InvalidCredentials, TokenExpired, OTPMismatch |
| Authorization | Forbidden, IDORException, PrivilegeEscalation |
| Cryptography | WeakAlgorithm, CertificateException, KeyManagement |
| Input Validation | SQLInjection, XSSException, SchemaViolation |
| Network Security | TLSException, DoSException, MITMDetected |
| Data Security | PIIExposure, IntegrityViolation |

## Usage

```bash
# Simply open in a browser
open index.html
# or serve locally
python3 -m http.server 8080
```

## Contributing

Add or edit exception nodes in the `DATA` tree inside `mindmap.js`. Each node accepts:
- `id` – unique string
- `label` – display text (use `\n` for line breaks)
- `level` – `"root"`, `"l1"`, `"l2"`, or `"l3"`
- `desc` – description shown in tooltip and detail panel
- `tags` – array of keyword strings
- `children` – nested array of child nodes
