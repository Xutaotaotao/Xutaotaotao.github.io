---
outline: deep
title: My 2025 Year-End Review
titleTemplate: Notes
date: "2026-01-03"
---

# My 2025 Year-End Review

## Introduction

![](/img/notes/2025-year-end-summary/01.jpeg)

Before I knew it, it was already 2026. I still wanted to write a year-end review for 2025, because when I wrote the 2024 review I set a flag for myself: do one every year. Not for anything else—just to record what happened, so looking back later does not feel thin. Memory fades. Writing does not.

## Work

2025 was the year with the most change in my career so far. In a little over seven years I have worked at four companies; this year alone I went through three. Changeable is putting it mildly.

Timeline in brief: in June I left my second company (internet mobility) and joined a startup (AI Browser). After a little over three months, the company planned a move to Singapore—effectively a soft layoff. I rested and job-hunted for about a month, then joined my current company (high-precision positioning).

## First Half of the Year

![](/img/notes/2025-year-end-summary/02.jpeg)

Mainly these areas of work:

Stability work on the VPN module of the zero-trust software—especially automatic VPN mode switching and connection across domestic and international scenarios.

Building an internal ChatGPT-like site wired to large models.

Researching Chrome builds to make a secure browser: ship with a default extension, control browsed pages through it, intercept some data, and desensitize sensitive information on the page.

Plus a CRUD admin for a traffic-rule engine.

The first half already feels far away. Maybe because the second half was so packed. Anyway, it feels distant.

## Why Join a Startup?

![](/img/notes/2025-year-end-summary/03.jpeg)

Early in the year someone found me through the WeChat official account and said they were building a desktop AI product, and asked if I was interested. It was probably the series of Electron posts that pushed traffic to people with that need. Later X (the founder) suggested meeting offline. We had dinner; after the meal he pitched their idea: a local-first AI agentic browser. At the time the idea felt genuinely ahead of the curve. Their early version used a Chromium kernel, but build and development costs were too high, so they wanted another stack. He asked whether Electron could build a browser. I had seen Electron-based browsers before—feasible, but with ceilings; longer term Chromium is still better. I did not overthink it then, and said it should work, with possible bottlenecks later. X said maybe try joining and building together. I thought, that direct? I did not say yes on the spot—I said I would look into it and research first. A week later X brought his technical cofounder to talk about part-time support. The direction still felt solid, so I agreed. Another weekend later, X brought in a senior frontend engineer and we walked through the technical plan. That is how v1 started. I joined part-time, mainly on Electron architecture and core browser features, including simulating related Chrome extension capabilities.

## Part-Time Period

![](/img/notes/2025-year-end-summary/04.jpeg)

My part-time work was relatively independent. Weekdays left almost no time for it, so most of it happened on weekends—trading rest for side income. In about a month the browser's core was done; Agent integration was mostly there. Another month of polish and the demo had a shape. Startup pace is fierce. Full-timers worked through Spring Festival; I was part-time, so I did not need to grind the same way—just ship what I could. After the holiday, X talked with me again about his time in the US and the AI startup vibe there: lots of opportunity, lots of money. I still did not want to go full-time—the product had not shipped, I did not know the situation, and I did not know the team well enough. I decided to watch longer. In April the first version launched; coverage across official accounts looked great, and I started wanting to join full-time. Products like that were still rare, and it was genuinely attractive. In June we talked compensation; the bump was decent, so I resigned and joined.

## Pace at an AI Startup

![](/img/notes/2025-year-end-summary/05.jpeg)

When I first joined full-time, we were remote and the pace was not crazy yet. Then came a 2.0 rewrite—speed ramped hard. Most PRDs came from AI. The bar was basically: implement all of Chrome's features. Interaction quality still lagged. In the middle of that overhaul, the previous frontend lead left; another senior frontend engineer took over. Effectively a new team, aimed at landing 2.0. X sent me to Beijing to push code freeze—one month. It already felt impossible. Sure enough, even working to 2 a.m. daily with no weekends off, a month still did not freeze the branch. The workload was simply there, and many low-level details had never been researched before we coded. AI helps a lot, but browser internals are not always something AI can nail. Daily standups morning and evening; Electron lacks same-layer rendering, so the home interaction was painful; we also reworked the core Groups/Tabs relationship several times before it stabilized. Then back to the Shanghai office for another month of grinding before release.

## Takeaways from the Startup

![](/img/notes/2025-year-end-summary/06.jpeg)

Everyone can be strong individually and still fail to finish something cleanly together. Under pressure, speed wins and quality loses. Often you are not shipping features—you are shipping technical debt. Short term it looks fine; later the repair cost is higher than the original savings.

People who join startups generally need some edge. A gentle "sheep" workplace posture does not fit. Employee thinking does not work there either—you have to raise problems and solve them proactively.

