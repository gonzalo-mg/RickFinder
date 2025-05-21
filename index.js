async function getData() {
  const response = await fetch("./src/database/db_2025_05_20.json");
  const data = await response.json();
  return data;
}

const data = await getData();
const daRick = data.characters[0];

const daMain = document.querySelector("main");

data.characters.forEach((character) => {
  const card = document.createElement("card-character");
  card.set(character);
  daMain.append(card);
});
