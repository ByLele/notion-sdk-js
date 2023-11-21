import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { propertiesForNewPages } from "./sampleData.js"

config()

const pageId = "90cc1a489ec14a78ae14a8de4abcabb7"//"f584eb54-7877-44f0-8c15-29f9551c1ce5"//process.env.NOTION_PAGE_ID
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
 * Query a database: https://developers.notion.com/reference/post-database-query
 * Filter database entries: https://developers.notion.com/reference/post-database-query-filter
 */

async function addNotionPageToDatabase(databaseId, pageProperties) {
  await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties, // Note: Page properties must match the schema of the database
  })
}

async function queryDatabase(databaseId) {
  console.log("Querying database...")
  // This query will filter database entries and return pages that have a "Last ordered" property that is more recent than 2022-12-31. Use multiple filters with the AND/OR options: https://developers.notion.com/reference/post-database-query-filter.
  const lastOrderedIn2023 = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Last ordered",
      date: {
        after: "2022-12-31",
      },
    },
  })

  // Print filtered results
  console.log('Pages with the "Last ordered" date after 2022-12-31:')
  console.log(lastOrderedIn2023)
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
  // // Print the new database's URL. Visit the URL in your browser to see the pages that get created in the next step.
  // console.log(newDatabase.url)

  const databaseId = pageId//newDatabase.id
  // If there is no ID (if there's an error), return.
  if (!databaseId) return

  console.log("Adding new pages...")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
    // Add a few new pages to the database that was just created
    await addNotionPageToDatabase(databaseId, propertiesForNewPages[i])
  }

  // After adding pages, query the database entries (pages)
  queryDatabase(databaseId)
}

main()

/*
Pages with the "Last ordered" date after 2022-12-31:
{
  object: 'list',
  results: [
    {
      object: 'page',
      id: '3e65327d-b4aa-4f71-824e-2754f08a1801',
      created_time: '2023-11-20T14:32:00.000Z',
      last_edited_time: '2023-11-20T14:32:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Lettuce-3e65327db4aa4f71824e2754f08a1801',
      public_url: null
    },
    {
      object: 'page',
      id: '899862e0-a228-4e17-8ee0-af2d01e311ed',
      created_time: '2023-11-20T14:32:00.000Z',
      last_edited_time: '2023-11-20T14:32:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Tomatoes-899862e0a2284e178ee0af2d01e311ed',
      public_url: null
    },
    {
      object: 'page',
      id: '758f4d40-97b8-4784-970c-1c116067f773',
      created_time: '2023-11-20T14:28:00.000Z',
      last_edited_time: '2023-11-20T14:28:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Lettuce-758f4d4097b84784970c1c116067f773',
      public_url: null
    },
    {
      object: 'page',
      id: '35c6f1f0-84c8-4e1b-adca-ce6020c5aca8',
      created_time: '2023-11-20T14:27:00.000Z',
      last_edited_time: '2023-11-20T14:27:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Tomatoes-35c6f1f084c84e1badcace6020c5aca8',
      public_url: null
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
  request_id: '9dae01b8-61bd-4890-96e7-346de181f52b'
}
*/
