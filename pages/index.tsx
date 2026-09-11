import type { GetServerSideProps } from "next";
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { SeoHead } from '@/lib/seo'
import { APP_URL, HERO_VARIANT, IOS_CHANNEL, IOS_URL } from '@/lib/appLinks'

import styles from './index.module.css'

export const getServerSideProps = (async (context) => {
  const session = await getSession(context)

  if (session?.user?.fid) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard"
      }
    }
  }

  return { props: {} }
}) satisfies GetServerSideProps

// The four live lanes, in the locked order: Sports, Music, Shows, then Food.
// Food never leads.
//
// Lane words only. Helper product names never appear on a marketing surface,
// and neither does the word "helper".
//
// Three of the four are framed as watching, because watching is what the
// subscription sells. Food is the deliberate exception: its verbs are "save"
// and "plan a night", never a calendar add, and it never claims meal planning,
// recipes, or shopping lists.
//
// Music must never imply early, presale, or priority ticket access. There is no
// presale relationship to back that up. It watches the same public listings you
// could find yourself, and its value is noticing in time, not getting in first.
const LANES = [
  {
    kicker: 'Sports',
    title: 'The games you would hate to miss.',
    body: 'intori follows your teams and tells you which nights are worth staying up for, with scores hidden until you want them.',
    image: '/brand/warm/tile-game-day.jpg',
    alt: 'Sports in intori showing an upcoming game with the date and start time, ready to keep or pass on',
    tint: styles.artSports,
  },
  {
    kicker: 'Music',
    title: 'Who’s playing, while the date is still open.',
    body: 'intori watches for shows near you from artists your household cares about, and tells you early enough that Saturday is still yours to plan.',
    image: '/brand/warm/tile-music-events.jpg',
    alt: 'Music in intori showing an upcoming show nearby with the venue and date',
    tint: styles.artMusic,
  },
  {
    kicker: 'Shows',
    title: 'The one you’re both waiting on.',
    body: 'intori keeps an eye on returns and premieres, and tells you the week one lands, with spoilers kept out of sight.',
    image: '/brand/warm/tile-watch-radar.jpg',
    alt: 'Shows in intori asking which series you already follow',
    tint: styles.artWatch,
  },
  {
    kicker: 'Food',
    title: 'Dinner, decided.',
    body: 'Three picks shaped by your household’s tastes, budget, and effort, for the nights the plan is blank. Save the ones you like and plan a night around them.',
    image: '/brand/warm/tile-todays-food.jpg',
    alt: 'Food in intori showing three dinner picks for tonight',
    tint: styles.artFood,
  },
]

const TRUST_CARDS = [
  {
    title: 'Your answers do the work',
    body: 'Quick questions about taste, timing, and constraints teach intori what a good pick looks like for your household.',
  },
  {
    title: 'You can see why',
    body: 'Every pick shows what shaped it and what might still be missing. No mystery, no black box.',
  },
  {
    title: 'You choose what to share',
    body: 'Context stays yours. Share more only when it would make the picks better, and skip anything you’d rather not answer.',
  },
]

