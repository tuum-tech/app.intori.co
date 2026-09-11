// Shared destinations for "open the app" calls-to-action.
//
// V2 (gate-open, 2026-06): the web app is the PRIMARY entry point. The World App
// mini-app is a secondary path; the Farcaster frame is legacy/test only.
export const APP_URL = 'https://app.intori.co'

// iPhone beta destination (TestFlight or invite link). Superseded by
// IOS_APP_STORE_URL once the App Store listing is live, but kept so the beta
// can stay staged independently and so an unset App Store var never silently
// drops an already-working TestFlight link.
export const IOS_BETA_URL = process.env.NEXT_PUBLIC_IOS_BETA_URL ?? ''

// Public App Store listing. Takes precedence over the beta link: once this is
// set the iPhone CTA reads "Download on the App Store" everywhere it appears.
export const IOS_APP_STORE_URL = process.env.NEXT_PUBLIC_IOS_APP_STORE_URL ?? ''

// The single iPhone destination the CTAs and the FAQ both read, so the two
// surfaces cannot disagree about whether iOS is available or what it is called.
//
//   'appstore' -> primary button, "Download on the App Store"
//   'beta'     -> primary button, "Join the iPhone beta"
//   'none'     -> quiet non-clickable "iPhone app coming soon" chip
//
// Staged entirely by configuration. No code change required to promote either.
export type IosChannel = 'appstore' | 'beta' | 'none'

export const IOS_CHANNEL: IosChannel = IOS_APP_STORE_URL
  ? 'appstore'
  : IOS_BETA_URL
    ? 'beta'
    : 'none'

export const IOS_URL = IOS_APP_STORE_URL || IOS_BETA_URL

// Homepage headline variant, staged the same way as IOS_BETA_URL.
//
// 'forward' (the default) ships the locked tagline, "Something to look forward
// to." On its own that line makes no cadence promise, so it carries no supply
// dependency and is safe to serve to everyone.
//
// 'weekly' adds the second sentence, "Every week." THAT is the cadence claim.
// Do NOT enable 'weekly' until the app actually guarantees a populated item for
// every household every week; without that guarantee the headline is a claim
// the product cannot keep.
//
// 'decided' keeps the previous "Tonight, decided." headline available.
export type HeroVariant = 'forward' | 'weekly' | 'decided'

function resolveHeroVariant(): HeroVariant {
  const configured = process.env.NEXT_PUBLIC_HERO_VARIANT
  if (configured === 'weekly') return 'weekly'
  if (configured === 'decided') return 'decided'
  return 'forward'
}

export const HERO_VARIANT: HeroVariant = resolveHeroVariant()

export const WORLD_APP_URL =
  'https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3'

// Legacy Farcaster frame launcher — retained for reference, not surfaced as a
// primary or secondary CTA on consumer marketing surfaces.
export const FARCASTER_FRAME_URL =
  'https://warpcast.com/~/frames/launch?domain=frame.intori.co'
