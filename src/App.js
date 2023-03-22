import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material"

import validateInitData from './functions/validateTelegramWebAppData'

import LetsGo from './components/LetsGo'
import SelectGroup from './components/SelectGroup'

import "@fontsource/ibm-plex-sans/400.css"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/600.css"

console.log("NODE_ENV:", process.env.NODE_ENV)

function App() {

  const [search, setSearch] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)

  const testUser = { 
    id: "000000001",  
    first_name: "[First Name]",
    last_name: "[Last Name]",
    username: "[username]",
    language_code: "[en]",
    photo_url: "[]"
  }

  //const testInitData = 'query_idAAE_xB4aAAAAAD_EHhr2Y7iDuser{"id":438223935,"first_name":"Mark","last_name":"Tanser","username":"Mark_T1000","language_code":"en"}auth_date1679449356hash037921a5ec9e0db1cc16240fdf67fcdafd72f3906579a83009433cb811549cc6'
  

  //console.log("testInitData:", testInitData)

  //const testValidate = validateInitData(testInitData)
  //console.log("testValidate:", testValidate)

  let isDevelopment = false
  if (process.env.NODE_ENV === "development") { isDevelopment = true }
  let tele = null
  let initData = ""
  let user = testUser

  
  if (!isDevelopment) {
    tele = window.Telegram.WebApp
    const telegramInitData = tele.initData
    initData = new URLSearchParams(tele.initData)
    //if (validateInitData(initData)) {
    //  console.log("initData validated")
      user = JSON.parse(initData.get("user"))
    //}
  }
  
  console.log("user:", user)

  useEffect(() => {
    if (!isDevelopment) {tele.ready()}
  }, [])

  return (
    <div className="App">

      <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor:"#1e293b", height:"100vh" }} padding={1}>
          
          {
            !search 
              ?
                <LetsGo 
                  user={user} 
                  search={search} 
                  setSearch={setSearch}
                  initData={initData}
                />
              :
                <SelectGroup 
                  user={user} 
                  selectedOrg={selectedOrg}
                  setSelectedOrg={setSelectedOrg}
                  selectedGroup={selectedGroup} 
                  setSelectedGroup={setSelectedGroup}
                />
          }

      </Grid>

    </div>
  );
}

export default App;
