import { createSessionToken, sessionCookieHeader, safeCompare } from '../_lib/session.js';

// A fixed delay on every attempt (success or failure) makes brute-forcing
// the access code slower without needing a rate-limit store. It's not a
// substitute for a strong code, just friction.
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function onRequestPost({ request, env }) {
    if (!env.OWNER_ACCESS_CODE || !env.SESSION_SECRET) {
        return new Response(JSON.stringify({ error: 'Owner CMS is not configured yet (missing environment variables).' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    await delay(600);

    const ok = await safeCompare(body.code, env.OWNER_ACCESS_CODE);
    if (!ok) {
        return new Response(JSON.stringify({ error: 'Incorrect access code.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const token = await createSessionToken(env.SESSION_SECRET);
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': sessionCookieHeader(token),
        },
    });
}
