import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { propertiesForNewPages } from "./sampleData.js"

config()

const pageId = "f584eb54-7877-44f0-8c15-29f9551c1ce5"//process.env.NOTION_PAGE_ID
const apiKey = "secret_fz8hGuVnnQsTbifpRhXx0SCAfNiqSSPBn7IGfZKh0ww"//process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/* 
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Create a page endpoint (notion.pages.create(): https://developers.notion.com/reference/post-page)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 */

async function addNotionPageToDatabase(databaseId, pageProperties) {
  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties,
  })
  console.log(newPage)
}

async function main() {
  // Create a new database
  // const newDatabase = await notion.databases.create({
  //   parent: {
  //     type: "page_id",
  //     page_id: pageId,
  //   },
  //   title: [
  //     {
  //       type: "text",
  //       text: {
  //         content: "Grocery list",
  //       },
  //     },
  //   ],
  //   properties: {
  //     // These properties represent columns in the database (i.e. its schema)
  //     "Grocery item": {
  //       type: "title",
  //       title: {},
  //     },
  //     Price: {
  //       type: "number",
  //       number: {
  //         format: "dollar",
  //       },
  //     },
  //     "Last ordered": {
  //       type: "date",
  //       date: {},
  //     },
  //   },
  // })

  // Print the new database's URL. Visit the URL in your browser to see the pages that get created in the next step.
  //console.log(newDatabase.url)

  const databaseId = pageId//newDatabase.id
  // If there is no ID (if there's an error), return.
  if (!databaseId) return

  console.log("Adding new pages...")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
    // Add a few new pages to the database that was just created
    await addNotionPageToDatabase(databaseId, propertiesForNewPages[i])
  }
}

main()


/* 
{
  object: 'page',
  id: '35c6f1f0-84c8-4e1b-adca-ce6020c5aca8',
  created_time: '2023-11-20T14:27:00.000Z',
  last_edited_time: '2023-11-20T14:27:00.000Z',
  created_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  last_edited_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  cover: null,
  icon: null,
  parent: {
    type: 'database_id',
    database_id: 'f584eb54-7877-44f0-8c15-29f9551c1ce5'
  },
  archived: false,
  properties: {
    Price: { id: 'lc%3A%7C', type: 'number', number: 1.49 },
    'Last ordered': { id: 't~al', type: 'date', date: [Object] },
    'Grocery item': { id: 'title', type: 'title', title: [Array] }
  },
  url: 'https://www.notion.so/Tomatoes-35c6f1f084c84e1badcace6020c5aca8',
  public_url: null,
  request_id: '7b649faf-05d1-485c-bc23-d2c07784887c'
}
{
  object: 'page',
  id: '758f4d40-97b8-4784-970c-1c116067f773',
  created_time: '2023-11-20T14:28:00.000Z',
  last_edited_time: '2023-11-20T14:28:00.000Z',
  created_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  last_edited_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  cover: null,
  icon: null,
  parent: {
    type: 'database_id',
    database_id: 'f584eb54-7877-44f0-8c15-29f9551c1ce5'
  },
  archived: false,
  properties: {
    Price: { id: 'lc%3A%7C', type: 'number', number: 3.99 },
    'Last ordered': { id: 't~al', type: 'date', date: [Object] },
    'Grocery item': { id: 'title', type: 'title', title: [Array] }
  },
  url: 'https://www.notion.so/Lettuce-758f4d4097b84784970c1c116067f773',
  public_url: null,
  request_id: 'd69c39fd-3070-4b85-b1d9-d2e54cb483a3'
}
{
  object: 'page',
  id: 'a0400482-8404-4387-a1b6-834d8cbfc9e3',
  created_time: '2023-11-20T14:28:00.000Z',
  last_edited_time: '2023-11-20T14:28:00.000Z',
  created_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  last_edited_by: { object: 'user', id: '3824a694-0497-46c9-bbbb-6f52e74880d0' },
  cover: null,
  icon: null,
  parent: {
    type: 'database_id',
    database_id: 'f584eb54-7877-44f0-8c15-29f9551c1ce5'
  },
  archived: false,
  properties: {
    Price: { id: 'lc%3A%7C', type: 'number', number: 0.99 },
    'Last ordered': { id: 't~al', type: 'date', date: [Object] },
    'Grocery item': { id: 'title', type: 'title', title: [Array] }
  },
  url: 'https://www.notion.so/Oranges-a040048284044387a1b6834d8cbfc9e3',
  public_url: null,
  request_id: '4fba1fe0-d251-4b7d-b2ca-cdeb73a263f3'
}
*/