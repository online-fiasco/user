const axios = require('axios');

const webhook = process.env.WEBHOOK;
const messageType = process.env.MESSAGE_TYPE;
const github = JSON.parse(process.env.GITHUB);

const getInfoMessage = () => (
  {
    "embeds": [
      {
        "fields": [
          {
            "name": "Repository",
            "value": `[${github.repository}](https://github.com/${github.repository})`,
            "inline": true
          },
          {
            "name": "Branch",
            "value": `[${github.ref.replace('refs/heads/', '')}](https://github.com/${github.repository}/tree/${github.ref.replace('refs/heads/', '')})`,
            "inline": true
          },
          {
            "name": "Commit",
            "value": `[${github.event.after.slice(0, 7)}](https://${github.repository}/commit/${github.event.after})`
          }
        ],
        "title": `:sparkles: New commit: ${github.event.after.slice(0, 7)} :sparkles:`,
        "description": github.event.commits.map(commit => commit.id === github.event.after)[0].message,
        "footer": {
          "text": `commit by ${github.actor}`,
          "icon_url": github.event.sender.avatar_url,
        }
      }
    ]
  }
);

const getPayload = () => {
  switch(messageType)
  {
    case 'info':
      return getInfoMessage();
      break;
  }
}

console.log(github);

axios.post(webhook, getPayload())
