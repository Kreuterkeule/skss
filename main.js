const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const RADar_URL = 'https://www.stadtradeln.de/fileadmin/radelkalender/embed/radelmeter-team.php?sr_team_id=88218&L=0';

axios.get(RADar_URL)
.then((r) => {
    const dom = new JSDOM(r.data);
    fs.writeFile('output.json', `{"radelnde":"${[...dom.window.document.querySelectorAll('h3')][0].textContent}","kilometer":"${[...dom.window.document.querySelectorAll('h3')][1].textContent}","co2":"${[...dom.window.document.querySelectorAll('h3')][2].textContent}","ranking":"${[...dom.window.document.querySelectorAll('h3')][3].textContent}"}`, 'utf-8', (err) => {
      if (err) throw err;
      console.log('filelistAsync complete');
    });
  })
