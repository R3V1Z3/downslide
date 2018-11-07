# DownSlide
Simple, Markdown-based presentation tool. It splits Markdown headers and their content sections into slides and presents them through a configurable front-end.

Press <kbd>➡</kbd> to advance.

## Made for Simplicity
DownSlide is built to simplify the process of creating presentations. It attempts to automatically generate a sleek and usable presentation by parsing Markdown content into slide sections.

## How does it work?
For quick use, create a document at [GitHub Gist](https://gist.github.com/), get the Gist's ID and paste it in the Gist field in the Info panel. Navigate the resulting slides using Arrow keys or by clicking through the sections in the `Table of Contents`.

## Customization
Check out the basic settings in the `Appearance` section in the Info panel. Switch themes, change font-size or theme color (for themes that support changes).

### Full Customization
For full control, including configuring everything in the Info panel, you can fork this repo on GitHub and configure the README file as you like.

## What is Markdown?
Markdown is a simple language for plain text that practically eliminates the need for mouse interaction and makes it super easy to format content. Using common symbols like `#` and `-`, you can create neatly formatted documents with ease.

## Themes
As with other BreakDown projects, DownSlide is fully themable/skinnable using CSS. There are also a bunch of pre-made themes to learn from or just use as needed. Moreover, the project is built for GitHub Pages. At no cost and with practically zero effort, the project can be copied(forked) into a ready-made website through GitHub.

## GitHub and GitHub Pages
GitHub is a developer focused code-hosting platform. GitHub Pages lets you host code for HTML websites at no cost. With that, you can host your own DownSlide driven website for free.

# Downslide `🅑-nav`

`ⓘ The code below designates a list of content sources the user will be able to select from in the app.`

content `🅑-datalist`
- [An exhibit of Markdown](https://gist.github.com/deb74713e6aff8fdfce2) - Another great showcase for Markdown rendering.
- [Vim Cheats](https://gist.github.com/c002acb756d5cf09b1ad98494a81baa3) - Simple, intuitive cheatsheet for Vim.

## Appearance `🅑-collapsible`

css `🅑-datalist`
- [Dark Glow](https://gist.github.com/c6d0a4d16b627d72563b43b60a164c31)

`🅑-theme-variables`

## Effects `🅑-collapsible`

vignette-blend `🅑-select`

vignette `🅑-slider="0.25,0,1,0.025"`

svg-filter `🅑-select`
- *None

---

brightness `🅑-slider="1,0,3,0.05"`
contrast `🅑-slider="100%,0,300,1,%"`
grayscale `🅑-slider="0%,0,100,1,%"`
hue-rotate `🅑-slider="0deg,0,360,1,deg"`
invert `🅑-slider="0%,0,100,1,%"`
saturate `🅑-slider="100%,0,300,1,%"`
sepia `🅑-slider="0%,0,100,1,%"`
blur `🅑-slider="0px,0,20,1,px"`

## Perspective `🅑-collapsible`

scale `🅑-slider="0,1,5,0.1"`
perspective `🅑-slider="1500px,0,2000,1,px"`
originx `🅑-slider="50%,0,100,1,%"`
originy `🅑-slider="50%,0,100,1,%"`
rotatex `🅑-slider="0deg,0,360,1,deg"`
rotatey `🅑-slider="0deg,0,360,1,deg"`
scalez `🅑-slider="0,1,5,0.1"`
rotatez `🅑-slider="0deg,0,360,1,deg"`
translatez `🅑-slider="0px,-500,500,1,px"`

## Dimensions `🅑-collapsible`

width `🅑-slider="960px,4,4000,1,px"`
height `🅑-slider="400px,4,2000,1,px"`
padding `🅑-slider="10px,0,500,1,px"`
inner-space `🅑-slider="100px,0,300,1,px"`
outer-space `🅑-slider="0px,0,300,1,px"`
offsetx `🅑-slider="0px,-4000,4000,1,px"`
offsety `🅑-slider="0px,-4000,4000,1,px"`

## Contents `🅑-collapsible`

`🅑-toc`

## Help `🅑-group`

`🅑-help`
`🅑-hide`