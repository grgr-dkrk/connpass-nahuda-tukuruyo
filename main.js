import { guests } from "./output.js";
import { staff } from "./output_staff.js";
import { eventMeta } from "./output.js";

if (!DOMPurify) {
  throw new Error("DOMPurify is not loaded");
}

const html = [...staff, ...guests]
  .sort((a, b) => {
    const roleOrder = ["スタッフ", "LT枠", "参加枠"];
    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
  })
  .map(
    (item) => `
  <div class="item ${
    item.role === "スタッフ"
      ? "item--staff"
      : item.role === "LT枠"
      ? "item--lt"
      : "item--guest"
  }">
    <a class="link__user" target="_blank" href="https://connpass.com/user/${item.userId}/" rel="noopener noreferrer">ユーザーページへ</a>
    <div class="obi obi--top"></div>
    <div class="contents">
    <div class="item-bg"></div>
     <div class="userInfo">
        <figure class="userInfo__icon-wrapper">
          <img class="userInfo__icon" src="avatars/${item.userId}.png" />
        </figure>
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

const cleanHtml = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });

printButton.addEventListener("click", () => {
  print();
});

app.innerHTML = cleanHtml;
