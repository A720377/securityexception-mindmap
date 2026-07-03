/**
 * Security Exception Mind Map
 * Vanilla JS + SVG – no external dependencies
 */

/* ── Data ─────────────────────────────────────────────────── */
const DATA = {
  id: "root",
  label: "Security\nExceptions",
  level: "root",
  desc: "A taxonomy of common security exceptions encountered in software systems.",
  tags: ["security", "exceptions", "taxonomy"],
  children: [
    {
      id: "auth",
      label: "Authentication",
      level: "l1",
      desc: "Exceptions raised when verifying the identity of a user, service, or device.",
      tags: ["identity", "credentials"],
      children: [
        {
          id: "auth-invalid-cred",
          label: "InvalidCredentials",
          level: "l2",
          desc: "Thrown when supplied username/password or API key does not match stored records.",
          tags: ["login", "password"],
          children: [
            { id: "auth-brute", label: "BruteForce\nDetected", level: "l3", desc: "Too many failed login attempts trigger a lockout.", tags: ["rate-limit"] }
          ]
        },
        {
          id: "auth-token",
          label: "TokenException",
          level: "l2",
          desc: "Exceptions related to session or bearer tokens.",
          tags: ["JWT", "session"],
          children: [
            { id: "auth-token-exp",  label: "TokenExpired",   level: "l3", desc: "The JWT or session token has passed its expiry time.", tags: ["expiry"] },
            { id: "auth-token-inv",  label: "TokenInvalid",   level: "l3", desc: "Signature verification of the token failed.", tags: ["signature"] },
            { id: "auth-token-rev",  label: "TokenRevoked",   level: "l3", desc: "Token was explicitly invalidated before expiry.", tags: ["revocation"] }
          ]
        },
        {
          id: "auth-mfa",
          label: "MFAException",
          level: "l2",
          desc: "Failures during multi-factor authentication flows.",
          tags: ["OTP", "TOTP", "MFA"],
          children: [
            { id: "auth-mfa-fail", label: "OTPMismatch",      level: "l3", desc: "One-time password entered is incorrect.", tags: ["OTP"] },
            { id: "auth-mfa-exp",  label: "OTPExpired",       level: "l3", desc: "One-time password window has lapsed.", tags: ["TOTP"] }
          ]
        }
      ]
    },
    {
      id: "authz",
      label: "Authorization",
      level: "l1",
      desc: "Exceptions raised when a verified identity lacks permission to perform an action.",
      tags: ["access control", "RBAC"],
      children: [
        {
          id: "authz-forbidden",
          label: "Forbidden",
          level: "l2",
          desc: "HTTP 403-class exception: authenticated but not authorized.",
          tags: ["403", "ACL"],
          children: [
            { id: "authz-role",     label: "InsufficientRole",   level: "l3", desc: "User role does not satisfy the required permission.", tags: ["RBAC"] },
            { id: "authz-scope",    label: "InsufficientScope",  level: "l3", desc: "OAuth2 token scope does not cover the requested resource.", tags: ["OAuth2"] }
          ]
        },
        {
          id: "authz-idor",
          label: "IDORException",
          level: "l2",
          desc: "Insecure Direct Object Reference – accessing a resource owned by another user.",
          tags: ["IDOR", "OWASP"],
          children: [
            { id: "authz-idor-r", label: "UnauthorisedRead",  level: "l3", desc: "Attempt to read a record the caller does not own.", tags: ["read"] },
            { id: "authz-idor-w", label: "UnauthorisedWrite", level: "l3", desc: "Attempt to mutate a record the caller does not own.", tags: ["write"] }
          ]
        },
        {
          id: "authz-priv",
          label: "PrivilegeEscalation",
          level: "l2",
          desc: "An actor attempts to gain elevated privileges beyond their assigned level.",
          tags: ["privilege", "escalation"],
          children: []
        }
      ]
    },
    {
      id: "crypto",
      label: "Cryptography",
      level: "l1",
      desc: "Exceptions arising from cryptographic operations such as encryption, hashing, and signing.",
      tags: ["encryption", "hashing"],
      children: [
        {
          id: "crypto-bad-algo",
          label: "WeakAlgorithm",
          level: "l2",
          desc: "Use of an algorithm considered cryptographically weak (e.g. MD5, DES).",
          tags: ["MD5", "DES", "deprecated"],
          children: [
            { id: "crypto-md5",  label: "MD5Deprecated",  level: "l3", desc: "MD5 is broken for security purposes; migrate to SHA-256+.", tags: ["hash"] },
            { id: "crypto-des",  label: "DESDeprecated",  level: "l3", desc: "DES key length (56-bit) is trivially brute-forceable.", tags: ["symmetric"] }
          ]
        },
        {
          id: "crypto-cert",
          label: "CertificateException",
          level: "l2",
          desc: "X.509 certificate validation failures.",
          tags: ["TLS", "X.509"],
          children: [
            { id: "crypto-cert-exp",  label: "CertExpired",    level: "l3", desc: "Server or client certificate has passed its validity period.", tags: ["expiry"] },
            { id: "crypto-cert-rev",  label: "CertRevoked",    level: "l3", desc: "Certificate appears on a CRL or OCSP response.", tags: ["CRL", "OCSP"] },
            { id: "crypto-cert-cn",   label: "HostnameMismatch", level: "l3", desc: "Certificate CN/SAN does not match the connected hostname.", tags: ["SNI"] }
          ]
        },
        {
          id: "crypto-key",
          label: "KeyManagement",
          level: "l2",
          desc: "Exceptions related to cryptographic key lifecycle.",
          tags: ["key", "rotation"],
          children: [
            { id: "crypto-key-missing", label: "KeyNotFound",   level: "l3", desc: "Required private or symmetric key is absent from the key store.", tags: [] },
            { id: "crypto-key-exp",     label: "KeyExpired",    level: "l3", desc: "Key has exceeded its allowed usage period.", tags: ["rotation"] }
          ]
        }
      ]
    },
    {
      id: "input",
      label: "Input Validation",
      level: "l1",
      desc: "Exceptions triggered by malicious or malformed input data.",
      tags: ["injection", "XSS", "validation"],
      children: [
        {
          id: "input-sqli",
          label: "SQLInjection",
          level: "l2",
          desc: "Detected attempt to inject SQL control characters into a query.",
          tags: ["SQLi", "OWASP A03"],
          children: [
            { id: "input-sqli-detect", label: "PayloadDetected",  level: "l3", desc: "WAF or query sanitiser flagged a SQL-injection payload.", tags: ["WAF"] },
            { id: "input-sqli-blind",  label: "BlindSQLIDetected", level: "l3", desc: "Time-based or boolean-based blind SQLi pattern matched.", tags: ["blind"] }
          ]
        },
        {
          id: "input-xss",
          label: "XSSException",
          level: "l2",
          desc: "Cross-site scripting payload detected in user-supplied content.",
          tags: ["XSS", "reflected", "stored"],
          children: [
            { id: "input-xss-r", label: "ReflectedXSS",  level: "l3", desc: "Script tag injected via URL parameter echoed in response.", tags: ["reflected"] },
            { id: "input-xss-s", label: "StoredXSS",     level: "l3", desc: "Malicious script persisted to the database.", tags: ["stored"] }
          ]
        },
        {
          id: "input-schema",
          label: "SchemaViolation",
          level: "l2",
          desc: "Input fails structural or type validation.",
          tags: ["JSON", "schema"],
          children: [
            { id: "input-schema-type",    label: "TypeMismatch",    level: "l3", desc: "Field value type does not match the declared schema type.", tags: [] },
            { id: "input-schema-missing", label: "MissingRequired", level: "l3", desc: "A mandatory field is absent from the request payload.", tags: [] }
          ]
        }
      ]
    },
    {
      id: "network",
      label: "Network\nSecurity",
      level: "l1",
      desc: "Exceptions related to transport-layer security and network-level attacks.",
      tags: ["TLS", "network", "firewall"],
      children: [
        {
          id: "net-tls",
          label: "TLSException",
          level: "l2",
          desc: "Errors during the TLS/SSL handshake or record layer.",
          tags: ["TLS", "SSL"],
          children: [
            { id: "net-tls-hs",   label: "HandshakeFailed",  level: "l3", desc: "Client and server could not negotiate common cipher suite or protocol.", tags: ["cipher"] },
            { id: "net-tls-ver",  label: "InsecureProtocol", level: "l3", desc: "SSLv3 / TLS 1.0 / 1.1 connection attempted; minimum is TLS 1.2.", tags: ["downgrade"] }
          ]
        },
        {
          id: "net-dos",
          label: "DoSException",
          level: "l2",
          desc: "Denial-of-Service conditions detected at the application layer.",
          tags: ["DoS", "DDoS"],
          children: [
            { id: "net-dos-rate",  label: "RateLimitExceeded", level: "l3", desc: "Caller exceeded the allowed request rate per time window.", tags: ["rate-limit"] },
            { id: "net-dos-flood", label: "ConnectionFlood",   level: "l3", desc: "Abnormal number of simultaneous connections from one source.", tags: ["flood"] }
          ]
        },
        {
          id: "net-mitm",
          label: "MITMDetected",
          level: "l2",
          desc: "Indicators of a man-in-the-middle interception detected.",
          tags: ["MITM", "HPKP"],
          children: []
        }
      ]
    },
    {
      id: "data",
      label: "Data Security",
      level: "l1",
      desc: "Exceptions protecting data confidentiality, integrity, and compliance.",
      tags: ["data", "privacy", "GDPR"],
      children: [
        {
          id: "data-pii",
          label: "PIIExposure",
          level: "l2",
          desc: "Personally Identifiable Information leaked to an unauthorised party.",
          tags: ["PII", "GDPR"],
          children: [
            { id: "data-pii-log",  label: "PIIInLogs",  level: "l3", desc: "Sensitive personal data written to application logs.", tags: ["logging"] },
            { id: "data-pii-resp", label: "PIIInResponse", level: "l3", desc: "API response contains fields that should have been redacted.", tags: ["redaction"] }
          ]
        },
        {
          id: "data-integrity",
          label: "IntegrityViolation",
          level: "l2",
          desc: "Data has been tampered with or does not match its expected hash.",
          tags: ["integrity", "checksum"],
          children: [
            { id: "data-int-hash", label: "ChecksumFailed",  level: "l3", desc: "Computed hash of payload does not match supplied digest.", tags: ["SHA"] },
            { id: "data-int-sign", label: "SignatureInvalid", level: "l3", desc: "Digital signature on a message or document is invalid.", tags: ["HMAC", "DSA"] }
          ]
        }
      ]
    }
  ]
};

