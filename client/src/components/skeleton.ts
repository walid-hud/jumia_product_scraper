const skeleton = document.createElement("div");
skeleton.className = "product-card-skeleton";
skeleton.innerHTML = `
<a target="_blank">
  <div class="skeleton-img skeleton"></div>
  <div class="product-info ">
    <p class="title skeleton"></p>
    <p class="price skeleton">79.00 Dhs</p>
    <div class="brand skeleton">Generic</div>
    <div class="categories skeleton">
      <span>Computing/Computer</span>,<span>Accessories/Keyboards,</span>,<span>Mice</span>,<span>&amp;</span>,<span>Accessories/Keyboard</span>,<span>&amp;</span>,<span>Mice</span>,<span>Accessories/Mouse</span>,<span>Pads</span>
    </div>
  </div>
</a>
`;
function render_skeletons(container: HTMLElement, count: number = 40): void {
    for (let idx = 0; idx < count; idx++) {
        container.append(skeleton.cloneNode(true));
    }
}
function remove_skeletons(container: HTMLElement): void {
    container
        .querySelectorAll(".product-card-skeleton")
        .forEach((el) => el.remove());
}

export {remove_skeletons ,render_skeletons}