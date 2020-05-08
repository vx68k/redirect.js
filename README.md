# Introduction

The `redirect.js` script redirects web browsers to another location *without
any server configuration*.
It is *not a script for Node.js* but for web browsers.

## License

The `redirect.js` script is provided under the terms and conditions of the
[MIT License][MIT].

[![(License)](https://img.shields.io/badge/license-MIT-blue.svg)][MIT]

[MIT]: https://opensource.org/licenses/MIT

# Basic usage

The following HTML code will make modern web browsers redirected to the
location specified by the `canonical` link of the document.

```html
<script src="redirect.min.js" type="module" async>
</script>
```

## Deployment

Copy `redirect.min.js` (and `redirect.js`) from the `deploy` directory to your
web server.

# See also

The [project home](https://vx68k.bitbucket.io/redirect.js/).
