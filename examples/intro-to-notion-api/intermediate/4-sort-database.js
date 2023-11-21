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
 * Query a database: https://developers.notion.com/reference/post-database-query
 * Filter database entries: https://developers.notion.com/reference/post-database-query-filter
 * Sort database entries: https://developers.notion.com/reference/post-database-query-sort
 */

async function addNotionPageToDatabase(databaseId, pageProperties) {
  await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties, // Note: Page properties must match the schema of the database
  })
}

async function queryAndSortDatabase(databaseId) {
  console.log("Querying database...")
  // This query will filter and sort database entries. The returned pages will have a "Last ordered" property that is more recent than 2022-12-31. Any database property can be filtered or sorted. Pass multiple sort objects to the "sorts" array to apply more than one sorting rule.
  const lastOrderedIn2023Alphabetical = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Last ordered",
      date: {
        after: "2022-12-31",
      },
    },
    sorts: [
      {
        property: "Grocery item",
        direction: "descending",
      },
    ],
  })

  // Print filtered/sorted results
  console.log(
    'Pages with the "Last ordered" date after 2022-12-31 in descending order:'
  )
  console.log(lastOrderedIn2023Alphabetical)
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
  if (!databaseId) return

  console.log("Adding new pages...")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
    // Add a few new pages to the database that was just created
    await addNotionPageToDatabase(databaseId, propertiesForNewPages[i])
  }

  // After adding pages, query the database entries (pages) and sort the results
  queryAndSortDatabase(databaseId)
}

main()
/*
{
  object: 'list',
  results: [
    {
      object: 'page',
      id: '44ca664e-3ebd-409c-8f45-76b67fdacb6c',
      created_time: '2023-11-20T14:33:00.000Z',
      last_edited_time: '2023-11-20T14:33:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Tomatoes-44ca664e3ebd409c8f4576b67fdacb6c',
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
    },
    {
      object: 'page',
      id: 'ecb4320e-792c-41e0-916c-8b6f0624d4b1',
      created_time: '2023-11-20T14:33:00.000Z',
      last_edited_time: '2023-11-20T14:33:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/Lettuce-ecb4320e792c41e0916c8b6f0624d4b1',
      public_url: null
    },
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
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
  request_id: '8f01f2f5-5a53-4957-8592-ede0a3e8e81d'
}
*/