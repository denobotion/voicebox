import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Pretty URLs from README / docs (e.g. /download/mac-arm) are kept for
// compatibility, but we now always route through the /download page so users
// see context + a donate prompt + resources while the download kicks off.
// The page handles the actual file trigger itself — no more silent redirects
// to GitHub or direct asset URLs.
const PLATFORM_ALIAS: Record<string, string> = {
  'mac-arm': 'macArm',
  'mac-intel': 'macIntel',
  windows: 'windows',
  linux: 'linux',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const normalized = PLATFORM_ALIAS[platform];
  const target = new URL('/download', request.url);
  if (normalized) target.searchParams.set('platform', normalized);
  return NextResponse.redirect(target, 307);
}
