---
title: A bot to track deforestation.
date: 2020-07-16
tags:
  - posts
layout: layouts/post.njk
---

About this season 2019 a dear friend started sketching the first versions of a twitter bot that we thought was necessary and yet to be found. This was the seed of the plant that now is [@ForestsWar](https://twitter.com/ForestsWar).

The [original](https://gitlab.com/wishiwasrubin/fwbot) bot was a little bit *basic*, sadly, it's creator was suddenly not around anymore to update it, so I decided to rebuild it from the ground up. In loving memory of [@wishiwasrubin](http://gitlab.com/wishiwasrubin)'s Vera.

## Global Forests Watch and GLAD.
Data source is the API provided by [GFW](http://globalforestwatch.org). In specific their [GLAD alerts API](http://gfw-api.github.io/swagger-ui/?url=https://raw.githubusercontent.com/gfw-api/gfw-glad-alerts-api/master/app/microservice/swagger.yml#/GLAD).

This "alerts" are each a 30 square meters area that could have been deforestated. You can use their API to retrieve the amount of alerts per country or geozone in an specific period of time. Also, there is an specific endpoint to know the date of the latest issued alert. The API design is good enough in it's intention, but I do have some criticism of the implementation.

**First, the API data is inconsistent and unreliable**. The amount of alerts for recent periods will usually change up until a week or two after they are introduced. I suspect this is because new alerts are added to the database, but they are added after a new latest date is introduced in the API. 

You fetch the API to know the date of the latest alert. You do it again for new alerts in that day, you get *x* area. New alerts in the same date are then issued, you fetch it after and now you get a bigger area than *x*.

A good API should ***always*** give the same output given the same input. I understand why maybe the glad-alerts API can't do this, however if my guess is right, it has an easy solution:

**Do not issue new dates at `glad-alerts/latest` until you've confirmed there are no more new alerts for the latest date.**

It'll delay the "real-time" behaviour that this API promises to give, but not that it really matters a lot when you are the only available resource for such data and that makes you unreliable. The trade-off of real-time behaviour against a reliable and consistent behaviour is just a no-brainer, specially when your application is the only dependency other applications can rely on.

This has proven itself a big headache when designing the bot routine, over and over and every time I tried to come up with a counter-measure it was just not possible to implement. Finally I got stuck with a bot that fetches daily the day of the past week looking for new alerts that day.

*To build a glad-alerts/latest based bot was simply not possible* without the bot populating it's feed with unreliable and changing data.

**Second, the API is still inconsistent and unreliable**. Aside from the previous problem, the API still has uptime reliability problems. From memory I can recall an entire week or two where the returned alerts for every country after a given date was 0, despite the latest date being updated past this date. In the early days of my work it was also sometimes seen that a country would randomly return 0 for any period, though this seem to not happen anymore.

On top of technical problems there is just the bare minimun of documentation to work with the API and the available one is difficult to find.

I can give these problems a pass, as they say the API is still in beta (however it has been in beta more than two years apparently).

The problems with the glad-alerts API were the main drag and delay for this bot to be finished, but they weren't the only ones.

## About data treatment.
Main goal of this bot was to present actual deforestation data in a way that made it easy to visualize it.

The first sketches of the original bot painted an square of the same area over satellite pictures of some big, known city like New York. I don't know why Vera thought that system was good enough at the time but it didn't take very long for me to realize it was crap (sorry, Vera).

When some months later I decided to redo the bot I decided that the main priority was to design a representation system that was **exact** and **easy to understand**. Not really an easy thing to achieve when talking about massive amounts of land area. I finally came up with a mapping service that made sense, which I detailed on [this thread](https://twitter.com/facutxt/status/1216180176259895296) (in Spanish).

Basically it takes a map from GADM, calcs the pixel to area relationship and paints as many land pixels as necessary. It is pixel exact and is easy to understand. Success.

Now, second in the list was the need to design a routine system that tracked deforestation in a way that was **exact** and **atomic**, as in everytime it tracked the deforestation in the API it could store in a database a result that would be reproducible and that it would not overlap with previous nor future database records.

Area updates in a date should not take in area from previous updates nor future updates.

* Exact was proved to be near to impossible due to the previously stated problems with the API.
* Atomic was achieved by isolating every request for area inside an specific day. Each bot routine fetches the area for the day of the past week.

With design problems solved, I was still challenged on the ethical side of my design's collateral effects over the data accuracy and representation of it, [all of them](https://github.com/subiabre/forestswar#concerns-about-accuracy-and-processing-of-data) I detailed on the README of the repository.

Behind every challenging part of the data treatment is a reason to it, and overall, **there is no manipulation**. The bot only works with the area given by GFW and it never adds or substracts from it. Closest thing to it is the `Math.round` done to the area numbers to make them more readable.

It was a priority of the design to make a bot that was as close to accurate as possible.

## What I have learned from this bot.
I consider all the challenges here presented as solved now. Current working bot is `2.2.2` (it was when I originally wrote this post) and I'd very much like to leave it like that. I suspect further changes will not have to do with code but with deciding an amount of days good enough for tracking. Now a week back for each bot run does not feel like it leaves enough time for the data to settle. Could possibly be updated to 10.

Overcoming these challenges has taught me some things that I, for sure, will remember.

As a developer:
- An API should be reliable.
- Data should be consistent.
- JavaScript async/await is bliss.

As a person:
- An API should be accesible and easy to work with.
- Data should be truthful.
- Heroku is bliss.

I'm also pretty happy with the result of my mapping solution. It truly was born in a lucid moment and I still have not found anything similar.

This bot was made to honour the memory of someone who thought forests were important enough to be enjoyed by future generations. It is an effort to raise awareness about deforestation, and it is an automatism that I hope I'll never see finish it's task.
