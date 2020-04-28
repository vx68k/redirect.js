// redirect.js - module script to redirect web browsers to another location
// Copyright (C) 2019-2020 Kaz Nishimura
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// SPDX-License-Identifier: MIT

// NOTE: this file is a module script.

/**
 * Module script to redirect web browsers to another location.
 *
 * This script can be loaded in a *redirecting* HTML file as follows:
 *
 * ```html
 * <script src="redirect.js" type="module" async>
 * </script>
 * ```
 *
 * @module redirect.js
 */

/**
 * Package name.
 *
 * @private
 */
const PACKAGE_NAME = "@PACKAGE_NAME@";

/**
 * Package version.
 *
 * @private
 */
const PACKAGE_VERSION = "@PACKAGE_VERSION@";

/**
 * Module name.
 *
 * @private
 */
const MODULE_NAME = "redirect.js";

/**
 * Returns the canonical link of the document.
 *
 * @return {HTMLLinkElement} the canonical link
 */
export function getCanonicalLink()
{
    let root = document.documentElement;
    for (let link of root.getElementsByTagName("link")) {
        for (let type of link.relList) {
            if (type.toLowerCase() == "canonical") {
                return link;
            }
        }
    }
    return null;
}

/**
 * Redirects the browser to the location specified by the `data-new-location`
 * attribute of the root element or the `canonical` link of the document,
 * if any.
 *
 * This function passes any query string unchanged to the new location
 * unlike the `Refresh` meta hack.
 */
export function run()
{
    let root = document.documentElement;
    let newLocation = null;
    if ("newLocation" in root.dataset) {
        newLocation = root.dataset.newLocation;
    }
    if (newLocation == null) {
        let link = getCanonicalLink();
        if (link != null) {
            newLocation = link.href;
        }
    }

    if (newLocation != null) {
        // Redirect the browser to the new location.
        location.replace(newLocation + location.search);
    }
}

console.info("Loaded: %s (%s %s)", MODULE_NAME, PACKAGE_NAME, PACKAGE_VERSION);
run();