Under high pressure, mood and work state take a hit. That is inevitable. If you have never lived it, it will feel bad—physically and mentally: insomnia, hair loss, fever, nausea. Once you adapt, looking back it may feel manageable; the body damage still takes time to recover.

## Interviews

![](/img/notes/2025-year-end-summary/07.jpeg)

In October I interviewed a lot—startups, traditional companies, internet companies, across industries—about two interviews a day. Honestly I had not interviewed in years. Jumping back in felt rusty, especially on fundamentals; without review, it is hard to stay calm. It also depends on the interviewer. Most interviews probe similar basics, so summarizing and reviewing helps.

Then projects—lots of detail, plus macro skills: architecture, solving general and edge-case problems. Then live coding: scenario problems (closer to real work) and algorithm problems (LeetCode—just grind).

Interviewing is learning while interviewing: write down what each round asked, and review the same day. After enough rounds you get a feel for it—if the foundation is not too weak. Refresh the common "interview essay" topics; some companies ask them raw, others weave them into project talk.

## At the New Company

![](/img/notes/2025-year-end-summary/08.jpeg)

The new company is hardware-based. Frontend is still conventional frontend; infrastructure is incomplete. On my project we touch most of the frontend stack. The team is solid; pace is not extreme, though the work is a bit messy. My role is roughly frontend lead: find what is unreasonable or nonstandard in the engineering setup, propose improvements and ship them, and dig into hard technical problems to raise the team's ceiling. Overall I like where I am.

## Travel and Hiking

I hiked less than last year, mostly because free time shrank. The first half still had occasional weekend outings; the second half had almost none. Places I did get to:

Shaoxing · Qingtankeng Village

![](/img/notes/2025-year-end-summary/09.jpeg)

Mainly for cherry blossoms—they were not fully open yet when I went. The last stretch of the trail was still gorgeous: blossoms everywhere, a proper flower spot.

Anji · Zhangli Ancient Trail

![](/img/notes/2025-year-end-summary/10.jpeg)

Beautiful. Late March. The scenery shifts from foot to summit; the top had a lot of snow—striking—and the plants are diverse. Good for hiking.

Jinhua · Xianhua Mountain

![](/img/notes/2025-year-end-summary/11.jpeg)

Lots of rough trails; fun to walk. The views are not the most stunning, but the route is interesting.

Shangri-La · Tiger Leaping Gorge & Laoyao Mountain

![](/img/notes/2025-year-end-summary/12.jpeg)

![](/img/notes/2025-year-end-summary/13.jpeg)

That was Labor Day—I joined a group trip for hiking in Yunnan. Tiger Leaping Gorge earns its world-class reputation; nothing to nitpick about the scenery. Roaring river and towering mountains the whole way—nature at full volume. Laoyao Mountain is equally hard to forget: grassland, snow peaks, forest, constantly changing views. Eyes thoroughly washed.

Anhui · Huangshan

![](/img/notes/2025-year-end-summary/14.jpeg)

Huangshan needs no introduction—grand vistas and quieter corners alike, different from every angle. Tiandu Peak and the Xihai Grand Canyon were deeply satisfying.

Shanxi · Wutai Mountain

![](/img/notes/2025-year-end-summary/15.jpeg)

Three days hiking Wutai. Northern mountains feel different from southern ones; it was my first northern mountain hike, and a memorable one. On the trail many worries drop away. Three straight days of hiking settled my mind; the scenery was excellent—a full pilgrimage-style trek.

Travel-wise: Yunnan and Xinjiang.

![](/img/notes/2025-year-end-summary/16.jpeg)

![](/img/notes/2025-year-end-summary/17.jpeg)

Yunnan for Labor Day, Xinjiang for National Day. I had long said I would go; this year I finished both. Both landscapes linger. I did not see everything in either place, but I finally set foot somewhere new and felt different land and culture.

## Closing

![](/img/notes/2025-year-end-summary/18.jpeg)

On AI: 2025 was the breakout year for large-scale AI application. Startups everywhere. I was not in that circle long, but it is clear the AI track is wide open. For ordinary technical talent, riding this wave to wealth still has cost and barriers: can you take extreme pressure (AI companies are brutal), and can you keep learning at a manic pace. Typical office workers rarely get deep chances to build AI Agents. Continuous founders dominate that space. Regular employees seldom ship Agents for a company business themselves; even with self-study, traditional orgs struggle to adopt it. That is only a tech person's view.

For me, 2025 was a year of heavy change—outside and inside. After big job shifts, my mindset is different. I used to sweat small details; now many things feel small. The startup stretch was exhausting, but afterward everything feels calmer; a lot of things got demystified. Some things you only understand after living them. See the essence, and a lot of annoyance and anxiety falls away. If you ask what I grew into specifically—I am not sure I can name it cleanly.
