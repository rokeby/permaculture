# make your own zones ⛰

To make our simulation resemble the topography of the Sakiya site (see `sakiya-topography.png`), we trace out a bitmap divided into 5 zones, and then use a python script to generate a `zones` array which maps to each cell. It's a bit hacky but it works fine, and you only need to do it once for each new landscape. The zones then have properties (like, higher likelihood of limestone deposits, meadowland, water), that are the real properties of land on the site.

Steps:
- Create a bitmap of the landscape you'd like to simulate (see our one as an example). If you'd like to change the number of pixels, edit `xnum` and `ynum` in the file `constants.js`.
- Run `python bitmap.py > zones.txt` to process the landscape into an array and pipe into `zones.txt`
- Copy and paste this array to replace the array `zones` in `zones.js`
- Changing the number of zones is a bit more involved, as different plants, rocks and soils have different probabilities of appearing in each zone, but if you want to, change `plants.js` and `substrates.js` to include your new zones, and assign some probability that each of those plants and substrates will appear in them.

