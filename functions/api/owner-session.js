import { requireSession } from '../_lib/session.js';

export async function onRequestGet({ request, env }) {
    const authenticated = await requireSession(request, env);
    return new Response(JSON.stringify({ authenticated }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
