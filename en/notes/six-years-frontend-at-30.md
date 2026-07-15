---
outline: deep
title: "Turning 30: Six Years as a Frontend Engineer"
titleTemplate: Notes
date: "2024-12-01"
---

# Turning 30: Six Years as a Frontend Engineer

![](/img/notes/six-years-frontend-at-30/01.jpeg)

Hi, I am Terence (Xu Xu)—a frontend engineer who also loves photography. Today I want to share some of the technical and career path from these years.

## Introduction

Birthday messages from apps and SMS made me realize I was about to turn 30. My ID uses a lunar date, so the greetings arrive almost a month early. Looking back at a few years of work, it felt worth writing down—a chance to take stock. What follows is personal opinion. Disagree freely.

## A Brief Self-Introduction

My undergraduate major was communications engineering. I taught myself frontend in college out of interest. Through a ThoughtWorks training camp I first understood what a frontend engineer actually does. On weekends I sat with students from other universities to study frontend, met many strong peers, and grew more serious about the craft. Even with communications offers after graduation, I chose frontend.

I once wrote a short piece about how I entered the field.

## Career Timeline

- 2018: graduated and joined a large listed consulting firm in Shanghai, financial BU, frontend
- 2019: deputy frontend lead
- 2020: frontend lead, team of about 15
- 2021: joined an internet company as senior frontend engineer
- 2022: led frontend on an internal venture project
- 2023: promoted to staff / senior frontend engineer
- 2024: quietly writing code, as usual

## What Outsourcing Gave Me

![](/img/notes/six-years-frontend-at-30/02.jpeg)

Campus recruiting was not a deep comparison process. The company felt professional on campus, tech sounded modern, interviewers were decent—and then I learned it was outsourcing. I did not even know what that meant. Luckily the BU was mid-transformation and needed new products, so only the first half year was classic outsourcing; after that I moved into product R&D.

Soon after joining I was on the road for client work, many cities. Early work was mostly mobile H5, short projects—five or six cities in half a year-plus. Stack was mainly Vue, with occasional Ionic + Angular app shells. The first half year was learn-by-doing with almost no mentorship. Our BU had no frontend before; I was the first hire. The company had central platform frontend folks, but I knew few of them. Except for very hard problems, I solved things myself—routing questions through managers burned too much time. After several projects, problem-solving got sharp.

On site you were often the only frontend. PMs rarely knew mobile well. I had studied our more mature products (built by other teams) before joining, so I understood the space. Site PMs treated you as the person who owned all mobile needs, so I mostly negotiated requirements with clients alone. That grew my confidence with customers and strangers—social skill in real rooms.

Technically those first months did not jump far: adapt templates, copy patterns. I got a clear mental model of Vue, could bootstrap a Vue project, use common components, wrap simple ones. The bigger gain was facing nasty problems without fear.

## Growth Building In-House Products

![](/img/notes/six-years-frontend-at-30/03.jpg)

In December 2018 the BU started a mobile product from scratch—modern web tech plus the company's super-app platform, wired to our business systems. I touched frontend, backend, and native enough to grasp mobile delivery end to end; day to day I still shipped H5 in Vue.

Vue went deeper: components, communication, state, filters, reactivity, routing, lazy load, build optimization, keep-alive / computed / watch under the hood, plus Vue-cli, Webpack, automation and release. Mobile adaptation too: viewport, responsive layout, fonts, 1px, touch, media, inputs, WebView, JSBridge.

It felt like endless leveling up—and seeing polished UI on a phone was a joy. Two teammates and I debated hard; self-built product felt like a real team, which is what I had wanted.

Mobile Phase 1 wrapped around March 2019; I became deputy lead (backend as lead) on a mobile delivery group. In April leadership put me on another line—PC React. Exciting and scary; I had not shipped React before. We spent a week at another office with a new intern ramping on their framework. Vue vs React differs on the surface (templates vs declarative components), but data-driven UI and unidirectional flow transfer. Once that clicks, frameworks are mostly ecosystem.

The PC line used agile for real: PM, product, frontend, backend, QA; standups, retros, boards, reviews, tech talks. The group grew; newcomers trained here then went on site—a bit like a training hub. I learned how to onboard people and built a simple mentoring SOP.

After half a year-plus the product took shape; people peeled off to implementation trips. I moved offices again to own mobile delivery for the BU—roughly five or six frontend plus two product owners. That stretch lasted only about two months.

Then the self-built product needed a flagship customer build in Shenzhen. The core crew were familiar faces; weekends near Shenzhen were easy, and the winter there was gentle. Back home for Chinese New Year 2019/2020, COVID hit; afterward leadership pulled me into remote-center frontend delivery for more than a year.

## What Remote Delivery Taught Me

![](/img/notes/six-years-frontend-at-30/04.jpeg)

I owned frontend delivery for mobile and PC: assign work, unblock teammates, do some product work, occasionally travel for design reviews. The team grew to about 15. I focused on mobile and asked another teammate to lead PC, joining for hard cases—so I could protect attention for tough tech.

I learned mini programs (a C-end mini program we owned) and Flutter as a backup for a Flutter app shell, pairing with someone loaned from another dept.

