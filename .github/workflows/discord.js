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
            "value": `[${github.event.after.slice(0, 7)}](https://github.com/${github.repository}/commit/${github.event.after})`
          }
        ],
        "title": `:sparkles: New commit: ${github.event.after.slice(0, 7)} :sparkles:`,
        "description": github.event.head_commit.message,
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
    case 'test-success':
      return {
        "content": ":white_check_mark: <@&696626988147933215> Test succeed! Good job :white_check_mark:"
      };
    case 'test-failed':
      return {
        "content": `:octagonal_sign: <@&696626988147933215> Test failed! Please check in [here](https://github.com/${github.repository}/actions) :octagonal_sign:`
      }
  }
}

axios.post(webhook, getPayload())
