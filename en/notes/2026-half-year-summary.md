---
outline: deep
title: 2026 Half-Year Review
titleTemplate: Notes
date: 2026-06-30
---

# 2026 Half-Year Review

## Introduction

Half of 2026 is already behind us. This is a short record of what changed, what I learned, and a few thoughts along the way.

## Looking Back

**Q1**

Publishing the apps I had built to the iOS and Google Play stores was not hard in itself. The annoying part was the account setup process. I had done this before, so it went smoothly without much pressure.

Building a competitive precision-agriculture web system from zero to one, with a smooth and polished user experience, was something I did almost entirely on my own with AI tools. The parts that took the most time were mapping the business landscape and locking down the UI design. The current UI was also generated with AI tools. I tried several tools before landing on a design that felt right to me and good enough for the product team. After the design was settled, I defined the base framework and core components, then had Cursor write code according to fixed rules. Overall the difficulty was not extreme. Frontend technology itself is no longer the main bottleneck, and Cursor was enough. That is how the department's first vibe-coding project shipped, and international customers responded very well. The new version feels smoother than the old one, the interface looks better, and we dropped the old design entirely. Build boldly, design boldly, ship it.

Large-scale map rendering is something I started researching as soon as I joined the company. In precision agriculture, rendering large volumes of trajectories and field data is critical for analyzing work performance. A pure frontend approach was no longer enough. During this period I tried using geoserver as middleware for the core layer stack, including data storage and layer design, which I handled on my own. The result is usable, but still short of industry-leading standards. Field operations in precision agriculture are extremely complex. Trajectory patterns vary a lot. Displaying multi-boom and multi-channel data, plus segmentation and positioning, is still an active problem for us. The data format is complicated and involves angles, swath width, and other details that are hard to render cleanly on the web.

For app health monitoring, there was no need to build something in-house. We deployed Sentry inside the company. It works great, and other teams started using it too.

**Q2**

Core precision-agriculture features: machine configuration sync, offline path delivery, full-field path planning, and field-task data analysis. These were regular product requirements and business development work. I closed the loop end to end from design to frontend and backend development to release. The one part I still cannot fully close by myself is testing. Testing can be automated now, but web end-to-end automation consumes a lot of tokens, so we still rely on QA for much of it. Developers and testers think differently. As a developer I can close the logic loop and use AI to write unit tests, and I can follow a TDD-style workflow. Most of the time that works, but some edge cases still slip through. Full end-to-end closure still has a small gap, though I think that gap will close soon. Some so-called AI-native organizations are already doing it.

Transitioning from frontend engineer to full-stack development: backend framework setup, base configuration, and vibe-coding all backend APIs to close core features end to end. With AI tools, role boundaries are getting blurry. Companies expect more from individuals now, and cost control is strict. If you still only do the narrow slice of work you used to own, you may fall behind quickly. So I had to adapt.

## Thoughts

My biggest feeling from the first half of the year is that companies expect more from people than before. In the past, the model was often **T-shaped talent**: knowledge breadth plus professional depth. Now people talk about **E-shaped talent**: AI capability, taste, architecture skills, and endurance.

<div class="talent-model-diagram">
  <p class="talent-model-title">From T-Shaped to E-Shaped Talent</p>
  <div class="talent-model-row">
    <div class="talent-model-card">
      <div class="talent-block talent-block-t">
        <span class="talent-block-top">Knowledge breadth</span>
        <div class="talent-block-body">
          <span class="talent-block-side">Professional depth</span>
          <div class="talent-glyphs talent-glyphs-t" aria-hidden="true">
            <span class="talent-bar talent-bar-h"></span>
            <span class="talent-bar talent-bar-v"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="talent-model-arrow" aria-hidden="true">→</div>
    <div class="talent-model-card">
      <div class="talent-block talent-block-e">
        <div class="talent-block-body">
          <span class="talent-block-side">AI capability</span>
          <div class="talent-glyphs talent-glyphs-e" aria-hidden="true">
            <span class="talent-bar talent-bar-spine"></span>
            <span class="talent-bar talent-bar-e1"></span>
            <span class="talent-bar talent-bar-e2"></span>
            <span class="talent-bar talent-bar-e3"></span>
          </div>
          <ul class="talent-block-tags">
            <li>Taste</li>
            <li>Architecture</li>
            <li>Endurance</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

Looking back at the first half, it feels like I carried most of the engineering side of the business on my own and became the de facto engineering lead for this product line. Once a business area is handed to you, the expectation is simple: find a way to get it done. If you hit blockers, solve what you can yourself and pull in resources for what you cannot. In the end, leadership cares about results, not how you got there.

I joined this company as a frontend software engineer. As AI changed the workflow, doing frontend-only work was no longer enough, so I moved into full-stack work. The good news is that a lot of coding no longer has to be done by hand. If you can do architecture and understand the business deeply, you can take on work that would have been out of reach before. Initiative matters more, and the ability to operate as a strong individual contributor stands out quickly.

The business I work on now is precision agriculture, which I had never touched before. Over the past six months I have learned and collected a lot of solutions in this space. The industry spans geography, remote sensing, data, hardware, software, algorithms, and big data. A single feature can touch many upstream and downstream systems, so I have been learning while building the whole time.

My rough understanding of precision agriculture is this: combine data from many sources, analyze the four major crop stages—tillage, planting, management, and harvest—and define the right actions for each stage. Then manage crops precisely at each step, execute those actions, and analyze the results to plan for the next season. On large farms, you also need fine-grained control over crop type, field, timing, materials, people, cost, revenue, and anything tied to money. All of that needs to be visualized, analyzed, and turned into an operating system that adapts to each season. Every stage has its own ecosystem of vendors: prescription maps, path planning, machine management, task analytics, remote sensing, and more. The space is crowded and competitive.

The phrase I heard most in the first half was vibe coding. It swept through the programming world. Codex, Claude, and Cursor are now part of daily work. Almost anything you can do on a computer can be handled with these AI agents. They act like assistants for the work on your desk. What feels strange is that even though efficiency went up, working hours did not go down. Companies kept cutting headcount, which means the people who stayed had to carry more. AI raised productivity, but team output did not necessarily improve at the same rate, because product development models have not changed in a fundamental way. Teams still cannot always talk directly to customers and ship deliverable products immediately. Under that setup, engineers face more pressure, more direct customer exposure, and higher expectations—the E-shaped talent model again.

## END
I will stop here for now. I often joke with colleagues that the time left for us to write code by hand is running out. Many developers probably feel the same. The future is already here. Might as well meet it with open arms.
