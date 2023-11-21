import { Client } from "@notionhq/client"
import { config } from "dotenv"

config()

const apiKey = "secret_fz8hGuVnnQsTbifpRhXx0SCAfNiqSSPBn7IGfZKh0ww"//process.env.NOTION_PAGE_ID
const pageId = "317cdbedcd35469c90b4854fe3f053d7"//"780d7bfd44a64a37bcb21c5f5278053e"//process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/* 
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 */

async function main() {
  console.log(pageId)
  console.log(apiKey)
  // Create a new database
  const newDatabase = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: "New database name",
        },
      },
    ],
    properties: {
      // These properties represent columns in the database (i.e. its schema)
      "Grocery item": {
        type: "title",
        title: {},
      },
      Price: {
        type: "number",
        number: {
          format: "dollar",
        },
      },
      "Last ordered": {
        type: "date",
        date: {},
      },
    },
  })

  // Print the new database response
  console.log(newDatabase)
}

main()

/*
{
  object: 'database',
  id: 'f584eb54-7877-44f0-8c15-29f9551c1ce5',
  cover: null,
  icon: null,
  created_time: '2023-11-20T14:20:00.000Z',
  created_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  last_edited_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  last_edited_time: '2023-11-20T14:20:00.000Z',
  title: [
    {
      type: 'text',
      text: [Object],
      annotations: [Object],
      plain_text: 'New database name',
      href: null
    }
  ],
  description: [],
  is_inline: false,
  properties: {
    Price: { id: 'lc%3A%7C', name: 'Price', type: 'number', number: [Object] },
    'Last ordered': { id: 't~al', name: 'Last ordered', type: 'date', date: {} },
    'Grocery item': { id: 'title', name: 'Grocery item', type: 'title', title: {} }
  },
  parent: { type: 'page_id', page_id: '317cdbed-cd35-469c-90b4-854fe3f053d7' },
  url: 'https://www.notion.so/f584eb54787744f08c1529f9551c1ce5',
  public_url: null,
  archived: false,
  request_id: '57fc7763-effe-46fb-a62e-880e09889d27'
}
*/