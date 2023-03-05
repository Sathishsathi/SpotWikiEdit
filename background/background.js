document.addEventListener("mouseup", (event) => {
  if (window.getSelection().toString().length) {
    MouseUP();
  }
});

function MouseUP() {
  console.log("Getting into the functions");

  let gettingItem = browser.storage.local.get();
  gettingItem.then(
    (item) => {
      if (item.isUserLoggedInWiki === "yes") {
        getReplaceTextFromUser();
      }
    },
    () => {}
  );
}

function getReplaceTextFromUser() {
  var exactText = window.getSelection().toString();
  var replace_text = prompt(exactText);
  console.log("Replace text");
  console.log(replace_text);
  var content = window.getSelection().getRangeAt(0);
  var content_string = content.startContainer.nodeValue;
  var content_edited_string =
    content_string.substring(0, content.startOffset) +
    replace_text +
    content_string.substring(content.endOffset);
  get_csrf(exactText, content.startOffset, replace_text);
}

function get_title(csrf_token, exactString, startOffset, replace_text) {
  console.log("Getting page title..");
  var current_url = window.location.href;
  console.log(current_url);
  var url_list = current_url.split("/wiki/");
  console.log(url_list);
  if (url_list.length > 1) {
    var wiki_index = url_list.indexOf("wiki");
    var title = url_list[1];
    console.log(title);
    var domain = url_list[0];
    var wiki_domain = "wikipedia.org";
    if (domain.includes(wiki_domain)) {
      get_page_content(
        csrf_token,
        title,
        exactString,
        startOffset,
        replace_text
      );
    }
  }
}

function get_page_content(
  csrf_token,
  title,
  exactString,
  startOffset,
  replace_text
) {
  var params = {
      action: "query",
      titles: title,
      prop: "revisions",
      formatversion: 2,
      rvprop: "content",
      rvslots: "*",
      token: csrf_token,
      format: "json",
    },
    api = new mw.Api();

  api.get(params).done(function (data) {
    var content = data.query.pages[0].revisions[0].slots.main.content;
    var before_content = content.substring(0, startOffset);
    var content_edited_string = content.substring(startOffset);
    content_edited_string = content_edited_string.replace(
      " " + exactString + " ",
      " " + replace_text + " "
    );
    complete_content = before_content + content_edited_string;
    edit_request(csrf_token, title, complete_content);
  });

  fetch(
    `https://test.wikipedia.org/w/api.php?action=query&titles=${title}&prop=revisions&formatversion=2&rvprop=content&token=${csrf_token}&format=json`
  ).then(
    (response) => {
      response.json().then((json) => {
        var content = json.query.pages[0].revisions[0].slots.main.content;
        var before_content = content.substring(0, startOffset);
        var content_edited_string = content.substring(startOffset);
        content_edited_string = content_edited_string.replace(
          " " + exactString + " ",
          " " + replace_text + " "
        );
        complete_content = before_content + content_edited_string;
        edit_request(csrf_token, title, complete_content);
      });
    },
    (error) => {
	  console.log(error)
    }
  );
}

function get_csrf(exactString, startOffset, replace_text) {
  fetch(
    "https://test.wikipedia.org/w/api.php?action=query&meta=tokens&format=json&type=csrf"
  ).then(
    (response) => {
      if (response.ok || true) {
        response.json().then((json) => {
          localStorage.setItem("csrfToken", json.query.tokens.csrftoken);
        });
      }
    },
    (error) => {
      console.log(error)
    }
  );

  get_title(
    data.query.tokens.csrftoken,
    exactString,
    startOffset,
    replace_text
  );
}

function edit_request(csrf_token, title, content_edited_string) {
  console.log("Making edit request..");
  api = new mw.Api();
  params = {
    action: "edit",
    title: title,
    text: content_edited_string,
    token: csrf_token,
    format: "json",
  };
  console.log(params);
  api.post(params).done(function (data) {
    console.log("Done!");
  });
}