/* ── Layout constants ─────────────────────────────────────── */
const RADIUS = { root: 46, l1: 36, l2: 28, l3: 22 };
const COLOR  = { root: "#238636", l1: "#1f6feb", l2: "#6e40c9", l3: "#da3633" };

/* ── State ────────────────────────────────────────────────── */
let transform = { x: 0, y: 0, scale: 1 };
let drag = null;
let selectedNode = null;

/* ── Helpers ──────────────────────────────────────────────── */
function flatten(node, out = []) {
  out.push(node);
  (node.children || []).forEach(c => flatten(c, out));
  return out;
}

function buildLinks(node, out = []) {
  (node.children || []).forEach(c => {
    out.push({ source: node, target: c });
    buildLinks(c, out);
  });
  return out;
}

/* ── Radial layout ────────────────────────────────────────── */
function layout(root, cx, cy) {
  root.x = cx;
  root.y = cy;

  const L1_R = 210;
  const L2_R = 370;
  const L3_R = 510;

  const l1nodes = root.children || [];
  const n1 = l1nodes.length;

  l1nodes.forEach((n1node, i) => {
    const a1 = (2 * Math.PI * i) / n1 - Math.PI / 2;
    n1node.x = cx + L1_R * Math.cos(a1);
    n1node.y = cy + L1_R * Math.sin(a1);

    const l2nodes = n1node.children || [];
    const n2 = l2nodes.length;
    const spread2 = n2 > 1 ? (Math.PI * 0.55) : 0;

    l2nodes.forEach((n2node, j) => {
      const a2 = n2 > 1
        ? a1 - spread2 / 2 + (spread2 / (n2 - 1)) * j
        : a1;
      n2node.x = cx + L2_R * Math.cos(a2);
      n2node.y = cy + L2_R * Math.sin(a2);

      const l3nodes = n2node.children || [];
      const n3 = l3nodes.length;
      const spread3 = n3 > 1 ? (Math.PI * 0.35) : 0;

      l3nodes.forEach((n3node, k) => {
        const a3 = n3 > 1
          ? a2 - spread3 / 2 + (spread3 / (n3 - 1)) * k
          : a2;
        n3node.x = cx + L3_R * Math.cos(a3);
        n3node.y = cy + L3_R * Math.sin(a3);
      });
    });
  });
}

