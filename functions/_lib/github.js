// Minimal GitHub REST + Git Data API client used to publish/edit posts
// as a single atomic commit (multiple files, one push) without a local
// git checkout - everything happens server-side inside the Function.

const OWNER = 'fahlevithing-dev';
const REPO = 'fahlevi-thing.com';
const BRANCH = 'main';
const API = 'https://api.github.com';

function authHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'fahlevi-thing-owner-cms',
    };
}

async function gh(token, path, options = {}) {
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: { ...authHeaders(token), ...(options.headers || {}) },
    });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`GitHub API ${res.status} ${path}: ${body.slice(0, 500)}`);
    }
    return res.json();
}

// Reads one file's current text content + sha (sha is needed to update it).
// Returns null if the file does not exist yet.
export async function getFile(token, path) {
    try {
        const data = await gh(token, `/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`);
        const content = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
        return { content, sha: data.sha };
    } catch (e) {
        if (String(e.message).includes('404')) return null;
        throw e;
    }
}

// Commits any number of file changes (create, update, or binary via base64)
// as ONE commit on `main`, so the site never ends up in a half-updated state.
// files: [{ path, content, encoding: 'utf-8' | 'base64' }]
export async function commitFiles(token, files, message) {
    const ref = await gh(token, `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`);
    const latestCommitSha = ref.object.sha;

    const latestCommit = await gh(token, `/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`);
    const baseTreeSha = latestCommit.tree.sha;

    const treeEntries = [];
    for (const file of files) {
        const blob = await gh(token, `/repos/${OWNER}/${REPO}/git/blobs`, {
            method: 'POST',
            body: JSON.stringify({
                content: file.encoding === 'base64' ? file.content : file.content,
                encoding: file.encoding === 'base64' ? 'base64' : 'utf-8',
            }),
        });
        treeEntries.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
    }

    const newTree = await gh(token, `/repos/${OWNER}/${REPO}/git/trees`, {
        method: 'POST',
        body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
    });

    const newCommit = await gh(token, `/repos/${OWNER}/${REPO}/git/commits`, {
        method: 'POST',
        body: JSON.stringify({
            message,
            tree: newTree.sha,
            parents: [latestCommitSha],
        }),
    });

    await gh(token, `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
        method: 'PATCH',
        body: JSON.stringify({ sha: newCommit.sha }),
    });

    return newCommit.sha;
}
