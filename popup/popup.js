var url = " ";

function listenForClicks() {
  document.addEventListener("click", (e) => {
    if (e.target.type === "submit") {
      var userName = document.getElementById("userName").value;
      var password = document.getElementById("password").value;
      if (userName && password){
        getLoginToken();
      }
    }
  });
}

function getLoginToken() {
  
  // var params_0 = {
  //   action: "query",
  //   meta: "tokens",
  //   type: "login",
  //   format: "json",
  // };

  // request.get({ url: url, qs: params_0 }, function (error, res, body) {
  //   if (error) {
  //     alert(error);
  //     return;
  //   }
  //   alert("pass");
  //   var data = JSON.parse(body);
  //   loginRequest(data.query.tokens.logintoken);
  // });

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "mode": "cors" },
    body: JSON.stringify({
      action: "query",
      meta: "tokens",
      type: "login",
      format: "json",
    }),
  };

  fetch("https://test.wikipedia.org/w/api.php?action=query&meta=tokens&type=login&format=json")
    .then((response) => {
      alert("success")
      response.json()
    }, (error)=> {
      alert(error.query.tokens.logintoken)
    })

}

function reportExecuteScriptError(error) {
  document.querySelector("#login-page").classList.add("hidden");
  document.querySelector("#error-page").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "background/background.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
