var url = "https://test.wikipedia.org/w/api.php";
var userName = "";
var password = "";

function listenForClicks() {
  document.addEventListener("click", (e) => {
    if (e.target.type === "submit") {
      userName = document.getElementById("userName").value;
      password = document.getElementById("password").value;
      if (userName && password) {
        getLoginToken();
      }
    }
  });
}

function getLoginToken() {
  fetch(
    url + "?action=query&meta=tokens&type=login&format=json"
  ).then(
    (response) => {
      if (response.ok || true) {
        response.json().then(json => {
          console.log(json);
          if(json.query.tokens){
            loginRequest(json.query.tokens.logintoken);
          }
        });
      }
    },
    (error) => {
      console.log(error);
      reportExecuteScriptError();
    }
  );
}

function loginRequest(logintoken) {
  
  const data = new URLSearchParams();
  data.append("action", "login");
  data.append("lgname", userName);
  data.append("lgpassword", password);
  data.append("lgtoken", logintoken);
  data.append("format", "json");

  fetch(url, {
    method: "post",
    body: data,
  }).then(
    (response) => {
      
    },
    (error) => {

      browser.storage.local.set({
        isUserLoggedInWiki: 'yes'
      });
      let gettingItem = browser.storage.local.get();
      gettingItem.then((item)=>{ alert(item.isUserLoggedInWiki)}, ()=>{});
    }
  );
}

function reportExecuteScriptError(error) {
  document.querySelector("#login-page").classList.add("hidden");
  document.querySelector("#error-page").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

listenForClicks();

browser.tabs
 .executeScript({ file: "background/background.js" })
 .then(listenForClicks)
 .catch(reportExecuteScriptError);
