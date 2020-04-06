const axios = require('axios');

const webhook = process.env.WEBHOOK;
const messageType = process.env.MESSAGE_TYPE;

const getInfoMessage = () => (
  {
    "embeds": [
      {
        "fields": [
          {
            "name": "Repository",
            "value": "[online-fiasco/user](https://github.com/online-fiasco/user)",
            "inline": true
          },
          {
            "name": "Branch",
            "value": "[feature/user-db](https://github.com/online-fiasco/user/tree/feature/user-db)",
            "inline": true
          }
        ],
        "title": ":sparkles: New commit: a3988e5 :sparkles:",
        "description": "add dependency for database and test\n\n- mongoose: MongoDB ORM\n- sinon: Test mocking\n- crypto: Encryption",
        "footer": {
          "text": "commit by XxshiftxX",
          "icon_url": "https://avatars0.githubusercontent.com/u/26434484?s=460&u=9c07530310129def4870d8091ceb7263bcfc8dff&v=4"
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

axios.post(webhook, getPayload())
