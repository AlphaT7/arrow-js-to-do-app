import { reactive, watch, html } from "@arrow-js/core";

const $ = document.querySelector.bind(document);

let data = reactive({
  items: [
    {
      id: "temp1",
      text: "An item on your list...",
      completed: false,
    },
    {
      id: "temp2",
      text: "Another item on your list...",
      completed: false,
    }
  ]
});

const startData = JSON.parse(localStorage.getItem('todoapp'));
if (!startData) {
  watch(state);
} else {
  watch(state);
  data.items = startData;
}

const appElement = $("#app");
const template = html`
  <header><h1>To-Do</h1></header>
  <section>
    <ul id="list">
      ${() => data.items.map(
  (item) => html`<li id="${item.id}">
    <input class="itemText ${isCompleted(item)}" type = "text"
value = "${item.text}"
@input="${(e) => { updateItem(e); }}" >
  <div class="strike ${isCompleted(item)}" @click="${(e) => { completeItem(e); }}" >a</div >
    <div class="delete" @click="${(e) => { deleteItem(e); }}" >-</div ></li > `.key(item.id)
)}
    </ul>
  </section>
  <footer>
    <input id="newItem" type="text" placeholder="Type Here">
    <button @click="${() => { addItem($("#newItem").value) }}">
    New Task</button>
  </footer>
`;

template(appElement);

function sortList() {
  data.items.sort((a, b) => a.completed - b.completed);
}

function addItem(value) {
  if (!value) return;
  const id = self.crypto.randomUUID();
  data.items.push({ id: id, text: value, completed: false })
  sortList();
}

function deleteItem(e) {
  const listItemId = e.srcElement.parentElement.id;
  const listItemIndex = data.items.findIndex((item) => item.id == listItemId);
  data.items.splice(listItemIndex, 1);
  sortList();
}

function completeItem(e) {
  const listItemId = e.srcElement.parentElement.id;
  const listItem = document.getElementById(listItemId);
  const selectedItem = data.items.find((item) => item.id == listItemId);

  listItem.querySelector(".itemText").classList.toggle("completed");
  listItem.querySelector(".strike").classList.toggle("completed");
  selectedItem.completed = !selectedItem.completed
  sortList();
}

function updateItem(e) {
  const listItemId = e.srcElement.parentElement.id;
  const listItemText = e.srcElement;
  const selectedItem = data.items.find((item) => item.id == listItemId);
  selectedItem.text = listItemText.value;
}

function isCompleted(item) {
  let value = item.completed ? "completed" : "";
  return value;
}

function state() {
  let appData = JSON.stringify(data.items);
  localStorage.setItem('todoapp', appData);
}