/* ── SVG rendering ────────────────────────────────────────── */
function cubicPath(s, t) {
  const mx = (s.x + t.x) / 2;
  return `M${s.x},${s.y} C${mx},${s.y} ${mx},${t.y} ${t.x},${t.y}`;
}

function wrapText(label) {
  return label.split("\n");
}

function renderMindmap() {
  const svg = document.getElementById("mindmap");
  const W = svg.clientWidth  || window.innerWidth;
  const H = svg.clientHeight || (window.innerHeight - 52);
  const cx = W / 2;
  const cy = H / 2;

  layout(DATA, cx, cy);

  const nodes = flatten(DATA);
  const links = buildLinks(DATA);

  // Main group (panned/zoomed)
  let g = document.getElementById("mm-root");
  if (!g) {
    g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.id = "mm-root";
    svg.appendChild(g);
  }
  g.innerHTML = "";

  // Links
  const linkGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  linkGroup.classList.add("links");
  links.forEach(({ source, target }) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", cubicPath(source, target));
    path.classList.add("link");
    linkGroup.appendChild(path);
  });
  g.appendChild(linkGroup);

  // Nodes
  const nodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  nodeGroup.classList.add("nodes");

  nodes.forEach(node => {
    const r = RADIUS[node.level] || 22;
    const col = COLOR[node.level] || "#444";

    const grp = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grp.classList.add("node-group");
    grp.setAttribute("transform", `translate(${node.x},${node.y})`);
    grp.dataset.id = node.id;

    // Circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", r);
    circle.setAttribute("fill", col);
    circle.setAttribute("stroke", lighten(col, 40));
    circle.classList.add("node-circle");
    grp.appendChild(circle);

    // Label
    const lines = wrapText(node.label);
    const lineH = 12;
    const startY = -((lines.length - 1) * lineH) / 2;
    lines.forEach((line, i) => {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.classList.add("node-label", node.level);
      txt.setAttribute("y", startY + i * lineH);
      txt.textContent = line;
      grp.appendChild(txt);
    });

    // Events
    grp.addEventListener("mouseenter", e => showTooltip(node, e));
    grp.addEventListener("mousemove",  e => moveTooltip(e));
    grp.addEventListener("mouseleave", hideTooltip);
    grp.addEventListener("click", () => selectNode(node));

    nodeGroup.appendChild(grp);
  });

  g.appendChild(nodeGroup);
  applyTransform();
}