Delivery itself was rarely dramatic—one person per one or two projects. Growth was softer: energy and time, risk sensing in messy delivery, trust, calming frustration, talking to site people, remote requirements, shipping.

## Day-to-Day at an Internet Company

![](/img/notes/six-years-frontend-at-30/05.jpeg)

In 2021 I joined a second company as a senior frontend engineer. That year was mostly ordinary: review, kickoff, build, test, release; two-week sprints; admin pages and some C-end SDKs. Little technical leap—mainly learning big-internet cadence.

By late 2021 another frontend and I looked for something of our own. We owned a simple native desktop client that was painful to ship. We rebuilt the core in Electron on the side over two or three months, won leadership support, and started a long Electron journey.

## A Startup Project That Nearly Took Us Down

![](/img/notes/six-years-frontend-at-30/06.jpeg)

Mid-Electron, the department took a company-level venture; our director owned it. For half a year-plus I was pulled onto a C-end product: cross-platform mini-program framework shipping WeChat and mPaaS. I owned that frontend.

Kickoff dinner, lots of energy and promises. I expected at least three months of chronic overtime.

MVP time was brutal—about a month. Deadlines on the whiteboard daily. Process was thin: verbal requirements, short reviews, ship the MVP. Fast code, less thinking, core interactions first. V1 landed on time; rough edges were acceptable because grayscale would be long. During grayscale we fixed bugs and kept building.

No dedicated UI designer—proto designers doubled. C-end interaction churned hard, so I kept modules and components fine-grained (a lesson from job one). Coupling early would have killed us on rewrites.

The harder phase was full gray. Unlike admin systems, every release mattered; midnight gray ships were normal, boss watching beside me, PMs filming "startup vlogs." Thursdays for a month meant 1–2 a.m. plus weekend overtime—close to quitting. But C-end joy is different: real users, big PV/UV. That is where frontend value felt visceral.

I also saw a full product lifecycle—research, competitors, product and tech design, launch, seed users, growth, conversion—not tech alone. Cross-platform mini programs, TS end to end, platform quirks, Canvas, hand-rolled animation, UI craft—all leveled up.

Then it died at year end. One morning still arguing implementation details; afternoon all-hands: leadership was dropping the product. Gone.

## Two Years of Electron

![](/img/notes/six-years-frontend-at-30/07.png)

Electron was my fastest technical growth. Internal product meant time to polish and go deep—breadth and depth both.

I wrote about that stretch elsewhere; it blew up on Juejin and did well on WeChat. I will not repeat it here—search if curious.

## On Writing

![](/img/notes/six-years-frontend-at-30/08.png)

The luckiest habit of 2024 was starting to write. Much of it is digital noise, but I often enjoy it. I am not a note-taker; I bookmark good blogs. Many strong people keep long-term records of tech or life.

Carving time to organize schemes, bugs, and knowledge is growth. Writing surfaces new angles and turns scattered scraps into a system. The motive is first to serve myself, then maybe help others—otherwise I would not sustain it.

On cadence: I once obsessed over daily posts; three months of daily WeChat posts got rougher. I switched to weekly—one article a week is enough to polish and think.

## Some Personal Notes

![](/img/notes/six-years-frontend-at-30/09.jpeg)

Six years of frontend: joy, anger, sorrow, relief. Mostly joy. I do not hate the work; I still care. Soft patches happen; rest, then start again. A career that only hurts forever may be the wrong fit. Sometimes survival requires pain—but not endless pain, not for me.

On ceilings—for frontend, and for engineers generally: the top 10% in a domain may have no hard ceiling. Most of us will never be there. Ordinary careers face mid-age layoff risk. How to stay competitive is a question every reader already has instincts about.

Staying competitive takes many axes. Tech moves fast—frameworks, tools, practices shift yearly. Learning energy, trend awareness, and selective depth matter (GPT can introduce a topic in a day). Algorithms—needless to say for those who know.

Soft skills matter too: project ownership, collaboration, hard problem framing. Seniors see product and tech from higher altitude. Later you often must act as PM for an outcome; finding projects depends on environment. Engineers are often "resource talent"; being the tech driver differs from integrating departments as PM—influence, upward management, cross-team talk.

Personal brand also matters more: blogs, OSS, community. It expands network and options. In practice I met many peers; the same tech looks different across domains. Same-city friends can become real resources.

Know your strengths and gaps; listen inward, not only to noise. Balance openness and a core self that others cannot yank around—that is also how confidence builds.

For older engineers, transformation is strategy: architecture, management, a niche specialty, consulting, founding. Many roads; find yours.

Mindset: a friend once said life is not future or past—it is now. Do this second, this minute, this day. Yesterday is gone; tomorrow is not here. That does not mean ignore past and future—just a lighter lens. I later found related lines in *The Courage to Be Disliked*: the greatest lie is not living in the "here and now"—obsessing over past and future that do not exist, and lying to the irreplaceable moment.

## Closing

I somehow wrote over 7,000 Chinese characters—my longest piece since college. If you read this, call it chance. Disagree freely; if it resonates, say hello. One line to share: the road is long; I will seek high and low.
