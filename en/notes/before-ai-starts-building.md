---
outline: deep
title: 'What I Do Before Letting AI Start Building a Feature'
titleTemplate: Notes
date: 2026-10-20
description: How I work through requirements, business exceptions, and acceptance criteria before asking AI to write code.
tags: [AI, Vibe Coding]
---

# What I Do Before Letting AI Start Building a Feature

![A lake and reeds beneath a blue sky with white clouds](/img/notes/before-ai-starts-building/cover.jpeg)

## Introduction

After almost a year of Vibe Coding, I feel that the way I use AI to build applications and features has gradually changed.

At first, whenever I got a requirement, I wanted AI to start writing right away so I could see what it could build. Now I tend to pause before starting and spend more time thinking through the requirement itself.

I want to record these changes and take a look back: which practices have actually helped, which have been more trouble than they were worth, and what I could adjust next.

## How I Have Used AI for Development Over the Past Year

A year ago, I mainly used Cursor for frontend development. Based on my experience in 2025, it was not as capable as it is now. It mostly did exactly what I pointed it at. Each change was fairly small, and afterward I usually had to review it myself before telling it what to do next.

In early 2026, I started using Codex and Claude Code, and it was clear that these tools could do much more. Combined with Superpowers, they could take the requirements for a small or medium-sized module and attempt to handle everything from analysis through implementation and testing. I was also quite fond of TDD at the time. Writing tests first and then filling in the implementation gave me a process to follow, which made me feel more confident.

After using it for a while, though, Superpowers started to feel increasingly heavy. Some tasks were simple, yet I still had to go through the whole process. It felt a bit like being tied down by it. Eventually, I more or less stopped using it and just explained the requirements clearly before letting AI get on with the work.

This also has something to do with how the models have evolved. Many things that used to require step-by-step guidance can now be handled independently. When something is uncertain, the tools are also more likely to bring it up for discussion.

So I no longer stick to one fixed approach. For a small requirement, I explain it clearly and get started. If I have not thought something through myself, I open Plan mode and talk it over first. For a particularly large task, I use Goal mode, spell out the constraints and acceptance criteria, and let it keep working.

Of course, I still have my reservations. When starting a complex project from scratch, I prepare an `AGENTS.md` file and the relevant guidelines first.

Which framework to choose, how to structure reusable components, how to keep the theme, colors, and fonts consistent, and how to organize data and routes: it is best to agree on these things at the beginning. I also try to put as much of the project's foundation in place as possible, so that when AI starts writing business code, it has something ready to reference and reuse.

I include testing requirements in advance, too, such as a unit test coverage target of 90%. That number can only serve as a reference, though. Whether the tests cover the key business rules and whether the behavior is correct when something goes wrong still depends on the tests themselves. Even very high coverage will not save you if the business requirements have been misunderstood.

I still think these agreements are necessary, but I try to keep their number under control. When there are too many documents to work through for every small task, it is easy to end up back where I was before, feeling that the process is too heavy.

## What I Do Before Starting a Feature Now

The things that take the most time now are clarifying requirements, deciding whether a feature is worth building, considering exceptional situations, and defining acceptance criteria. Sometimes, discussing these things takes longer than it takes AI to write the first version of the code.

### First, Is This Feature Actually Worth Building?

When I used to receive a requirement, I would easily jump straight into thinking about implementation: how many pages we needed, how to connect the APIs, and which components we could reuse.

Now I ask a few more questions. Who will use this feature? What problem are they facing? Is there another way to solve it without building this feature? What will users gain once it is built?

These questions can be surprisingly hard to answer. A requirement may look complete in a document, but after a few layers of questions, some parts turn out to be little more than rough ideas. So I now spend more time looking at similar products: how others approach the problem, why they arrange the flow that way, what limitations they have, and how they introduce the feature to users.

I find that last part helpful, too. If I cannot clearly explain what a feature will change for users after it is built, it may need a little more thought.