/* ── Colour helpers ───────────────────────────────────────── */
function lighten(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

/* ── Pan & zoom ───────────────────────────────────────────── */
function applyTransform() {
  const g = document.getElementById("mm-root");
  if (g) {
    g.setAttribute("transform",
      `translate(${transform.x},${transform.y}) scale(${transform.scale})`
    );
  }
  document.getElementById("zoom-level").textContent =
    `${Math.round(transform.scale * 100)}%`;
}

function clampScale(s) { return Math.min(3, Math.max(0.2, s)); }

/* ── Tooltip ──────────────────────────────────────────────── */
function showTooltip(node, e) {
  const el = document.getElementById("tooltip");
  el.innerHTML = `<strong>${node.label.replace("\n", " ")}</strong>${node.desc}`;
  if (node.tags && node.tags.length) {
    el.innerHTML += `<div style="margin-top:6px">${node.tags.map(t => `<span class="tag">${t}</span>`).join(" ")}</div>`;
  }
  el.classList.add("visible");
  moveTooltip(e);
}

function moveTooltip(e) {
  const el = document.getElementById("tooltip");
  let x = e.clientX + 14;
  let y = e.clientY + 14;
  if (x + 290 > window.innerWidth)  x = e.clientX - 294;
  if (y + 120 > window.innerHeight) y = e.clientY - 90;
  el.style.left = x + "px";
  el.style.top  = y + "px";
}

function hideTooltip() {
  document.getElementById("tooltip").classList.remove("visible");
}

/* ── Info panel ───────────────────────────────────────────── */
function selectNode(node) {
  if (selectedNode === node.id) {
    closeInfoPanel();
    return;
  }
  selectedNode = node.id;
  const panel = document.getElementById("info-panel");
  document.getElementById("info-title").textContent = node.label.replace("\n", " ");
  document.getElementById("info-desc").textContent  = node.desc;
  const tagsEl = document.getElementById("info-tags");
  tagsEl.innerHTML = "";
  (node.tags || []).forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    tagsEl.appendChild(span);
  });
  panel.classList.add("open");
}

