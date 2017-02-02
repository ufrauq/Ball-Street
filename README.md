# Team 5 Website
Our website is created through Github Pages and Jekyll. It's hosted on [https://zsirohey.github.io/CS2212-Team5/](https://zsirohey.github.io/CS2212-Team5/)

This README is a quick guide to Jekyll and how we'll be updating our website from now on. Feel free to reach out to Michelle on slack if you have questions!

#Table of Contents
<!-- MarkdownTOC autolink="true" bracket="round" depth="0"-->

- [WTF is Jekyll??](#wtf-is-jekyll)
- [Github Project Pages](#github-project-pages)
	- [Setting up the git repo on your computer](#setting-up-the-git-repo-on-your-computer)
- [File Hierarchy](#file-hierarchy)
- [Pages](#pages)
- [```](#)
- [Posts](#posts)
- [```](#-1)

<!-- /MarkdownTOC -->

## WTF is Jekyll??
Jekyll is a static site generator that integrates well with Github Pages. Basically, by using a pre-made design, we can easily focus on content. We write posts and pages through Markdown so we don't need to waste time with HTML/CSS.

If you want to read more, check out this [link!](https://github.com/jekyll/jekyll).

## Github Project Pages
Github allows each project repository to have a website; ours is hosted at [https://zsirohey.github.io/CS2212-Team5/](https://zsirohey.github.io/CS2212-Team5/). In order to push changes onto the website, we work on the `gh-pages` branch of the repository instead of the `master` branch.  

### Setting up the git repo on your computer
You should be pretty familiar with working with Git through the terminal. I recommend reading [this](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html) to familiarize yourself with some git commands.  

**If you don't have a CS2212 git folder already, read this!**   
You want to create a (new, empty) local directory on your computer and navigate to that directory: `cd <directory>`. We want to copy all the files from the GitHub repo onto your local computer: `git clone https://github.com/zsirohey/CS2212-Team5.git`

If you type `git branch`, you should have a `master` branch and a `gh-pages` branch. If not... idk.. I probably told you to do something wrong... oops (google).  
You can switch to the `gh-pages` branch with `git checkout gh-pages`. Then, you can open the files and edit them with Markdown syntax.  

##File Hierarchy
more to come...

```
README.md
_config.yml
_drafts
_includes
_layouts
_posts
_site
assets
Gemfile
index.html
posts.html
sitemap.xml
feed.xml
project-plan.md
software-design.md
team-roster.md
ui-design.md
```


## Pages
Pages (such as the team roster, software design, UI design, etc) are the pages at the top header. In the file hierarchy, they are found at the root directory. You can open it up and begin editing the content anytime, following Markdown syntax.  

Pages must have this at the beginning:

```
---
bg: "photo filename, ie: rails.jpg"
layout: page
title: "Title of Page"
permalink: /make-link-name/
summary: "Summary"
active: idk what this is.. but i just put like: software-design
---
```


## Posts
Posts are automatically rendered with the theme — all you need to do is write the content in your favourite text editor in a markdown (.md) file. [Here's a quick intro to Markdown!](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).  

Blog post markdown files must follow an EXACT naming convention: `2017-02-01-Welcome-to-Team-5.md` is an example; basically date, title separated by dashes. Posts are found in the `_posts` directory.  

Posts must have this in the beginning:

```
---
layout: post
bg: '2016/background.jpg'
title: "Post Heading"
crawlertitle: "page title"
summary: "post description"
date: 2016-06-29
tags : ['front-end']
slug: post-url
author: "Author"
categories: posts
---
```