AI agents can now help with a lot of this work. Searching for information, reading documentation, comparing how several products handle something, and putting the findings together is much easier than starting the research from scratch myself. Still, the sources and key conclusions need to be checked, and someone else's solution cannot simply be copied over.

In the end, I want a requirements document that does not have to be long but makes things clear: why we are doing this, how far we will go this time, and which situations we are leaving out for now.

If data flows and APIs are involved, I map those out as well. Where does the data come from? Who can change it? Which pages will be affected? Which systems does it need to interact with? I write down what has been decided and mark anything unresolved for further discussion.

AI can keep writing even if these details are missing. It will just fill the gaps with its own assumptions. Discovering after the code is finished that we had different things in mind often makes the changes much harder.

### Discuss Exceptional Situations in the Business Beforehand

AI is already very fast at building the normal flow. When the conditions and steps are clear, it can usually get something running quickly.

But I feel that it still falls a little short when handling some exceptions that arise in real business situations. This is especially true for situations involving how people work and established business practices. If the requirements do not mention them, AI may not think of them. Take an approval feature, for example. The main flow of submitting, reviewing, and approving is easy to explain. But what if a user wants to withdraw a request after submitting it? Can it still be changed once the reviewer has started processing it? If the person responsible changes halfway through the approval process, who should take over?

These problems may not cause the program to throw an error, but if they are not handled well, users can get stuck.

And there is often no universal answer to this kind of question. AI can suggest an approach that seems reasonable, but whether it fits the current business still requires judgment based on the actual situation.

So before asking it to write code, I try to list these scenarios myself, then ask AI to help add to the list and assess them. We can use this stage to discuss what is missing, which rules conflict, and what still needs to be confirmed with someone.

There is no need to cover every possible situation from the start. I now prefer to focus first on the scenarios that happen often, have a significant impact, or would be hard to recover from if something went wrong. Agreeing on these up front saves a lot of revisions later.

### Be More Specific About What Counts as Done

I am also paying more and more attention to acceptance criteria.

When the goal is vague, AI can often still deliver something, but it may take several more rounds of changes to get it to where I want it. Each time I look at the result, I add another “this part should also do this,” and the requirement keeps growing bit by bit.

Some iteration really does require seeing something first, but some of these details can be stated in advance.

For example, “support data imports” already sounds like a clear requirement. But to accept the result, we still need to ask more questions. What happens if there is duplicate data? What if required fields are missing? If some records succeed and others fail, where can users see the results, and can they process the failed records again?

Without agreeing on these details, it is easy to end up with a feature that has technically been built but is not ready to use.

So I try to write acceptance criteria as outcomes that can be checked, giving AI and me a shared understanding of what “done” means. If I cannot clearly express a particular criterion while writing it, that is also a sign that I have not thought that part through. We can discuss it first; there is no need to rush into implementation.

When conditions allow, I can also have AI operate a browser or app and run through an end-to-end test. Along with the normal flow, it can check what message appears when something goes wrong, whether users can keep going, and whether the data they entered is still there.

With these criteria in place, it is easier to stay focused during review, too. I do not have to judge the result entirely by feel.

## Closing Thoughts

Writing this, I find the way I have changed over the past year quite interesting.

As I become more familiar with the tools and the models become more capable, I am spending more time before the coding begins. Sometimes AI is ready to get started while I am still working out how to approach the requirement.

This preparation certainly adds work at the beginning, but I think some of that time would have to be spent anyway. Questions left undiscussed early on will come back during acceptance, at release, or even after users actually start using the feature. Making changes then is usually more trouble.

Of course, I do not want to turn these practices into another heavy process. I have only just gone through a phase of finding a process too burdensome and eventually dropping it. There would be little point in circling back to the same place.

I am still figuring out how much preparation is enough. For small requirements, a short conversation is enough to get started. For complex business logic, I spend a little longer walking through the possibilities. What I most want to get right now is finding the parts I am still unclear about before handing the work to AI, instead of waiting for it to write a pile of code before realizing I had not thought things through from the beginning.
