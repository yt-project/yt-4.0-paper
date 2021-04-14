# Introducing yt 3.0: Analysis and Visualization of Volumetric Data

[![HTML Manuscript](https://img.shields.io/badge/manuscript-HTML-blue.svg)](https://yt-project.github.io/yt-3.0-paper/)
[![PDF Manuscript](https://img.shields.io/badge/manuscript-PDF-blue.svg)](https://yt-project.github.io/yt-3.0-paper/manuscript.pdf)
[![GitHub Actions Status](https://github.com/yt-project/yt-3.0-paper/workflows/Manubot/badge.svg)](https://github.com/yt-project/yt-3.0-paper/actions)
[![Build Status](https://travis-ci.org/yt-project/yt-3.0-paper.svg?branch=master)](https://travis-ci.org/yt-project/yt-3.0-paper)

## Manuscript description

This repository is the manuscript for a forthcoming, far-too-overdue paper on
the additions in yt 3.0 since the release of the [first yt
paper](http://adsabs.harvard.edu/abs/2011ApJS..192....9T) in early 2011.

While this paper has "3.0" in the title, the authors are well-aware that it may
not be completed before yt 4.0 has been released.  We'll address that when or
if it becomes important.

## Authorship Policy

This paper has an inclusive authorship policy, by design.  

**Authorship is not restricted to "yt project members" or to changeset
authors.** 

Involvement in the paper is based strictly on the honor-system; if you believe
you have contributed to the community, to the code, or to the ecosystem
surrounding yt, we invite you to participate in the authorship of the paper.

If you would like to be an author on this paper, please follow these steps:

 1. Open a pull request adding yourself to `content/metadata.yaml`
 2. In that pull request, please indicate what components of the paper, if any,
    you are willing to write.
 3. If you are not interested in writing, editing or providing content for the
    paper, please indicate your involvement with yt.

This is not intended as a method of gatekeeping, but rather a mechanism for
ensuring that authors have been at a bare minimum actively engaged in the
development of the manuscript.

**Please do not submit authorship requests on behalf of other individuals.**

Author ordering will be determined prior to submission; at present, this will
likely involve:

 * "The yt project" as first author on the paper.
 * A set of authors (order to be determined, but possibly random or
   alphabetical) that have contributed text or editing to the manuscript.
 * Other non-textual authors, similarly ordered.

A description of the authorship policy, when finalized, will be included in the
manuscript.

We hope that this will provide the opportunity for an inclusive, extensive
author list that still enables those contributing text to the manuscript to be
credited as such.

## Manubot

<!-- usage note: do not edit this section -->

Manubot is a system for writing scholarly manuscripts via GitHub.
Manubot automates citations and references, versions manuscripts using git, and enables collaborative writing via GitHub.
An [overview manuscript](https://greenelab.github.io/meta-review/ "Open collaborative writing with Manubot") presents the benefits of collaborative writing with Manubot and its unique features.
The [rootstock repository](https://git.io/fhQH1) is a general purpose template for creating new Manubot instances, as detailed in [`SETUP.md`](SETUP.md).
See [`USAGE.md`](USAGE.md) for documentation how to write a manuscript.

Please open [an issue](https://github.com/yt-project/yt-3.0-paper/issues) for questions related to Manubot usage, bug reports, or general inquiries.

### Repository directories & files

The directories are as follows:

+ [`content`](content) contains the manuscript source, which includes markdown files as well as inputs for citations and references.
  See [`USAGE.md`](USAGE.md) for more information.
+ [`output`](output) contains the outputs (generated files) from Manubot including the resulting manuscripts.
  You should not edit these files manually, because they will get overwritten.
+ [`webpage`](webpage) is a directory meant to be rendered as a static webpage for viewing the HTML manuscript.
+ [`build`](build) contains commands and tools for building the manuscript.
+ [`ci`](ci) contains files necessary for deployment via continuous integration.

### Local execution

The easiest way to run Manubot is to use [continuous integration](#continuous-integration) to rebuild the manuscript when the content changes.
If you want to build a Manubot manuscript locally, install the [conda](https://conda.io) environment as described in [`build`](build).
Then, you can build the manuscript on POSIX systems by running the following commands from this root directory.

```sh
# Activate the manubot conda environment (assumes conda version >= 4.4)
conda activate manubot

# Build the manuscript, saving outputs to the output directory
bash build/build.sh

# At this point, the HTML & PDF outputs will have been created. The remaining
# commands are for serving the webpage to view the HTML manuscript locally.
# This is required to view local images in the HTML output.

# Configure the webpage directory
manubot webpage

# You can now open the manuscript webpage/index.html in a web browser.
# Alternatively, open a local webserver at http://localhost:8000/ with the
# following commands.
cd webpage
python -m http.server
```

Sometimes it's helpful to monitor the content directory and automatically rebuild the manuscript when a change is detected.
The following command, while running, will trigger both the `build.sh` script and `manubot webpage` command upon content changes:

```sh
bash build/autobuild.sh
```

### Continuous Integration

[![Build Status](https://travis-ci.org/yt-project/yt-3.0-paper.svg?branch=master)](https://travis-ci.org/yt-project/yt-3.0-paper)

Whenever a pull request is opened, Travis CI will test whether the changes break the build process to generate a formatted manuscript.
The build process aims to detect common errors, such as invalid citations.
If your pull request build fails, see the CI logs for the cause of failure and revise your pull request accordingly.

When a commit to the `main` branch occurs (for example, when a pull request is merged), Travis CI builds the manuscript and writes the results to the [`gh-pages`](https://github.com/yt-project/yt-3.0-paper/tree/gh-pages) and [`output`](https://github.com/yt-project/yt-3.0-paper/tree/output) branches.
The `gh-pages` branch uses [GitHub Pages](https://pages.github.com/) to host the following URLs:

+ **HTML manuscript** at https://yt-project.github.io/yt-3.0-paper/
+ **PDF manuscript** at https://yt-project.github.io/yt-3.0-paper/manuscript.pdf

For continuous integration configuration details, see [`.github/workflows/manubot.yaml`](.github/workflows/manubot.yaml) if using GitHub Actions or [`.travis.yml`](.travis.yml) if using Travis CI.

## License

<!--
usage note: edit this section to change the license of your manuscript or source code changes to this repository.
We encourage users to openly license their manuscripts, which is the default as specified below.
-->

[![License: CC BY 4.0](https://img.shields.io/badge/License%20All-CC%20BY%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by/4.0/)
[![License: CC0 1.0](https://img.shields.io/badge/License%20Parts-CC0%201.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

Except when noted otherwise, the entirety of this repository is licensed under a CC BY 4.0 License ([`LICENSE.md`](LICENSE.md)), which allows reuse with attribution.
Please attribute by linking to https://github.com/yt-project/yt-3.0-paper.

Since CC BY is not ideal for code and data, certain repository components are also released under the CC0 1.0 public domain dedication ([`LICENSE-CC0.md`](LICENSE-CC0.md)).
All files matched by the following glob patterns are dual licensed under CC BY 4.0 and CC0 1.0:

+ `*.sh`
+ `*.py`
+ `*.yml` / `*.yaml`
+ `*.json`
+ `*.bib`
+ `*.tsv`
+ `.gitignore`

All other files are only available under CC BY 4.0, including:

+ `*.md`
+ `*.html`
+ `*.pdf`
+ `*.docx`

Except for the following files with different licenses:

+ `build/assets/anchors.js` which is [released](https://www.bryanbraun.com/anchorjs/) under an [MIT License](https://opensource.org/licenses/MIT)

Please open [an issue](https://github.com/yt-project/yt-3.0-paper/issues) for any question related to licensing.
