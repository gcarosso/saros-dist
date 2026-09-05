# saros-dist

The built, standalone SAROS dashboard (`index.html`, ≈ 6 MB), served at https://saros.gcarosso.bio by Cloudflare Pages.

This repository holds one commit on purpose: the weekly refresh job in the source repository
(https://github.com/gcarosso/saros, `make publish`) replaces the file and force-pushes, so the repo never grows.
Source, pipeline and tests live in the source repository, not here.
