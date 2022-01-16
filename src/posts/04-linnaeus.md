---
title: A console app to catalog photo files.
date: 2021-11-09
description: How I saved myself from cluttering my photo library by implementing an idea from 200 years ago.
tags:
  - posts
layout: layouts/post.njk
---
In september 2020 I purchased my first camera: a Nikon D3500. Much like anything, by introducing this camera to my life came a new problem I didn't think of in advance: it produces photos, a lot of them. And I don't use the camera daily nor usually take multiple shots of the same scene but about a year later I was already facing a huge library of photos that I didn't know how to navigate.

I was dependant on [Shotwell](https://wiki.gnome.org/Apps/Shotwell) to keep my *input* photos, that is the raw images taken from the camera memory, somewhat tidy and organized by date. But it wasn't too much of a solution despite Shotwell's best efforts because it quickly became tiresome to import new pictures and search old pictures with it.

And as I did some editing on them with [Darktable](https://www.darktable.org/) and [GIMP](https://www.gimp.org/), Shotwell couldn't really keep these *output* as organized. Moreover it created a second problem: it added to the pollution existing on my images library by adding new metadata files of itself, making me less able to handle the library by just browsing it on my filesystem.

What if I wanted to upload my library to some cloud service? Send the raw files to somebody? What if somebody sent me back an image of me? Where am I gonna store this new "unknown.jpg" file so that I can remember what it is and where to find it easily? What if I want to back up my library in a machine where I can't run Shotwell in? How am I going to be able to distinguish which of all the "DSC_0001(1)" to "DSC_0002(27)" is the one I want without opening each one?

Without knowing I had stumbled upon a digital instance of a millena old problem and that >200 years ago had a pretty solid solution. Buckle up your seatbelts as I rant about **taxonomy**, **nomenclature**, hashing, filenaming and why are all of this things related and why they are important to keep a large photo file library organised.

## Carl Linnaeus and taxonomy.
Taxonomy is the science that classifies things. It is a concept born out of biology and their need to tell species apart. This need is only a branch of humans' obsession to name things to be able to tell them apart.

We name items as *furniture* to tell them apart from *tools* and we name *wrenches* to tell them apart from *screwdrivers*, and the specialised will even tell the latter apart with some terms like *phillips* or *flathead*. In the same vein, taxonomy classifies the stuff biology handles.

Before taxonomy was a thing and without the approval of the scientific community people would still apply "unique" names to "unique" species of things. These names, with nuances, have survived to our days in the "vulgar" name of species like *cats*, *dogs*, *sunflower* or *grasshopper*.

*"Man what is this naming stuff? I just want to see how you organise your library?"* I promise I'm going to tell you, but it's important that I explain this before.

The problem with the vulgar names of species is that they are not really unique nor consistent. Which turns out is actually a big problem when you want to classify things. For the most part these names would vary between places that spoke different languages and between communities too, and with this variance also came false species that were the same species, like dove/pigeon, and one species that actually was several, like crabs.

Biologists couldn't rely on vulgar names of the species to publish their papers for neither a lot of colleagues would know what species they were talking about nor would they be able to correctly enclose and "specify" their findings.

They attempted solutions to this problem but [Carl Linnaeus](https://en.wikipedia.org/wiki/Carl_Linnaeus) turned out to come up with a solid fix in 1735. The details of how he came up to such a solution would only enlarge this post unnecessarily, so in essence, he proposed a binomial system to identify species by using two latin names to describe the species genus (the group they belong to) and a unique trait that sets them apart. Much like [chinese naming](https://en.wikipedia.org/wiki/Chinese_name) where people have a family name first and a given name second, i.e from bigger to smaller.

This is the scientific name of the species, a nomenclature, as opposed to the vulgar name, and it serves to consistently tag each species we know of inside a bigger scheme of classification known as taxonomy. 

A good example is our own name as a species: **homo sapiens** because we belong to the genus *homo* and our trait is our thinking ability (*sapiens* in latin).

*"Ok but how does this correlate to organising photos?"* If you look at taxonomy from a computing perspective, it turns out to be much like a [hash](https://en.wikipedia.org/wiki/Hash_function) function. You give taxonomy an input species and they look at the traits, the content of this species, and produce a standarised, unique output that is true for each instance of the same input. The key difference between hashing and taxonomizing is that the latter returns an ouput that is human readable so that people can quickly pick up what thing is it that they are referring to.

## Enter `linnaeus`.
While it would be easy to write a script that can take each photo and rename it with their hash string in some algorithm, and solve the unique naming requirement for my library, that would actually worsen even more the obscurity of the names I had in the library and would make it virtually impossible to find anything. At least with the original camera names I know which picture was shot before the others.

I didn't need a hashing function, I needed a taxonomizing function. A tiny, photography-inclined, enslaved Carl that I could tell to look at each of my images and name them in a meaningful way so that I would be able to sort and read my library in the filesystem itself: accomplishing complete agnostism both applications-wise and system-wise.

The product that came out of this is `linnaeus` ([Github](https://github.com/subiabre/linnaeus)). A small, console based, symfony app that will take a predefined taxonomy along with some config and then apply it to image files in some source address.

Example:
```bash
$ linnaeus get /home/camera /home/images --config='custom_config.yaml'
```

The configuration is a yaml file in the following form:
```yaml
input:
  copyFiles: false

output:
  fileHashLength: 6
  naming: 
    files: 
      - "{date.year}-{date.month}-{date.day}"
      - "-{date.hour}{date.minutes}{date.seconds}"
      - "_{image.width}x{image.height}"
      - "_{file.hash}"
      - ".{file.extension}"
    folders: "/{date.year}/{date.month}/{date.day}"
```

With the file naming taxonomy defined as an array because for this case a single string would be too long and hard to read for a single line. The above taxonomy results in files like the following:

**2021/10/31/2021-10-31-120230_1080x1920_23d6c9.jpg**

And I know at first glance it doesn't look much less obscure than a hash or the original filenames but when you pay a little attention you can dissect each part easily.

First, the image is located at 2021 > 10 > 31. Because it was taken on the 31st of the 10th month of 2021. Now we can see the filename and let's try to see what image it is.

- *2021-10-31* - is the same as the folders. The big date of the picture.
- *120230* - is 12 hour, 02 minutes, 30 seconds. The small date of the picture.
- *1080x1920* - is the width and the height of the image. Because I tend to apply different croppings so knowing their sizes helps me identify one cropping at first.
- *23d6c9* - are the first 6 characters of the sha256 hash of this image. Very useful to avoid collisions between end versions of the same image, for example when you apply different colour schemes or crop two different scenes inside the image using the same aspect ratio.
- *.jpg* - this image is a jpeg.

Thanks to linnaeus I now have a completely self-sorted, organised library that I can move to any system, drive or app I want and I would be completely able to get important information from my images each and everytime by just looking at their filename.

I believe this little piece of code could be useful to other photographers in dire need of a better system to organize their files and that's why I made linnaeus configurable so that you can describe your own needs and let it handle all the sorting. If you make a lot of different versions of your images you can extend the length of the hash to any character length you wish to avoid collisions, though at 6 you'd need to produce about 16 million versions of an image to run out of names. If you export your image to differents formats you can have linnaeus move them to directories named for each image type. If you feel like having the big date both in the directory structure and in the filename is redundant you can strip that out of your naming definition.

Another goodie that I built in to make it easier to use is the precedence at which it will search for config files. To give it a custom configuration when you run it you can specify a file yourself or place a linnaeus.yaml file at the directory you are going to run it in and it will load that one over the default config located at the project directory.

To take full advantage of this you can have several different config files for folders you want organised differently. I have my images organised as following:
```
Images/
  Darktable/
    ...
    <photos of the same theme or project>/
      ...
      linnaeus.yaml
  Camera/
    ...
    linnaeus.yaml
```

This structure allows me to import all my raws to `Camera/` conserving their original filenames but moving them into folders based on their date so that is easy to navigate later using Darktable. Once I edit my photos I export them to a directory inside `Darktable/` that is about that set of photos and that has another custom taxonomy, usually the one I used as an example above which I've found to be really great, and a directory structure where I usually don't move them to subdirectories based on their date because 99% of the time they are photos taken in the same date and really close to each other.

This setup also allows me to run a single command when I'm inside a directory with a linnaeus.yaml file:
```bash
# This:
$ linnaeus
# It's the same as:
$ linnaeus get --configuration='linnaeus.yaml' . .
```

The main advantage of linnaeus, in case you didn't notice yet, is that it works at filesystem level and does not mutate in any way the metadata inside your pictures, allowing you to use any higher level photo management software you want over your library and combine linnaeus with their advanced sorting functions like custom tags or face-detections.

## Conclusions and notes.
Currently it's not very battle tested, as it is a personal project that I open sourced, but some downsides I could notice are:

- It's particularly slow when it has to move files between different drives. It'll be faster for you to move the files from the camera to your computer and running linnaeus with all the files inside your filesystem. Now this is actually faster than Shotwell, specially at very large amounts around the >500 files mark.

- Sometimes, if you don't use the {file.hash} taxonomy variable, you will lose images if they are very similar in all of the other metadata. That's exactly why that variable exists, please use it to avoid losing files.

On another note I didn't mean to dunk on Shotwell or disregard their work by any means, it just happened to be a bad tool for my particular use case. In all other aspects it is a great project.
