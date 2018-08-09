function dropHandler(ev) {
  console.log("File(s) dropped");

  ev.preventDefault();

  const data = ev.dataTransfer;
  let files = [];

  if (data.items) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].kind === "file") {
        files.push(data.items[i].getAsFile());
      }
    }
  } else {
    for (let i = 0; i < data.files.length; i++) {
      if (data.items[i].kind === "file") {
        files.push(data.files[i]);
      }
    }
  }
  const filetoupload = { files };
  console.log(filetoupload);
  fetch('/fileupload', {
    method: "POST",
    body: JSON.stringify(filetoupload),
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch Error =\n`, error));

  removeDragData(ev);
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  ev.preventDefault();
}

function removeDragData(ev) {
  console.log("Removing drag data");

  if (ev.dataTransfer.items) {
    ev.dataTransfer.items.clear();
  } else {
    ev.dataTransfer.clearData();
  }
}