// Staged iOS CTA, driven entirely by IOS_CHANNEL in lib/appLinks.ts.
//
//   'appstore' -> "Download on the App Store" is primary, web drops to ghost
//   'beta'     -> "Join the iPhone beta" is primary, web drops to ghost
//   'none'     -> web is primary, iPhone is a quiet non-clickable status chip
//
// The chip is deliberately not a link. Until there is a real destination the
// site says so plainly rather than collecting taps on a promise.
function AppCtas() {
  if (IOS_CHANNEL !== 'none') {
    return (
      <>
        <a
          href={IOS_URL}
          className={styles.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          {IOS_CHANNEL === 'appstore' ? 'Download on the App Store' : 'Join the iPhone beta'}
        </a>
        <a
          href={APP_URL}
          className={styles.btnGhost}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start on the web
        </a>
      </>
    )
  }

  return (
    <>
      <a
        href={APP_URL}
        className={styles.btnPrimary}
        target="_blank"
        rel="noopener noreferrer"
      >
        Start on the web
      </a>
      <span className={styles.chipQuiet}>
        <span className={styles.chipDot} aria-hidden="true" />
        iPhone app coming soon
      </span>
    </>
  )
}

// Staged headline. The tagline alone ('forward') makes no cadence promise and
// is the default. 'weekly' adds "Every week.", which is a claim the app must be
// able to keep before it ships. See lib/appLinks.ts.
function HeroHeadline() {
  if (HERO_VARIANT === 'decided') {
    return <h1 className={styles.heroHeadline}>Tonight,<br />decided.</h1>
  }

  if (HERO_VARIANT === 'weekly') {
    return (
      <h1 className={`${styles.heroHeadline} ${styles.heroHeadlineWeekly}`}>
        Something to look<br />forward to.<br />Every week.
      </h1>
    )
  }

  return (
    <h1 className={`${styles.heroHeadline} ${styles.heroHeadlineForward}`}>
      Something to<br />look forward to.
    </h1>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="intori. Something to look forward to."
        description="intori watches for the things your household would hate to miss. The game worth staying up for. Who's playing nearby. The show you're both waiting on. And yes, dinner. Early enough to say yes."
        canonicalPath="/"
        ogDescription="intori watches for what your household would hate to miss, and gets it to you early enough to say yes."
        ogImageAlt="intori card reading Something to look forward to"
      />

      <div className={styles.page}>

        <MarketingHeader />

        <main>
          <header className={styles.heroSection}>
            <div className={styles.container}>
              <p className={styles.heroEyebrow}>Made for busy households</p>
              <HeroHeadline />
              <p className={styles.heroDeck}>
                Your calendar is full of things you have to do. This is for the other half.
              </p>
              {/* Lane underlines are decoration under ink glyphs (F3): cluster
                  color never becomes text color, per BRAND.md. */}
              <p className={styles.heroSub}>
                <span className={styles.ulSports}>The game worth staying up for.</span>{' '}
                <span className={styles.ulMusic}>Who&rsquo;s playing 15&nbsp;minutes away on Saturday.</span>{' '}
                <span className={styles.ulWatch}>The show you&rsquo;re both mid season on.</span>{' '}
                <span className={styles.ulFood}>And yes, what&rsquo;s for dinner.</span>{' '}
                intori watches for them, shaped by what your household actually
                likes, and tells you early enough to say yes.
              </p>
              <div className={styles.heroCtas}>
                <AppCtas />
              </div>
              <p className={styles.heroTrust}>
                <strong>No ads.</strong> Nothing sold about your family. You choose what to share.
              </p>
            </div>
            <div className={styles.heroStage}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <Image
                    src="/brand/warm/home-today-gameday.jpg"
                    alt="intori Today screen with a Game Day pick ready to keep or pass on, and a quick question below it"
                    width={1206}
                    height={2282}
                    className={styles.phoneShot}
                    priority
                  />
                </div>
              </div>
            </div>
          </header>

          <section id="today" className={styles.todaySection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>What intori watches for</h2>
                <p className={styles.secSub}>
                  Four lanes, live now. intori watches them for the things you would hate
                  to miss, and the ones you keep land on your calendar before they happen.
                </p>
              </div>
              <div className={styles.todayGrid}>
                {LANES.map((lane) => (
                  <article key={lane.kicker} className={`${styles.todayCard} ${lane.tint}`}>
                    <div className={styles.todayArt}>
                      <Image
                        src={lane.image}
                        alt={lane.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 540px"
                        className={styles.todayArtImage}
                      />
                    </div>
                    <p className={styles.todayKicker}>
                      <span className={styles.laneMark} aria-hidden="true" />
                      {lane.kicker}
                    </p>
                    <h3 className={styles.todayTitle}>{lane.title}</h3>
                    <p className={styles.todayBody}>{lane.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.wedgeSection}>
            <div className={styles.container}>
              <div className={styles.wedgeState}>
                <p className={styles.wedgeLineA}>
                  Your family calendar keeps track of what&rsquo;s planned.
                </p>
                <p className={styles.wedgeLineB}>
                  intori helps with everything that isn&rsquo;t, yet.
                </p>
              </div>
              <p className={styles.wedgeBody}>
                Shared calendars and family displays are great at keeping the household
                moving. What they can&rsquo;t do is step outside the loop: the game tonight,
                the show this weekend, whether Saturday deserves a small adventure.
                intori starts there. It&rsquo;s the half nobody fills in, because filling it
                in means knowing what to look for, finding the date, and remembering
                before it passes.
              </p>
              <div className={styles.wedgeDemo}>
                <div className={styles.demoCol}>
                  <h4 className={styles.demoColTitle}>Already on the calendar</h4>
                  <div className={styles.demoRow}><time>4:00 pm</time>Soccer practice</div>
                  <div className={styles.demoRow}><time>Thu</time>Dentist, both kids</div>
                  <div className={styles.demoRow}><time>Fri</time>School recital</div>
                  <div className={styles.demoRow}><time>Sat</time>&hellip;still open</div>
                  <div className={styles.demoRow}><time>Sun</time>&hellip;also open</div>
                </div>
                <div className={styles.demoCol}>
                  <h4 className={styles.demoColTitle}>Still open &middot; intori&rsquo;s job</h4>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchSports}`} aria-hidden="true" />
                    <div>
                      <b>Tonight</b>
                      <span>Your team tips off at 8, and this one is worth it</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchMusic}`} aria-hidden="true" />
                    <div>
                      <b>Saturday</b>
                      <span>An outdoor show 15 minutes away, kids welcome</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchWatch}`} aria-hidden="true" />
                    <div>
                      <b>After bedtime</b>
                      <span>The show you&rsquo;re both mid-season on is back</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchFood}`} aria-hidden="true" />
                    <div>
                      <b>Dinner</b>
                      <span>3 picks ready, one is a 20-minute sheet pan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className={styles.trustSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Built from your answers, not guesses</h2>
                <p className={styles.secSub}>
                  intori gets useful because you tell it what matters, a few quick questions at a time.
                </p>
              </div>
              <div className={styles.trustGrid}>
                {TRUST_CARDS.map((card) => (
                  <div key={card.title} className={styles.trustCard}>
                    <div className={styles.trustTick} aria-hidden="true"><CheckIcon /></div>
                    <h3 className={styles.trustTitle}>{card.title}</h3>
                    <p className={styles.trustBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="calendar" className={styles.calSection}>
            <div className={`${styles.container} ${styles.calGrid}`}>
              <div>
                <h2 className={styles.calTitle}>Keep the good ones where your family already looks</h2>
                <p className={styles.calSub}>
                  When something is worth holding onto, put it where the household already
                  looks, including your Skylight. On the calendar it&rsquo;s an option, not an
                  obligation. Nothing here has to happen. One tap, your choice, every time.
                </p>
                <p className={styles.calSub}>
                  Once you keep something, it leaves your list. What stays is what you have
                  not decided yet, so an empty list means there is nothing left to decide.
                </p>
                <p className={styles.calFine}>
                  intori adds only what you decide to keep. Nothing lands on the family calendar by itself.
                </p>
              </div>
              <div className={styles.calVisual}>
                <div className={styles.calFlow}>
                  <div className={styles.calPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchMusic}`} aria-hidden="true" />
                    <div>
                      <b>Riverfront Live: Saturday 6 pm</b>
                      <span>Keep this &rarr;</span>
                    </div>
                  </div>
                  <div className={styles.calArrow} aria-hidden="true">&darr;</div>
                  <div className={styles.calDest}>
                    <small>Your household display</small>
                    <b>Sat &middot; Riverfront Live, 6:00 pm</b>
                    <span>On the calendar everyone sees</span>
                  </div>
                  <div className={styles.calChips}>
                    <span className={styles.calChip}>Skylight</span>
                    <span className={styles.calChip}>Google Calendar</span>
                    <span className={styles.calChip}>Apple Calendar</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coming Next is deliberately self-contained: when Family Activities
              ships, this section is deleted and the lane joins the Today grid
              above as a fifth card. */}
          <section className={styles.nextSection}>
            <div className={`${styles.container} ${styles.nextInner}`}>
              <span className={styles.nextTag}>
                <span className={styles.chipDot} aria-hidden="true" />
                Coming next
              </span>
              <h2 className={styles.secTitle}>The moments worth making room for</h2>
              <p className={styles.nextBody}>
                We&rsquo;re building one that surfaces timely, nearby opportunities a
                family would be glad to know about before they pass: the exhibit that
                only runs one weekend, the season that ends soon, the small Saturday
                adventure that turns an ordinary weekend into a memory. Worth putting
                on the calendar while there&rsquo;s still time.
              </p>
              <p className={styles.nextHonest}>Not live yet. The four above are.</p>
            </div>
          </section>

          {/* Pricing. The trial trigger is the differentiator and it is real:
              recordFirstKeepAccessReceipt in the app is the ONLY writer of
              trialStartedAt, so the clock genuinely starts on the first kept
              item and a household that never keeps never starts one. Do not
              soften this to "when you sign up" without changing the app first.

              Amounts mirror src/config/stripeSubscriptionPlans.ts in the app
              repo: 899 monthly, 7_900 annual. If those move, this moves. */}
          <section id="pricing" className={styles.priceSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Free until it earns it</h2>
                <p className={styles.secSub}>
                  Your 14 days do not start when you sign up. They start the first time
                  you keep something, so the clock only runs once intori has actually
                  found you something worth keeping.
                </p>
              </div>

              <div className={styles.priceGrid}>
                <div className={styles.priceCard}>
                  <p className={styles.pricePlan}>Monthly</p>
                  <p className={styles.priceAmount}>
                    $8.99<span className={styles.pricePer}>/month</span>
                  </p>
                  <p className={styles.priceNote}>Cancel any time.</p>
                </div>
                <div className={`${styles.priceCard} ${styles.priceCardFeature}`}>
                  <p className={styles.pricePlan}>
                    Annual
                    <span className={styles.priceTag}>Save $28</span>
                  </p>
                  <p className={styles.priceAmount}>
                    $79<span className={styles.pricePer}>/year</span>
                  </p>
                  <p className={styles.priceNote}>About $28 less than twelve months at the monthly price.</p>
                </div>
              </div>

              <div className={styles.priceLapse}>
                <h3 className={styles.priceLapseTitle}>If you stop paying</h3>
                <p className={styles.priceLapseBody}>
                  Everything you already kept stays exactly where it is. Those events live
                  on your own calendar, on your own device, and they do not depend on us.
                  What stops is the watching.
                </p>
              </div>
            </div>
          </section>

          <section id="start" className={styles.convertSection}>
            <div className={styles.container}>
              <div className={styles.convertLanes} aria-hidden="true">
                <span className={`${styles.laneMark} ${styles.artSports}`} />
                <span className={`${styles.laneMark} ${styles.artMusic}`} />
                <span className={`${styles.laneMark} ${styles.artWatch}`} />
                <span className={`${styles.laneMark} ${styles.artFood}`} />
              </div>
              <h2 className={styles.convertTitle}>Start tonight.</h2>
              <p className={styles.convertSub}>
                {IOS_CHANNEL === 'appstore'
                  ? <>intori is on the App Store, and it works on the web too, no install needed.</>
                  : IOS_CHANNEL === 'beta'
                    ? <>The iPhone beta is open. intori still works on the web too, no install needed.</>
                    : <>intori works on the web today. The iPhone app is next, and the button below will say so the moment it&rsquo;s real.</>}
              </p>
              <div className={styles.convertCtas}>
                <AppCtas />
              </div>
              <p className={styles.convertNote}>
                14 days free, starting when you keep your first pick. Then $8.99 a month
                or $79 a year. <a href="#pricing" className={styles.convertNoteLink}>See what a lapse does</a>.
              </p>
            </div>
          </section>

          <MarketingFooter />
        </main>

      </div>
    </>
  )
}
