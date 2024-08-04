import { data } from "./output.js";
import { eventMeta } from "./output.js";

if (!DOMPurify) {
  throw new Error("DOMPurify is not loaded");
}

const html = data
  .sort((a) => (a.role === "LT枠" ? -1 : 1))
  .map(
    (item) => `
  <div class="item ${
    item.role === "スタッフ"
      ? "item--staff"
      : item.role === "LT枠"
      ? "item--lt"
      : "item--guest"
  }">
    <div class="item-bg"></div>
    <div class="obi obi--top"></div>
    <div class="contents">
     <div class="userInfo">
        <img class="userInfo__icon" src="avatars/${item.userName}.png" />
          <div>
            <p class="userInfo__class">${
              item.role === "スタッフ"
              ? "Staff"
              : item.role === "LT枠"
              ? "Speaker"
              : ""
            }</p>
           <p class="userInfo__name">${item.userName}</p>
       </div>
      </div>
      ${eventMeta.title && eventMeta.subTitle ? `
        <div class="eventMeta">
          <p class="eventMeta__title">${eventMeta.title}</p>
          <p class="eventMeta__subTitle">${eventMeta.subTitle}</p>
        </div>
      ` : ""}
    </div>
    <div class="obi obi--under">
      <small>
        The original of React logo is licensed under Creative Commons 4 by Meta.
      </small>
    </div>
  </div>
`
  )
  .join("");

const cleanHtml = DOMPurify.sanitize(html);

printButton.addEventListener("click", () => {
  print();
});

app.innerHTML = cleanHtml;
