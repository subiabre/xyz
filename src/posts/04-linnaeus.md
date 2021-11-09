---
title: A console app to catalog photo files.
date: 2021-11-09
tags:
  - posts
layout: layouts/post.njk
---

In september 2020 I purchased my first camera: a [Nikon D3500](https://www.nikon.co.uk/en_GB/news-press/press.tag/news/bv-pr-wwa1808-outshine-the-ordinary-with-the-new-d3500-dslr.dcr). Not long after I found myself with a large catalog of pictures and image files of all sorts: RAW image files, original JPEGs from the camera, xmp and metadata files from [Shotwell](https://wiki.gnome.org/Apps/Shotwell) and [Darktable](https://www.darktable.org/), final JPEGs and PNGs after doing some *postpro* work on the source images... in essence I had a mess. Shotwell did it's best at organizing the source images from me, but once they went through Darktable the output was very hard to organize.

Should I put my edited images in the folders with the original images? How do I avoid having duplicates when importing from the camera without having deleted the already imported ones? How will I be able to easily go back to a set of pictures without having to remember the date? Am I now tied to Shotwell for as long as I want to process my digital pics?

After putting that off for more than a year, and reading [a lot](https://ninedegreesbelow.com/photography/dam-ingest.html) about how [other](https://www.reddit.com/r/photography/comments/5ipbvq/organizing_and_backing_up_a_large_pro_library/) photographers organize [their own](https://www.quora.com/Whats-the-best-way-to-organize-a-large-set-of-photos-on-Windows)  catalogues, and learning of all the possible workflows and the involved risks of losing your metadata, losing your files, forgetting their locations, etc. I decided enough was enough and started sketching an idea to *taxonomize* my pictures database.

Buckle up your seat-belts as I dive into naming and why it's important.

## Enter Carl Linnaeus and Taxonomy
[Carl Linnaeus](https://en.wikipedia.org/wiki/Carl_Linnaeus) was basically the guy who invented classifying things, well maybe not the guy who invented it but the guy who made a thing out of classifying things, well maybe that neither but his method of naming and classifying living beings is the one who stood with the scientific community. The key for such success is the simplicity of the taxonomic model he proposed.

In biology and linguistics there is this concept of "taxonomy" that is very important, specially in biology, as it's the way species are tagged apart from each other.

Linnaeus proposed a model in which species are named using a binomial nomenclature: two names for each species, a first one for the genus of the species, capitalised, and a second one specific to that species inside their genus. Much like [chinese personal names](https://en.wikipedia.org/wiki/Chinese_name), species would have a "family name" first and their "given name" second. This taxonomy allows to endlessly classify species with simplicity and allows to encode important information within the species name that can be understood at first by other people, granted they know latin and greek etimology.

Great examples within the dinosaur community:

* Albertosaurus sarcophagus -> Alberta(from) Lizard Flesh Eater -> Flesh eating lizard from Alberta.
* Tyrannosaurus rex -> Tyrant Lizard King -> King of the tyrant lizards.
* Diplodocus carnegiei -> Double Beam Carnegie(of) -> Double-spined of Carnegie.
* Diplodocus hallorum -> Double Beam Hall(of) -> Double-spined of Hall.

This naming system genius' lies withing it's simplicity and the fact that it opens itself up to encode information that comes from the species itself: anatomic perks, where they are from, what they eat, who discovered them, etc.

## Enter `linnaeus`
Following the naming philosophy popularised by Carl Linnaeus, why not implement it in a way that can fit large photo files libraries? Digital pictures already pack a lot of information about themselves: the infamous EXIF data. I realized that thanks to that info I should be able to build an application that given a taxonomy to fill up with EXIF data would generate unique names for each photo file I would produce.

Much like hashing, the goal would be to have something take an input and give me a unique and consistent output each and everytime it had the same input. The idea behind this being that with such a system it will be easy to import pictures without worrying about duplicates and it would be possible to store both input files (taken from the camera) and output files (after going through Darktable) in a consistent, collision free way that made sense and would allow me to navigate the photo collection with ease by being able to understand each file by just looking at their file name.

The product that came out of this realisation is [`linnaeus`](https://github.com/subiabre/linnaeus). A command line tool that can ingest image files to rename and move them around based in a given configuration specifying the taxonomy.

This configuration file looks like this:
```yaml
input:
  copyFiles: true

output:
  naming: 
    files: "{date.year}-{date.month}-{date.day}-{date.hour}{date.minutes}{date.seconds}_{image.width}x{image.height}_{file.hash6}.{file.extension}"
    folders: "/{date.year}/{date.month}/{date.day}/{image.type}"
```
That configuration means that each input file should be copied to the output. These files should be named using an structure based on the date, then the image size, then an excerpt of the image hash and then the file extension. The files will then be moved into folders based on the year, the month and the day they were taken.

An image ingested by linnaeus with said configuration would look like:
```
/2010/12/25/2010-12-25-213014_1200x800_ab01cd.jpeg
```
To reach that image we would need to navigate to the folder 2010 > 12 > 25.
When reading the image file name: **2010-12-25-213014_1200x800_ab01cd.jpeg**, you can easily dissect each section of the name to get image information:

1. The image was taken in 2010-12-25: December 25th, 2010.
2. The image was taken at 213014: 21:30 and 14 seconds.
3. The image has a size of 1200px wide and 800px tall.

The string at the end being the SHA256 hash the image produces, usually used as a discriminator to avoid collisions between files that are differents end versions of the same original image.
