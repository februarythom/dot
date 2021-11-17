const { FuseBox } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js"
});

fuse.bundle('src').instructions(' > [main.ts]').watch().completed(proc => proc.start());

fuse.run();
