---
outline: deep
title: My 2024 Year-End Review
titleTemplate: Notes
date: "2024-12-20"
---

# My 2024 Year-End Review

Hi, I am Terence (Xu Xu). Here is a look back at 2024.

## Introduction

Ten days left until 2025. I just finished the 2024 OKR review and sorted the year's work, so I am writing a light summary here—not only about work. I hope to do this every year from now on.

## Work

Roughly three blocks:

1. Performance and experience work (plus a few tools) on the zero-trust desktop client I had built earlier
2. Building an admin web system from zero to one
3. Exploring and shipping Web and mini-program device-fingerprint SDKs

### Zero-Trust Electron Desktop Client

![Board](/img/notes/2024-year-end-summary/01.jpeg)

The figure above is my sketch of client work this year.

Early on the product chased capability and KPIs under time pressure, so tech debt piled up—performance and UX pain included. This year a large share of time went into performance and experience.

OKR metrics were fixed: how much performance gain, how much lower energy use, how much fewer tickets. Going from "passable" to "good" is hard. Our product manager was on maternity leave, so the business side and I wrote PRDs ourselves and then delivered.

#### Electron Performance

![](/img/notes/2024-year-end-summary/02.png)

High-level only—details would take another essay. Desktop performance work starts with reconnaissance: method timings and memory across machines. Without data you cannot tune.

Step one: instrument timings and memory. That shows which methods are slow and when memory spikes—often from concurrent background policy.

Step two: speed up slow paths and cut CPU spikes.

Most slowness came from system info collection. Early on we shelled out a lot—lots of PowerShell. We rewrote those calls in Rust against Windows APIs: processes, installed software, hardware, and so on. Stats also showed CPU spikes on whole-minute boundaries from many concurrent policies (some every few minutes, some per second). I designed a task queue; after ship, spikes dropped sharply.

I also got much better with Chrome DevTools: Task Manager for JS memory, Performance for leaks, heap snapshots and comparisons, allocation timelines. Same toolkit helps debug Electron's main process—harder than the renderer, with limits when native modules blur stacks. Often the loop is debugger + local logs + intuition + repeated snapshots, then diff the heaps.

Step three: gray and measure. Optimization without numbers is incomplete; do not ship everything at once. Device variety is huge—if gray disagrees with local results, adjust. I kept hardening fallbacks for stability.

#### User Experience

![](/img/notes/2024-year-end-summary/03.png)

UX is subjective—one person likes a feature, another does not. Ticket volume still roughly reflects satisfaction and ease, even if it is a blunt metric. Other axes: usefulness, learnability, aesthetics, interaction fluidity. Our work leaned that way—onboarding, UI refresh, animation, practical toolboxes.

Internal products rarely get dedicated UI designers (lowest priority), and we had no PM—but some UX still had to ship. Shifting from engineer mind to product mind is hard; pure-tech features often miss love. Being frontend helps with taste; I drafted PRDs, reviewed with the team, iterated, and landed something decent.

### Admin Web System

A new "red team" style group needed a platform. I built an admin from scratch with Umi + React + Ant Design. Not much to say—move on.

### Device Fingerprint SDKs

![](/img/notes/2024-year-end-summary/04.png)

I had barely touched this before; I only knew native fingerprints. Web and mini programs have scenarios too. Some of our policies needed it, so I dug in. Little investment in H1; H2 more. On the client you can do surprisingly little: collect signals, feed algorithms, get a hash.

I explored navigator APIs and combined audio, canvas, font, WebGL fingerprints plus basic hardware info, encrypted to the server, then light analysis of collision/growth rates for a pure-frontend scheme.

Honestly the payoff is limited—auxiliary for risk at best. Without a true stable ID (you can store a local UUID), model upside is small. Hard signals still dominate: multi-instance apps, root, emulators. Most activity lives inside app shells; bare H5 is rarer.

