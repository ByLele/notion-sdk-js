 export const propertiesForNewPages = [
  {
    "Name": {"title": {}},  // This is a required property
    "Description": {"rich_text": {}},
    "In stock": {"checkbox": {}},
    "status group": {
        "select": {
            "options": [
                {"name": "🥦 finish", "color": "green"},
                {"name": "🍎 no start", "color": "red"},
                {"name": "💪 block", "color": "yellow"},
            ]
        }
    },
    "publishAt": {"date":{}},
    "Last ordered": {"date": {}},
    "URL":{"rich_text":{}},
    "Store availability": {
        "type": "multi_select",
        "multi_select": {
            "options": [
                {"name": "eo", "color": "blue"},
                {"name": "po", "color": "gray"},
                {"name": "te", "color": "purple"},
                {"name": "ot", "color": "yellow"},
            ]
        },
    },
    "+1": {"people": {}},
    "Photo": {"files": {}},
}
 ]

//[
//   {
//     "Grocery item": {
//       type: "title",
//       title: [{ type: "text", text: { content: "Tomatoes" } }],
//     },
//     Price: {
//       type: "number",
//       number: 1.49,
//     },
//     "Last ordered": {
//       type: "date",
//       date: { start: "2023-05-11" },
//     },
//   },
//   {
//     "Grocery item": {
//       type: "title",
//       title: [{ type: "text", text: { content: "Lettuce" } }],
//     },
//     Price: {
//       type: "number",
//       number: 3.99,
//     },
//     "Last ordered": {
//       type: "date",
//       date: { start: "2023-05-04" },
//     },
//   },
//   {
//     "Grocery item": {
//       type: "title",
//       title: [{ type: "text", text: { content: "Oranges" } }],
//     },
//     Price: {
//       type: "number",
//       number: 0.99,
//     },
//     "Last ordered": {
//       type: "date",
//       date: { start: "2022-04-29" },
//     }, 
//   },
// ]
