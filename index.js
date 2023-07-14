import { Client } from "@notionhq/client"
import fs from "fs";
const notion = new Client({ auth: "secret_kA8zCabtwQye3Y55MpLwWFvJOWlvDLGW66ueQXnD8aw" })

const databaseId = "5ec1bf8366ca430f98f56177dc648180"//process.env.NOTION_DATABASE_ID

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

async function getDB() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}


async function getItem() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })
    //console.log(response)
    
    var i = 0,iLen = response.results.length,io;
    for(;i<iLen;++i){
      io = response.results[ i ];
      console.log( io );
      //console.log( io.properties.title.title );
    }
    fs.writeFileSync( databaseId + "_sample.json", JSON.stringify(response, null, 4 ) )
  } catch (error) {
    console.error(error.body)
  }
}

async function getPage( pageId ) {
  try {
    
    const response = await notion.pages.retrieve({
      page_id: pageId
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

async function getBlocks( pageId ) {
  try {
    
    const response = await notion.blocks.children.list({
      block_id: pageId
    })
    console.log(response)
    console.log("Success! Entry added.")
    fs.writeFileSync( pageId + "_sample.json", JSON.stringify(response, null, 4 ) )
  } catch (error) {
    console.error(error.body)
  }
}

//addItem("Yurts in Big Sur, California");
//getItem()
getBlocks("f08aea1f5e2e4bd1ad6ffa5f3ae773a9")