Mini-program fingerprints are even narrower—few fields, or fields needing authorization. An SDK must not break core flows; more collection is not always better—privacy rules can get an entire mini program banned. So stick to basics, with fallbacks for varying base library versions and API availability. Compatibility hell.

The real core is the algorithm side. The client only needs truthful collection; leave the rest to models.

## Open Source and Learning

### Open Source

Not a heavy OSS year. A few items:

Kept maintaining electron-prokit ([https://github.com/Xutaotaotao/electron-prokit](https://github.com/Xutaotaotao/electron-prokit))—mostly bugs. ~2.8K downloads, 242 stars.

![](/img/notes/2024-year-end-summary/05.png)

Kept maintaining get-installed-apps ([https://github.com/Xutaotaotao/get-installed-apps](https://github.com/Xutaotaotao/get-installed-apps))—docs refresh. ~5.4K downloads, 106 stars.

![](/img/notes/2024-year-end-summary/06.png)

Built wukong-wallpaper ([https://github.com/Xutaotaotao/wukong-wallpaper](https://github.com/Xutaotaotao/wukong-wallpaper))—Black Myth Wukong wallpaper app, for fun. 58 downloads, 6 stars.

![](/img/notes/2024-year-end-summary/07.png)

With colleagues, FindAll ([https://github.com/FindAllTeam/FindAll](https://github.com/FindAllTeam/FindAll))—network security emergency-response tooling for red-team ops. Source closed; installers only. ~11K downloads, 600+ stars.

![](/img/notes/2024-year-end-summary/08.png)

### Learning

![](/img/notes/2024-year-end-summary/09.jpg)

Colleagues and I attended a cybersecurity operations conference in Beijing—eye-opening. AI is everywhere in security talks; agents are already in real scenarios. My learning stayed shallow (API calling). I need depth toward being an "AI frontend" practitioner.

I also read parts of Electron and its ecosystem—careful engineering, and a gulf versus the ceiling. Chromium source is vast and hard (mostly C++); painful for a frontend engineer, but the work demanded it.

## Hiking and Travel

### Hiking

New hobby this year: hiking. Not that many trips—summers too hot, winters too cold—so mostly spring and autumn. Hiking clears work noise. Alone on a trail you hear wind and water and feel the mountain belongs to you for a while.

Lushan—the only mountain I visited twice—still beautiful.

![](/img/notes/2024-year-end-summary/10.jpeg)

Fuzhi Mountain—stone waves and canola terraces; spring suits it.

![](/img/notes/2024-year-end-summary/11.jpeg)

Hangzhou Jiuxi—great spring/summer; classic Shanghai day trip.

![](/img/notes/2024-year-end-summary/12.jpeg)

Xingmeijian—intimidating; beginners beware, or finish the descent in the dark.

![](/img/notes/2024-year-end-summary/13.jpeg)

Yushan—normal difficulty, nice views, lots of up-and-down.

![](/img/notes/2024-year-end-summary/14.jpeg)

Qixiakeng—fall colors; easy route, maple leaves at their best.

![](/img/notes/2024-year-end-summary/15.jpeg)

Longwang Mountain—Jiangzhehu snow prize; winters worth it.

![](/img/notes/2024-year-end-summary/16.jpeg)

### Travel

![](/img/notes/2024-year-end-summary/17.jpeg)

Strongest trip: western Sichuan road trip with friends. Every stop drew a chorus of "wow"—eyes cleaned. One day can hold four seasons. Driving G318 feels great: rivers, grassland, mountains, cloud seas, snow peaks. "Drive 318 once in a lifetime" earns it.

Also Jingdezhen, Fuzhou, Pingtan, Jinyun—each with its own flavor, food, and views.

![](/img/notes/2024-year-end-summary/18.jpeg)

Jingdezhen is porcelain everywhere—like a ceramic nest. Handcraft lovers can stay days. Some night stalls are fierce; even for someone from Chongqing the spice stung. Spice-shy travelers: skip or cry.

![](/img/notes/2024-year-end-summary/19.jpeg)

Fuzhou feels lived-in, not over-touristy—cultured and a bit petit bourgeois. Hit the famous spots, wander with a camera; that is enough.

![](/img/notes/2024-year-end-summary/20.jpeg)

Pingtan is worth it—rent an e-bike, loop the island under blue sky and green water, stop for photos, find a bay with friends, sip something slightly salty, wait for sunset.

![](/img/notes/2024-year-end-summary/21.jpeg)

Jinyun underwhelmed: crowded, small, fewer views. Go on a quiet weekend, not holidays. Popular mainly because of TV filming locations. Fine for a nearby Jiangzhehu weekend if you want easy photo spots.

## Photography, Cycling, Badminton

### Photography

![](/img/notes/2024-year-end-summary/22.jpeg)

I have shot since college with the same kit—prosumer camera, no new lenses—and that is fine for portraits or landscape. Photos used to go to Weibo; on WeChat I opened a photography column and posted backlog when mood allowed. Weekends I wander for street scenes; travel means the camera comes too. Good frames cheer me up because each one is unique and returns the moment—that is why I keep shooting.

### Cycling

![](/img/notes/2024-year-end-summary/23.jpeg)

Cycling returned this year. College was mountain bike; after National Day I tried road. When weather allowed I rode weekly—~600 km in two months, ~300 of that around Taihu. First century-plus day since college; finishing Taihu made me feel unstoppable. Dopamine is real—and if you do not overdo it, the body likes it.

### Badminton

![](/img/notes/2024-year-end-summary/24.jpeg)

Still a beginner. I took private lessons and quit halfway through footwork. For desk workers it is healthy; I played most weeks—casual with the team, sharper with company players and stronger partners. Rules → better reactions and movement; teammates say I am clearly better than when I started.

## Reading and Writing

### Reading

Fewer books than last year. Finished: *Four Springs*, *Educated*, *Shall We Go for a Walk on Saturday Night*, *The Litchi Road*, *The Alchemist*. Half of *Original Commentary on the Great Learning*; ~25% into *The Courage to Be Disliked* and a Trump biography. Mix of everything—idle pages. *The Alchemist* was especially healing; recommended.

### Writing

Real writing year: WeChat first, then Juejin, then CSDN. Energy caps further platforms. Rough numbers follow.

On WeChat, *Turning 30: Six Years as a Frontend Engineer* took off—many notes from peers who felt the same. Two paid columns, though most pieces stay free—contribution, not hustle. When people ask questions I may point to a column; buy or not is their choice. ~1,184 followers; read counts unknown.

![](/img/notes/2024-year-end-summary/25.png)

On Juejin, *Two Years Building Electron Apps* ranked among strong frontend posts; lots of Electron questions and peer chats. 400+ followers; traffic is high—many developers there.

![](/img/notes/2024-year-end-summary/26.png)

![](/img/notes/2024-year-end-summary/27.png)

![](/img/notes/2024-year-end-summary/28.jpeg)

CSDN feels mixed quality and maybe bot-heavy—hard to prove—but many people still use it, so distribution still helps. 400+ followers.

![](/img/notes/2024-year-end-summary/29.png)

Year one of personal brand experiments: people who find me usually share a similar path—mostly frontend, some founders seeking consulting or jobs/interviews. The network amplifies you; my niche is specialized, so inbound is mostly Electron/desktop. Other formats (advice lists, tool roundups) stay undecided—they may not serve my own practice. I prefer writing from day-job depth: summarize and sharpen.

## Closing

Time flew. On paper the year looks rich. Writing clarifies and forces reflection—worth it.

Compressing a year into ~6,000 Chinese characters is like bottling the year and dating the cork—open it later and maybe taste the age.

Everyone has a private trajectory. This is only mine. Disagree freely. Thanks to everyone who walked along—may the new year hold something excellent for each of us.
