---
title: About @ForestsWar and things I believe in.
date: 2020-07-17
tags:
  - posts
layout: layouts/post.njk
---

In a previous post I introduced and explained how [@ForestsWar](http://twitter.com/ForestsWar) was made.

In this post I'll dive in some after-thoughts.

Comparisons like "*x* football pitches every minute" made me think we would run out of forests any given day. While we are still deforestating areas that are hard to grasp and our rhythm of destruction is still a very valid thing to worry about, overall I think we should act more scientific about how deforestation/global warming data is presented to the public.

Data is already there and is factual. We should not try to exaggerate it or present it in ways that are specially alarming or misleading to convince people who do not believe nor want to believe the facts.

> "Forests cover 31 percent of the world’s land surface, just over 4 billion hectares. [...] This is down from the pre-industrial area of 5.9 billion hectares."  --Earth Policy Institute

Above statistic is already alarming enough. Worth of a massive extinction. Why are we then still discussing if it's true that we are in the middle of a massive extinction? Why wouldn't we try to convince people that we are?

1. It is not worth to try and argue with poor-minded people as they see a discussion as a fight that can either be won or lost, instead of as an exchange of ideas and opinions that is of mutual benefit, and they will never accept that they've lost.
2. People will manipulate and take whatever interpretation of the data benefits their interests the most.
3. It is worth to be truthful about data, as it helps tackling and tracking the real problem. As an example, **deforestation did not decrease** during covid-19 lockdowns. That gives the clue that end-consumers do not motivate the logging industry.

To elaborate on my third point:

```js
const glad = new GLAD(false);

let period2019 = glad.formatPeriod('2019-01-01', '2019-06-01');
let period2020 = glad.formatPeriod('2020-01-01', '2020-06-01');

let area2019 = await glad.getAlerts(period2019);
let area2020 = await glad.getAlerts(period2020);

// area2019: 30156.097500000003
// area2020: 45010.872899999995
```
Code speaks for itself. In the first half of 2020 deforestation *increased in 15 thousand square kilometers* compared to the first half of 2019.

However, people in the "no" side of the argument will argue that the increasing was due to the Australian bushfires and that the lockdowns were not effective in most countries until well entered into 2020. While all of it it's true, the fact remains the same: deforestation did not stop, reduce or revert, actually it did the opposite.

It's impossible to convince some people, because some people are already convinced, some people already know more than you about the topic, and they know how harmful is the thing you are trying to warn everyone about. The problem with these "awkward people" is that they will not change their minds, not because they don't understand, probably they understand it better than you, but they also understand that they directly profit off of the harm.

Some people will never speak up against how gun sales is directly related to civilian murders because they make a living out of the civilian gun market and some people will never accept the fact that the planet's ecosystems are in the verge of destruction because they are directly or indirectly involved in the activities that cause such destruction.

They aren't necessarily suited-up guys with fancy watches in skyscrappers, they are regular people who understand that their current amenities and facilities are a direct consequence, and also cause, of the current over exploitation of resources across the planet.

For such reason is that I believe that the matter should be handled scientifically. It is a waste of energy and resources to discuss facts, specially with biased, interested people. Instead, the same energy and resources could be repurposed into researching and developing ways to better understand the problem and ways to tackle it.

As shown by the demostration above, **end consumers don't make an impact on global deforestation**. Then why convince end consumers? The people in the focus should be the people in the industry and the industry itself, and the effort should be to force the industry to change from inside. Maybe displace it by developing better alternatives, maybe wipe it by making the necessity for logging new wood a thing of the past.

This does not apply to all industries, but the same strategy could be applied to other harmful industries whose activity does not rely on end consumers. Specially those in the primary sector that supply other industries and are directly involved in the exploitation of resources.

Edison convinced end consumers that DC was the way to go, but Nikola proved to the industry that AC was actually the way to go. Guess which one ended up being worldwide standard.

We have a chance to transform the world of today into a world that preserves and takes care of the natural green spaces we inherited, and the path to do so does not require to convince every person about [wood alternatives](https://www.worldwildlife.org/stories/alternatives-to-wood), it just requires to develop industry alternatives that are more sustainable and attractive for the industry makers. Easier said than done, but also easier than to fight an already lost war. Markets have previously shown they are prone to change, unlike people and ideas.

Why am I saying all of this just after developing a bot made to raise public awareness about deforestation? The bot is part of that and part a friendly honoring to a lost friend who thought forests were worth protecting.

The bot is also a tool to introduce people to honest deforestation data, that is from scientifically made research, and it does not have an opinion. It does not try to alarm people into thinking deforestation is going to eat up all of the planet's forests any given day, it just presents actual data that is already alarming enough. It is also a handy tool for people who fight the lost war when asked about data sources for their claims, and it is a companion and a reminder for people researching and developing alternatives to make this alarming data less of an alarm.
