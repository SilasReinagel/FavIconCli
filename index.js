const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

// CLI Args

const args = process.argv.slice(2);
if (args.length < 2)
{
  console.log("Missing Required Args. Usage: node index.js [sourceFile] [outputFolder]");
  process.exit(-1);
}

const source = args[0];
const outputFolder = args[1];

// Prepare Output Directory

const clearDir = dir =>
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach(f => fs.unlink(path.join(dir, f), err => { if (err) throw err; }));
  });

clearDir(outputFolder);

// Create Icons

// Config Reference https://github.com/itgalaxy/favicons
const configuration = {
    path: "/",                                // Path for overriding default icons path. `string`
    dir: "auto",                              // Primary text direction for name, short_name, and description
    lang: "en-US",                            // Primary language for name and short_name
    background: "#fff",                       // Background colour for flattened icons. `string`
    theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
    appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
    display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    scope: "/",                               // set of URLs that the browser considers within your app
    start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
    version: "1.0",                           // Your application's version string. `string`
    logging: false,                           // Print logs to console? `boolean`
    pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    icons: {
      favicons: true,
      appleIcon: true,
      android: false,
      appleStartup: false,
      coast: false,
      firefox: false,
      windows: false,
      yandex: false
    }
};

favicons(source, configuration, (err, resp) => {
  if (err) throw err;

  resp.images.forEach(i => fs.writeFileSync(path.join(outputFolder, i.name), i.contents));
  resp.files.forEach(i => fs.writeFileSync(path.join(outputFolder, i.name), i.contents));
});
