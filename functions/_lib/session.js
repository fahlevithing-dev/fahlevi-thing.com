// Signed, stateless session tokens (HMAC-SHA256) for the /owner CMS.
// No database needed: the token itself carries an expiry and a signature
// that can only have been produced by someone holding SESSION_SECRET.

const encoder = new TextEncoder();

function toHex(buf) {
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(secret, data) {
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    return toHex(sig);
}

function timingSafeEqual(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

const SESSION_TTL_SECONDS = 2 * 60 * 60; // 2 hours

export async function createSessionToken(secret) {
    const exp = Date.now() + SESSION_TTL_SECONDS * 1000;
    const payload = btoa(JSON.stringify({ exp }));
    const sig = await hmac(secret, payload);
    return `${payload}.${sig}`;
}

export async function verifySessionToken(secret, token) {
    if (!token || !token.includes('.')) return false;
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return false;
    const expected = await hmac(secret, payload);
    if (!timingSafeEqual(sig, expected)) return false;
    try {
        const { exp } = JSON.parse(atob(payload));
        return typeof exp === 'number' && Date.now() < exp;
    } catch {
        return false;
    }
}

export function getCookie(request, name) {
    const header = request.headers.get('Cookie') || '';
    const match = header.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

export function sessionCookieHeader(token) {
    return `owner_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearCookieHeader() {
    return 'owner_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
}

export async function requireSession(request, env) {
    const token = getCookie(request, 'owner_session');
    return verifySessionToken(env.SESSION_SECRET, token);
}

export async function safeCompare(a, b) {
    // Constant-time-ish comparison for the access code check.
    // Hash both sides first so length differences don't leak via early exit.
    const ha = await hmac('fixed-salt-not-secret', String(a));
    const hb = await hmac('fixed-salt-not-secret', String(b));
    return timingSafeEqual(ha, hb);
}
