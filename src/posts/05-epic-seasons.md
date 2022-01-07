---
title: Putting NASA imagery together to see the seasons happen.
date: 2021-11-18
description: I just wanted to see the Earth's axis tilt.
tags:
  - posts
layout: layouts/post.njk
---
In March 2021, with the excuse of the Spring equinox, a real moment of celebration in my calendar, I started researching for ways to see from above the tilting that made happen that equinox and all of the other seasons across the globe.

Surprisingly enough, and despite all of the Earth's satellite imagery available, I couldn't find other than renders and animations using CGI to show the tilting, not actual images taken from space, and most of them targeted to children and for educational purposes. But before diving head first deep into conspiracy theories about how the Earth is actually flat and NASA lies with CGI to control us, I decided not to waste both my brain and my CPU processing power and put them to do some actual work to fix it.

In this post I explain why and how does `epic-seasons`([GitHub](https://github.com/subiabre/epic-seasons)) exist and work. I also say "translational" and "rotational plane" a lot.

## Why?
Let's stablish some ground to work with.

1. The Earth is a sphere.
2. This sphere is rotating around a single axis that goes from the south-pole to the north-pole.
3. This sphere can be divided by longitude lines that cross it vertically from north to south and intersect at the axis.
4. This sphere can be divided by latitude lines that cross it horizontally from north to south and are parallel.

Using the latitude and longitude lines you can describe any position on this sphere just like you would in a cartesian graph. Cute, so what's the problem? Well:

1. The rotation describes an imaginary plane in space perpendicular to it's rotational axis.
2. The Earth is also on translation in an orbit around a second axis: the Sun.
3. The translation describes an imaginary plane in space perpendicular to it's translational axis.
4. The planes described between the translation and rotation do not match.

This is the mechanism behind seasons. Because of this mismatch the amount of sunlight (which hit's the hardest parallel to the plane of the translation) received across the planet is uneven, resulting in the hot long days of summer and the cold short days of winter when the rotational plane is "over" or "under" the translational plane.

I know this explanation is a bit *wordy*, but it's important that it's explained like that to understand why it's actually hard to see this tilting with satellite imagery.

Now back at our goal of seeing the tilt. To do so you want to remain stationary respective to the Earth's translational plane because if you remain stationary relative to it's rotational plane you will actually move with it as it leans over to one side or the other, and won't see the tilt.

Because most satellites measure their position in space relative to the rotational plane of Earth in space, not the translational plane, it ends up being pretty hard getting images that are taken from the same point in space relative to the translational plane. Such a nuance is the core problem to produce videos showing the axis tilting. If you get satellite images for any year and put together all the images at a given coordinates you won't see the axis tilting, because guess what? The latitude is tilting with it. What you want is to put together all the images at a given longitude and at the respective latitude that matches the translational plane.

For that you don't have much choices:

* a. Do what I imagine to be somewhat complex math and take the tilting out of the latitude of a satellite for each frame you obtain.
* b. Ignore the latitude of each frame because your satellite already remains stationary relative to the translational plane.

Of course I chose b.

## How? Thanks to DSCOVR: EPIC.
Lucky for me I was already following the marvelous Twitter bot [@dscovr_epic](https://twitter.com/dscovr_epic/) by the time I came across wanting to see the tilt. In fact, following such a bot is actually what inspired me to build the tool I'm writing about in this blog post.

This bot regularly publishes a picture taken by NASA's Earth Polychromatic Imaging Camera ([EPIC](https://epic.gsfc.nasa.gov/)), a device aboard the NOAA's Deep Space Climate Observatory ([DSCOVR](https://en.wikipedia.org/wiki/Deep_Space_Climate_Observatory)). This is possible thanks to the [API](https://epic.gsfc.nasa.gov/about/api) that NASA provides, which allows anyone to query the data and the images taken with the EPIC camera aboard the DSCOVR, which is conveniently placed around the Sun-Earth L1 Lagrange point.

This L1 spot in space has it's own lore that do not exactly relate to this post, but the satellite being at L1 is key because it means it does not move around Earth in some fancy orbit but it stays placed at this one spot between it and the Sun... **relative to it's translational plane**!! No more latitude mismatching madness despite the satellite also reporting it's position relative to the rotational plane.

Well, actually, it *orbits* around L1, so there is still some movement from the satellite itself in the frames, but... come on, give me a break.

With the satellite taking care of the planes problem for me, and with the nice API by NASA, building a tool to render the tilting was fairly easy. It basically is a fetching PHP app that filters and pulls the images from the NASA archive based on longitude (to better visualize the tilting happening) and two dates, and all of it dockerized to be able to use [ffmpeg](https://www.ffmpeg.org/) to put together the images without relying on the system having ffmpeg already installed.

Here is the end result:

<blockquote class="imgur-embed-pub" lang="en" data-id="a/1B4un0e"  ><a href="//imgur.com/a/1B4un0e">Earth&#39;s axis tilting across Africa/Europe between June 2020 and June 2021.</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

It's worth mentioning that the final render "speeds up" around the equator zone because due that zone being larger in area there are less chances for the satellite to take a picture of an area inside the upper and lower margins of the longitude chosen for this composition.