function closeInfoPanel() {
  selectedNode = null;
  document.getElementById("info-panel").classList.remove("open");
}

/* ── Zoom buttons ─────────────────────────────────────────── */
function zoomIn()  { transform.scale = clampScale(transform.scale * 1.2); applyTransform(); }
function zoomOut() { transform.scale = clampScale(transform.scale / 1.2); applyTransform(); }

function resetView() {
  transform = { x: 0, y: 0, scale: 1 };
  applyTransform();
}

/* ── Mouse wheel zoom ─────────────────────────────────────── */
function onWheel(e) {
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
  const svg = document.getElementById("mindmap");
  const rect = svg.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const newScale = clampScale(transform.scale * factor);
  const ratio = newScale / transform.scale;
  transform.x = mx - ratio * (mx - transform.x);
  transform.y = my - ratio * (my - transform.y);
  transform.scale = newScale;
  applyTransform();
}

/* ── Mouse drag pan ───────────────────────────────────────── */
function onMouseDown(e) {
  if (e.target.closest(".node-group")) return;
  drag = { startX: e.clientX - transform.x, startY: e.clientY - transform.y };
}

function onMouseMove(e) {
  if (!drag) return;
  transform.x = e.clientX - drag.startX;
  transform.y = e.clientY - drag.startY;
  applyTransform();
}

function onMouseUp() { drag = null; }

/* ── Touch pan ────────────────────────────────────────────── */
let lastTouches = null;

function onTouchStart(e) {
  lastTouches = e.touches;
}

function onTouchMove(e) {
  e.preventDefault();
  if (e.touches.length === 1 && lastTouches && lastTouches.length === 1) {
    const dx = e.touches[0].clientX - lastTouches[0].clientX;
    const dy = e.touches[0].clientY - lastTouches[0].clientY;
    transform.x += dx;
    transform.y += dy;
    applyTransform();
  } else if (e.touches.length === 2 && lastTouches && lastTouches.length === 2) {
    const d1 = Math.hypot(
      lastTouches[0].clientX - lastTouches[1].clientX,
      lastTouches[0].clientY - lastTouches[1].clientY
    );
    const d2 = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    if (d1 > 0) {
      const factor = d2 / d1;
      transform.scale = clampScale(transform.scale * factor);
      applyTransform();
    }
  }
  lastTouches = e.touches;
}

/* ── Init ─────────────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  renderMindmap();

  const wrap = document.getElementById("canvas-wrap");
  wrap.addEventListener("wheel",      onWheel,     { passive: false });
  wrap.addEventListener("mousedown",  onMouseDown);
  wrap.addEventListener("mousemove",  onMouseMove);
  wrap.addEventListener("mouseup",    onMouseUp);
  wrap.addEventListener("mouseleave", onMouseUp);
  wrap.addEventListener("touchstart", onTouchStart, { passive: true });
  wrap.addEventListener("touchmove",  onTouchMove,  { passive: false });

  document.getElementById("btn-zoom-in").addEventListener("click",  zoomIn);
  document.getElementById("btn-zoom-out").addEventListener("click", zoomOut);
  document.getElementById("btn-reset").addEventListener("click",    resetView);
  document.getElementById("info-close").addEventListener("click",   closeInfoPanel);

  window.addEventListener("resize", () => { renderMindmap(); });
});
