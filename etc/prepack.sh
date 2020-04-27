#!/bin/sh

outputdir="`pwd`"/deploy

PACKAGE_NAME="${npm_package_name:-redirect.js}"
PACKAGE_VERSION="${npm_package_version:-(unversioned)}"

SCRIPTS="redirect.js"

rm -rf "$outputdir" || exit 1
mkdir -p "$outputdir" || exit 1

for file in $SCRIPTS; do
    distfile=${file##*/}
    sed \
        -e "s,[@]PACKAGE_NAME[@],$PACKAGE_NAME,g" \
        -e "s,[@]PACKAGE_VERSION[@],$PACKAGE_VERSION,g" \
        $file > "$outputdir"/$distfile || exit 1
    "`npm bin`"/terser \
        "$outputdir"/$distfile \
        --module --output "$outputdir"/${distfile%.js}.min.js || exit 1
done
